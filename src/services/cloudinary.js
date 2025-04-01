import cloudinary from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Конфигурация Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Конфигурация Multer для Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'contacts', // Папка для сохранения файлов
    allowed_formats: ['jpg', 'jpeg', 'png'], // Допустимые форматы файлов
  },
});

const upload = multer({ storage: storage });

export { upload, cloudinary };
