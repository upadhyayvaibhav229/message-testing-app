import express, { Router } from 'express';
import { deleteMessage, editMessage, getAllMessages,  sendMessage } from '../Controllers/MessageController.js';

const router = Router();

router.post('/send', sendMessage);
router.post('/schedule', sendMessage); 
// router.get('/:ts', getMessage);
router.get('/all-message', getAllMessages); // Assuming this is to get all messages
router.post('/edit', editMessage);
router.delete('/:ts', deleteMessage);


export default router;