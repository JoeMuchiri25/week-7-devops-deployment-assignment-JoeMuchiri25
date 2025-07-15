// /backend/utils/formatMessage.js
const formatMessage = (userId, text) => {
  return {
    sender: userId,
    content: text,
    timestamp: new Date(),
  };
};

module.exports = formatMessage;
