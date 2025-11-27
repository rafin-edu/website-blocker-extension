let blockedSites = [];

document.addEventListener('DOMContentLoaded', loadSites);
document.getElementById('addBtn').addEventListener('click', addSite);
document.getElementById('siteInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addSite();
});

function loadSites() {
  chrome.storage.sync.get(['blockedSites'], (result) => {
    console.log('📥 Loaded from storage:', result.blockedSites);
    blockedSites = result.blockedSites || [];
    cleanExpiredSites();
  });
}

function cleanExpiredSites() {
  const now = Date.now();
  const initialLength = blockedSites.length;
  blockedSites = blockedSites.filter(site => site.lockUntil > now);
  
  if (blockedSites.length !== initialLength) {
    console.log('🧹 Cleaned expired sites');
    saveSites();
  } else {
    renderSites();
  }
}

function addSite() {
  const input = document.getElementById('siteInput');
  let site = input.value.trim().toLowerCase();
  
  // Clean the URL
  site = site
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0]
    .split('?')[0];
  
  console.log('➕ Adding site:', site);
  
  if (site && site.length > 0) {
    const exists = blockedSites.find(s => s.site === site);
    if (!exists) {
      const lockUntil = Date.now() + (7 * 24 * 60 * 60 * 1000); // 7 days
      const newSite = { 
        site: site, 
        lockUntil: lockUntil,
        addedAt: Date.now()
      };
      
      blockedSites.push(newSite);
      console.log('✅ Site added to array:', newSite);
      saveSites();
      input.value = '';
      
      // Show confirmation
      alert(`✅ ${site} blocked for 7 days!\n\nThis site cannot be unblocked until the timer expires.`);
    } else {
      alert('⚠️ Site already blocked!\n\nThis website is already in your blocked list and cannot be removed for 7 days.');
    }
  } else {
    alert('❌ Please enter a valid website!');
  }
}

function saveSites() {
  console.log('💾 Saving to storage:', blockedSites);
  chrome.storage.sync.set({ blockedSites: blockedSites }, () => {
    console.log('✅ Saved successfully');
    renderSites();
    
    // Force background script to reload the sites
    chrome.runtime.sendMessage({ action: "reloadSites" });
  });
}

function renderSites() {
  const list = document.getElementById('siteList');
  const blockedCount = document.getElementById('blockedCount');
  const activeCount = document.getElementById('activeCount');
  const now = Date.now();
  
  console.log('🎨 Rendering sites:', blockedSites);
  
  // Update counters
  blockedCount.textContent = blockedSites.length;
  activeCount.textContent = blockedSites.filter(site => site.lockUntil > now).length;
  
  if (blockedSites.length === 0) {
    list.innerHTML = '<div class="empty-state">No websites blocked yet<br>Add sites to boost productivity!</div>';
    return;
  }
  
  list.innerHTML = blockedSites.map((item, index) => {
    const daysLeft = Math.ceil((item.lockUntil - now) / (1000 * 60 * 60 * 24));
    const isActive = daysLeft > 0;
    
    return `
      <div class="site-item ${index === blockedSites.length - 1 ? 'new' : ''}">
        <div class="site-info">
          <div class="site-name">${item.site}</div>
          <div class="site-days">
            ${isActive ? 
              `🔒 Locked for ${daysLeft} more day${daysLeft !== 1 ? 's' : ''}` : 
              '⏰ Lock expired'}
          </div>
        </div>
        <div class="lock-status">
          ${isActive ? 'LOCKED' : 'EXPIRED'}
        </div>
      </div>
    `;
  }).join('');
}

// Update the display every minute
setInterval(loadSites, 60000);

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "updateSites") {
    loadSites();
  }
});