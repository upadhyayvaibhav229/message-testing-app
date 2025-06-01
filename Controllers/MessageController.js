import slackClient from "../Service/StackClent.js";

const sendMessage = async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }

    try {
        const result = await slackClient.chat.postMessage({
            channel: process.env.SLACK_CHANNEL_ID,
            text,
        })
        res.json({ message: 'Message sent', ts: result.ts });
        console.log("ts", result.ts);
        

    } catch (error) {
        res.status(500).json({ error: error.data?.error || error.message });
    }
}

const scheduleMessage = async (req, res) => {

    const { text } = req.body;
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const post_at = currentTimeInSeconds + 60; // 1 minute later
    if (!text || !post_at)
        return res
            .status(400)
            .json({ error: 'Text and post_at timestamp are required' });

    try {
        const result = await slackClient.chat.scheduleMessage({
            channel: process.env.SLACK_CHANNEL_ID,
            text,
            post_at,
        });
        res.json({ message: 'Message scheduled', scheduled_message_id: result.scheduled_message_id });

    } catch (error) {
        res.status(500).json({ error: error.data?.error || error.message });

    }

}


const getAllMessages = async (req, res) => {
  try {
    const result = await slackClient.conversations.history({
      channel: process.env.SLACK_CHANNEL_ID,
    });

    // Filter messages to include only required fields
    const cleanedMessages = result.messages.map(msg => ({
      text: msg.text,
      user: msg.user,
      ts: msg.ts,
      type: msg.type,
      edited: msg.edited, // optional: include if you care about edits
    }));

    res.json({
      messages: cleanedMessages,
      count: cleanedMessages.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.data?.error || error.message });
  }
};

const editMessage = async (req, res) => {
    const { ts, text } = req.body;
    if (!ts || !text) {
        return res.status(400).json({ error: "Timestamp and text are required" });
    }

    try {
        const result = await slackClient.chat.update({
            channel: process.env.SLACK_CHANNEL_ID,
            ts,
            text,
        });
        res.json({ message: 'Message updated', ts: result.ts });

    } catch (error) {
        res.status(500).json({ error: error.data?.error || error.message });
    }
}

const deleteMessage = async (req, res) => {
    const { ts } = req.params;
    if (!ts) {
        return res.status(400).json({ error: "Timestamp is required" });
    }
    try {
        await slackClient.chat.delete({
            channel: process.env.SLACK_CHANNEL_ID,
            ts,
        });
        res.json({ message: 'Message deleted' });

    } catch (error) {
        res.status(500).json({ error: error.data?.error || error.message });
    }
}
export {
    sendMessage,
    scheduleMessage,
    // getMessage,
    getAllMessages,
    editMessage,
    deleteMessage

}