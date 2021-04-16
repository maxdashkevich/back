import multer from 'multer';
import {v4 as uuidv4} from 'uuid';

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/avatar/');
    },
    filename: (req, file, cb) => {
        const arr = file.originalname.split('.');
        cb(null, uuidv4() + '.' + arr[arr.length - 1]);
    }
});

export const upload = multer({storage: storageConfig}).single('avatar');