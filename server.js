const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./services/db-client'); 
const errorHandler = require('./middleware/error-handler');
const { port } = require('./config'); 
const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');
const translateRoutes = require('./routes/translate');
const trainingRoutes = require('./routes/training');
const testingRoutes = require('./routes/testing');
const contactRoutes = require('./routes/contact');
const historyRoutes = require('./routes/history');

const app = express();


// Middleware 
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({ origin: process.env.ALLOWED_ORIGINS || '*' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/translate', translateRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/testing', testingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/history', historyRoutes);


app.use(errorHandler);


const startServer = async () => {
  // try {
  //   await connectDB(); 
  //   app.listen(port || 3000, () => { 
  //     console.log(`Server is runing on port ${port || 3000}`);
  //   });
  // }
  try {
    await connectDB(); 
    const SERVER_PORT = process.env.PORT || port || 3000; 
    
    app.listen(SERVER_PORT, () => { 
      console.log(`Server is running on port ${SERVER_PORT}`);
    });
  }
   catch (err) {
    console.error('Failed to connect with database', err);
    process.exit(1); 
  }
};

// app.get('/api/test', (req, res) => {
//   res.json({ message: 'Backend Connected Successfully!' });
// });

startServer(); 