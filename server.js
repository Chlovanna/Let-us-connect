const express = require('express');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Let-us-connect', {
//   // useFindAndModify: false,
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// mongoose.set('debug', true);


db.once('open', ()=>{
  app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));
});