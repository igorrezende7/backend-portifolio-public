const {hashSync} = require('bcryptjs')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy;
require('dotenv');
const pass = process.env.PASSS
const senha = hashSync(pass, 10)
const users = [{
    _id:1,
    username:'admin',
    password:senha
}]
module.exports = function(passport){
    function findUser(username){
        return users.find(item=> item.username === username)
    }

    function findUserById(id){
        return users.find(item =>item._id === id)
    }

    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })

    passport.deserializeUser((id, done)=>{
        try {
            const user = findUserById(id)
            done(null, user)
        } catch (error) {
            console.log(err)
            done(err, null)
        }
    })

    passport.use(new LocalStrategy({
        usernameField:'username',
        passwordField:'password'
    },
    (username, password, done)=>{
        try {
            const user = findUser(username)
            if(!user) return done(null, false)

            const isValid = bcrypt.compareSync(password, user.password);
            if(!isValid) return done(null, false)
            return done(null, user)
        } catch (error) {
            console.log(err)
            done(err, false)
        }
    }
    ))
}