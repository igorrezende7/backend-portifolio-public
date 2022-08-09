var express = require('express');
var router = express.Router();
var Cliente = require('../models/clientes')


/* GET users listing. */
router.get('/', async(req, res)=>{
  try {
    let cliente = await Cliente.find()
    res.status(200).json(cliente)
  } catch (error) {
    res.status(400).json({error:'erro ao baixar clientes'})
  }
})

router.post('/', async(req, res)=>{
  const {name, email, telephone, comments} = req.body
  let cliente = new Cliente({name:name, email:email, telephone:telephone})
  try {
    await cliente.save()
    res.status(200).json(cliente)
  } catch (error) {
    res.status(400).json({error:'erro ao cadastrar cliente'})
  }
})



module.exports = router;
