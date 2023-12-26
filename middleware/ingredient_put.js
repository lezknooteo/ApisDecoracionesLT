const validation = async (req, res, next) => {
  const { name, description, stateId } = req.body;

  // Verificar si al menos un campo está presente en la solicitud
  if (!name && !description && !stateId) {
    res.status(400).json({ error: 'Al menos un campo (nombre, descripción, estado) es requerido' });
    return;
  }

  // Si name está presente, verificar que no esté vacío
  if (name && typeof name !== 'string') {
    res.status(400).json({ error: 'Nombre debe ser una cadena de texto' });
    return;
  }

  // Si description está presente, verificar que no esté vacío
  if (description && typeof description !== 'string') {
    res.status(400).json({ error: 'Descripción debe ser una cadena de texto' });
    return;
  }

  // Si stateId está presente, verificar que no esté vacío
  if (stateId && typeof stateId !== 'number') {
    res.status(400).json({ error: 'Estado debe ser un número' });
    return;
  }

  next();
};

module.exports = validation;
