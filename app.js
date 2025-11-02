// Verizon Sales Finder App - Enhanced Version
// Real-time conversation analysis for sales opportunities with product recommendations and commission tracking

class SalesFinder {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.isPaused = false;
        this.sessionStartTime = null;
        this.sessionTimer = null;
        this.transcript = [];
        this.opportunities = [];
        this.recommendations = [];
        this.currentSale = {
            items: [],
            totalCommission: 0
        };
        this.currentSession = {
            id: null,
            startTime: null,
            endTime: null,
            transcript: [],
            opportunities: [],
            recommendations: [],
            saleItems: [],
            notes: '',
            commission: 0
        };

        this.init();
    }

    init() {
        this.setupSpeechRecognition();
        this.setupEventListeners();
        this.loadHistory();
        this.loadProductCatalog();
        this.updateCommissionDisplay();
    }

    setupSpeechRecognition() {
        // Check for Web Speech API support
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
            return;
        }

        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript + ' ';
                } else {
                    interimTranscript += transcript;
                }
            }

            if (finalTranscript) {
                this.processTranscript(finalTranscript.trim());
            }

            this.updateTranscriptDisplay(finalTranscript, interimTranscript);
        };

        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            if (event.error === 'no-speech') {
                // Auto-restart on no-speech
                if (this.isListening && !this.isPaused) {
                    this.recognition.start();
                }
            }
        };

        this.recognition.onend = () => {
            // Auto-restart if still listening
            if (this.isListening && !this.isPaused) {
                this.recognition.start();
            }
        };
    }

    setupEventListeners() {
        // Consent Screen
        document.getElementById('customerConsents').addEventListener('click', () => {
            this.showScreen('appScreen');
        });

        document.getElementById('customerDeclines').addEventListener('click', () => {
            alert('Session cancelled. Thank you for respecting customer privacy.');
        });

        // Control Buttons
        document.getElementById('startBtn').addEventListener('click', () => this.startListening());
        document.getElementById('pauseBtn').addEventListener('click', () => this.pauseListening());
        document.getElementById('stopBtn').addEventListener('click', () => this.stopSession());

        // Action Buttons
        document.getElementById('saveBtn').addEventListener('click', () => this.saveSession());
        document.getElementById('exportBtn').addEventListener('click', () => this.exportSession());
        document.getElementById('newSessionBtn').addEventListener('click', () => this.newSession());

        // Commission
        document.getElementById('viewBreakdown').addEventListener('click', () => this.showCommissionBreakdown());
        document.getElementById('closeModal').addEventListener('click', () => this.hideCommissionBreakdown());

        // Navigation
        document.getElementById('navHome').addEventListener('click', () => {
            this.showScreen('appScreen');
            this.setActiveNav('navHome');
        });

        document.getElementById('navCatalog').addEventListener('click', () => {
            this.showScreen('catalogScreen');
            this.setActiveNav('navCatalog');
            this.displayProductCatalog('plans');
        });

        document.getElementById('navHistory').addEventListener('click', () => {
            this.showScreen('historyScreen');
            this.setActiveNav('navHistory');
            this.displayHistory();
        });

        document.getElementById('backToApp').addEventListener('click', () => {
            this.showScreen('appScreen');
            this.setActiveNav('navHome');
        });

        document.getElementById('backFromCatalog').addEventListener('click', () => {
            this.showScreen('appScreen');
            this.setActiveNav('navHome');
        });

        // Catalog tabs
        document.querySelectorAll('.catalog-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.catalog-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.displayProductCatalog(tab.dataset.tab);
            });
        });

        // Modal click outside to close
        document.getElementById('commissionModal').addEventListener('click', (e) => {
            if (e.target.id === 'commissionModal') {
                this.hideCommissionBreakdown();
            }
        });
    }

    loadProductCatalog() {
        // Catalog is loaded from product-catalog.js
        if (typeof VerizonCatalog === 'undefined') {
            console.error('Product catalog not loaded');
        }
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    setActiveNav(navId) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.getElementById(navId).classList.add('active');
    }

    startListening() {
        if (!this.recognition) {
            alert('Speech recognition not available');
            return;
        }

        this.isListening = true;
        this.isPaused = false;
        this.sessionStartTime = new Date();
        this.currentSession.id = Date.now();
        this.currentSession.startTime = this.sessionStartTime;

        this.recognition.start();
        this.startSessionTimer();
        this.updateStatus('listening', 'Listening...');

        // Update buttons
        document.getElementById('startBtn').style.display = 'none';
        document.getElementById('pauseBtn').style.display = 'block';
        document.getElementById('stopBtn').style.display = 'block';
    }

    pauseListening() {
        this.isPaused = true;
        this.isListening = false;
        this.recognition.stop();
        this.updateStatus('paused', 'Paused');

        document.getElementById('pauseBtn').textContent = '▶ Resume';
        document.getElementById('pauseBtn').onclick = () => this.resumeListening();
    }

    resumeListening() {
        this.isPaused = false;
        this.isListening = true;
        this.recognition.start();
        this.updateStatus('listening', 'Listening...');

        document.getElementById('pauseBtn').textContent = '⏸ Pause';
        document.getElementById('pauseBtn').onclick = () => this.pauseListening();
    }

    stopSession() {
        this.isListening = false;
        this.isPaused = false;

        if (this.recognition) {
            this.recognition.stop();
        }

        if (this.sessionTimer) {
            clearInterval(this.sessionTimer);
        }

        this.currentSession.endTime = new Date();
        this.currentSession.commission = this.currentSale.totalCommission;
        this.updateStatus('stopped', 'Session Ended');

        // Update buttons
        document.getElementById('startBtn').style.display = 'block';
        document.getElementById('pauseBtn').style.display = 'none';
        document.getElementById('stopBtn').style.display = 'none';

        // Prompt to save
        if (this.transcript.length > 0) {
            if (confirm('Would you like to save this session?')) {
                this.saveSession();
            }
        }
    }

    startSessionTimer() {
        this.sessionTimer = setInterval(() => {
            if (!this.isPaused) {
                const elapsed = new Date() - this.sessionStartTime;
                const minutes = Math.floor(elapsed / 60000);
                const seconds = Math.floor((elapsed % 60000) / 1000);
                document.getElementById('sessionTime').textContent =
                    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }

    updateStatus(state, text) {
        const dot = document.getElementById('statusDot');
        const statusText = document.getElementById('statusText');

        dot.className = 'dot';
        if (state === 'listening') {
            dot.classList.add('listening');
        } else if (state === 'paused') {
            dot.classList.add('paused');
        }

        statusText.textContent = text;
    }

    processTranscript(text) {
        const timestamp = new Date();
        const transcriptEntry = {
            text: text,
            timestamp: timestamp,
            timeString: this.formatTime(timestamp)
        };

        this.transcript.push(transcriptEntry);
        this.currentSession.transcript.push(transcriptEntry);

        // Analyze for opportunities
        this.analyzeForOpportunities(text);
    }

    analyzeForOpportunities(text) {
        const textLower = text.toLowerCase();

        // Enhanced patterns with more context
        const patterns = [
            // Carrier switching opportunities
            {
                keywords: ['at&t', 'att', 't-mobile', 'tmobile', 'sprint', 'cricket', 'metro', 'boost', 'straight talk', 'visible'],
                type: 'Carrier Switch',
                priority: 'high',
                suggestion: 'Customer mentions competitor carrier. Discuss Verizon\'s superior coverage and network reliability. Offer to check switch savings and port number.',
                tags: ['carrier-switch']
            },
            // Bill/pricing concerns
            {
                keywords: ['expensive', 'too much', 'high bill', 'costly', 'cheaper', 'save money', 'afford', 'budget', 'paying too much'],
                type: 'Price Concern',
                priority: 'high',
                suggestion: 'Customer mentions price concerns. Present unlimited plans, family discounts, or promotional offers. Calculate potential savings with multiple lines.',
                tags: ['price', 'budget']
            },
            // Coverage issues
            {
                keywords: ['no signal', 'bad coverage', 'drops calls', 'slow data', 'no service', 'dead zone', 'poor reception', 'cant make calls'],
                type: 'Coverage Issue',
                priority: 'high',
                suggestion: 'Customer has coverage issues. Highlight Verizon\'s nationwide 5G network. Show coverage map for their area and emphasize network awards.',
                tags: ['coverage', '5g']
            },
            // Device upgrade opportunities
            {
                keywords: ['old phone', 'battery dies', 'slow phone', 'broken screen', 'new phone', 'upgrade', 'cracked', 'freezes', 'wont turn on'],
                type: 'Device Upgrade',
                priority: 'high',
                suggestion: 'Customer may need device upgrade. Show latest iPhone/Samsung models. Discuss trade-in value (up to $800) and 36-month payment plans.',
                tags: ['device-upgrade', 'premium']
            },
            // 5G opportunities
            {
                keywords: ['5g', 'faster internet', 'slow internet', 'streaming', 'gaming', 'buffering', 'lag', 'download speed'],
                type: '5G Upgrade',
                priority: 'medium',
                suggestion: 'Customer interested in speed/performance. Highlight 5G Ultra Wideband capabilities and compatible devices. Discuss 5G plan options with premium data.',
                tags: ['5g', 'premium', 'streaming', 'gaming']
            },
            // Family plan opportunities
            {
                keywords: ['family', 'kids', 'spouse', 'husband', 'wife', 'children', 'multiple lines', 'daughter', 'son', 'parent'],
                type: 'Family Plan',
                priority: 'medium',
                suggestion: 'Customer mentions family members. Present family plan options starting at $30/line with 4+ lines. Discuss parental controls and Apple Watch options for kids.',
                tags: ['family', 'multiple-lines']
            },
            // Home internet opportunities
            {
                keywords: ['home internet', 'wifi', 'broadband', 'cable', 'xfinity', 'spectrum', 'comcast', 'fiber', 'internet at home'],
                type: 'Home Internet',
                priority: 'medium',
                suggestion: 'Customer mentions home internet. Introduce Verizon 5G Home Internet ($25/mo with mobile) or Fios fiber. Bundle savings opportunity.',
                tags: ['home-internet', 'bundle']
            },
            // Business opportunities
            {
                keywords: ['business', 'company', 'employees', 'work phone', 'corporate', 'office', 'team', 'staff'],
                type: 'Business Account',
                priority: 'high',
                suggestion: 'Potential business customer. Discuss Verizon Business solutions, multiple line discounts, and business-specific features like priority data.',
                tags: ['business']
            },
            // Travel needs
            {
                keywords: ['travel', 'international', 'abroad', 'vacation', 'overseas', 'europe', 'mexico', 'canada', 'trip'],
                type: 'International Plan',
                priority: 'medium',
                suggestion: 'Customer travels internationally. Discuss TravelPass ($12/day), Mexico/Canada included plans, and international calling options.',
                tags: ['international']
            },
            // Streaming services
            {
                keywords: ['netflix', 'disney', 'hulu', 'streaming', 'movies', 'watch', 'shows', 'espn', 'apple music'],
                type: 'Entertainment Bundle',
                priority: 'low',
                suggestion: 'Customer interested in entertainment. Highlight Unlimited Plus/Ultimate plans that include Disney+, Hulu, ESPN+, and Apple Music.',
                tags: ['streaming', 'entertainment']
            },
            // Accessories
            {
                keywords: ['case', 'charger', 'headphones', 'airpods', 'screen protector', 'accessories', 'earbuds', 'car mount'],
                type: 'Accessories',
                priority: 'low',
                suggestion: 'Customer mentions accessories. Show relevant accessories and protection plans. OtterBox cases, wireless chargers, and AirPods available.',
                tags: ['accessories']
            },
            // Contract ending
            {
                keywords: ['contract ending', 'contract up', 'lease ending', 'payoff', 'upgrade eligible', 'paid off'],
                type: 'Contract Renewal',
                priority: 'high',
                suggestion: 'Customer\'s contract is ending. Perfect time for upgrade or new device. Check upgrade eligibility and show latest devices with trade-in offers.',
                tags: ['device-upgrade', 'contract']
            },
            // Data usage concerns
            {
                keywords: ['running out of data', 'data limit', 'overage', 'out of data', 'need more data'],
                type: 'Data Upgrade',
                priority: 'high',
                suggestion: 'Customer needs more data. Present unlimited plans or higher data tiers. Show how unlimited eliminates overage charges.',
                tags: ['data', 'unlimited']
            },
            // Watch/tablet opportunities
            {
                keywords: ['apple watch', 'smartwatch', 'watch', 'ipad', 'tablet', 'galaxy watch'],
                type: 'Connected Devices',
                priority: 'medium',
                suggestion: 'Customer interested in connected devices. Discuss Apple Watch, iPad, or Galaxy Watch plans. Show NumberShare and family plan options.',
                tags: ['connected-devices', 'accessories']
            }
        ];

        // Check each pattern
        patterns.forEach(pattern => {
            const matched = pattern.keywords.some(keyword => textLower.includes(keyword));

            if (matched) {
                // Check if we already have this opportunity type in the last 30 seconds
                const recentDuplicate = this.opportunities.some(opp =>
                    opp.type === pattern.type &&
                    (Date.now() - opp.timestamp) < 30000
                );

                if (!recentDuplicate) {
                    const opportunity = {
                        type: pattern.type,
                        priority: pattern.priority,
                        text: text,
                        suggestion: pattern.suggestion,
                        tags: pattern.tags,
                        timestamp: Date.now(),
                        timeString: this.formatTime(new Date())
                    };

                    this.opportunities.push(opportunity);
                    this.currentSession.opportunities.push(opportunity);
                    this.displayOpportunity(opportunity);

                    // Generate recommendations for this opportunity
                    this.generateRecommendations(opportunity);
                }
            }
        });
    }

    displayOpportunity(opportunity) {
        const opportunitiesList = document.getElementById('opportunitiesList');

        // Remove empty state
        const emptyState = opportunitiesList.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove();
        }

        const oppDiv = document.createElement('div');
        oppDiv.className = `opportunity-item ${opportunity.priority === 'high' ? 'high-priority' : ''}`;
        oppDiv.innerHTML = `
            <div class="opportunity-header">
                <span class="opportunity-type">${opportunity.type}</span>
                <span class="opportunity-priority ${opportunity.priority}">${opportunity.priority.toUpperCase()}</span>
            </div>
            <div class="opportunity-text">"${opportunity.text}"</div>
            <div class="opportunity-suggestion">💡 ${opportunity.suggestion}</div>
        `;

        opportunitiesList.insertBefore(oppDiv, opportunitiesList.firstChild);
    }

    generateRecommendations(opportunity) {
        if (typeof VerizonCatalog === 'undefined') {
            return;
        }

        const recs = VerizonCatalog.getRecommendations(opportunity);

        if (recs.plans.length === 0 && recs.devices.length === 0 && recs.accessories.length === 0) {
            return; // No recommendations
        }

        // Show recommendations panel
        const panel = document.getElementById('recommendationsPanel');
        panel.style.display = 'block';

        const recsList = document.getElementById('recommendationsList');

        // Display plan recommendations
        recs.plans.forEach(plan => {
            this.displayRecommendation({
                type: 'plan',
                item: plan,
                reason: recs.reasoning.join(' ')
            });
        });

        // Display device recommendations
        recs.devices.forEach(device => {
            this.displayRecommendation({
                type: 'device',
                item: device,
                reason: recs.reasoning.join(' ')
            });
        });

        // Display accessory recommendations (limited to top 3)
        recs.accessories.slice(0, 3).forEach(accessory => {
            this.displayRecommendation({
                type: 'accessory',
                item: accessory,
                reason: recs.reasoning.join(' ')
            });
        });
    }

    displayRecommendation(rec) {
        const recsList = document.getElementById('recommendationsList');

        const recDiv = document.createElement('div');
        recDiv.className = 'recommendation-card';

        let priceDisplay = '';
        let features = '';

        if (rec.type === 'plan') {
            priceDisplay = `$${rec.item.pricePerLine ? rec.item.pricePerLine[1] : rec.item.price}/mo`;
            features = rec.item.features.slice(0, 4).map(f => `<li>${f}</li>`).join('');
        } else if (rec.type === 'device') {
            priceDisplay = `$${rec.item.monthlyPayment}/mo`;
            features = rec.item.features.slice(0, 3).map(f => `<li>${f}</li>`).join('');
        } else if (rec.type === 'accessory') {
            priceDisplay = `$${rec.item.price}`;
            features = '';
        }

        recDiv.innerHTML = `
            <div class="recommendation-header">
                <span class="recommendation-name">${rec.item.name}</span>
                <span class="recommendation-price">${priceDisplay}</span>
            </div>
            ${features ? `<ul class="recommendation-features">${features}</ul>` : ''}
            <div class="recommendation-footer">
                <span class="recommendation-commission">+$${rec.item.commission} commission</span>
                <button class="btn-add-to-sale" onclick="app.addToSale('${rec.type}', '${rec.item.id}')">Add to Sale</button>
            </div>
        `;

        recsList.appendChild(recDiv);
    }

    addToSale(type, itemId) {
        if (typeof VerizonCatalog === 'undefined') {
            return;
        }

        let item = null;

        // Find the item
        if (type === 'plan') {
            item = [...VerizonCatalog.plans.unlimited, ...VerizonCatalog.plans.prepaid]
                .find(p => p.id === itemId);
        } else if (type === 'device') {
            item = [...VerizonCatalog.devices.iphone, ...VerizonCatalog.devices.samsung, ...VerizonCatalog.devices.other]
                .find(d => d.id === itemId);
        } else if (type === 'accessory') {
            item = VerizonCatalog.accessories.find(a => a.id === itemId);
        }

        if (item) {
            // Check if already added
            const exists = this.currentSale.items.some(i => i.id === itemId);
            if (!exists) {
                this.currentSale.items.push({...item, type});
                this.currentSale.totalCommission += item.commission || 0;
                this.currentSession.saleItems.push({...item, type});
                this.updateCommissionDisplay();

                // Visual feedback
                alert(`Added ${item.name} to sale! +$${item.commission} commission`);
            } else {
                alert('Item already added to sale');
            }
        }
    }

    updateCommissionDisplay() {
        document.getElementById('commissionAmount').textContent =
            `$${this.currentSale.totalCommission}`;
    }

    showCommissionBreakdown() {
        const modal = document.getElementById('commissionModal');
        const breakdown = document.getElementById('commissionBreakdown');

        if (this.currentSale.items.length === 0) {
            breakdown.innerHTML = '<p class="empty-state">No items added to sale yet</p>';
        } else {
            let html = '';
            this.currentSale.items.forEach(item => {
                html += `
                    <div class="commission-item">
                        <span class="commission-item-name">${item.name}</span>
                        <span class="commission-item-amount">$${item.commission || 0}</span>
                    </div>
                `;
            });

            html += `
                <div class="commission-total">
                    <span class="commission-total-label">Total Commission</span>
                    <span class="commission-total-amount">$${this.currentSale.totalCommission}</span>
                </div>
            `;

            breakdown.innerHTML = html;
        }

        modal.style.display = 'flex';
    }

    hideCommissionBreakdown() {
        document.getElementById('commissionModal').style.display = 'none';
    }

    displayProductCatalog(category) {
        if (typeof VerizonCatalog === 'undefined') {
            return;
        }

        const content = document.getElementById('catalogContent');
        content.innerHTML = '';

        if (category === 'plans') {
            VerizonCatalog.plans.unlimited.forEach(plan => {
                this.displayProductCard(plan, 'plan');
            });
        } else if (category === 'devices') {
            [...VerizonCatalog.devices.iphone, ...VerizonCatalog.devices.samsung, ...VerizonCatalog.devices.other]
                .forEach(device => {
                    this.displayProductCard(device, 'device');
                });
        } else if (category === 'home') {
            VerizonCatalog.homeInternet.forEach(home => {
                this.displayProductCard(home, 'home');
            });
        } else if (category === 'accessories') {
            VerizonCatalog.accessories.forEach(acc => {
                this.displayProductCard(acc, 'accessory');
            });
        }
    }

    displayProductCard(item, type) {
        const content = document.getElementById('catalogContent');
        const card = document.createElement('div');
        card.className = 'product-card';

        let priceDisplay = '';
        if (type === 'plan') {
            priceDisplay = `
                <div class="product-price-main">$${item.pricePerLine ? item.pricePerLine[1] : item.price}</div>
                <div class="product-price-sub">per line/mo</div>
            `;
        } else if (type === 'device') {
            priceDisplay = `
                <div class="product-price-main">$${item.monthlyPayment}</div>
                <div class="product-price-sub">/mo or $${item.price}</div>
            `;
        } else {
            priceDisplay = `
                <div class="product-price-main">$${item.price}</div>
                <div class="product-price-sub">${item.discountPrice ? `Reg. $${item.price}` : ''}</div>
            `;
        }

        const features = item.features ?
            item.features.slice(0, 5).map(f => `<li>${f}</li>`).join('') : '';

        card.innerHTML = `
            <div class="product-header">
                <div>
                    ${item.bestFor ? '<span class="product-badge">Recommended</span>' : ''}
                    <div class="product-name">${item.name}</div>
                </div>
                <div class="product-price">${priceDisplay}</div>
            </div>
            ${features ? `<ul class="product-features">${features}</ul>` : ''}
            <div class="product-commission">💰 $${item.commission} commission</div>
        `;

        content.appendChild(card);
    }

    updateTranscriptDisplay(finalText, interimText) {
        const transcriptDiv = document.getElementById('transcript');

        // Remove empty state
        const emptyState = transcriptDiv.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove();
        }

        if (finalText) {
            const transcriptLine = document.createElement('div');
            transcriptLine.className = 'transcript-line';
            transcriptLine.innerHTML = `
                <span class="transcript-time">${this.formatTime(new Date())}</span>
                <span>${finalText}</span>
            `;
            transcriptDiv.appendChild(transcriptLine);
        }

        // Show interim results
        let interimDiv = transcriptDiv.querySelector('.transcript-line.interim');
        if (interimText) {
            if (!interimDiv) {
                interimDiv = document.createElement('div');
                interimDiv.className = 'transcript-line interim';
                transcriptDiv.appendChild(interimDiv);
            }
            interimDiv.innerHTML = `
                <span class="transcript-time">${this.formatTime(new Date())}</span>
                <span>${interimText}</span>
            `;
        } else if (interimDiv) {
            interimDiv.remove();
        }

        // Auto-scroll to bottom
        transcriptDiv.scrollTop = transcriptDiv.scrollHeight;
    }

    formatTime(date) {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    saveSession() {
        // Get notes
        this.currentSession.notes = document.getElementById('quickNotes').value;
        this.currentSession.commission = this.currentSale.totalCommission;
        this.currentSession.saleItems = this.currentSale.items;

        // Save to localStorage
        const sessions = this.getSavedSessions();
        sessions.push(this.currentSession);
        localStorage.setItem('verizonSalesSessions', JSON.stringify(sessions));

        alert(`Session saved! Total Commission: $${this.currentSession.commission}`);
    }

    getSavedSessions() {
        const saved = localStorage.getItem('verizonSalesSessions');
        return saved ? JSON.parse(saved) : [];
    }

    exportSession() {
        const notes = document.getElementById('quickNotes').value;

        let exportText = '═══════════════════════════════════════\n';
        exportText += '   VERIZON SALES FINDER - SESSION EXPORT\n';
        exportText += '═══════════════════════════════════════\n\n';

        if (this.sessionStartTime) {
            exportText += `Session Date: ${this.sessionStartTime.toLocaleDateString()}\n`;
            exportText += `Session Time: ${this.sessionStartTime.toLocaleTimeString()}\n`;
        }

        if (this.currentSession.endTime) {
            const duration = Math.floor((this.currentSession.endTime - this.sessionStartTime) / 1000 / 60);
            exportText += `Duration: ${duration} minutes\n`;
        }

        exportText += `Total Commission: $${this.currentSale.totalCommission}\n`;

        exportText += `\n${'─'.repeat(39)}\n`;
        exportText += `OPPORTUNITIES DETECTED: ${this.opportunities.length}\n`;
        exportText += `${'─'.repeat(39)}\n\n`;

        if (this.opportunities.length > 0) {
            this.opportunities.forEach((opp, index) => {
                exportText += `${index + 1}. [${opp.priority.toUpperCase()}] ${opp.type}\n`;
                exportText += `   Quote: "${opp.text}"\n`;
                exportText += `   Suggestion: ${opp.suggestion}\n\n`;
            });
        }

        if (this.currentSale.items.length > 0) {
            exportText += `\n${'─'.repeat(39)}\n`;
            exportText += 'SALE ITEMS\n';
            exportText += `${'─'.repeat(39)}\n\n`;
            this.currentSale.items.forEach(item => {
                exportText += `• ${item.name} - $${item.commission} commission\n`;
            });
            exportText += `\nTOTAL COMMISSION: $${this.currentSale.totalCommission}\n`;
        }

        exportText += `\n${'─'.repeat(39)}\n`;
        exportText += 'FULL TRANSCRIPT\n';
        exportText += `${'─'.repeat(39)}\n\n`;

        this.transcript.forEach(entry => {
            exportText += `[${entry.timeString}] ${entry.text}\n`;
        });

        if (notes) {
            exportText += `\n${'─'.repeat(39)}\n`;
            exportText += 'NOTES\n';
            exportText += `${'─'.repeat(39)}\n\n`;
            exportText += notes;
        }

        exportText += '\n\n═══════════════════════════════════════\n';
        exportText += 'Generated by Verizon Sales Finder App\n';
        exportText += '═══════════════════════════════════════\n';

        // Create download
        const blob = new Blob([exportText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `verizon-session-${Date.now()}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }

    newSession() {
        if (this.isListening) {
            this.stopSession();
        }

        // Reset session
        this.transcript = [];
        this.opportunities = [];
        this.recommendations = [];
        this.currentSale = {
            items: [],
            totalCommission: 0
        };
        this.currentSession = {
            id: null,
            startTime: null,
            endTime: null,
            transcript: [],
            opportunities: [],
            recommendations: [],
            saleItems: [],
            notes: '',
            commission: 0
        };

        // Clear displays
        document.getElementById('transcript').innerHTML = '<p class="empty-state">Transcript will appear here...</p>';
        document.getElementById('opportunitiesList').innerHTML = '<p class="empty-state">Start conversation to detect opportunities...</p>';
        document.getElementById('recommendationsList').innerHTML = '';
        document.getElementById('recommendationsPanel').style.display = 'none';
        document.getElementById('quickNotes').value = '';
        document.getElementById('sessionTime').textContent = '00:00';
        this.updateCommissionDisplay();

        // Show consent screen
        this.showScreen('consentScreen');
    }

    loadHistory() {
        // Load sessions from localStorage on app start
        const sessions = this.getSavedSessions();
        console.log(`Loaded ${sessions.length} saved sessions`);
    }

    displayHistory() {
        const historyList = document.getElementById('historyList');
        const sessions = this.getSavedSessions();

        if (sessions.length === 0) {
            historyList.innerHTML = '<p class="empty-state">No saved sessions yet.</p>';
            return;
        }

        historyList.innerHTML = '';

        // Sort by most recent first
        sessions.sort((a, b) => b.startTime - a.startTime);

        sessions.forEach((session, index) => {
            const startDate = new Date(session.startTime);
            const duration = session.endTime ?
                Math.floor((new Date(session.endTime) - startDate) / 1000 / 60) : 0;

            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="history-item-header">
                    <div>
                        <div class="history-item-date">${startDate.toLocaleDateString()} ${startDate.toLocaleTimeString()}</div>
                        <div class="history-item-duration">${duration} minutes</div>
                    </div>
                </div>
                <div class="history-item-stats">
                    <div class="stat">
                        <div class="stat-value">${session.opportunities.length}</div>
                        <div class="stat-label">Opportunities</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">${session.transcript.length}</div>
                        <div class="stat-label">Transcripts</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">$${session.commission || 0}</div>
                        <div class="stat-label">Commission</div>
                    </div>
                </div>
                <div class="history-item-actions">
                    <button class="btn btn-primary" onclick="app.viewSession(${index})">View</button>
                    <button class="btn btn-secondary" onclick="app.deleteSession(${index})">Delete</button>
                </div>
            `;
            historyList.appendChild(historyItem);
        });
    }

    viewSession(index) {
        const sessions = this.getSavedSessions();
        const session = sessions[index];

        // Load session into current view
        this.currentSession = session;
        this.transcript = session.transcript;
        this.opportunities = session.opportunities;

        // Update displays
        const transcriptDiv = document.getElementById('transcript');
        transcriptDiv.innerHTML = '';
        session.transcript.forEach(entry => {
            const transcriptLine = document.createElement('div');
            transcriptLine.className = 'transcript-line';
            transcriptLine.innerHTML = `
                <span class="transcript-time">${entry.timeString}</span>
                <span>${entry.text}</span>
            `;
            transcriptDiv.appendChild(transcriptLine);
        });

        const opportunitiesList = document.getElementById('opportunitiesList');
        opportunitiesList.innerHTML = '';
        session.opportunities.forEach(opp => this.displayOpportunity(opp));

        document.getElementById('quickNotes').value = session.notes || '';

        // Update commission if available
        if (session.commission) {
            this.currentSale.totalCommission = session.commission;
            this.updateCommissionDisplay();
        }

        // Switch to app screen
        this.showScreen('appScreen');
        this.setActiveNav('navHome');
    }

    deleteSession(index) {
        if (confirm('Are you sure you want to delete this session?')) {
            const sessions = this.getSavedSessions();
            sessions.splice(index, 1);
            localStorage.setItem('verizonSalesSessions', JSON.stringify(sessions));
            this.displayHistory();
        }
    }
}

// Initialize app
let app;
window.addEventListener('DOMContentLoaded', () => {
    app = new SalesFinder();
});
