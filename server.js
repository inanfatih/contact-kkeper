//import react from 'react' seklindeki import, ES2015'den geliyor. Bu sekilde import edebilmek icin babel ya da typescript kullanmak gerekiyor.
const express = require('express'); //bu sekilde import etmeye common.js deniyor.
const connectDB = require('./config/db');
const path = require('path');
const app = express();

//Connect Database
connectDB();

//init middleware
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => {
//   res.status(201);
//   res.json({ msg: 'Welcome to the ContactKeeper API... ' });
//   //   res.send('<h1>aaaaaaa </h1>'); ===> html tag ile de gonderebilirsin, direkt duz text de.
//   //   res.status(201);               ===> Bir request te send'ten sonra status'u belirleyemezsin. Send'in en sonda olmasi gerekiyor
//   //   res.send('<h1>sds </h1>');     ===> Bir request'te sadece 1 tane send olabiliyor
// });

//Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

//Serve static assests in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')),
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on ${PORT}`));
