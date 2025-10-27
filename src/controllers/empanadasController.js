import Empanada from "../models/Empanada.js";

export const getAllEmpanadas = async (req, res) => {
  try {
    const empanadas = await Empanada.findAll();
    res.json(empanadas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEmpanadaById = async (req, res) => {
  try {
    const { id } = req.params;
    const empanada = await Empanada.findByPk(id);
    if (!empanada)
      return res.status(404).json({ message: "Empanada no encontrada" });
    res.json(empanada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createEmpanada = async (req, res) => {
  try {
    const { name, type, filling, price } = req.body;
    const nuevaEmpanada = await Empanada.create({ name, type, filling, price });
    res.status(201).json(nuevaEmpanada);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

export const updateEmpanada = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, filling, price, is_sold_out } = req.body;

    const empanada = await Empanada.findByPk(id);
    if (!empanada)
      return res.status(404).json({ message: "Empanada no encontrada" });

    await empanada.update({ name, type, filling, price, is_sold_out });
    res.json(empanada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEmpanada = async (req, res) => {
  try {
    const { id } = req.params;
    const empanada = await Empanada.findByPk(id);
    if (!empanada)
      return res.status(404).json({ message: "Empanada no encontrada" });

    await empanada.destroy();
    res.json({ message: "Empanada eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
