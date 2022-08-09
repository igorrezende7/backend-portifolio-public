const AdminBro = require('admin-bro');
const AdminBroExpressjs = require('admin-bro-expressjs')

const Cliente = require('../models/clientes')
AdminBro.registerAdapter(require('admin-bro-mongoose'))

const adminbro = new AdminBro({
    resources:[
        {resource: Cliente, options:{properties:{
            _id:{isVisible:{list:false, filter:false, show:false, edit:false}},
            comments:{isVisible:{list:false, filter:false, show:false, edit:false}}
        }}},
    ]
})

const router = AdminBroExpressjs.buildRouter(adminbro)
module.exports = router