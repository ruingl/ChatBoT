module.exports = async (runObj) => {
  const { events } = global.ChatBoT;
  const { api, event } = runObj;
  
  for (const { config, onEvent } of events.values()) {
    if (!Array.isArray(config.eventType)) return;
    if (config.eventType.includes(event.logMessageType)) {
      try {
        const args = event.body.split(" ");
        onEvent({
          runObj.api,
          runObj.event,
          runObj.message,
          runObj.log,
          runObj.args
        });
      } catch (error) {
        message.reply(`❌ | An error occured while running event: ${config.name}.

Message: ${error.message}
ErrorType: ${error.name}
Stack: ${error.stack}`);
      };
    };
  };
};