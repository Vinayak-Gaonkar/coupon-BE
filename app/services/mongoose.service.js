const mongoose = require('mongoose');
let count = 0;

const options = {
  autoIndex: false,
  // reconnectTries: 30,
  // reconnectInterval: 500,
  poolSize: 10,
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const connectWithRetry = () => {
  console.log('moongoDB connection with retry')
  mongoose.connect("mongodb://localhost:27017/couponDB", options).then(() => {
    console.log("MongoDB connected");
  }).catch(err => {
    console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
    setTimeout(connectWithRetry, 50000);
  });
};

connectWithRetry();

exports.mongoose = mongoose
