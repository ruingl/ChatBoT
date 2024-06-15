const fs = require('fs-extra');
const path = require('path');

const { commands, events } = global.ChatBoT;
const commandPath = path.join(__dirname, "modules", "commands");
const eventPath = path.join(__dirname, "modules", "events");

async function loadAll(api) {
  const commandFiles = fs
    .readdirSync(commandPath)
    .filter((file) => file.endsWith('.js'));
  const eventFiles = fs
    .readdirSync(commandPath)
    .filter((file) => file.endsWith('.js'));
    
  for (commandFile of commandFiles) {
    try {
      const i = require(path.join(commandPath, commandFile));
      
      if (!i) {
        throw new Error('Error: Command does not export anything!');
      } else if (!i.config) {
        throw new Error('Error: Command does not export a config!');
      } else if (!i.onCommand) {
        throw new Error('Error: Command does not export a onCommand!');
      };
      
      if (i.onLoad && api) {
        onLoad({ api });
      };
      
      if (i.onEvent) {
        events.set(i.config.name, i);
      };
      
      commands.set(i.config.name, i);
    } catch (error) {
      log.error(error);
    };
  };
  
  for (eventFile of eventFiles) {
    try {
      const i = require(path.join(eventPath, eventFile));
      
      if (!i) {
        throw new Error('Error: Event does not export anything!');
      } else if (!i.config) {
        throw new Error('Error: Event does not export a config!');
      } else if (!i.onEvent) {
        throw new Error('Error: Event does not export a onEvent!');
      };
      
      events.set(i.config.name, i);
    } catch (error) {
      log.error(error);
    };
  };
};

module.exports = {
  loadAll
};