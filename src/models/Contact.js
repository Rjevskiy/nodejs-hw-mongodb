import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      match: [/^\+?[1-9]\d{1,14}$/, 'Please provide a valid phone number'], // Регулярное выражение для проверки телефона
    },
    email: {
      type: String,
      required: false,
      match: [/.+@.+\..+/, 'Please provide a valid email address'], // Простая проверка email
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      validate: {
        validator: mongoose.Types.ObjectId.isValid, // Проверка, что userId - это действительный ObjectId
        message: 'Invalid User ID',
      },
    },
    photo: {  
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;  // Удаление __v из результата
        return ret;
      },
    },
  }
);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
