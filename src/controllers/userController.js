import bcrypt from "bcrypt";
import { User, UserProfile, sequelize } from "../models/index.js";
import jwt from "jsonwebtoken";

// 🔹 Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: UserProfile,
        as: "profile",
      },
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener usuarios",
      error: error.message,
    });
  }
};

// 🔹 Obtener usuario por ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: {
        model: UserProfile,
        as: "profile",
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener usuario",
      error: error.message,
    });
  }
};

// 🔹 Crear usuario
export const createUser = async (req, res) => {
  const t = await sequelize.transaction();
  const tipo = "SuperAdmin";
  const profile = {
    rut: "12345678-9",
    genero: "Masculino",
    fechaNacimiento: "1990-01-01",
    telefono: "123456789",
  };

  try {
    const { nombres, apellidos, email, password } = req.body;


    if (!nombres || !apellidos || !email || !password || !tipo) {
      await t.rollback();
      return res.status(400).json({
        message: "Faltan campos obligatorios",
      });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      await t.rollback();
      return res.status(400).json({
        message: "El email ya está registrado",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create(
      {
        nombres,
        apellidos,
        email,
        password: hashedPassword,
        tipo,
      },
      { transaction: t }
    );

    if (profile) {
      await UserProfile.create(
        {
          userId: newUser.id,
          rut: profile.rut,
          genero: profile.genero,
          fechaNacimiento: profile.fechaNacimiento,
          telefono: profile.telefono,
        },
        { transaction: t }
      );
    }

    await t.commit();

    return res.status(201).json({
      message: "Usuario creado correctamente",
      user: {
        id: newUser.id,
        nombres: newUser.nombres,
        apellidos: newUser.apellidos,
        email: newUser.email,
        tipo: newUser.tipo,
      },
    });
  } catch (error) {
    await t.rollback();

    console.error("💥 ERROR:", error);

    return res.status(500).json({
      message: "Error al crear usuario",
      error: error.message,
    });
  }
};

// 🔹 Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await user.update(req.body);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar usuario",
      error: error.message,
    });
  }
};

// 🔹 Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await user.destroy();

    return res.status(200).json({
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar usuario",
      error: error.message,
    });
  }
};

// // 🔹 Iniciar sesión (Sign In)
// export const signIn = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "Faltan campos obligatorios" });
//     }

//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       return res.status(404).json({ message: "Usuario no encontrado" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Credenciales inválidas" });
//     }

//     const token = jwt.sign(
//       { id: user.id, email: user.email, tipo: user.tipo },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     return res.status(200).json({
//       message: "Inicio de sesión exitoso",
//       token,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Error al iniciar sesión",
//       error: error.message,
//     });
//   }
// };

// // 🔹 Cerrar sesión (Sign Out)
// export const signOut = async (req, res) => {
//   try {
//     // Invalidate token on the client side (e.g., remove it from storage)
//     return res.status(200).json({
//       message: "Cierre de sesión exitoso",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Error al cerrar sesión",
//       error: error.message,
//     });
//   }
// };

// // Middleware para autenticar usuarios
// export const authenticate = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Token no proporcionado" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Token inválido o expirado" });
//   }
// };
