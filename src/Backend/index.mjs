/*  Portfolio : Backend with REST API
-------------------------------------------------------------- */

// import functions 

// import mysql from 'mysql2/promise';
import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

import fs from 'fs';
// var fs = require('fs');


const app = express();
const port = 3000;



app.use(express.json()); // Wandelt JSON automatisch um, middleware
app.use(cors()); // Erlaubt CORS Requests

// Neue Message 

app.post('/newmessage', async (req, res) => {
    console.log(req.body);
    console.log("hi");
    //res.send(req.body);

    let data = req.body.join();
    console.log(data);


    console.log(req.body[0]);
    console.log(req.body[0]+'.txt');
    var content = req.body[1]+req.body[2];

    try{
        fs.writeFileSync(req.body[0]+'.txt', content);
    }catch (e){
        console.log("Cannot write file ", e);
    }
})


// Eintrag in Datenbank nach ID Loeschen
app.delete('/deletesql_todosapp', async (req, res) => {
    console.log(Object.keys(req.body).length);
    console.log(req.body);
    if(!req.body.id){
        res.status(400);
        res.send({error: "keine ID vorhanden"});
        return;
    }
    if(Object.keys(req.body).length > 3){
        const [result] = await connection.execute(
            `DELETE FROM todo_app WHERE id = ?`,
            [req.body.id]
        );
    }else{
        for(let req_entry of req.body){
            const [result] = await connection.execute(
                `DELETE FROM todo_app WHERE id = ?`,
                [req_entry.id]
            );
        }
    }
    res.status(200);
});

// Eintag in Datenbank nach ID Updaten
app.put('/updatesql_todosapp', async (req, res) => {
    if(!req.body.id){
        res.status(400);
        res.send({error: "keine ID vorhanden"});
        return;
    }
    console.log(req.body);
    const [result] = await connection.execute(
        `UPDATE todo_app SET State = ? WHERE id = ?`,
        [req.body.State, req.body.id]
    );
    res.status(200);
});

// Neuen Eintag in Datenbank speichern
app.post('/newsql_todosapp', async (req, res) => {
    if((!req.body.Entry) || (!req.body.State)){
        res.status(400);
        res.send({error: "Kein Titel/Status vorhanden"});
        return;
    }

    // Problem um den genauen Wert zu verifizieren muss ich dem eintrag die genaue Uhrzeit uebergeben, damit der Eintrag per Uhrzeit verifiziert werden kann. 
    // Oder andere moeglichkeit eine zusaetzliche spalte mit der data id aus dem Frontend. 

    console.log(Object.keys(req.body));
    console.log(Object.keys(req.body).length);

    if(Object.keys(req.body).length > 4){
        for(let req_entry of req.body){
            const [result] = await connection.execute(
                `INSERT INTO todo_app (Entry, State) VALUES (?, ?)`,
                [req_entry.Entry, req_entry.State]
            );
        }
    }else{
        const [result] = await connection.execute(
            `INSERT INTO todo_app (Entry, State) VALUES (?, ?)`,
            [req.body.Entry, req.body.State]
        );
        const [orders] = await connection.query(  
            `SELECT * FROM todo_app WHERE Entry = ? AND State = ?`,
            [req.body.Entry, req.body.State]
        );
        res.status(200);
        res.send(orders);
    }
    res.status(200);
    console.log(res.body);    
});

// Alle Eintraege aus Datenbank lesen
app.get('/getsql_todosapp', async (req, res) => {
    const [orders] = await connection.query("SELECT * FROM todo_app");
    res.status(200);
    res.send(orders);
});

app.get('/getsql_tasks', async (req, res) => {
    const [orders] = await connection.query("SELECT id, title, completed FROM task");
    console.log(orders);
    res.send(orders);
});

app.put('/put', (req, res) => {
    console.log(req.body);
    todos = req.body;
    res.send(req.body);
    console.log(todos);
});  

app.get('/todos', (req, res) => {
    res.send(todos);
});

app.get('/current-time', (req, res) => {
    var date = new Date();
    res.send(`Cureent time: ${date.getHours()}:${date.getMinutes()}`);
});

app.get('/todos_filter', (req, res) => {
    const filter = parseInt(req.query.completed);
    console.log(req.query);
    var counter  = 0;
    var todos_neu=[];
    for(let todo of todos){
        if(todo.completed == filter){
            todos_neu.unshift(todo);
        }
    } 
/* 
    if(req.ok){
        res.sendStatus(204);
      }else{
        res.sendStatus(404);
      }
*/

    res.send(todos_neu);

});

app.post('/post', (req, res) => {
    console.log(req.body.todo);
    res.send(req.body);
});

app.post('/sum', (req, res) => {
    console.log(req.body);
    res.send(`Die Summe von ${req.body.zahl1} + ${req.body.zahl2} ist ${(req.body.zahl1 + req.body.zahl2)}`);
});
   


app.listen(port, () => {
 console.log(`Example app listening at http://localhost:${port}`)
})


// Verbindung abbauen

const shutdownHandler = () => {
    console.log('closing all connections...');
    server.close(() => {
      connection.destroy();
      console.log('shutting down...');
      process.exit();
    });
   };
process.on('SIGINT', shutdownHandler);
process.on('SIGTERM', shutdownHandler);
   



/* 

Node - Email Function : Problem Email Authentification 

// var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
        user: "kaay.hertenstein@gmail.com",
        pass: "mzepohdnqgijmjhl"
    }
});

var mailOptions = {
    from: 'kaay.hertenstein@gmail.com',
    to: 'kaay.hertenstein@gmail.com',
    subject: req.body,
    text: 'That was easy!'
  };

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });  


transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});  

var transporter = nodemailer.createTransport({
    host: 'mail.gmx.com',
    port: 587,
    tls: {
        ciphers:'SSLv3',
        rejectUnauthorized: false
    },
    debug:true,
        auth: {
        user: 'kay.hertenstein@gmx.ch',
        pass: 'GoldenLightPrayerBaldur?'
    }
  });
  
  var mailOptions = {
    from: 'kay.hertenstein@gmx.ch',
    to: 'kay.hertenstein@gmx.ch',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

 transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });



// var nodemailer = require('nodemailer');
*/