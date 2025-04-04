import multer from "multer";

const storage = multer.memoryStorage(); // або diskStorage, якщо хочеш зберігати на сервері

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // до 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Допускаються лише зображення!"), false);
    }
  },
});

export default upload;
