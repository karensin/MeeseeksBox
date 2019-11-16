'use strict';

const request = require('request');
// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json());
  app.use(express.static(__dirname + '/public')); // creates express http server

// Your verify token. Should be a random string.
const VERIFY_TOKEN = "7b43e3b3a7ed6b323151dd345e07657c"
const OAUTH_TOKEN = "EAAoAxVAJqZAQBADeC693JafAi5qZAiZCwcoiPKU8tZBnoGRMfS83pBnKzXBFRiT0c8kTZA4w50bkXVZBULHKvrjSgwIPnzjZCZBmrfecTn2GWvk1sINmPfXSwQZBS8yNDTf8hNCE2c3GZAL2aoLzZAkWPiq4XmlyP5rKE5DdZCEzaA3J1gZDZD"

const responses = [
  "I'm Mr. Meeseeks! Look at me!",
  "Yes, siree!",
  "All done!",
  "I'm Mr. Meeseeks!",
  "Ooh, okay!",
  "Ooh, I'm Mr. Meeseeks! Look at me!",
  "Oh, yeah! Yes, ma'am!",
  "Hey, there. I'm Mr. Meeseeks!",
  "Ooh, yeah! Can do!",
  "In conclusion, a friendship with Summer Smith is the most valuable and enriching experience of your young lives. I'm Mr. Meeseeks! Look at me! Thank you!",
  "She's still there, Beth.",
  "Beth, having a family doesn't mean that you stop being an individual. You know the best thing you can do for people that depend on you? Be honest with them, even if it means setting them free.",
  "Remember to square your shoulders, Jerry.",
  "That's okay. I'm Mr. Meeseeks! Look at me! Try again and keep your head down.",
  "Well, it's both. But most importantly, you got to relax.",
  "I'm sorry, Jerry, but it doesn't work like that. I'm Mr. Meeseeks. I have to fulfill my purpose so I can go away. Look at me.",
  "No, Jerry, I'm the one who SUCKS! Let me try something.",
  "I'm Mr. Meeseeks! Look at me!",
  "Hi, Mr. Meeseeks! I'm Mr. Meeseeks! Look at me.",
  "Hi!",
  "Can you help me get two strokes off of Jerry's golf swing?",
  "Can do! I'm Mr. Meeseeks! Is he keeping his shoulders squared?",
  "Ooh, he's trying!",
  "I'm Mr. Meeseeks. Look at me. The only thing that's clear is that choking up is the one true solution.",
  "Look at me. I'm Mr. Meeseeks. I've been trying to help Jerry for two days, an eternity in Meeseeks time, and nothing's worked. I fear the worst.",
  "Your failures are your own, old man. I'm Mr. Meeseeks! Look at me. I say follow-through! Who's with me?! Follow-through!",
  "Excuse me. I'm a bit of a stickler Meeseeks. What about your short game?"
];

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {  
 
    let body = req.body;
    console.log('wtf');
  
    // Checks this is an event from a page subscription
    if (body.object === 'page') {
        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {

            // Gets the message. entry.messaging is an array, but
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            const sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

            const respMsg = {
                'recipient': {
                    'id': sender_psid
                },
                'message': {
                    'text': responses[Math.floor(Math.random() * responses.length)],
                    'attachment':{
                        'type': 'audio',
                        "payload":{
                            "url":"https://meeseeks-box.herokuapp.com/audio.mp3", 
                            "is_reusable":true
                        }
                    }
                }
               
            };

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v5.0/me/messages",
                "qs": {"access_token": OAUTH_TOKEN},
                "method": "POST",
                "json": respMsg
            }, (err, res, body) => {
                if (!err) {
                    console.log('message sent!')
                } else {
                    console.error("Unable to send message:" + err);
                }
            });

            // Returns a '200 OK' response to all requests
            res.status(200).json();
        });
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
});

// the
  // Adds support for GET requests to our webhook
app.get('/test', (req, res) => {
  res.send('asdf').sendStatus(200);
});

  // Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {


      
    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
      
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
      // Checks the mode and token sent is correct
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        
        // Responds with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
        return
      }
    }
    // Responds with '403 Forbidden' if verify tokens do not match
    res.sendStatus(403);      
  });