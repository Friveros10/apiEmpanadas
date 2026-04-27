import express from "express";
import { config } from "dotenv";
import cors from "cors";
import sequelize from "./config/database.js";
import empanadasRoutes from "./routes/empanadas.js";
import userRoutes from "./routes/user.js";

config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cors());
app.use(express.json());

app.use("/empanadas", empanadasRoutes);
app.use("/users", userRoutes);

// Función async para conectar la base de datos
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a la base de datos exitosa");
  } catch (error) {
    console.error("❌ No se pudo conectar a la base de datos:", error);
  }

  if (process.env.NODE_ENV !== "test") {
    const PORT = 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  }
}


// Ejecutar la función
startServer();

export default app;
