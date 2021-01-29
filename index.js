
const session = require('express-session');
const bodyParser = require('body-parser'); 
const express = require('express');
const app = express(); 
let conn = require('./mysql.js'); 



app.set('view engine', 'ejs'); 
app.use(express.static('public')); 
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json()); 
app.use(
  session({            
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);


app.get('/', (req, res) => {   
  res.render('login.ejs');
});

app.get('/home', (req, res) => {  
  res.render('homepage.ejs');
});

app.get('/register', (req, res) => {  
  res.render('register.ejs');
});

app.post('/auth_login', (req, res) => {
  let email = req.body.email,           
    password = req.body.password;

  if (email && password) {
    conn.query(
      'SELECT * FROM user WHERE email = ? AND password = ?', 
      [email, password],  
      (err, results) => {  
        if (err) throw err;
        if (results.length > 0) {
          req.session.loggedin = true;   
          req.session.loggedout = false;  
          req.session.email = email;    
          res.redirect('/home');   
        } else {
          res.redirect('/');   
        }
        res.end();
      }
    );
  }
});

app.post('/auth_register', (req, res) => { 
  let register_data = {  
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };
  conn.query('INSERT INTO user SET ?', register_data, (err, results) => { 
    if (err) throw err;
    else {
     // console.log('inserted!', results);  
      res.redirect('/'); 
    }
  });
});

app.get('*', (req, res) => {
  res.send('404 - Page not found'); 
});

//# middleware port
app.listen(9090, () => {
  console.log('Server Connected ...'); 
});
