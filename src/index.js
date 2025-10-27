import express from "express";
import { config } from "dotenv";
import cors from "cors";
import sequelize from "./config/database.js";
import empanadasRoutes from "./routes/empanadas.js";

config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:8080",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, super World!");
});

app.use("/empanadas", empanadasRoutes);

// Función async para conectar la base de datos
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a la base de datos exitosa");
  } catch (error) {
    console.error("❌ No se pudo conectar a la base de datos:", error);
  }

  if (process.env.NODE_ENV !== "test") {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  }
}

// Ejecutar la función
startServer();

export default app;
