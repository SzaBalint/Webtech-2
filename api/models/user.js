const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)

// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;

// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// });

// const User = module.exports = mongoose.model('users', userSchema);

// module.exports.getUserById = function(id, callback){
//     User.findById(id, callback);
// }

// module.exports.getUserByUsername = function(username, callback){
//     const query = {username: username}
//     User.findOne(query, callback);
// }

// module.exports.addUser = function(newUser){
//     bcrypt.genSalt(10, (err, salt) =>{
//         bcrypt.hash(newUser.password, salt, (err, hash) => {
//             if(err) throw err;
//             newUser.password = hash;
//             newUser.save();
//         })
//     });
// }

// module.exports.comparePassword = function(candidatePassword, hash, callback){
//     bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
//         if(err) throw err;
//         callback(null, isMatch);
//     })
// }