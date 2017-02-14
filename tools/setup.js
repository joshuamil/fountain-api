const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);

client.connect( (err) => {
  if (err) throw err;

  let statement = "SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE' and table_schema = 'public'";

  client.query(statement, (err, result) => {
    if (err) throw err;

    result.rows.forEach( (row) => {
      console.log(row.table_name);
    });

    client.end( (err) => {
      if (err) throw err;
    });

  });

})
