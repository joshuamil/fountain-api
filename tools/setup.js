const pg = require('pg');
const fs = require('fs');
const path = require('path');
const client = new pg.Client(process.env.DATABASE_URL);

client.connect( (err) => {
  if (err) throw err;

  let statement = "SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE' and table_schema = 'public' and table_name = 'exhibits' ORDER BY table_name ASC";

  client.query(statement, (err, result) => {
    if (err) throw err;

    result.rows.forEach( (row) => {

      let name = row.table_name;
      let dir = path.join(__dirname, `../server/routes/${name}`);
      let fileCntrl = path.join(__dirname, `../server/controllers/${name}.js`);
      let fileModel = path.join(__dirname, `../server/models/${name}.js`);
      let fileRoute = path.join(__dirname, `../server/routes/${name}.js`);
      let routeConf = path.join(__dirname, `../conf/routes.json`);

      // Make directory in /server/routes
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      let columns = getColumns(name)
        .then( (res) => {

          let cols = res[1];

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

          });


        });

    });

    client.end( (err) => {
      if (err) throw err;
    });

  });

});


let getColumns = (table) => {

  let columns = [];
  let statement = `SELECT table_name, column_name, ordinal_position, is_nullable, character_maximum_length, udt_name, is_identity, column_default FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${table}';`;

  return Promise.all([

    client.query(statement, (err, result) => {
      result.rows.forEach( (column) => {
        columns.push({
          name: column.column_name.toLowerCase(),
          order: column.ordinal_position,
          type: column.udt_name.toLowerCase(),
          length: column.character_maximum_length,
          id: column.is_identity.toLowerCase(),
          nullable: column.is_nullable.toLowerCase(),
          default: column.column_default
        });
      })
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


let writeFile = (file, data) => {
  fs.exists(file, (exists) => {
    if (!exists) {
      fs.writeFile(file, data, {flag: 'wx'}, (err) => {
      });
    }
  });
};


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
