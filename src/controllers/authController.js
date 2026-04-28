import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import UserProfile from "../models/UserProfiles.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Buscar usuario e incluir su perfil
    const user = await User.findOne({
      where: { email, eliminado: 0 },
      include: [{ model: UserProfile, as: "profile" }], // Asegúrate de tener la asociación definida
    });
    if (!user) {
        return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // 2. Validar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // 3. Generar JWT
    const token = jwt.sign(
      { id: user.id, tipo: user.tipo },
      process.env.JWT_SECRET || "tu_clave_secreta",
      { expiresIn: "24h" }
    );

    // 4. Respuesta (formateada para que tu Redux la entienda)
    res.json({
      token,
      user: {
        id: user.id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        tipo: user.tipo,
        profile: user.UserProfile,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const getMe = async (req, res) => {
  try {
    // El id viene del middleware de autenticación que haremos abajo
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
      include: [{ model: UserProfile }],
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al recuperar perfil" });
  }
};
