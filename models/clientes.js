const mongoose = require('mongoose')

let clienteSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    telephone:{type:String},
    comments:{type:String}
})

module.exports = mongoose.model('Cliente', clienteSchema)