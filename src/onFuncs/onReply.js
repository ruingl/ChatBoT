module.exports = async (runObj) => {
  const { commands, onReply } = global.ChatBoT;
  const { api, event, message, log } = runObj;
  
  if (!event.messageReply) return;
  const args = event.body.split(" ");
  
  const replier = event.messageReply;
  if (onReply.has(replier.messageID)) {
    const { command, ...data } = onReply.get(replier.messageID);
    const cmdFile = commands.get(command);
    
    try {
      cmdFile.onRun({
        runObj.api
        runObj.event,
        runObj.args,
        runObj.message,
        runObj.log
      });
    } catch (error)  {
      message.reply(`❌ | An error occured while onReply: ${command}.

Message: ${error.message}
ErrorType: ${error.name}
Stack: ${error.stack}`);
    };
  };
};