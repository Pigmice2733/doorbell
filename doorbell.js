const {
  WebClient,
  RtmClient,
  CLIENT_EVENTS,
  RTM_EVENTS
} = require("@slack/client");
const fs = require("fs");
const player = require("play-sound")((opts = {}));

const token = process.env.SLACK_TOKEN;

const rtm = new RtmClient(token, {
  dataStore: false,
  useRtmConnect: true
});

const web = new WebClient(token);

rtm.on(RTM_EVENTS.MESSAGE, message => {
  fs.readdir("./effects", (err, files) => {
    if (!err) {
      const file = files[Math.floor(Math.random() * files.length)];
      player.play(`./effects/${file}`, { timeout: 10000 });
      rtm.sendMessage(`Ringing the doorbell!`, message.channel);
    } else {
      rtm.sendMessage("Unable to ring doorbell!", message.channel);
    }
  });
});

// Start the connecting process
rtm.start();
