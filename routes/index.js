let express = require('express')
let router = express.Router()
let User = require('../models/user')
let Post = require('../models/post')
let jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
    console.log('someone made a get call to /')
    res.send('welcome to backend app')
})

router.post('/register', (req,res) => {
    let user = new User({
        username: req.body.username,
        password: User.hashPassword(req.body.password),
        role: req.body.role
    })
    let promise = user.save()

    promise.then((doc) => {
        return res.status(201).json(doc)
    })

    promise.catch((err) => {
        return res.status(501).json({message: 'Error registering user.'})
    })
})

router.post('/login', function(req,res){
    let promise = User.findOne({username:req.body.username}).exec();
    promise.then(function(doc){
        if(doc) {
            console.log('DOC: ' + doc)
            if(doc.isValid(doc.password, req.body.password)){
                // generate token
                let token = jwt.sign({username:doc.username},'secret', {expiresIn : '3h'})
                console.log('Returned Token')
                return res.status(200).json(token);
 
            } else {
                console.log('Invalid Credentials')
                return res.status(501).json({message:' Invalid Credentials'})
            }
        }
        else {
            console.log('Username not registered.')
            return res.status(501).json({message:'Username is not registered.'})
        }
    })
    .catch(function(err){
        console.log(err)
      return res.status(404).json({message:'Some internal error'})
    })
 })


router.post('/add-post', function(req,res){
    console.log(req.body);
    
    let newPost = new Post({
        title: req.body.title,
        desc: req.body.desc,
        likes: 0,
        username: req.body.username
    })
    let promise = newPost.save()

    promise.then((doc) => {
        return res.status(201).json(doc)
    })
    promise.catch((err) => {
        return res.status(501).json({message: 'Error adding post.'})
    })

 })

router.get('/username', verifyToken, (req,res,next) => {
    return res.status(200).json(decodedToken.username)
})

router.get('/role', verifyToken, getRole, (req,res,next) => {
    return res.status(200).json(retrievedRole)
})

var retrievedRole ='';
function getRole(req,res,next) {
    let promise = User.findOne({username:decodedToken.username}).exec();
    promise.then(function(doc){
        if(doc) {
            retrievedRole=doc.role;
            next()
        }
        else {
            console.log('Username not registered.')
            return res.status(501).json({message:'Username is not registered.'})
        }
    })
    .catch(function(err){
        console.log(err)
      return res.status(404).json({message:'Some internal error'})
    })
}

var decodedToken='';
function verifyToken(req,res,next){
  let token = req.query.token;

  jwt.verify(token,'secret', function(err, tokendata){
    if(err){
        return res.status(400).json({message:' Unauthorized request'});
    }
    if(tokendata){
        decodedToken = tokendata;
        next();
    }
  })
}

router.get('/allPosts', async (req, res) => {
    console.log('someone made a get call to /allPosts')
    const allPosts = await Post.find({})
    res.json(allPosts)
})

router.get('/userPosts', verifyToken, async (req, res) => {
    console.log('someone made a get call to /userPost')
    const userPosts = await Post.find({username:decodedToken.username})
    res.json(userPosts)
})

// router.post('/likePost', (req,res) => {
//     console.log('someone made a get call to /allPosts')
// })

router.post('/delete-post', async(req, res) => {
    console.log("DELETE")
    console.log(req.body.id)
    await Post.deleteOne({_id: req.body.id})
    .catch(err=>console.log(err))
})

module.exports = router