import dotenv from 'dotenv';
import { WebClient } from '@slack/web-api';

dotenv.config();

const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

// console.log(process.env.SLACK_BOT_TOKEN);

export default slackClient;
