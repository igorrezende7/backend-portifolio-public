var express = require('express');
var router = express.Router();
var Cliente = require('../models/clientes')
const nodemailer = require('nodemailer')

const user = "igorrezende@solucoesdevs.com"
const pass = "Vacaamarela1@"

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
  const {name, email, telephone} = req.body
  let cliente = new Cliente({name:name, email:email, telephone:telephone})
  try {
    await cliente.save()
    res.status(200).json(cliente)
  } catch (error) {
    res.status(400).json({error:'erro ao cadastrar cliente'})
  }
})

router.post('/send', async(req, res)=>{
  const {name, email, comments} = req.body;

  const transporter=nodemailer.createTransport({
    host:"smtp.umbler.com",
    port:587,
    auth:{user:user, pass:pass}
  })

  transporter.sendMail({
    to:user,
    from:user,
    replyTo:email,
    subject:`solicitação de ${name}`,
    text: comments
  })
})



module.exports = router;
