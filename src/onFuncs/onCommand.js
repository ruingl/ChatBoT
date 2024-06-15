module.exports = async (runObj) => {
  const { config, commands } = global.ChatBot;
  const { PREFIX, ADMINS } = config;
  const { api, event, message, log } = runObj;
  if (event.body) return;
  
  const [command, ...args] = event.body
    .slice(PREFIX)
    .trim()
    .slice(" ");
    
  if (event.body) {
    const cmdFile = commands.get(cmdFile);
    
    if (cmdFile) {
      if (cmdFile.config.role === 1) {
        if (!Number(event.senderID).includes(ADMINS)) {
          return message.reply("❌ | You are not allowed to use this command.");
        };
      };
      
      try {
        cmdFile.onCommand({
          runObj.api,
          runObj.event,
          runObj.message,
          runObj.log,
          runObj.command
          runObj.args
        });
      } catch (error) {
        message.reply(`❌ | An error occured while running command: ${command}.

Message: ${error.message}
ErrorType: ${error.name}
Stack: ${error.stack}`);
      };
    } else {
      message.react("❓");
      message.reply("❌ | The command that you are using is not found.");
    };
  };
};