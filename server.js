import express from 'express';
import connectDB from './config/db.js';

// Connect to Database
connectDB();

// Import Routers
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import contactsRouter from './routes/contacts.js';

// Initialize a express app.
const app = express();

// Init Middleware for reading/accepting request body data.
app.use(express.json({ extended: false }));

// Mount Routes
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));