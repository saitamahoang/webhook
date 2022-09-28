const express = require('express')
const app = express()
const port = 80
var SHA256 = require("crypto-js/sha256");
var Base64 = require("crypto-js/enc-base64");

app.get('/', (req, res) => {
  res.send('OK')
})

app.get('/getAppHash', (req, res) => {

    const today = new Date();
    const milliseconds = 1664349382487;

    const mil = (milliseconds - (milliseconds % 300));
    console.log(mil);
    const text = mil + 58 + '123123-123-4863-23-123133'
    console.log(text);
  
    

    var hash = SHA256(text);
res.send(hash.toString(Base64));
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})