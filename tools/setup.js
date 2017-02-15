const pg = require('pg');
const fs = require('fs');
const path = require('path');
const client = new pg.Client(process.env.DATABASE_URL);

/**
 * TODO:
 * Eventually this section will be controlled via command-line arguments or
 * direct user input from the console. For now this is configured in the code.
 *
 */
let createIDCols = false; // Generates ALTER statements for id columns
let createStamps = false; // Generates ALTER/DROP statements for createdAt/updatedAt columns
let migrateDates = false; // Generates UPDATE/DROP statements for migrating date columns to Sequelize format
let scriptsOnly = false; // ONLY Generates scripts, doesn't generate models, controllers or routes

client.connect( (err) => {
  if (err) throw err;

  // Query the information_schema table for a list of all public base tables
  let statement = `SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE'
    and table_schema = 'public' ORDER BY table_name ASC`;

  client.query(statement, (err, result) => {

    if (err) {
      console.log(err);
    } else {

      if (result && result.rows) {

        // Generate scripts if configured to do so
        if (createIDCols) {
          result.rows.forEach( (row, i) => {
            console.log(`ALTER TABLE ${row.table_name} ADD COLUMN id BIGSERIAL PRIMARY KEY;`);
          });
        }

        if (createStamps) {
          result.rows.forEach( (row, i) => {
            console.log(`ALTER TABLE ${row.table_name} ADD COLUMN "createdAt" TIMESTAMP;`);
            console.log(`ALTER TABLE ${row.table_name} ADD COLUMN "updatedAt" TIMESTAMP;`);

            console.log(`ALTER TABLE ${row.table_name} DROP COLUMN "createdat";`);
            console.log(`ALTER TABLE ${row.table_name} DROP COLUMN "updatedat";`);
          });
        }

        if (migrateDates) {
          result.rows.forEach( (row, i) => {
            console.log(`UPDATE ${row.table_name} SET "createdAt" = datecreated, "updatedAt" = datecreated;`);
            console.log(`ALTER TABLE ${row.table_name} DROP COLUMN "datecreated";`);
          });
        }


        // If all we want are scripts, then stop here
        if (scriptsOnly) {
          process.exit();
        }

        // Iterate over the query results
        result.rows.forEach( (row, i) => {

          let name = row.table_name;
          let dir = path.join(__dirname, `../server/routes/${name}`);
          let fileCntrl = path.join(__dirname, `../server/controllers/${name}.js`);
          let fileModel = path.join(__dirname, `../server/models/${name}.js`);
          let fileRoute = path.join(__dirname, `../server/routes/${name}.js`);
          let routeConf = path.join(__dirname, `../conf/routes.json`);

          // Retrieve columns for this table
          let columns = getColumns(name)
            .then( (res) => {

              let cols = res[1];

              console.log(`Processing table ${name} ...`);

              Promise.all([

                // Make controller
                writeCntrlFile(fileCntrl, name, cols),

                // Make model
                writeModelFile(fileModel, name, cols),

                // Make router
                writeRouteFile(fileRoute, name, cols),

                // Register in routes.json
                // writeToRouteConfig(routeConf, name)

              ])
              .then( ([ctrl, model, route, conf]) => {
                console.log(' - Generated Controller');
                console.log(' - Generated Model');
                console.log(' - Generated Router');
                console.log(' - Added to Router Config');
                console.log(' ');
              })
              .then ( () => {

                if (i === result.rows.length-1) {
                  // Close connection and exit program
                  client.end( (err) => {
                    if (err) {
                      process.exit(1);
                    } else {
                      process.exit();
                    }
                  });
                }

              });


            });



        });

      }

    }

  });

});




/**
 * Returns column details for a given table.
 *
 */
let getColumns = (table) => {

  let columns = [];
  let statement = `SELECT table_name, column_name, ordinal_position, is_nullable, character_maximum_length, udt_name,
    is_identity, column_default FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${table}';`;

  return Promise.all([

    client.query(statement, (err, result) => {
      if (result && result.rows) {
        result.rows.forEach( (column) => {
          columns.push({
            name: column.column_name,
            order: column.ordinal_position,
            type: column.udt_name.toLowerCase(),
            length: column.character_maximum_length,
            id: column.is_identity.toLowerCase(),
            nullable: column.is_nullable.toLowerCase(),
            default: column.column_default
          });
        })
      } else {
        Promise.resolve({});
      }
    }),

    Promise.resolve(columns)

  ]);

};


/**
 * Creates a new Controller file for the specified table.
 * This file will require modification in order to operate properly.
 *
 */
let writeCntrlFile = (file, name, cols) => {
  let template = path.join(__dirname + '/templates/controller.js');
  let str = '';
  let keyname = '';
  fs.readFile(template, 'utf8', (err, data) => {
    if (err) throw err;
    let content = data.replace(/\[MODEL\]/g, name);

    cols.forEach( (col, i) => {
      if (i > 0) {
        str += '        ';
      }

      // TODO: Add additional data type handlers here as well as more advanced
      // features for the controller generator
      if (col.default === 'uuid_generate_v4()' && col.type === 'uuid') {
        str += `${col.name}: uuidV4()`;
        keyname = col.name;
      } else if (col.name === 'createdAt' || col.name === 'updatedAt') {
        str += `${col.name}: moment().format()`;
      } else {
        str += `${col.name}: req.body.${col.name}`;
      }

      if (i === cols.length-1) {
        str += '\n';
      } else {
        str += ',\n';
      }
    });

    content = content.replace(/\[COLUMNS\]/g, str);
    content = content.replace(/\[KEYNAME\]/g, keyname);
    Promise.resolve(writeFile(file, content));
  });
};


/**
 * Creates a new Model file for the specified table.
 * This file will require modification in order to operate properly.
 *
 */
let writeModelFile = (file, name, cols) => {
  let template = path.join(__dirname + '/templates/model.js');
  let str = '';
  fs.readFile(template, 'utf8', (err, data) => {
    if (err) throw err;

    let content = data.replace(/\[MODEL\]/g, name);

    cols.forEach( (col, i) => {
      if (i > 0) {
        str += '      ';
      }
      str += `${col.name}: {\n`
      str += `        type: `;

      // TODO: Add additional data type handlers here as well as more advanced
      // features for the model generator
      if (col.type === 'uuid') {
        str += `DataTypes.UUID`;
      } else if (col.type === 'bit') {
        str += `DataTypes.BOOLEAN`;
      } else if (col.type === 'timestamp') {
        str += `DataTypes.DATE`;
      } else if (col.type === 'int4') {
        str += `DataTypes.INTEGER`;
      } else {
        str += `DataTypes.STRING`;
      }

      if (col.id === 'yes' || (col.default === 'uuid_generate_v4()' && col.type === 'uuid')) {
        str += `,\n        primaryKey: true`;
      }

      if (i === cols.length-1) {
        str += '\n      }\n';
      } else {
        str += '\n      },\n';
      }
    });

    content = content.replace(/\[COLUMNS\]/g, str);

    Promise.resolve(writeFile(file, content));
  });
};


/**
 * Creates a new route file for the specified table.
 * This file should be complete and ready to use for basic operations.
 *
 */
let writeRouteFile = (file, name, cols) => {
  let template = path.join(__dirname + '/templates/route.js');
  fs.readFile(template, 'utf8', (err, data) => {
    if (err) throw err;
    let content = data.replace(/\[MODEL\]/g, name);
    Promise.resolve(writeFile(file, content));
  });
};


/**
 * Generic file writer function
 *
 */
let writeFile = (file, data) => {
  fs.exists(file, (exists) => {
    if (!exists) {
      fs.writeFile(file, data, {flag: 'wx'}, (err) => {
        if (err) throw err;
      });
    }
  });
};


/**
 * TODO:
 * Appends the new route to the routes configuration file.
 * This file should be complete and ready to use for basic operations.
 *
 */
let writeToRouteConfig = (file, name) => {
  // Read json file routeConf
  // Iterate over contents
  // If match then ignore
  // If not found then write new entry

  return dataCntrl = {
    path: `"/${name}"`,
    name: `"${name}"`,
    model: `"${name}"`
  };

};
