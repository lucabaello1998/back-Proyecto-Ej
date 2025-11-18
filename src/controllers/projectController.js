import pool from '../config/database.js';

// Crear un nuevo proyecto
export const createProject = async (req, res) => {
  try {
    const { titulo, descripcion, imagenes, stack, tags, creador } = req.body;

    if (!titulo) {
      return res.status(400).json({ error: 'El título es requerido' });
    }

    const result = await pool.query(
      `INSERT INTO proyectos (titulo, descripcion, imagenes, stack, tags, creador) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [titulo, descripcion, imagenes || [], stack || [], tags || [], creador || null]
    );

    res.status(201).json({
      message: 'Proyecto creado exitosamente',
      proyecto: result.rows[0]
    });
  } catch (error) {
    console.error('Error al crear proyecto:', error);
    res.status(500).json({ error: 'Error al crear proyecto' });
  }
};

// Obtener todos los proyectos
export const getAllProjects = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const result = await pool.query(
      `SELECT * FROM proyectos 
       ORDER BY created_at DESC 
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const countResult = await pool.query('SELECT COUNT(*) FROM proyectos');
    const total = parseInt(countResult.rows[0].count);

    res.json({
      proyectos: result.rows,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    res.status(500).json({ error: 'Error al obtener proyectos' });
  }
};

// Obtener un proyecto por ID
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM proyectos WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    res.json({ proyecto: result.rows[0] });
  } catch (error) {
    console.error('Error al obtener proyecto:', error);
    res.status(500).json({ error: 'Error al obtener proyecto' });
  }
};

// Actualizar un proyecto
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, imagenes, stack, tags, creador } = req.body;

    // Verificar que el proyecto existe
    const checkResult = await pool.query(
      'SELECT * FROM proyectos WHERE id = $1',
      [id]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    const result = await pool.query(
      `UPDATE proyectos 
       SET titulo = COALESCE($1, titulo),
           descripcion = COALESCE($2, descripcion),
           imagenes = COALESCE($3, imagenes),
           stack = COALESCE($4, stack),
           tags = COALESCE($5, tags),
           creador = COALESCE($6, creador),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING *`,
      [titulo, descripcion, imagenes, stack, tags, creador, id]
    );

    res.json({
      message: 'Proyecto actualizado exitosamente',
      proyecto: result.rows[0]
    });
  } catch (error) {
    console.error('Error al actualizar proyecto:', error);
    res.status(500).json({ error: 'Error al actualizar proyecto' });
  }
};

// Eliminar un proyecto
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM proyectos WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    res.json({ message: 'Proyecto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar proyecto:', error);
    res.status(500).json({ error: 'Error al eliminar proyecto' });
  }
};
