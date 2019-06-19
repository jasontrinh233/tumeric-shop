const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateAddInventoryInput(data) {
   let errors = {};

   // Convert empty html field to empty string-type to use in Validator.isEmpty()
   data.type_of_product = !isEmpty(data.type_of_product) ? data.type_of_product : '';
   data.weight = !isEmpty(data.weight) ? data.weight.trim() : '';
   data.date_created = !isEmpty(data.date_created) ? data.date_created : '';
   data.notes = !isEmpty(data.notes) ? data.notes.trim() : '';

   // Validate `type_of_product`
   if (Validator.isEmpty(data.type_of_product)) {
      errors.type_of_product = 'Hãy chọn một loại sản phẩm';
   }

   // Validate `weight`
   if (Validator.isEmpty(data.weight)) {
      errors.weight = 'Hãy cung cấp khối lượng của sản phẩm';
   } else {
      if (!Validator.isNumeric(data.weight)) {
         errors.weight = 'Khối lượng phải là số';
      }
   }

   // Validate `date_created`
   if (Validator.isEmpty(data.date_created)) {
      errors.date_created = 'Hãy cung cấp ngày';
   } else {
      const date_format = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/; // (dd/mm/yyyy)

      // check if correct format (dd/mm/yyyy)
      if (data.date_created.match(date_format)) {
         // extract string into date, month, year
         const d = data.date_created.split('/');
         const dd = parseInt(d[0]);
         const mm = parseInt(d[1]);
         const yy = parseInt(d[2]);

         // create list of days of month (assume no leap year by default)
         const list_of_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

         if (mm === 1 || mm === 2) {
            if (dd > list_of_days[mm-1])
               errors.date_created = 'Ngày không đúng';
         }
         if (mm === 2) {
            const lyear = false;
            
            // leap year
            if ( (!(yy % 4) && (yy % 100)) || !(yy % 400) ) 
               lyear = true;

            if (lyear === false && dd > 28)
               errors.date_created = 'Ngày không đúng';
            else if (lyear === true && dd > 29) 
               errors.date_created = 'Ngày không đúng';
         }
      } else { // no match pattern
         errors.date_created = 'Ngày không đúng';
      }
   }

   return {
      errors,
      isValid: isEmpty(errors)
   }; 
};
