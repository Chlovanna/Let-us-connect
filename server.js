const express = require('express');
// const mongoose = require('mongoose');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network', {
//   // useFindAndModify: false,
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// mongoose.set('debug', true);

app.use(require('./routes'));

db.once('open', ()=>{
  app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));
});