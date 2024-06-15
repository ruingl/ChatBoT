module.exports = async ({
  api, event, log
}) => {
  const { config } = global.ChatBoT;
  const onCommand = require('./onFuncs/onCommand');
  const onEvent = require('./onFuncs/onEvent');
  const onReply = require('./onFuncs/onReply');
  
  const message = {
    send: (message) => {
      api.sendMessage(message, event.threadID, () => {}, true);
    },
    reply: (message) => {
      api.sendMessage(message, event.threadID, event.messageID, () => {}, true);
    },
    react: (emoji) => {
      api.setMessageReaction(emoji, event.messageID, () => {}, true);
    },
    edit: (message, messageID) => {
      api.editMessage(message, messageID, () => {}, true);
    },
  };
  
  const runObj = { api, event, message, log };
  
  switch (event.type) {
    case "message":
    case "message_reply":
      onCommand(runObj);
      onReply(runObj);
      break;
    case "event":
      onEvent(runObj);
      break;
  };
};