import express from 'express';
import dotenv from 'dotenv'

dotenv.config();
const app = express();

app.use(express.json());

import router from './Router/message.router.js';

app.use('/api/messages', router);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
