const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
var localStorage = require('localStorage');
var firebase = require('firebase');

// const urlencodeParser = bodyParser.urlencoded({extended:false})
 const jsonParser = bodyParser.json();
////////////////MYSql config//////////////////////////////////
var connect = mysql.createConnection({
    host: 'lancedb.cjgoraxv1j8k.us-west-1.rds.amazonaws.com',
    user: 'lanceypants',
    password: 'panceylants',
    port:'3303',
    database: 'minisafeway'
});
connect.connect(function(err){
    if(!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log(err);
    }
});
global.db = connect;

////////////////Firebase config///////////////////////////////
const config = {
  apiKey: "AIzaSyCEK08XguV4CVa4balQ05DD-zj1L8I57QY",
  authDomain: "minisafeway-ac266.firebaseapp.com",
  databaseURL: "https://minisafeway-ac266.firebaseio.com",
  projectId: "minisafeway-ac266",
  storageBucket: "minisafeway-ac266.appspot.com",
  messagingSenderId: "1031101506009"
};

firebase.initializeApp(config);
const firebaseDB = firebase.database();

/////////////////USE//////////////////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('client/build'))


//////////GET//////////////////
app.get(`/api/allItems`, (req, res) => {
  connect.query(`SELECT * FROM items`, function(error, results) {
    if (error) {
      res.send(error);
    } else {
      if (results.length > 0) {
        res.send(results);
      } else {
        res.send({
          code: 204,
          success: "cannot find items"
        });
      }
    }
  });
 });

app.get('/api/getItems', (req,res)=>{
  let aisle = req.query.aisle;
  connect.query(`SELECT * FROM items WHERE aisle = ?`, [aisle], function (error, results,fields) {
      if(error){
        res.send(error);
      }else{
        if(results.length > 0){
          res.send(results)
        }else{
          res.send({
            "code":204,
            "success":"cannot find items"
          })
        }
      }
  })
})

app.get('/api/getOneItem',(req,res)=>{
  let item =req.query.item;
  connect.query(`SELECT * FROM items WHERE name = ?`, [item], function (error, results,fields) {
    if(error){
      res.send(error);
    }else{
      if(results.length >0){
        res.send(results)
      }else{
        res.send({
          "code":204,
          "success":"cannot find items"
        })
      }
    }
  })
})

app.get('/api/getLastOrder', (req,res)=>{
  let username = req.query.username
  firebaseDB.ref(`/orders/${username}`).limitToLast(1).once('value', (snapshot)=>{
    const order = [];
    snapshot.forEach((childSnapshot)=>{
      order.push({
        ...childSnapshot.val()
      })
    })
    console.log(order)
    res.send(order)
  
  })
})


////////POST///////////
app.post('/api/login',(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;
    connect.query(`SELECT * FROM members WHERE username = ?`, [username], function (error, results,fields) {
        if (error) {
          res.send(error)
        }else{
          if(results.length >0){  
            if(bcrypt.compareSync(password,results[0].password)){
              var SERECT = "superserect"
              var username = req.body.username;
              var token = jwt.sign(Buffer.from(username,'utf8'),SERECT);
                res.send({
                  "code":200,
                  "message":"success login",
                  "user":`${username}`,
                  "isAuth":true,
                  "token":token
                })
            }
            else{
              res.send({
                "code":204,
                "message":"Username and password does not match",
                "isAuth":false
                  });
            }
          }
          else{
            res.send({
              "code":204,
              "message":"User does not exits",
              "isAuth":false
                });
          }
        }
        });
})

app.post('/api/register', (req,res)=>{
  var password = req.body.user.password;
  if(password === req.body.user.confirmPassword && req.body.user.username !== "" && req.body.user.email !== ""){
  var user = {
      username: req.body.user.username,
      email: req.body.user.email,
      password:bcrypt.hashSync(password, salt)
  }
      var query = db.query('INSERT INTO members SET ?', user, function(err, result) {
              if(err){
                  console.log('not able to insert!')
                  res.send({
                    "code":204,
                    message:"user exist"
                  });
              }else{
              message = "Succesfully! Your account has been created.";
              console.log(message)
              res.send({
                "code":200,
                "success": message
              })}
           })
     }else{
      res.send({
        "code":204,
        "message":"password not match"
      })
  }})

app.post('/api/updateRating', (req,res)=>{
  console.log(req.body)
  var ratingChange = {
    avgstars:req.body.newAvgRates,
    nrates:req.body.ratingNumber
  }
  var name = req.body.itemName
  connect.query(`UPDATE items SET ? WHERE name = '${name}';`,ratingChange, function(err,result){
    if(err){
      console.log(err)
      res.send({err})
    }else{
      message = "successfully update";
      console.log(message);
      res.send({message})
    }
  })
})

//////////////////////////////////////////////
if(process.env.NODE_ENV === 'production'){
    const path=require('path');
    app.get('/*',(req,res)=>{
        res.sendfile(path.resolve(__dirname,'./client','build','index.html'))
    })
}

const port = process.env.PORT || 8000
app.listen(port);