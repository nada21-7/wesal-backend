const { getAllContent, createContent, getContentById, updateContentById, deleteContentById } = require('../services/db-client');

const welcomeMessage = (req, res) => {
  res.json({ message: 'Welcome to Wesal Content API. Use /items to manage content.' });
};

const listContentItems = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query; 
    const content = await getAllContent(page, limit); 
    res.json({ content, total: content.length }); 
  } catch (error) {
    next(error);
  }
};

const createContentItem = async (req, res, next) => {
  const { title, description } = req.body; 
  const userId = req.user.id; 

  if (!title || !description) { 
    const error = new Error('Title and description are required');
    error.statusCode = 400;
    return next(error);
  }

  try {
    const newItem = await createContent({ title, description, userId });
    res.status(201).json({ message: 'Content item created', item: newItem });
  } catch (error) {
    next(error);
  }
};

const getContentItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const item = await getContentById(id);
    if (!item) {
      const error = new Error('Content item not found');
      error.statusCode = 404;
      return next(error);
    }
    res.json({ item });
  } catch (error) {
    next(error);
  }
};

const updateContentItem = async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title && !description) { 
    const error = new Error('At least one field to update is required');
    error.statusCode = 400;
    return next(error);
  }

  try {
    const updatedItem = await updateContentById(id, { title, description });
    if (!updatedItem) {
      const error = new Error('Content item not found');
      error.statusCode = 404;
      return next(error);
    }
    res.json({ message: 'Content item updated', item: updatedItem });
  } catch (error) {
    next(error);
  }
};

const deleteContentItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleted = await deleteContentById(id);
    if (!deleted) {
      const error = new Error('Content item not found');
      error.statusCode = 404;
      return next(error);
    }
    res.json({ message: 'Content item deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  welcomeMessage,
  listContentItems,
  createContentItem,
  getContentItem,
  updateContentItem,
  deleteContentItem
};
