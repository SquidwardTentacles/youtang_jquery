var mysql = require('mysql');
exports.base = (sql, data, callback) => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'youtang'
  });

  connection.connect();

  connection.query(sql, data, function(error, results, fields) {
    if (error) throw error;
    // console.log('The solution is: ', results[0].solution);
    callback(results);
  });
  connection.end();
};
