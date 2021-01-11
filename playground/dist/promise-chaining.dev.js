"use strict";

require('../src/db/mongoose');

var User = require('../src/models/user'); // //5fcc948337157e3128b536f9
// User.findByIdAndUpdate('5fcc948337157e3128b536f9', {
//   age: 1,
// })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });


var updateAgeAndCount = function updateAgeAndCount(id, age) {
  var user, count;
  return regeneratorRuntime.async(function updateAgeAndCount$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(id, {
            age: age
          }));

        case 2:
          user = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(User.countDocuments({
            age: age
          }));

        case 5:
          count = _context.sent;
          return _context.abrupt("return", count);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

updateAgeAndCount('5fcc948337157e3128b536f9', 2).then(function (count) {
  return console.log(count);
})["catch"](function (error) {
  return console.log(error);
});