const mysql = require('mysql');

// `qtrinh_inventorymanager` MySQL server config
const Inventory = mysql.createConnection({
   host: 'localhost', // MAMP SQL server
   port: '8889', // MAMP SQL server
   user: 'root',
   password: 'root',
   database: 'qtrinh_inventorymanager'
});

// `qtrinh_ordermanager` MySQL server config
const Order = mysql.createConnection({
   host: 'localhost', // MAMP SQL server
   port: '8889', // MAMP SQL server
   user: 'root',
   password: 'root',
   database: 'qtrinh_ordermanager'
});

// connect to InventoryManager
Inventory.connect(error => {
  if (error) {
    console.error('Error connecting:' + error.stack);
    return;
  } else {
    console.log('InventoryManager connected');
  }
});

// connect to OrderManager
Order.connect(error => {
  if (error) {
    console.error('Error connecting:' + error.stack);
    return;
  } else {
    console.log('OrderManager connected');
  }
});

module.exports = {
  Inventory,
  Order
};
