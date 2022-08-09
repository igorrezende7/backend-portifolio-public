const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/portifolio',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log('conectado ao banco de dados'))
.catch((e) => console.log('erro ao conectar o banco de dados'))
