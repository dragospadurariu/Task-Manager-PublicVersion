require('../src/db/mongoose');
const User = require('../src/models/user');

// //5fcc948337157e3128b536f9
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

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount('5fcc948337157e3128b536f9', 2)
  .then((count) => console.log(count))
  .catch((error) => console.log(error));
