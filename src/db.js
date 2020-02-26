const mongoose = require("mongoose");

exports.connect = async host => {
  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB.");
  });

  mongoose.connection.on("error", error => {
    console.error(`Error on connection: ${error}`);
  });

  mongoose.connection.on("disconnected", () => {
    console.info("Disconnected from MongoDB.");
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log("App shutdown, connection closed.");
      process.exit(0);
    });
  });

  try {
    return await mongoose.connect(host, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  } catch (err) {
    return err;
  }
};
