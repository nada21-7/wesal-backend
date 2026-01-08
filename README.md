Wesal App Backend 
Full Documentation & Development Summary

Project Name: Wesal App Backend  
Purpose: Complete backend for a sign language translation application with user management, psychological testing, AI integration, and full data persistence.

This document serves as a comprehensive, self-contained summary of the entire backend development process from start to finish. It is written to be directly used in our graduation project report, presentation slides, defense discussion, or any official documentation.

1. Project Overview
Wesal App is a platform that helps users translate sign language videos, train AI models, take psychological tests, manage content, and contact support.  
The backend is built with Node.js + Express.js, MongoDB (via Mongoose), JWT authentication, file uploads (Multer), and external AI service integration (or mock mode).

Main Goals Achieved:
- Secure user registration/login with JWT tokens
- Full CRUD for content and contact messages
- Psychological testing system with result saving
- AI-powered sign language translation and model training
- Persistent storage of all AI results and test outcomes
- User activity history endpoints
- Complete input validation, rate limiting, error handling, and security

2. Technologies & Stack
- Runtime: Node.js (v18+)
- Framework: Express.js
- Database: MongoDB + Mongoose
- Authentication: JWT + bcrypt (password hashing)
- File Uploads: Multer (videos, data files)
- Validation: express-validator + custom regex functions
- AI Integration: Axios (HTTP calls to external AI service) + mock fallback
- Rate Limiting: express-rate-limit
- Environment: dotenv
- CORS: cors middleware
- Development Tools: Postman, MongoDB Compass, VS Code

3. Project Structure (Main Files & Folders)

Backend/
├── config.js               : Environment variables & settings
├── server.js               : Main server entry point (connects DB, sets up routes)
├── ai-client.js            : AI service calls (real + mock mode)
├── services/
│   ├── db-client.js        : All Mongoose schemas + CRUD functions
│   ├── media-storage.js    : Multer upload configuration        
├── utils/
│   └── validation.js       : Custom validation functions (email, password, name, etc.)
├── middleware/
│   ├── auth.js             : JWT verification middleware
│   └── error-handler.js    : Global error handler
├── controllers/
│   ├── authController.js
│   ├── contactController.js
│   ├── contentController.js
│   ├── testingController.js
│   ├── translateController.js
│   └── trainingController.js
├── routes/
│   ├── auth.js
│   ├── contact.js
│   ├── content.js
│   ├── testing.js
│   ├── translate.js
│   ├── training.js
│   └── history.js          : User activity history (new)
└── .env                    : Secrets & configuration


4. Development Journey – What I Did Step by Step (From A to Z)

1. Initial Setup
   - Created Express server in `server.js`
   - Connected MongoDB using Mongoose in `db-client.js`
   - Defined basic schemas: User, Contact, Test
   - Added connection function `connectDB()`

2. User Authentication
   - Implemented register & login with bcrypt hashing
   - Generated JWT tokens with 1-hour expiration
   - Created `authMiddleware.js` for protected routes
   - Fixed hardcoded JWT secret : used `jwtSecret` from config

3. Input Validation & Security
   - Built custom validation utils (email, strong password, Arabic/English names, age, gender, message)
   - Added express-validator in all routes
   - Implemented rate limiting on login & contact

4. Content & Contact Management
   - Full CRUD for content items (title + description)
   - Contact message saving with validation

5. Psychological Testing
   - Get available tests from DB
   - Submit answers : calculate score : save results in new TestResult collection (added schema + save function)

6. AI Integration (Translation & Training)
   - Created `ai-client.js` with Axios calls to external AI service
   - Implemented mock mode for development
   - Added file upload via Multer for video/data
   - Saved AI results in new collections: Translation & TrainingResult

7. User Activity History
   - Created `history.js` routes:
     - /history/tests
     - /history/translations
     - /history/trainings
   - Added pagination (page & limit)
   - All protected by auth middleware

8. Final Improvements & Testing
   - Global error handling middleware
   - CORS configuration
   - Media file cleanup after upload
   - Full manual testing with Postman & MongoDB Compass
   - Verified data persistence for users, tests, AI results

5. Key Challenges Solved
- Hardcoded JWT secret : Fixed to use secure config value
- Submit test not saving results : Added TestResult schema + save function
- AI results not saved : Added Translation & TrainingResult schemas + auto-save in controllers
- Empty tests response : Manually seeded test questions in DB
- Validation mismatch (option vs selectedOption) : Unified field names & fixed body format

6. Current Status (January 2026)
- Backend is fully functional and production-ready.
- All data is persistently stored in MongoDB.
- All operations are authenticated & validated.
- AI integration is flexible (real service or mock).
- User activity history is fully implemented and queryable.
- Ready for frontend integration and deployment.

7. Recommendations for Future Work
- Add seed script for initial test questions
- Implement refresh tokens for JWT
- Add rate limiting on AI endpoints
- Deploy on cloud (Vercel/Heroku) with MongoDB Atlas
- Add unit/integration tests (Jest)
