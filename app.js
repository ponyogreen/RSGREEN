// Verizon Sales Finder App
// Real-time conversation analysis for sales opportunities

class SalesFinder {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.isPaused = false;
        this.sessionStartTime = null;
        this.sessionTimer = null;
        this.transcript = [];
        this.opportunities = [];
        this.currentSession = {
            id: null,
            startTime: null,
            endTime: null,
            transcript: [],
            opportunities: [],
            notes: ''
        };

        this.init();
    }

    init() {
        this.setupSpeechRecognition();
        this.setupEventListeners();
        this.loadHistory();
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

        // Navigation
        document.getElementById('navHome').addEventListener('click', () => {
            this.showScreen('appScreen');
            this.setActiveNav('navHome');
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

        // Define opportunity patterns
        const patterns = [
            // Carrier switching opportunities
            {
                keywords: ['at&t', 'att', 't-mobile', 'tmobile', 'sprint', 'cricket', 'metro'],
                type: 'Carrier Switch',
                priority: 'high',
                suggestion: 'Customer mentions competitor carrier. Discuss Verizon\'s superior coverage and network reliability. Offer to check switch savings.'
            },
            // Bill/pricing concerns
            {
                keywords: ['expensive', 'too much', 'high bill', 'costly', 'cheaper', 'save money', 'afford'],
                type: 'Price Concern',
                priority: 'high',
                suggestion: 'Customer mentions price concerns. Present unlimited plans, family discounts, or promotional offers. Calculate potential savings.'
            },
            // Coverage issues
            {
                keywords: ['no signal', 'bad coverage', 'drops calls', 'slow data', 'no service', 'dead zone'],
                type: 'Coverage Issue',
                priority: 'high',
                suggestion: 'Customer has coverage issues. Highlight Verizon\'s nationwide 5G network. Show coverage map for their area.'
            },
            // Device upgrade opportunities
            {
                keywords: ['old phone', 'battery dies', 'slow phone', 'broken screen', 'new phone', 'upgrade'],
                type: 'Device Upgrade',
                priority: 'high',
                suggestion: 'Customer may need device upgrade. Show latest iPhone/Samsung models. Discuss trade-in value and payment plans.'
            },
            // 5G opportunities
            {
                keywords: ['5g', 'faster internet', 'slow internet', 'streaming', 'gaming'],
                type: '5G Upgrade',
                priority: 'medium',
                suggestion: 'Customer interested in speed/performance. Highlight 5G capabilities and compatible devices. Discuss 5G plan options.'
            },
            // Family plan opportunities
            {
                keywords: ['family', 'kids', 'spouse', 'husband', 'wife', 'children', 'multiple lines'],
                type: 'Family Plan',
                priority: 'medium',
                suggestion: 'Customer mentions family members. Present family plan options with per-line savings. Discuss parental controls and Apple Watch options.'
            },
            // Home internet opportunities
            {
                keywords: ['home internet', 'wifi', 'broadband', 'cable', 'xfinity', 'spectrum'],
                type: 'Home Internet',
                priority: 'medium',
                suggestion: 'Customer mentions home internet. Introduce Verizon 5G Home Internet or Fios. Bundle savings opportunity.'
            },
            // Business opportunities
            {
                keywords: ['business', 'company', 'employees', 'work phone', 'corporate'],
                type: 'Business Account',
                priority: 'high',
                suggestion: 'Potential business customer. Discuss Verizon Business solutions, multiple line discounts, and business-specific features.'
            },
            // Travel needs
            {
                keywords: ['travel', 'international', 'abroad', 'vacation', 'overseas'],
                type: 'International Plan',
                priority: 'medium',
                suggestion: 'Customer travels internationally. Discuss TravelPass and international calling options.'
            },
            // Streaming services
            {
                keywords: ['netflix', 'disney', 'hulu', 'streaming', 'movies', 'watch'],
                type: 'Entertainment Bundle',
                priority: 'low',
                suggestion: 'Customer interested in entertainment. Highlight plans that include Disney+, Hulu, or other streaming perks.'
            },
            // Accessories
            {
                keywords: ['case', 'charger', 'headphones', 'airpods', 'screen protector', 'accessories'],
                type: 'Accessories',
                priority: 'low',
                suggestion: 'Customer mentions accessories. Show relevant accessories and protection plans.'
            },
            // Contract ending
            {
                keywords: ['contract ending', 'contract up', 'lease ending', 'payoff'],
                type: 'Contract Renewal',
                priority: 'high',
                suggestion: 'Customer\'s contract is ending. Perfect time for upgrade or new device. Check upgrade eligibility.'
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
                        timestamp: Date.now(),
                        timeString: this.formatTime(new Date())
                    };

                    this.opportunities.push(opportunity);
                    this.currentSession.opportunities.push(opportunity);
                    this.displayOpportunity(opportunity);
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

        // Save to localStorage
        const sessions = this.getSavedSessions();
        sessions.push(this.currentSession);
        localStorage.setItem('verizonSalesSessions', JSON.stringify(sessions));

        alert('Session saved successfully!');
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
        this.currentSession = {
            id: null,
            startTime: null,
            endTime: null,
            transcript: [],
            opportunities: [],
            notes: ''
        };

        // Clear displays
        document.getElementById('transcript').innerHTML = '<p class="empty-state">Transcript will appear here...</p>';
        document.getElementById('opportunitiesList').innerHTML = '<p class="empty-state">Start conversation to detect opportunities...</p>';
        document.getElementById('quickNotes').value = '';
        document.getElementById('sessionTime').textContent = '00:00';

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
