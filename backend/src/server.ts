import express from 'express';
import db from './database/models';
import UserRoute from './Routes/UserRoute';
import AccountRouter from './Routes/AccountRouter';
import TransactionsRouter from './Routes/TransactionsRouter';


const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use('/users', UserRoute);
app.use('/account', AccountRouter);
app.use('/transaction', TransactionsRouter);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`app is runing port ${PORT}`))
})