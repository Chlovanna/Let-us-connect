const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/socialdb', {
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose.connection;