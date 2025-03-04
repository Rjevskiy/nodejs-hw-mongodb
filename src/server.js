import express from 'express';
import { contactsRouter } from './routes/contacts.js';  


export const startServer = (PORT) => {
  const app = express();  

  
  app.use(express.json());  


  app.use('/contacts', contactsRouter);  

 
  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
