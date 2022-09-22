// var mongoose = require('mongoose');
// var Ndata = require('./models/notarydatas')
// var Users = require('./models/users')
// mongoose.connect('mongodb://localhost:27017/bluenotary', { useNewUrlParser: true, useUnifiedTopology: true }, async (err) => {
//   const notaries = await Ndata.find({
//     commissionExpiresOn: {
//       $lt: new Date().getTime() / 1000 - 3600
//     }
//   })
//   if (notaries.length) {
//     for (const data of notaries) {
//       console.log(data.userId)
//       const notaryUser = await Users.findOne({
//         _id: data.userId, deleted: { $ne: true }
//       });
//       console.log(notaryUser)
//       if (notaryUser?.approve === 'active') {
//         notaryUser.approve = 'inactive';
//         notaryUser.isCommissionExpired = true;
//         await notaryUser.save();
//       }
//     }
//   }
//   console.log(new Date().getTime() / 1000)
//   console.log(new Date(1726815600 * 1000))
//   process.exit(0);
// });
const jwt = require('jwt-simple')
var token = jwt.encode({a: 'abcd'}, 'abcdef');
console.log(jwt.decode('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.e30.IUSQP20CcYg8TJ9ai-8USRbK_vlPIObIqHfqm6MYJSw', 'abcdef'))