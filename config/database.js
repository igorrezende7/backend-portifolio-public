const mongoose = require('mongoose')
require('dotenv').config()
const mongo_url = process.env.MONGO_URL
mongoose.Promise = global.Promise

mongoose.connect(mongo_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log('conectado ao banco de dados'))
.catch((e) => console.log('erro ao conectar o banco de dados'))
