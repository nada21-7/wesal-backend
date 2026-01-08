const nameRegex = /^[\u0600-\u06FFa-zA-Z\s]{2,30}$/; 

const isValidEmail = (email) => {
  if (typeof email !== 'string') return false;
  email = email.trim().toLowerCase(); 
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i; 
  return emailRegex.test(email) &&
         !email.includes('..') &&
         !email.includes(' ') &&
         !email.includes('?') &&
         !email.includes('!') &&
         email.length <= 254; 
};

const isStrongPassword = (password) => {
  if (typeof password !== 'string') return false;
  if (password.length < 8 || password.length > 128) return false; 
  return /[A-Z]/.test(password) &&
         /[a-z]/.test(password) &&
         /\d/.test(password) &&
         /[@$!%*?&]/.test(password) &&
         !password.includes(' '); 
};

const isValidName = (name) => { 
  if (typeof name !== 'string') return false;
  name = name.trim();
  return nameRegex.test(name) && !name.startsWith(' ') && !name.endsWith(' '); 
};

const isValidFirstName = isValidName; 
const isValidLastName = isValidName; 

const isValidAge = (age) => { 
  if (typeof age !== 'number') return false;
  return Number.isInteger(age) && age >= 13 && age <= 120; 
};

const isValidGender = (gender) => { 
  if (typeof gender !== 'string') return false;
  const allowed = ['male', 'female', 'other'];
  return allowed.includes(gender.toLowerCase());
};

const isValidMessage = (message) => {
  if (typeof message !== 'string') return false;
  message = message.trim();
  return message.length >= 10 && message.length <= 2000 &&
         !/https?:\/\/[^\s]+/i.test(message); 
};

const isValidUsername = (username) => {
  if (typeof username !== 'string') return false;
  username = username.trim();
  return /^[\u0600-\u06FFa-zA-Z\s]{2,50}$/.test(username) && !username.startsWith(' ') && !username.endsWith(' '); 
};

module.exports = { 
  isValidEmail, 
  isStrongPassword, 
  isValidFirstName, 
  isValidLastName, 
  isValidAge, 
  isValidGender, 
  isValidMessage,
  isValidName, 
  isValidUsername 
};
  