import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { router } from './routes/routes.js';

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/public', express.static('public'));

app.use('/', router);

async function init() {
  try {
    await mongoose.connect('mongodb+srv://maxdashkevich:Ya4XQa8M%23L4.56X@cluster0.txjva.mongodb.net/users?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useFindAndModify: false
    });
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

init();