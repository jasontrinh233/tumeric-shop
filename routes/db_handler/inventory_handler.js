const { Inventory } = require('../../db_config/connection');

const insertData = function(data) {
   const row = {
      type_of_product: data.type_of_product,
      weight: data.weight,
      date_created: data.date_created,
      notes: data.notes
   }
   return new Promise(function(resolve, reject) {
      Inventory.query(
         'INSERT INTO inventory SET ?',
         row,
         function(error, results) {
            if (error) return reject(error);
         }
      );
   });
}

const getData = function() {
   return new Promise(function(resolve, reject) {
      Inventory.query(
         `SELECT * FROM inventory ORDER BY id DESC`,
         function(error, results) {
            if (error) return reject(error);
            return resolve(JSON.stringify(results));
         }
      );
   });
}

module.exports = {
   insertData,
   getData
}