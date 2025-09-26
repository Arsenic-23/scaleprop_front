/**
 * profile.js
 *
 * This JavaScript module programmatically creates the DOM structure for the
 * Profile page, replicating the exact HTML/Tailwind/Alpine.js layout and classes.
 *
 * NOTE: For the interactive elements (like the filters and badge details) to work,
 * the HTML file where this script is used MUST also load Tailwind CSS and Alpine.js.
 */

const createProfileElement = () => {
    // Helper to create an element with classes and attributes
    const createElement = (tag, classes = [], attributes = {}, innerHTML = null) => {
        const el = document.createElement(tag);
        if (classes.length > 0) {
            el.className = classes.join(' ');
        }
        for (const [key, value] of Object.entries(attributes)) {
            el.setAttribute(key, value);
        }
        if (innerHTML !== null) {
            el.innerHTML = innerHTML;
        }
        return el;
    };

    // --- Data Mockup (Matches the static content of the original HTML) ---
    const profileData = {
        name: "Ethan Carter",
        email: "ethan.carter@email.com",
        profilePicture: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4SMYHkHqJZK7pReVwwIPPHPRs00tIbXv65_Bm_euJZJKfYu4Kp3u9oLjvYl3zSe77gx_6djr_yKran5vAx8nlQW-lnMKvUPmLLEMdmvnnGaGwpt-NNPo3kTNU9qyAKUmH2-_DN7CptCxaUcRkc0pHJq6jGe4L5yfkVtFLNty-W3t9eOvnMHkBGZE8BBX8i-oNLMKEhp41av2pINrgXw-j18L_HA0GxTta-S9GddHIwxSmUzvPOd9H-4h8udrQ92XPXCYCGIWnrjM",
        stats: {
            profit: "$12,450.75",
            trades: "120",
            payout: "$5,000"
        },
        tradeHistory: [
            { asset: 'EUR/USD', type: 'BUY', range: '1.0850 → 1.0910', pnl: '+$250.50', date: 'Oct 26, 2023', pnlColor: 'text-green-400' },
            { asset: 'XAU/USD', type: 'SELL', range: '1985.20 → 1982.10', pnl: '-$120.00', date: 'Oct 25, 2023', pnlColor: 'text-red-500' },
            { asset: 'GBP/JPY', type: 'BUY', range: '182.30 → 183.00', pnl: '+$350.00', date: 'Oct 24, 2023', pnlColor: 'text-green-400' }
        ],
        performance: [
            { label: 'Profit Target', value: '75%', color: 'text-green-400', filledSlices: 7 },
            { label: 'Max Daily Loss', value: '25%', color: 'text-red-500', filledSlices: 3 },
            { label: 'Max Total Loss', value: '10%', color: 'text-green-400', filledSlices: 1 }
        ]
    };

    // --- Main container and wrapper ---
    const mainContainer = createElement('div', ['relative', 'flex', 'min-h-screen', 'w-full', 'flex-col', 'justify-between', 'overflow-x-hidden']);
    const contentWrapper = createElement('div', ['flex-grow']);

    // --- Header ---
    const header = createElement('header', ['flex', 'items-center', 'p-4']);
    const backButton = createElement('button', ['text-white']);
    backButton.appendChild(createElement('span', ['material-symbols-outlined'], {}, 'arrow_back'));
    const title = createElement('h1', ['flex-1', 'text-center', 'text-lg', 'font-bold', 'text-white', 'pr-6'], {}, 'Profile');
    header.append(backButton, title);

    // --- Main Content Area ---
    const main = createElement('main', ['p-4']);

    // 1. Profile Section
    const profileSection = createElement('section', ['flex', 'flex-col', 'items-center', 'text-center']);
    const imgWrapper = createElement('div', ['relative', 'mb-4']);
    imgWrapper.appendChild(createElement('img', ['h-32', 'w-32', 'rounded-full', 'object-cover'], { alt: profileData.name, src: profileData.profilePicture }));
    profileSection.append(imgWrapper, createElement('h2', ['text-2xl', 'font-bold', 'text-white'], {}, profileData.name), createElement('p', ['text-gray-400'], {}, profileData.email));

    // 2. Total Profit Section
    const profitSection = createElement('section', ['mt-8']);
    const profitCard = createElement('div', ['bg-card-dark', 'rounded-xl', 'p-4', 'text-center']);
    profitCard.append(createElement('p', ['text-sm', 'text-gray-400'], {}, 'Total Profit'), createElement('p', ['text-4xl', 'font-bold', 'text-green-400'], {}, profileData.stats.profit));
    profitSection.appendChild(profitCard);

    // 3. Trades/Payout Stats Grid
    const statsSection = createElement('section', ['mt-6', 'grid', 'grid-cols-2', 'gap-4']);
    const createStatCard = (label, value) => {
        const div = createElement('div', ['rounded-xl', 'bg-card-dark', 'p-4', 'flex', 'flex-col', 'items-center', 'justify-center', 'text-center']);
        div.append(createElement('p', ['text-sm', 'font-medium', 'text-gray-400'], {}, label), createElement('p', ['text-2xl', 'font-bold', 'text-white'], {}, value));
        return div;
    };
    statsSection.append(createStatCard('Total Trades', profileData.stats.trades), createStatCard('Total Payout', profileData.stats.payout));

    // 4. Trading History Section
    const historySection = createElement('section', ['mt-8'], { 'x-data': "{ showFilters: false }" });
    const historyHeader = createElement('div', ['flex', 'justify-between', 'items-center', 'px-4', 'pb-2', 'pt-4']);
    historyHeader.appendChild(createElement('h3', ['text-lg', 'font-bold', 'text-white'], {}, 'Trading History'));
    
    const filterButton = createElement('button', ['text-white', 'flex', 'items-center', 'gap-1'], { '@click': "showFilters = !showFilters" });
    filterButton.append(createElement('span', ['material-symbols-outlined'], {}, 'filter_list'), createElement('span', ['text-sm'], {}, 'Filter'));
    historyHeader.appendChild(filterButton);

    const filterPanel = createElement('div', ['bg-card-dark', 'rounded-xl', 'p-4', 'mb-4'], { 
        'x-show': "showFilters",
        'x-transition:enter': "transition ease-out duration-300", 
        'x-transition:enter-end': "opacity-100 transform translate-y-0", 
        'x-transition:enter-start': "opacity-0 transform -translate-y-2", 
        'x-transition:leave': "transition ease-in duration-200", 
        'x-transition:leave-end': "opacity-0 transform -translate-y-2", 
        'x-transition:leave-start': "opacity-100 transform translate-y-0"
    });
    // Inner Filter Panel Content (Replicated exactly)
    filterPanel.innerHTML = `
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium text-gray-400 mb-1" for="date-range">Date Range</label>
                <input class="w-full bg-background-dark border-gray-600 text-white rounded-lg text-sm" id="date-range" type="date"/>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-400 mb-1" for="trade-type">Trade Type</label>
                <select class="w-full bg-background-dark border-gray-600 text-white rounded-lg text-sm" id="trade-type">
                    <option>All</option><option>Buy</option><option>Sell</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-400 mb-1" for="asset">Asset</label>
                <select class="w-full bg-background-dark border-gray-600 text-white rounded-lg text-sm" id="asset">
                    <option>All</option><option>EUR/USD</option><option>GBP/JPY</option><option>XAU/USD</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-400 mb-1" for="status">Status</label>
                <select class="w-full bg-background-dark border-gray-600 text-white rounded-lg text-sm" id="status">
                    <option>All</option><option>Open</option><option>Closed</option>
                </select>
            </div>
        </div>
        <div class="mt-4 border-t border-gray-700 pt-4">
            <label class="block text-sm font-medium text-gray-400 mb-1" for="sort-by">Sort By</label>
            <div class="flex gap-2">
                <select class="flex-grow bg-background-dark border-gray-600 text-white rounded-lg text-sm" id="sort-by">
                    <option>Date</option><option>Profit/Loss</option><option>Trade Size</option>
                </select>
                <button class="p-2 bg-background-dark border border-gray-600 rounded-lg text-white">
                    <span class="material-symbols-outlined">arrow_downward</span>
                </button>
                <button class="p-2 bg-background-dark border border-gray-600 rounded-lg text-white">
                    <span class="material-symbols-outlined">arrow_upward</span>
                </button>
            </div>
        </div>
        <div class="mt-4 flex justify-end gap-2">
            <button @click="showFilters = false" class="text-gray-300 text-sm py-2 px-4 rounded-lg">Cancel</button>
            <button @click="showFilters = false" class="bg-primary text-white text-sm py-2 px-4 rounded-lg">Apply</button>
        </div>
    `;

    const tradeList = createElement('div', ['space-y-3', 'px-4']);
    profileData.tradeHistory.forEach(trade => {
        const item = createElement('div', ['bg-card-dark', 'p-3', 'rounded-lg', 'flex', 'justify-between', 'items-center']);
        const leftDiv = createElement('div');
        leftDiv.innerHTML = `<p class="font-bold text-white">${trade.asset} <span class="text-xs font-normal ${trade.type === 'BUY' ? 'text-green-400' : 'text-red-500'}">${trade.type}</span></p><p class="text-xs text-gray-400">${trade.range}</p>`;
        const rightDiv = createElement('div', ['text-right']);
        rightDiv.innerHTML = `<p class="font-bold ${trade.pnlColor}">${trade.pnl}</p><p class="text-xs text-gray-500">${trade.date}</p>`;
        item.append(leftDiv, rightDiv);
        tradeList.appendChild(item);
    });
    
    historySection.append(historyHeader, filterPanel, tradeList);

    // 5. Achievements & Badges Section
    const achievementsSection = createElement('section', ['mt-8'], { 'x-data': "{ open: null }" });
    achievementsSection.appendChild(createElement('h3', ['px-4', 'pb-2', 'pt-4', 'text-lg', 'font-bold', 'text-white'], {}, 'Achievements & Badges'));

    const badgesGrid = createElement('div', ['grid', 'grid-cols-3', 'gap-4', 'p-4', 'text-center']);

    // Unlocked Badges (Logic embedded in innerHTML for brevity/fidelity)
    const unlockedBadges = [
        { name: 'Profit Pro', icon: 'workspace_premium', iconColor: 'text-amber-400', click: "open = open === 'profit' ? null : 'profit'" },
        { name: 'Win Streak', icon: 'rocket_launch', iconColor: 'text-emerald-400', click: "open = open === 'streak' ? null : 'streak'" },
        { name: 'Risk Manager', icon: 'verified_user', iconColor: 'text-cyan-400', click: "open = open === 'risk' ? null : 'risk'" }
    ];
    unlockedBadges.forEach(badge => {
        const wrapper = createElement('div', ['flex', 'flex-col', 'items-center', 'space-y-3']);
        wrapper.innerHTML = `
            <button @click="${badge.click}" class="flex h-20 w-20 items-center justify-center rounded-lg bg-card-dark border border-gray-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <span class="material-symbols-outlined text-4xl ${badge.iconColor}">${badge.icon}</span>
            </button>
            <p class="text-sm font-medium text-white">${badge.name}</p>
        `;
        badgesGrid.appendChild(wrapper);
    });

    // Locked Badges with Progress
    const lockedBadges = [
        { name: 'Night Owl', progress: 60, target: '30/50' },
        { name: 'Top 10%', progress: 25, target: '5/20' },
        { name: 'Master Trader', progress: 80, target: '80/100' }
    ];
    lockedBadges.forEach(badge => {
        const wrapper = createElement('div', ['flex', 'flex-col', 'items-center', 'space-y-3']);
        wrapper.innerHTML = `
            <div class="relative flex h-20 w-20 items-center justify-center rounded-lg bg-card-dark border border-gray-800 shadow-md">
                <span class="material-symbols-outlined text-4xl text-gray-600">lock</span>
                <div class="absolute bottom-2 w-full px-2">
                    <div class="h-1.5 w-full bg-gray-700 rounded-full">
                        <div class="bg-primary h-1.5 rounded-full" style="width: ${badge.progress}%"></div>
                    </div>
                </div>
            </div>
            <p class="text-sm font-medium text-gray-500">${badge.name}</p>
            <p class="text-xs text-gray-600 -mt-2">${badge.target}</p>
        `;
        badgesGrid.appendChild(wrapper);
    });
    achievementsSection.appendChild(badgesGrid);

    // Badge Detail Panel (Replicated exactly)
    const detailPanel = createElement('div', ['mt-4', 'bg-card-dark', 'rounded-xl', 'p-4'], { 
        style: 'display: none;',
        'x-show': "open",
        'x-transition:enter': "transition ease-out duration-300", 
        'x-transition:enter-end': "opacity-100 transform translate-y-0", 
        'x-transition:enter-start': "opacity-0 transform -translate-y-4", 
        'x-transition:leave': "transition ease-in duration-200", 
        'x-transition:leave-end': "opacity-0 transform -translate-y-4", 
        'x-transition:leave-start': "opacity-100 transform translate-y-0"
    });
    detailPanel.innerHTML = `
        <div x-show="open === 'profit'">
            <h4 class="text-lg font-bold text-white">Profit Pro</h4>
            <p class="mt-2 text-sm text-gray-400">Achieve a total profit of $10,000.</p>
            <div class="mt-3">
                <div class="flex justify-between text-sm font-medium">
                    <span class="text-white">Progress</span>
                    <span class="text-green-400">$12,450.75 / $10,000</span>
                </div>
                <div class="mt-1 w-full bg-gray-700 rounded-full h-2.5">
                    <div class="bg-green-500 h-2.5 rounded-full" style="width: 100%"></div>
                </div>
            </div>
        </div>
        <div x-show="open === 'streak'">
            <h4 class="text-lg font-bold text-white">Win Streak</h4>
            <p class="mt-2 text-sm text-gray-400">Achieve a 10-trade winning streak.</p>
            <div class="mt-3">
                <div class="flex justify-between text-sm font-medium">
                    <span class="text-white">Progress</span>
                    <span class="text-green-400">7 / 10</span>
                </div>
                <div class="mt-1 w-full bg-gray-700 rounded-full h-2.5">
                    <div class="bg-green-500 h-2.5 rounded-full" style="width: 70%"></div>
                </div>
            </div>
        </div>
        <div x-show="open === 'risk'">
            <h4 class="text-lg font-bold text-white">Risk Manager</h4>
            <p class="mt-2 text-sm text-gray-400">Keep max drawdown below 5% for 30 consecutive days.</p>
            <div class="mt-3">
                <div class="flex justify-between text-sm font-medium">
                    <span class="text-white">Progress</span>
                    <span class="text-green-400">25 / 30 Days</span>
                </div>
                <div class="mt-1 w-full bg-gray-700 rounded-full h-2.5">
                    <div class="bg-green-500 h-2.5 rounded-full" style="width: 83%"></div>
                </div>
            </div>
        </div>
    `;
    achievementsSection.appendChild(detailPanel);

    // 6. Performance Section
    const performanceSection = createElement('section', ['mt-8']);
    performanceSection.appendChild(createElement('h3', ['px-4', 'pb-2', 'pt-4', 'text-lg', 'font-bold', 'text-white'], {}, 'Performance'));
    
    const barsContainer = createElement('div', ['space-y-6', 'p-4']);
    
    const createPerfBar = (label, value, colorClass, filledSlices) => {
        const div = createElement('div', ['space-y-2']);
        
        const header = createElement('div', ['flex', 'justify-between']);
        header.append(createElement('p', ['font-medium', 'text-white'], {}, label), createElement('p', ['text-sm', 'font-medium', colorClass], {}, value));

        const slicedBar = createElement('div', ['sliced-bar']);
        // Create 10 slices
        const primaryBg = colorClass.includes('green') ? 'bg-green-500' : 'bg-red-500';
        for (let i = 0; i < 10; i++) {
            const sliceClasses = ['slice'];
            if (i < filledSlices) {
                sliceClasses.push(primaryBg);
            } else {
                sliceClasses.push('bg-gray-800');
            }
            if (i === 0) sliceClasses.push('rounded-l-full');
            if (i === 9) sliceClasses.push('rounded-r-full');
            slicedBar.appendChild(createElement('div', sliceClasses));
        }

        div.append(header, slicedBar);
        return div;
    };

    barsContainer.append(
        createPerfBar('Profit Target', '75%', 'text-green-400', 7),
        createPerfBar('Max Daily Loss', '25%', 'text-red-500', 3),
        createPerfBar('Max Total Loss', '10%', 'text-green-400', 1)
    );
    performanceSection.appendChild(barsContainer);

    main.append(profileSection, profitSection, statsSection, historySection, achievementsSection, performanceSection);
    
    contentWrapper.append(header, main);

    // --- Footer ---
    const footer = createElement('footer', ['sticky', 'bottom-0', 'border-t', 'border-gray-800', 'bg-background-dark/80', 'backdrop-blur-sm', 'py-2']);
    const nav = createElement('nav', ['flex', 'justify-around']);

    const navItems = [
        { icon: 'home', label: 'Home', active: false },
        { icon: 'emoji_events', label: 'Challenges', active: false },
        { icon: 'person', label: 'Profile', active: true },
        { icon: 'settings', label: 'Settings', active: false }
    ];

    navItems.forEach(item => {
        const link = createElement('a', ['flex', 'flex-col', 'items-center', 'gap-1', item.active ? 'text-white' : 'text-gray-400'], { href: '#' });
        link.append(createElement('span', ['material-symbols-outlined'], {}, item.icon), createElement('span', ['text-xs', 'font-medium'], {}, item.label));
        nav.appendChild(link);
    });
    footer.appendChild(nav);

    // --- Final Assembly ---
    mainContainer.append(contentWrapper, footer);

    return mainContainer;
};

// --- Full Code Export (Includes necessary setup for a runnable JS file) ---

/**
 * Renders the profile page into the provided container element.
 * Assumes the necessary CSS (Tailwind and Material Icons) is loaded in the HTML head.
 * @param {HTMLElement} container - The element to render the profile into (e.g., document.body).
 */
const renderProfilePage = (container) => {
    const profileElement = createProfileElement();
    
    // Set body classes required by the original HTML
    container.className = 'bg-background-dark font-display';
    
    // The original HTML had the custom styles (sliced-bar) inside <style> tags,
    // which need to be replicated or the component style will be broken.
    if (!document.getElementById('custom-profile-styles')) {
        const style = document.createElement('style');
        style.id = 'custom-profile-styles';
        style.textContent = `
            body { min-height: max(884px, 100dvh); background-color: #0D0D0D; }
            .sliced-bar { display: flex; gap: 2px; }
            .slice { height: 12px; flex-grow: 1; }
        `;
        document.head.appendChild(style);
    }
    
    container.appendChild(profileElement);
};

// To make this a fully runnable script without explicit import/export,
// you would typically run it on DOMContentLoaded.
document.addEventListener('DOMContentLoaded', () => {
    // If you intend to use this file as a standalone script loaded via <script> tag,
    // this line will automatically render the profile into the document body.
    if (document.body) {
        renderProfilePage(document.body);
    }
});

// For modern modular use:
// export { createProfileElement, renderProfilePage }; 
