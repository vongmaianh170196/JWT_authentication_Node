const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to api'
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey',{expiresIn: '30s'}, (err, authData) => {
        if(err){
            res.sendStatus(403);
        }
        else{
            res.json({
                message: "Post created",
                authData
            })
        }
    })
    
})

app.post('/api/login', (req, res) => {
    //Mock user
    const user = {
        id: 1,
        username: "Anh",
        email: "anh@"
    }
    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({
            token
        })
    })
});
//FORMAT OF TOKEN
// Authorization: Bearer <token>
function verifyToken(req, res, next){
    //get auth header value
    const bearerHeader = req.headers['authorization']

    //check if bearer is undefined 
    if(typeof bearerHeader !== 'undefined'){
        //split at the space
        const bearer = bearerHeader.split(' ');
        
        const bearerToken = bearer[1];
        //Set the token
        req.token = bearerToken
        //Next middleware

        next();
    }
    else {
        res.sendStatus(403)
    }
} 

app.listen(5000, () => console.log('Server started on port 5000'));