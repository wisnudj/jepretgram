const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
var mongoose = require('mongoose');
const user = require('./routers/user');
const foto = require('./routers/foto');

mongoose.connect('mongodb://localhost/jepretgram-wisnudj', (err) => {
  err ? console.log('Can\'t connect to database') : console.log('Database connected')
});

const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/user', user)
app.use('/api/foto', foto)


app.listen(3000, () => {
  console.log('Server running on port 3000');
});
