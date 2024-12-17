import express from "express";
import pool from "./db.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Сервер работает!");
});

router.get("/users", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT name FROM users");
    res.json(rows);
  } catch (error) {
    res.status(500).send("Ошибка при запросе пользователей.");
  }
});

router.post("/users", async (req, res) => {
  try {
    const {name} = req.body
    if (!name) {
      return res.status(400).send("Имя пользователя обязательно.");
    }
    console.log(name)
    const { rows } = await pool.query(`INSERT INTO users (name) VALUES ($1) RETURNING *`, [name]);
    if (rows.length > 0) {
      res.status(201).json(rows[0]); 
    } else {
      res.status(500).send("Ошибка при создании пользователя.");
    }
  } catch (error) {
    res.status(500).send("Ошибка при запросе пользователей." + error);
  }
});

export default router;
