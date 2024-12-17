import pool from "./db.js";

(async () => {
  try {
    console.log("Выполняем миграции...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL
      )
    `);
    console.log("Миграции выполнены успешно!");
    process.exit(0);
  } catch (error) {
    console.error("Ошибка миграции:", error);
    process.exit(1);
  }
})();
