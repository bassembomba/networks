const express = require('express');
const app = express();
const https = require("http");
const fs = require("fs");
const path = require('path');
const alert = require('alert');
const e = require('express');
var oglist1 = fs.readFileSync("readlist.json");
var oglist1parsed = JSON.parse(oglist1);
const PORT = process.env.PORT || 3030;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs'); 

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname,'public')));








app.post('/register', (req, res) => {
  var flag = false;
  var x = [req.body.username];
  var y = [req.body.password];

  var registeredusersj = fs.readFileSync("users.json");
  var registeredusers = JSON.parse(registeredusersj);
  var usernamelist = registeredusers.username;
  var passwordlist = registeredusers.password;
  for (let i = 0; i< usernamelist.length ; i++){
    if (usernamelist[i] == x){
      console.log("existing username");
      flag = true
    }
  }
  if (flag == false){
    var updatedusers = usernamelist.concat(x);
    var updatedpasswords = passwordlist.concat(y);

    console.log(updatedusers);
    console.log(updatedpasswords);

    var newuser = {username: updatedusers, password: updatedpasswords};
    var newuserj = JSON.stringify(newuser);
    fs.writeFileSync("users.json", newuserj);
    res.render('login');
  }
  else{
    alert("username already taken");
    
  }
  




})

app.post('/', (req, res) => {
  var flag = false;
  var x = [req.body.username];
  var y = [req.body.password];
  if (x == "admin" && y == "admin"){
    res.render('home')
  }
  else{
    var registeredusersj = fs.readFileSync("users.json");
    var registeredusers = JSON.parse(registeredusersj);

    var usernamelist = registeredusers.username;
    var passwordlist = registeredusers.password;
    for (let i = 0; i< usernamelist.length ; i++){
     if (usernamelist[i] == x){
       console.log("valid username");
       flag = true;
       if (passwordlist[i] == y){
         res.render('home')
       }
        else{
          alert("incorrect password");
        }
     }
   }
   if (flag == false){
      alert("username does not exist");
   }
  }
})



app.post('/search', (req, res)=>{
  var x = [req.body.Search];
  console.log(x);
  var booksj = fs.readFileSync("books.json");
  var books = JSON.parse(booksj);
  var booklist = books.title;
  var flag = false;

  for ( let i = 0; i< booklist.length; i++){
    if (booklist[i] == x){
      flag = true;
      switch(booklist[i]){
        default:
        alert("book not found");
        res.render('home');
        case "Lord of the Flies":
        res.render('flies');
        break;
        case "The Grapes of Wrath":
        res.render('grapes');
        break;
        case "Leaves of Grass":
        res.render('leaves');
        break;
        case "The Sun and Her Flowers":
        res.render('sun');
        break;
        case "Dune":
        res.render('dune');
        break;
        case "To Kill a Mockingbird":
        res.render('mockingbird');
        break;
      }
    }
  }

})


app.post('/dune', (req, res)=>{
  
  var rlistj = fs.readFileSync("readlist.json");
  var rlist = JSON.parse(rlistj)
  var rlistarray = rlist.title;
  var list = ["Dune"];
  var updatedentry = rlistarray.concat(list);
  var entry = {title: updatedentry};
  var entryj = JSON.stringify(entry);
  fs.writeFileSync('readlist.json', entryj);
})
app.post('/flies', (req, res)=>{
  var rlistj = fs.readFileSync("readlist.json");
  var rlist = JSON.parse(rlistj)
  var rlistarray = rlist.title;
  var list = ["Lord of the Flies"];
  var updatedentry = rlistarray.concat(list);
  var entry = {title: updatedentry};
  var entryj = JSON.stringify(entry);
  fs.writeFileSync('readlist.json', entryj);
})
app.post('/grapes', (req, res)=>{
  var rlistj = fs.readFileSync("readlist.json");
  var rlist = JSON.parse(rlistj)
  var rlistarray = rlist.title;
  var list = ["The Grapes of Wrath"];
  var updatedentry = rlistarray.concat(list);
  var entry = {title: updatedentry};
  var entryj = JSON.stringify(entry);
  fs.writeFileSync('readlist.json', entryj);
})
app.post('/leaves', (req, res)=>{
  var rlistj = fs.readFileSync("readlist.json");
  var rlist = JSON.parse(rlistj)
  var rlistarray = rlist.title;
  var list = ["Leaves of Grass"];
  var updatedentry = rlistarray.concat(list);
  var entry = {title: updatedentry};
  var entryj = JSON.stringify(entry);
  fs.writeFileSync('readlist.json', entryj);
})
app.post('/sun', (req, res)=>{
  var rlistj = fs.readFileSync("readlist.json");
  var rlist = JSON.parse(rlistj)
  var rlistarray = rlist.title;
  var list = ["The Sun and Her Flowers"];
  var updatedentry = rlistarray.concat(list);
  var entry = {title: updatedentry};
  var entryj = JSON.stringify(entry);
  fs.writeFileSync('readlist.json', entryj);
})
app.post('/mockingbird', (req, res)=>{
  var rlistj = fs.readFileSync("readlist.json");
  var rlist = JSON.parse(rlistj)
  var rlistarray = rlist.title;
  var list = ["To Kill a Mockingbird"];
  var updatedentry = rlistarray.concat(list);
  var entry = {title: updatedentry};
  var entryj = JSON.stringify(entry);
  fs.writeFileSync('readlist.json', entryj);
})

app.get('/', (req,res) => {
  res.render('login');
});

app.get('/registration', (req,res) => {
  res.render('registration');
});

app.get('/home', (req,res) => {
  res.render('home');
});

app.get('/login', (req,res) => {
  res.render('login');
});

app.get('/dune', (req,res) => {
  res.render('dune');
});

app.get('/fiction', (req,res) => {
  res.render('fiction');
});

app.get('/flies', (req,res) => {
  res.render('flies');
});

app.get('/grapes', (req,res) => {
  res.render('grapes');
});

app.get('/leaves', (req,res) => {
  res.render('leaves');
});

app.get('/mockingbird', (req,res) => {
  res.render('mockingbird');
});

app.get('/novel', (req,res) => {
  res.render('novel');
});

app.get('/poetry', (req,res) => {
  res.render('poetry');
});

app.get('/readlist', (req,res) => {
  res.render('readlist', {oglist: oglist1parsed});
});

app.get('/search', (req,res) => {
  res.render('searchresults');
});

app.get('/sun', (req,res) => {
  res.render('sun');
});


app.get('/logout', (req,res) => {
  res.send('Hello World, This is logout router');
});

function jsonReader(filePath, cb) {
  fs.readFile(filePath, 'utf-8', (err, fileData) => {
    if (err){
      return cb && cb(err);
    }
    try{
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  })
}


app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
