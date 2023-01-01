const express = require('express');
const app = express();
const port = 3000;
var SHA256 = require("crypto-js/sha256");
var Base64 = require("crypto-js/enc-base64");
var bodyParser = require('body-parser');

var notify = "NO_DATA";
app.get('/', (req, res) => {
  res.send('OK')
})


app.post('/webhook', bodyParser.text(), (req, res) => {
  console.log(req.body);
  notify = req.body;
  res.status(200).send('SENT');
});

app.get('/webhook', (req, res) => {
  res.send(notify);
});

app.get('/getAppHash', (req, res) => {

    const today = new Date();
    const milliseconds = today.getMilliseconds();

    const mil = (milliseconds - (milliseconds % 300));
    console.log(mil);
    const text = mil + 58 + '123123-123-4863-23-123133'
    console.log(text);
  
    

    var hash = SHA256(text);
    var a = Base64.stringify(hash);
    console.log(a);
    console.log( encodeURIComponent(a));
res.send(hash.toString(Base64));
  })

  app.get('/log', (req, res) => {
console.log(req.query.p);
res.send(req.query.p);
  })

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`)
})