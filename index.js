const express = require('express');
const app = express();
const port = 3000;
var SHA256 = require("crypto-js/sha256");
var Base64 = require("crypto-js/enc-base64");
var bodyParser = require('body-parser');


const mapData = new Map();
app.get('/', (req, res) => {
  res.send('<html><meta name="zalo-platform-site-verification" content="R_AZSAYD0YbAeuyzm8aLEZ-ubXxJnqD5C30" /> <head>server Response</head><body><h1> This page was render direcly from the server <p>Hello there welcome to my website</p></h1></body></html>')
})

app.get('/demo', (req, res) => {
  res.send('<html><meta name="zalo-platform-site-verification" content="R_AZSAYD0YbAeuyzm8aLEZ-ubXxJnqD5C30" /> <head>DEMO</head><body><h1><a href="https://oauth.zaloapp.com/v4/permission?app_id=773839402756031775&redirect_uri=https://xuongmaytrachxa.com/callback&state=ZALO"><span>THAM GIA NGAY</span></a> </h1></body></html>');
})

app.get('/callback', (req, res) => {
  let accessToken = req.query.code;
  if (accessToken) {
    res.send('Token nè:' + accessToken);
  } else {
    res.send('<html><meta name="zalo-platform-site-verification" content="R_AZSAYD0YbAeuyzm8aLEZ-ubXxJnqD5C30" /> <head>server Response</head><body><h1> This page was render direcly from the server <p>Hello there welcome to my website</p></h1></body></html>');
  }
})

app.get('/zalo_verifierR_AZSAYD0YbAeuyzm8aLEZ-ubXxJnqD5C30.html', (req, res) => {
  res.send('There Is No Limit To What You Can Accomplish Using Zalo!')
})

app.get('/zalo_verifierEV_Y2ypQLoSggEnztRLZVpcsk53LnsqBC38.html', (req, res) => {
  res.send('There Is No Limit To What You Can Accomplish Using Zalo!')
})




app.post('/:money/:account/webhook', bodyParser.text(), (req, res) => {
  
  let notify = (req.body + "_" + Date.now()).toUpperCase();
  let typeMoney = req.params.money.toLowerCase();
  let account = req.params.account.toLowerCase();
  var d = new Date(); 
  console.log(d.toLocaleString() + " :" + typeMoney + " " + req.body);
  mapData.set(account+typeMoney, notify);
  res.status(200).send('SENT');
});

app.get('/:money/:account/webhook', (req, res) => {
  let typeMoney = req.params.money.toLowerCase();
  let account = req.params.account.toLowerCase();
  let notify = mapData.get(typeMoney+account);
  if (notify) {
    res.send(notify);
  } else {
    res.send("NO_DATA");
  }
  
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
