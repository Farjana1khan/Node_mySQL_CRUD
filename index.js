const express = require ('express')
const mysql = require('mysql')
const  port = 3001

//create connection

const db = mysql.createConnection(
   {
    host: 'localhost',
    user: 'root',
   
     database:'nodemysql'
   }
)


//Create connect

db.connect((err) => {
    if(err) throw err
   
        console.log("mySQL connected...");
   
       
 
  
})

const app = express()
//create databse 
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql'
    db.query(sql, (err, result)=>{
        if(err)throw err
      
            console.log(result);
            console.log("Database created...");
            res.send("Database created...")
        
        
    })
})


//Create Table

app.get('/posttable', (req, res)=>{
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id)) '
db.query(sql, (err, result)=>{
    if(err) throw err
    console.log(result);
    res.send('POSTS Table created...')
})
})

//Insert post 1

app.get('/addpost2', (req, res)=>{
    let post = { title: 'post Two', body: 'This is post number Two'}
    let sql = 'INSERT INTO posts SET ?';
     db.query(sql, post, (err, result)=>{
        if(err) throw err
        console.log(result);
        res.send('post 2 added...')
    })
})


//Select from table for fetch data

app.get('/getposts', (req, res)=>{
   
    let sql = 'SELECT * FROM posts ';
   db.query(sql, (err, results)=>{
        if(err) throw err
        console.log(results);
        res.send('posts fetched...')
    })
})



//Select  single record from table 

app.get('/getpost/:id', (req, res)=>{
   
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id} `;
   db.query(sql, (err, result)=>{
        if(err) throw err
        console.log(result);
        res.send('single posts  fetched...')
    })
})


//update post
app.get('/updatepost/:id', (req, res)=>{
   let newTitle = 'Updated title';
    let sql = `UPDATE  posts SET title = '${newTitle}' WHERE id = ${req.params.id} `;
   db.query(sql, (err, result)=>{
        if(err) throw err
        console.log(result);
        res.send(' post updated...')
    })
})


//server running
app.listen(port, ()=>{
    console.log("server running on port", port);
})