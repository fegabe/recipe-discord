const path = require('path');

module.exports = (Franz) => {
  const getMessages = function getMessages() {
    // get unread messages
    const serverbar = document.querySelector('[class^=unreadMentionsIndicatorTop] + div');
    if (!serverbar) return;
    const direct = serverbar.querySelectorAll('[class*="lowerBadge"]').length;
    let channelsWithDots = document.querySelectorAll('[class*="pill-"] span[style*="height: 8px"]').length;
    let mutedChannelOnFocusWithUnreads = document.querySelectorAll('[class*="containerDefault-"] div[class*="modeMuted-"][aria-label*="unread"]').length;
    let channelOnFocusWithUnreads = document.querySelectorAll('[class*="containerDefault-"] div[aria-label*="unread"]').length;
    let indirect = channelsWithDots + (channelOnFocusWithUnreads - mutedChannelOnFocusWithUnreads);

    // set Franz badge
    Franz.setBadge(direct, indirect);
  };

  // check for new messages every second and update Franz badge
  Franz.loop(getMessages);

  // Hide download message
  Franz.injectCSS(path.join(__dirname, 'service.css'));
};
