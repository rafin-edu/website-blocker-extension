console.log("🚀 blocked.js is running!");

// Motivational quotes
const quotes = [
    { text: "সফলতা চূড়ান্ত নয়, ব্যর্থতা মরণঘাতী নয়। গুরুত্বপূর্ণ হলো চালিয়ে যাওয়ার সাহস।", author: "উইনস্টন চার্চিল" },
        { text: "তোমার সময় সীমিত, তাই অন্যের জীবন যাপন করে এটি নষ্ট করো না।", author: "স্টিভ জবস" },
        { text: "যদি তুমি সূর্যের দিকে তাকিয়ে থাকো, তুমি কখনো ছায়া দেখতে পাবে না।", author: "হেলেন কেলার" },
        { text: "ভবিষ্যতের সর্বোত্তম ভবিষ্যদ্বাণী হল এটিকে তৈরি করা।", author: "পিটার ড্রাকার" },
        { text: "তুমি যা করতে পারো তা কর, যা আছে তা দিয়ে, যেখানে আছো সেখান থেকে।", author: "থিওডোর রুজভেল্ট" },
        { text: "কঠোর পরিশ্রম ভাগ্যকে হার দেয়। যখন কোন প্রতিভা নেই, তখন পরিশ্রমই প্রতিভা।", author: "টিম নটকে" },
        { text: "একাগ্রতা হল সাফল্যের গোপন সূত্র। মনকে ফোকাস করো এবং অসম্ভব সম্ভব হয়ে যায়।", author: "এ পি জে আব্দুল কালাম" },
        { text: "যে ব্যক্তি পাহাড় সরাতে চায়, সে ছোট পাথর সরানোর মাধ্যমে শুরু করে।", author: "কনফুসিয়াস" },
        { text: "আজকের কঠোর পরিশ্রম আগামীকালের সাফল্যের ভিত্তি।", author: "জাপানি প্রবাদ" },
        { text: "মনোযোগ ছাড়া সাফল্য অসম্ভব। বিক্ষিপ্ততা হলো প্রতিভার শত্রু।", author: "বিল গেটস" },
        { text: "তুমি যা হতে চাও সেটা হওয়ার জন্য কখনও দেরি হয় না।", author: "জর্জ এলিয়ট" },
        { text: "প্রতিটি দিন একটি নতুন সুযোগ। গতকালের ব্যর্থতা আজকের সফলতার পথ।", author: "অজানা" },
        { text: "সফলতা আসে যখন আপনার স্বপ্ন আপনার অজুহাতের চেয়ে বড় হয়।", author: "অজানা" },
        { text: "আপনার লক্ষ্য পূরণের জন্য প্রতিদিন কিছু করুন।", author: "অজানা" },
        { text: "আপনি যদি এটি স্বপ্ন দেখতে পারেন, আপনি এটি অর্জন করতে পারেন।", author: "জিগ জিগলার" },
        { text: "সাফল্য একটি যাত্রা, গন্তব্য নয়।", author: "বেন স্টেইনহার্ট" },
        { text: "আপনার ভবিষ্যত তৈরি করতে আজকের দিনটি ব্যবহার করুন।", author: "অজানা" },
        { text: "আপনার সময় এখনই, আপনার মুহূর্তটি এখনই।", author: "অজানা" },
        
        // English Quotes
        { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
        { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
        { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
        { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
        { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown" },
        { text: "Dream bigger. Do bigger.", author: "Unknown" },
        { text: "Don't stop when you're tired. Stop when you're done.", author: "Unknown" },
        { text: "Wake up with determination. Go to bed with satisfaction.", author: "Unknown" },
        { text: "Do something today that your future self will thank you for.", author: "Sean Patrick Flanery" },
        { text: "Little things make big days.", author: "Unknown" },
        { text: "It's going to be hard, but hard does not mean impossible.", author: "Unknown" },
        { text: "Don't wait for opportunity. Create it.", author: "Unknown" },
        { text: "Sometimes we're tested not to show our weaknesses, but to discover our strengths.", author: "Unknown" },
        { text: "The key to success is to focus on goals, not obstacles.", author: "Unknown" },
        { text: "Dream it. Believe it. Build it.", author: "Unknown" },
        { text: "Your limitation—it's only your imagination.", author: "Unknown" },
        { text: "Great things never come from comfort zones.", author: "Unknown" },
        { text: "Success doesn't just find you. You have to go out and get it.", author: "Unknown" },
        { text: "The harder you work, the luckier you get.", author: "Gary Player" },
        { text: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.", author: "Roy T. Bennett" },
        { text: "Work hard in silence. Let success make the noise.", author: "Frank Ocean" },
        { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
        { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
        { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
        { text: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
        { text: "You learn more from failure than from success. Don't let it stop you. Failure builds character.", author: "Unknown" },
        { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
        { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
        { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
        { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
        { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
        { text: "The man who moves a mountain begins by carrying away small stones.", author: "Confucius" },
        { text: "If you're offered a seat on a rocket ship, don't ask what seat! Just get on.", author: "Sheryl Sandberg" },
        { text: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" },
        { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
        { text: "The only place where success comes before work is in the dictionary.", author: "Vidal Sassoon" },
        { text: "The successful warrior is the average man, with laser-like focus.", author: "Bruce Lee" },
        { text: "There are no shortcuts to any place worth going.", author: "Beverly Sills" },
        { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
        { text: "I attribute my success to this: I never gave or took any excuse.", author: "Florence Nightingale" },
        { text: "The difference between a successful person and others is not a lack of strength, not a lack of knowledge, but rather a lack in will.", author: "Vince Lombardi" },
        { text: "The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it.", author: "Jordan Belfort" }
];

// Get URL parameters
function getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        site: urlParams.get('site'),
        until: urlParams.get('until')
    };
}

// Display random quote
function displayRandomQuote() {
    try {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const selectedQuote = quotes[randomIndex];
        
        document.getElementById('motivationText').textContent = selectedQuote.text;
        document.getElementById('authorText').textContent = '— ' + selectedQuote.author;
        
        console.log("✅ Quote displayed:", selectedQuote.text);
    } catch (error) {
        console.error("❌ Error displaying quote:", error);
        document.getElementById('motivationText').textContent = "Stay focused on your goals!";
        document.getElementById('authorText').textContent = "— Motivational Message";
    }
}

// Update countdown timer
function updateCountdown() {
    try {
        const { site, until } = getUrlParams();
        
        console.log("📊 URL Parameters:", { site, until });
        
        // Display blocked site
        if (site) {
            document.getElementById('blockedSite').textContent = site;
        }

        if (!until || until === '0') {
            document.getElementById('countdown').textContent = 'স্থায়ীভাবে ব্লক করা হয়েছে';
            return;
        }

        const unlockTime = parseInt(until);
        const now = Date.now();
        const remaining = unlockTime - now;

        console.log("⏰ Time Info:", { unlockTime, now, remaining });

        if (remaining <= 0) {
            document.getElementById('countdown').textContent = 'আনলক হয়ে গেছে! ✅';
            return;
        }

        const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

        let countdownText = '';
        if (days > 0) {
            countdownText = `${days} দিন ${hours} ঘন্টা ${minutes} মিনিট ${seconds} সেকেন্ড`;
        } else if (hours > 0) {
            countdownText = `${hours} ঘন্টা ${minutes} মিনিট ${seconds} সেকেন্ড`;
        } else if (minutes > 0) {
            countdownText = `${minutes} মিনিট ${seconds} সেকেন্ড`;
        } else {
            countdownText = `${seconds} সেকেন্ড`;
        }

        document.getElementById('countdown').textContent = countdownText;
    } catch (error) {
        console.error("❌ Error in countdown:", error);
        document.getElementById('countdown').textContent = 'সময় লোড হচ্ছে...';
    }
}

// Initialize everything when page loads
function initializePage() {
    console.log("🎯 Initializing blocked page...");
    
    // Display quote immediately
    displayRandomQuote();
    
    // Start countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    console.log("✅ Page initialized successfully!");
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}