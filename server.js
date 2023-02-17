const app = require('./app')
const connectDb = require("./config/db");
const dotenv = require('dotenv')
dotenv.config({ path: "./.env" });
const mongoUrl = process.env.MONGO_URL;

// database
connectDb(mongoUrl);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
