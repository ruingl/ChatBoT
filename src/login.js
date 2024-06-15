const login = require('../lib/fca-unofficial');

module.exports = async ({
  appState
}) => {
  const { log, utils } = global.ChatBoT;
  login({ appState }, (err, api) => {
    if (err) {
      log.error(err.error);
      process.exit();
    };
    
    utils.loadAll(api);
    
    api.listenMqtt(async (err, event) => {
      if (err) {
        log.error(err.error);
        process.exit();
      };
      
      if (api.getCurrentUserID === event.senderID) return;
      
      require('./listen')({ api, event, log });
    });
  });
};