import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: "No autorizado, falta token" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "tu_clave_secreta"
    );
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token no válido" });
  }
};
