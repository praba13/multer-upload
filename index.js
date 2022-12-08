import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const app = express();
dotenv.config();

uuidv4();

//Sigle file upload
//const upload = multer({ dest: 'uploads/' });

//app.post('/upload', upload.single('file'), (req, res) => {
//  res.json({ status: 'Success' });
//});

//Multiple file upload
//const upload = multer({ dest: 'uploads/' });

//app.post('/upload', upload.array('file'), (req, res) => {
//  res.json({ status: 'Success' });
//});

//app.post('/upload', upload.array('file', 2), (req, res) => {
//  res.json({ status: 'Success' });
//});

//Multiple fields upload
//const upload = multer({ dest: 'uploads/' });

/*
const multiUpload = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]);

app.post('/upload', multiUpload, (req, res) => {
  console.log(req.files);
  res.json({ status: 'Success' });
});
*/

//Custom file name

/*
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, `${uuidv4()}-${originalname}`);
  }
});

const upload = multer({ storage });

app.post('/upload', upload.array('file'), (req, res) => {
  res.json({ status: 'Success' });
});

*/

//Filter uploads File
// ["image", "jpeg"]

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, `${uuidv4()}-${originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[0] === 'image') {
    cb(null, true);
  } else {
    cb(new Error('File is not of the correct type'), false);
  }
};

const upload = multer({ storage, fileFilter });

app.post('/upload', upload.array('file'), (req, res) => {
  res.json({ status: 'Success' });
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
