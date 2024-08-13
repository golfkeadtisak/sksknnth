const express = require('express');
const { Client } = require('@line/bot-sdk');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// LINE SDK configuration
const client = new Client({
  channelAccessToken: 'Z32iQfhktiU6KHzsAXNgHTvnkC4lJb06QtD/9wIafCJT0UYUQbWJwgbbRyFqCBpKYPYxHK+J7I4mcjnaFDkS1CYU2hPnEdavFR87UoqoaL46vcHMcYF/LFlrT2oDmu1WqD1xz1TGNvLo4QT3LxFKxwdB04t89/1O/w1cDnyilFU=',
  channelSecret: '2e8f74c9c5e398c33a25472f10ab1354'
});

// Middleware
app.use(bodyParser.json());

// Webhook endpoint
app.post('/webhook', async (req, res) => {
  const events = req.body.events;

  try {
    await Promise.all(events.map(handleEvent));
    res.status(200).end();
  } catch (error) {
    console.error('Error handling event:', error);
    res.status(500).end();
  }
});

// Event handler
async function handleEvent(event) {
  if (event.type === 'message' && event.message.type === 'text') {
    await client.replyMessage(event.replyToken, {
      type: 'text',
      text: 'Hello from Render!'
    });
  }
}

// Default route
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
