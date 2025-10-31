import db from "../config/db.js";
import bcrypt from "bcrypt";

export const signup = (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: err });
    db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hash],
      (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json({ message: "User registered successfully" });
      }
    );
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(401).json({ message: "User not found" });

    bcrypt.compare(password, result[0].password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: err });
      if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
      res.status(200).json({ message: "Login successful" });
    });
  });
};
