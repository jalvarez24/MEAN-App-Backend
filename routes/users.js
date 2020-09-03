let express = require('express')
let router = express.Router()
let User = require('../models/user')
let jwt = require('jsonwebtoken')

router.post('/register', (req,res,next) => {
    let user = new User({
        username: req.body.username,
        password: User.hashPassword(req.body.password)
    })
    let promise = user.save()

    promise.then((doc) => {
        return res.status(201).json(doc)
    })

    promise.catch((err) => {
        return res.status(501).json({message: 'Error registering user.'})
    })
})

module.exports = router