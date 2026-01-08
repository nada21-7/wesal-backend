const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config'); 
const { registerUser, loginUser } = require('../services/db-client');
const { isValidEmail, isStrongPassword, isValidFirstName, isValidLastName, isValidAge, isValidGender } = require('../utils/validation');

const register = async (req, res, next) => {
  const { firstName, lastName, age, gender, email, password } = req.body;
  if (!firstName || !lastName || !age || !gender || !email || !password) {
    const error = new Error('All fields are required');
    error.statusCode = 400;
    return next(error);
  }
  if (!isValidFirstName(firstName)) {
    const error = new Error('First name must contain only letters and spaces, and be between 2 and 30 characters.');
    error.statusCode = 400;
    return next(error);
  }
  if (!isValidLastName(lastName)) {
    const error = new Error('Last name must contain only letters and spaces, and be between 2 and 30 characters.');
    error.statusCode = 400;
    return next(error);
  }
  if (!isValidAge(age)) {
    const error = new Error('Age must be between 13 and 120.');
    error.statusCode = 400;
    return next(error);
  }
  if (!isValidGender(gender)) {
    const error = new Error('Gender must be male, female, or other.');
    error.statusCode = 400;
    return next(error);
  }
  if (!isValidEmail(email) || !isStrongPassword(password)) {
    const error = new Error('Invalid email or weak password');
    error.statusCode = 400;
    return next(error);
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await registerUser({ firstName, lastName, age, gender, email, hashedPassword });
    const token = jwt.sign(
      { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email },
      jwtSecret,
      { expiresIn: '1h' }
    );
    res.status(201).json({
      message: 'Registered successfully',
      token,
      user: { firstName: user.firstName, lastName: user.lastName, email: user.email }
    });
    console.log(`User registered: ${email}`);
  } catch (error) {
    if (error.code === 11000) {
      error.statusCode = 409;
      error.message = 'Email is already registered.';
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = new Error('Email and password required');
    error.statusCode = 400;
    return next(error);
  }
  try {
    const user = await loginUser({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      return next(error);
    }
    const token = jwt.sign(
      { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email },
      jwtSecret,  
      { expiresIn: '1h' }
    );
    res.json({
      message: 'Login successful',
      token,
      user: { firstName: user.firstName, lastName: user.lastName, email: user.email }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };


