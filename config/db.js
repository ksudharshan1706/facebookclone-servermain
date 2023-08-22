const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `(config\/db.js) connected to MongoDB database & host is : ${mongoose.connection.host}`
    );
  } catch (error) {
    console.log(`Error in db.js file: ${error}`);
  }
};

module.exports = connectDB;
