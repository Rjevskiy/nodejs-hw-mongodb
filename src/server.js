import express from 'express';
import contactsRouter from './routes/contacts.js';

const app = express();

app.use(express.json());
app.use('/api/contacts', contactsRouter);

const PORT = process.env.PORT || 3000;

export const initializeServer = () => {  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
