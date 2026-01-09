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
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use(cors({ origin: process.env.ALLOWED_ORIGINS || '*' }));
app.use(cors({ origin: '*' }));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/translate', translateRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/testing', testingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/history', historyRoutes);

// Test Route للتأكد أن السيرفر يعمل أونلاين
app.get('/', (req, res) => {
  res.json({ message: 'Wesal Backend is running successfully!' });
});

app.use(errorHandler);

// الاتصال بقاعدة البيانات
connectDB()
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Database connection error:', err));

// هذا السطر هو الأهم لعمل المشروع على Vercel
module.exports = app;

// تشغيل السيرفر في حالة البيئة المحلية (Local)
if (process.env.NODE_ENV !== 'production') {
    const SERVER_PORT = process.env.PORT || port || 3000;
    app.listen(SERVER_PORT, () => {
        console.log(`Server is running locally on port ${SERVER_PORT}`);
    });
}
