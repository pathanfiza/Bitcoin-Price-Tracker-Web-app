import mysql from "mysql2";
import dotenv from "dotenv";  // Import dotenv
dotenv.config(); 

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("error connecting to db: ", err);
  } else {
    console.log("connected to db");
  }
});

export default db; // Default export
