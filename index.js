import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';

const app = express();
dotenv.config();

//Sigle file upload
const upload = multer({ dest: 'uploads/' });
//middleware key name is file
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ status: 'Success' });
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
