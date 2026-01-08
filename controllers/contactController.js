const { saveContact } = require('../services/db-client');
const { isValidEmail, isValidMessage, isValidName } = require('../utils/validation'); 

const sendContactMessage = async (req, res, next) => {
  const { name, email, message } = req.body;
  const userId = req.user?.id || null; 

  
  if (!name || !email || !message) {
    const error = new Error('All fields are required');
    error.statusCode = 400;
    return next(error);
  }

  if (!isValidName(name)) { 
    const error = new Error('Invalid name');
    error.statusCode = 400;
    return next(error);
  }

  if (!isValidEmail(email)) {
    const error = new Error('Please enter a valid email address');
    error.statusCode = 400;
    return next(error);
  }

  if (!isValidMessage(message)) {
    const error = new Error('Message must be between 10 and 2000 characters and no links');
    error.statusCode = 400;
    return next(error);
  }

  try {
    await saveContact({ name, email, message, userId }); 
    res.json({ message: 'Message sent successfully' });
    console.log(`Contact message saved for email: ${email}`); 
  } catch (error) {
    next(error);
  }
};

module.exports = { sendContactMessage };

