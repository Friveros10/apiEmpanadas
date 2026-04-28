import express from "express";
import { config } from "dotenv";
import cors from "cors";
import sequelize from "./config/database.js";
import empanadasRoutes from "./routes/empanadas.js";
import userRoutes from "./routes/user.js";
// 1. Importa el archivo de rutas de auth (asegúrate de que el nombre coincida)
import authRoutes from "./routes/authRoutes.js";
config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001", // Tu frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Nota: Eliminé la segunda línea de app.use(cors()) porque la de arriba ya lo cubre.
app.use(express.json());

// 2. Registra la ruta de autenticación
app.use("/api/auth", authRoutes); 

app.use("/empanadas", empanadasRoutes);
app.use("/users", userRoutes);

// Función async para conectar la base de datos
async function startServer() {
  try {
    await sequelize.authenticate();
    // Si quieres que las tablas se creen/actualicen automáticamente:
    // await sequelize.sync({ force: false }); 
    console.log("✅ Conexión a la base de datos exitosa");
  } catch (error) {
    console.error("❌ No se pudo conectar a la base de datos:", error);
  }

  if (process.env.NODE_ENV !== "test") {
    const PORT = 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  }
}

startServer();

export default app;