const express = require('express')
const router = express.Router();
const passport = require('passport')

router.get('/', (req, res)=>{
    if(req.query.fail){
        res.render('login', {message:'Usúario e/ou senha inválidos'})
    }
    else{
        res.render('login', {message:null})
    }
})

router.post('/', passport.authenticate('local',{
    successRedirect:'/admin',
    failureRedirect:'/?fail=true'
}))

module.exports = router