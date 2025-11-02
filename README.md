# 🎯 Verizon Sales Finder App

A real-time conversation analysis tool for Verizon sales associates to discover sales opportunities during customer interactions, with integrated product recommendations and commission tracking.

## Features

### 🎤 Real-Time Speech Recognition
- Uses Web Speech API to transcribe conversations in real-time
- Continuous listening with automatic restart
- Pause/resume functionality
- Live transcript display with timestamps

### 🎯 Intelligent Opportunity Detection (14 Patterns)
The app automatically identifies sales opportunities including:
- **Carrier Switch** - Detects mentions of competitor carriers (AT&T, T-Mobile, etc.)
- **Price Concerns** - Identifies budget/pricing discussions
- **Coverage Issues** - Flags network quality problems
- **Device Upgrades** - Spots old phone or device issues
- **5G Opportunities** - Recognizes speed/performance needs
- **Family Plans** - Detects multiple line opportunities
- **Home Internet** - Identifies bundling opportunities
- **Business Accounts** - Flags business customer potential
- **International Plans** - Catches travel discussions
- **Entertainment Bundles** - Notes streaming service mentions
- **Accessories** - Identifies accessory needs
- **Contract Renewals** - Detects ending contracts
- **Data Upgrades** - Recognizes data usage concerns
- **Connected Devices** - Spots Apple Watch, iPad, tablet needs

### 💡 Smart Product Recommendations
- **Auto-generated recommendations** based on detected opportunities
- **Contextual matching** - Shows relevant plans, devices, and accessories
- **One-click add to sale** - Build your sale as you talk
- **Reasoning provided** - Understand why each product was recommended

### 💰 Commission Tracking
- **Real-time commission calculator** - See potential earnings as you add items
- **Detailed breakdown** - View commission per item
- **Session totals** - Track total commission for each customer interaction
- **Animated display** - Eye-catching commission counter

### 📱 Product Catalog
- **Complete Verizon lineup** - Unlimited plans, prepaid, devices, accessories
- **Current pricing** - 2024-2025 pricing with multi-line discounts
- **Commission data** - Know your earnings for each product
- **Easy navigation** - Tabbed interface for quick reference

### 📋 Session Management
- Save conversation sessions with notes and commission data
- View conversation history with commission totals
- Export sessions as formatted text files
- Quick notes field for customer details

### 🔒 Privacy First
- Clear customer consent screen before starting
- All data stored locally on device
- No cloud storage or external transmission
- Customer can request to stop at any time

## How to Use

### Getting Started

1. **Open the App**
   - Open `index.html` in a web browser (Chrome or Edge recommended)
   - The app works best on mobile devices for in-store use

2. **Customer Consent**
   - Show the consent screen to your customer
   - Explain that the conversation will be recorded and transcribed
   - Click "Customer Consents - Start" to proceed

3. **Start Listening**
   - Click the "▶ Start Listening" button
   - The app will begin transcribing in real-time
   - Watch for opportunities to appear in the Opportunities panel

4. **During Conversation**
   - Speak naturally with your customer
   - The app listens for keywords and phrases
   - Opportunities are highlighted with priority levels:
     - **HIGH** - Strong sales opportunity (red)
     - **MEDIUM** - Potential opportunity (orange)
     - **LOW** - Additional product suggestion (blue)

5. **Use the Suggestions**
   - Each opportunity includes a suggested approach
   - Use these as talking points during the conversation
   - Reference the specific customer quote shown

6. **Take Notes**
   - Add customer name, callback number, or other details in the Quick Notes field
   - Notes are saved with the session

7. **Use Smart Recommendations**
   - Recommendations appear automatically based on detected opportunities
   - Review suggested plans, devices, and accessories
   - Click "Add to Sale" to track commission
   - Watch your potential commission grow in real-time

8. **Track Your Commission**
   - See total commission at the top of the screen
   - Click "View Breakdown" to see itemized commission
   - Add or remove items as needed

9. **Browse Product Catalog**
   - Tap the "Catalog" tab to view all products
   - Switch between Plans, Devices, Home Internet, and Accessories
   - Quick reference for pricing and commission

10. **End Session**
    - Click "⏹ Stop Session" when done
    - Review total commission earned
    - Choose to save the session
    - Export as text file if needed

### Browser Compatibility

**Recommended:**
- Google Chrome (desktop/mobile)
- Microsoft Edge (desktop/mobile)

**Limited Support:**
- Safari (limited speech recognition)
- Firefox (no speech recognition)

**Note:** Speech recognition requires microphone permission. Allow microphone access when prompted.

## Technical Details

### Technologies Used
- **HTML5** - Structure and semantic markup
- **CSS3** - Verizon-branded styling with responsive design
- **Vanilla JavaScript** - No frameworks or dependencies
- **Web Speech API** - Speech recognition functionality
- **LocalStorage** - Session persistence

### File Structure
```
RSGREEN/
├── index.html           # Main app interface with all UI components
├── styles.css           # Verizon-branded styling and animations
├── app.js               # Core application logic with recommendations
├── product-catalog.js   # Product data and commission calculator
└── README.md            # This file
```

### Opportunity Detection Patterns

The app uses advanced keyword matching to identify 14 distinct opportunity types:

```javascript
// Example patterns:
- Carrier mentions (AT&T, T-Mobile, etc.) → Carrier Switch
- "expensive", "save money" → Price Concern
- "slow data", "no signal" → Coverage Issue
- "old phone", "battery dies" → Device Upgrade
- "5G", "streaming", "gaming" → 5G Upgrade
- "family", "kids", "spouse" → Family Plan
- "wifi", "home internet" → Home Internet
- "business", "employees" → Business Account
- "travel", "international" → International Plan
- "running out of data" → Data Upgrade
- "apple watch", "ipad" → Connected Devices
// ... and more with contextual recommendations
```

### Product Catalog Contents

**Unlimited Plans:**
- Unlimited Welcome ($30-65/mo per line)
- Unlimited Plus ($45-80/mo per line) - Includes Disney Bundle
- Unlimited Ultimate ($55-90/mo per line) - Premium with international

**Devices:**
- iPhone 15 Pro Max, iPhone 15, iPhone 14
- Galaxy S24 Ultra, S24, A54
- Google Pixel 8 Pro
- Trade-in values up to $800

**Home Internet:**
- Fios (300 Mbps, 500 Mbps, Gigabit)
- 5G Home Internet ($25 with mobile bundle)

**Accessories:**
- Cases, screen protectors, chargers
- AirPods Pro, Galaxy Buds
- Device protection plans

## Usage Tips

1. **Position Your Device**
   - Place phone/tablet between you and the customer
   - Ensure clear audio path to microphone

2. **Speak Clearly**
   - Encourage customer to speak naturally
   - Brief pauses help the app process speech

3. **Review Opportunities**
   - Glance at the opportunities panel during natural breaks
   - Use suggestions as conversation guides

4. **Save Important Sessions**
   - Save sessions with high-value opportunities
   - Export for later review or CRM entry

5. **Privacy Matters**
   - Always get explicit consent
   - Respect customer wishes to decline
   - Delete sessions after use if requested

## Privacy & Data

- **Local Storage Only** - All data stays on your device
- **No Cloud Sync** - Nothing is uploaded to external servers
- **No Analytics** - No tracking or monitoring
- **Manual Deletion** - You control when data is deleted

## Troubleshooting

### Speech recognition not working
- Ensure you're using Chrome or Edge
- Check microphone permissions in browser settings
- Test microphone with another app first

### No opportunities detected
- Ensure conversation includes relevant keywords
- Check that the app is actively listening (red dot)
- Speak clearly and naturally

### App stops listening
- The app auto-restarts after brief pauses
- Click Resume if paused manually
- Restart browser if issues persist

## What's New in Version 2.0

**Recently Added:**
- ✅ Product catalog integration with full Verizon lineup
- ✅ Real-time commission tracking and calculator
- ✅ Smart product recommendations based on opportunities
- ✅ Enhanced opportunity detection (14 patterns)
- ✅ Commission breakdown modal
- ✅ Sale builder functionality

## Future Enhancements

Potential features for future versions:
- [ ] CRM export functionality (Salesforce integration)
- [ ] Custom opportunity patterns (user-defined keywords)
- [ ] Multi-language support (Spanish, etc.)
- [ ] Offline AI analysis with local models
- [ ] Sales coaching tips and best practices
- [ ] Performance analytics and leaderboards
- [ ] Team collaboration features
- [ ] SMS/Email quote sender
- [ ] Customer follow-up reminders

## Support

For issues or questions:
- Check browser compatibility
- Verify microphone permissions
- Clear browser cache and reload

## License

Internal tool for Verizon sales associates.

---

**Built for Verizon Sales Associates** | Version 2.0 | Enhanced Edition
