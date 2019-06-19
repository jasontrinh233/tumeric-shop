const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const router = express.Router();
const isEmpty = require('../validation/is_empty');


// Load validateInventoryInput
const validateAddInventoryInput = require('../validation/add_inventory_validator');

// Load `add_inventory` `db_handler`
const { insertData, getData } = require('../db_handler/inventory_handler');


/*
 * @Router  GET /inventory
 * @desc    Inventory page
 * @access  Protected
 */
router.get('/', async function (req, res) {
  // GET data from DB
  const tableData = await getData();

  return res.status(200).render('inventory/index', {
    title: 'Kho hàng',
    path: {
      link: ['/inventory'],
      dirs: ['Kho hàng']
    },
    searchId: 'inventorySearch',
    tableData: tableData
  });
});

/*
 * @Router  GET /inventory/add
 * @desc    Add inventory page
 * @access  Protected
 */
router.get('/add', function (req, res) {
  return res.status(200).render('inventory/add_inventory', {
    title: 'Nhập kho',
    path: {
      link: ['/inventory', '/inventory/add'],
      dirs: ['Kho hàng', 'Nhập kho']
    },
    searchId: 'addInventorySearch'
  });
});

/*
 * @Router  POST /inventory/add/submitted
 * @desc    Submit data into database
 * @access  Protected
 */
router.post('/add/submitted', function (req, res) {
  const rows_array = req.body;

  if (!isEmpty(rows_array)) {
    let errors_array = [];

    // loop through each row of the add inventory form  
    for (let i = 0; i < rows_array.length; i++) {
      const { errors, isValid } = validateAddInventoryInput(rows_array[i]);

      if (!isValid) {
        // create `error_obj` that contains
        // error message and row index where
        // the error comes from.
        const error_obj = {
          "msg": errors,
          "row": rows_array[i].row
        }

        errors_array.push(error_obj);
      }
    } // END FOR

    // send errors back or push data into DB
    if (!isEmpty(errors_array)) {
      return res.status(400).json(errors_array);
    } else {
      // insert every row into DB
      for (let i = 0; i < rows_array.length; i++) {
        insertData(rows_array[i]).then();
      }
      return res.status(200).json('Success');
    }

  } // END IF

});

module.exports = router;
