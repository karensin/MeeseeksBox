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

const audios = [
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42422.mp3?md5=bXuQ-EMAKqWTdk8wewftEw&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42423.mp3?md5=-VKTtIu77-cC6fl5e512Cw&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42424.mp3?md5=PWIQ7Pgz6fvAZeGvJljUWw&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42425.mp3?md5=BCKON_PheJh2PlsR39aYew&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42426.mp3?md5=jcVWkJKFEAcl3ZL2EGnZvw&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42427.mp3?md5=yx58PlVQyL3h_vA1mS0Vdw&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42428.mp3?md5=YUyA_xNCnl1RBIumILKavA&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42429.mp3?md5=N8RcV72deJyPpv6JmS1_yQ&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42430.mp3?md5=Il95WibrksxHxERwHKdRLA&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42431.mp3?md5=Ymwajajn5TuYAptia4EbnQ&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42432.mp3?md5=WOZ96LUwJ8d6Y6MYXNquNw&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42433.mp3?md5=mp_izAW20fsAUpSgrxRb5g&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42434.mp3?md5=saKc8BkUpjsfvQQ4puJGVQ&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42435.mp3?md5=4RKFw8ujXCkYv7FKDwnhgg&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42436.mp3?md5=lszvIGhq2whoHwnFSkkFLg&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42437.mp3?md5=rEVMcquoY2J7drRUzM4OSQ&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42438.mp3?md5=TaUnrspgP70Wdhivox8PAQ&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42440.mp3?md5=x23GV0E18ZoIvQPZ15oV_A&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42439.mp3?md5=LHwWSp1K7LRF0VnzYvJMxg&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42444.mp3?md5=_ia-jk2eBFRfkQiyFIsK8w&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42441.mp3?md5=nc9kbpSZ7Sii4neMYsFNCA&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42442.mp3?md5=MBZ-RZGp8NP0rYME7xeC5Q&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42443.mp3?md5=OSEsdLJvT-iz7_O4Z97L-g&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42445.mp3?md5=vKletEAl5j9iovGbgOYQlw&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42459.mp3?md5=kFpmptm_ixXHltqmcw6Rqg&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42458.mp3?md5=7Dti3EMmYwfi999D3QrIpg&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42446.mp3?md5=GCLGPqc3TD93y14xC2wcog&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42447.mp3?md5=akeyYl5KyEowKrm1cTl16Q&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42448.mp3?md5=RvtlTSBt7JVSrRRPQR_jmQ&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42449.mp3?md5=jCWBkeJN1TG73o_yVnD-Ig&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42450.mp3?md5=jUiHemq5yBbG9cDEW40ONg&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42451.mp3?md5=gYe09QO7Sxn3_e28abPKXA&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42452.mp3?md5=rtaa1fPwn3yApknJiV4RJQ&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42453.mp3?md5=Xzfdnj4E3MveqII0uyroyQ&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42454.mp3?md5=xHzuu-1ZZaR9uqoCy-mkHg&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42455.mp3?md5=ze64PVUcg5MI8nX29edSJQ&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42457.mp3?md5=6MZrm9SghCZ9U19tUEwLCg&expires=1573947830",
    // "https://www.101soundboards.com/storage/board_sounds_rendered/42456.mp3?md5=kMIPM1Ihh84vpAFwLBQ16Q&expires=1573947830",
    "https://meeseeks-box.herokuapp.com/audio.mp3"
];

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {  
    let body = req.body;
    // Checks this is an event from a page subscription
    if (body.object === 'page' && body.entry) {
        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {
            // Gets the message. entry.messaging is an array, but
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];

            const sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

            const respMsg = {
                'recipient': {
                    'id': sender_psid
                },
                'message': {
                    'text': responses[Math.floor(Math.random() * responses.length)]
                    
                }
            };

            // Send the HTTP request to the Messenger Platform
            sendRequest(respMsg);

            console.log("audios: " + Math.floor(Math.random() * audios.length));
            console.log("audios: " + audios[Math.floor(Math.random() * audios.length)]);

            const respAudio = {
                'recipient': {
                    'id': sender_psid
                },
                'message': {
                     'attachment':{
                        'type': 'audio',
                        "payload":{
                            "url": audios[Math.floor(Math.random() * audios.length)],
                            "is_reusable":true
                        }
                    }
                }
            };

            // Send the HTTP request to the Messenger Platform
            sendRequest(respAudio);
        });
        // Returns a '200 OK' response to all requests
        res.status(200).json();
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
});

const sendRequest = respAudio => {
    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v5.0/me/messages",
        "qs": {"access_token": OAUTH_TOKEN},
        "method": "POST",
        "json": respAudio
    }, (err, _, body) => {
        console.log("---------------------------------------------------");
        console.log("Response from Facebook: " + JSON.stringify(body));
        console.log("---------------------------------------------------");
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
};

// the
app.get('/', (req, res) => {
  res.sendStatus(200);
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