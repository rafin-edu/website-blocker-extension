let blockedSites = [];

// Load blocked sites from storage on startup
chrome.storage.sync.get(['blockedSites'], (result) => {
  blockedSites = result.blockedSites || [];
  console.log('🔴 Loaded blocked sites:', blockedSites);
});

// Listen for changes in storage
chrome.storage.onChanged.addListener((changes) => {
  if (changes.blockedSites) {
    blockedSites = changes.blockedSites.newValue || [];
    console.log('🔄 Updated blocked sites:', blockedSites);
  }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "reloadSites") {
    chrome.storage.sync.get(['blockedSites'], (result) => {
      blockedSites = result.blockedSites || [];
      console.log('🔄 Reloaded sites via message:', blockedSites);
    });
  }
});

// Check tabs when they are updated
chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  if (info.status === 'loading' && tab.url) {
    console.log('📄 Tab loading:', tab.url);
    checkAndBlock(tabId, tab.url);
  }
});

// Check tabs when they are created
chrome.tabs.onCreated.addListener((tab) => {
  if (tab.url) {
    setTimeout(() => {
      checkAndBlock(tab.id, tab.url);
    }, 100);
  }
});

// Main blocking function
function checkAndBlock(tabId, url) {
  try {
    // Skip chrome:// and extension URLs
    if (url.startsWith('chrome://') || url.startsWith('chrome-extension://')) {
      return;
    }

    const urlObj = new URL(url);
    let hostname = urlObj.hostname.toLowerCase().replace(/^www\./, '');
    const now = Date.now();

    console.log('🔍 Checking URL:', hostname);
    console.log('📋 Blocked sites array:', blockedSites);

    // Check each blocked site
    for (let item of blockedSites) {
      // Ensure we're dealing with the correct data structure
      if (!item || !item.site) {
        console.log('❌ Invalid item in blockedSites:', item);
        continue;
      }

      const blockedSite = item.site.toLowerCase().replace(/^www\./, '');
      const lockUntil = item.lockUntil || 0;

      console.log(`🆚 Comparing: "${hostname}" with "${blockedSite}"`);
      console.log(`⏰ Lock until: ${lockUntil} (${new Date(lockUntil)})`);
      console.log(`⏰ Current time: ${now} (${new Date(now)})`);

      // Check if site matches
      if (hostname === blockedSite) {
        console.log('🎯 Site match found!');
        
        // Check if still locked
        if (lockUntil === 0 || now < lockUntil) {
          console.log('🚫 BLOCKING ACCESS TO:', hostname);
          
          // Redirect to blocked page
          const blockedUrl = chrome.runtime.getURL('blocked.html') + 
                           '?site=' + encodeURIComponent(hostname) + 
                           '&until=' + lockUntil;
          
          console.log('🔗 Redirecting to:', blockedUrl);
          chrome.tabs.update(tabId, { url: blockedUrl });
          return; // Stop after first match
        } else {
          console.log('✅ Lock expired for:', blockedSite);
        }
      }
    }
    
    console.log('✅ No blocking needed for:', hostname);
    
  } catch (e) {
    console.error('❌ Error in checkAndBlock:', e);
  }
}

// Clean up expired sites every hour
setInterval(() => {
  chrome.storage.sync.get(['blockedSites'], (result) => {
    const sites = result.blockedSites || [];
    const now = Date.now();
    
    const activeSites = sites.filter(item => {
      const lockUntil = item.lockUntil || 0;
      return lockUntil === 0 || now < lockUntil;
    });

    if (activeSites.length !== sites.length) {
      chrome.storage.sync.set({ blockedSites: activeSites });
      console.log('🧹 Cleaned up expired sites');
    }
  });
}, 3600000);