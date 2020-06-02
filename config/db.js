const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.log(err.message);
    process.exit(1);
  }
};

//Yukaridaki kodu asagidaki sekilde de async await'siz yazabilirsin
// const connectDB = () => {
//   mongoose
//     .connect(db, {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//     })
//     .then(() => console.log('MongoDB connected'))
//     .catch((err) => {
//       console.log(err.message);
//       process.exit(1);
//     });
// };

module.exports = connectDB;
