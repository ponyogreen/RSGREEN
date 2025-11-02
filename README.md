# 🎯 Verizon Sales Finder App

A real-time conversation analysis tool for Verizon sales associates to discover sales opportunities during customer interactions.

## Features

### 🎤 Real-Time Speech Recognition
- Uses Web Speech API to transcribe conversations in real-time
- Continuous listening with automatic restart
- Pause/resume functionality
- Live transcript display with timestamps

### 🎯 Intelligent Opportunity Detection
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

### 📋 Session Management
- Save conversation sessions with notes
- View conversation history
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

7. **End Session**
   - Click "⏹ Stop Session" when done
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
├── index.html      # Main app interface
├── styles.css      # Verizon-branded styling
├── app.js          # Core application logic
└── README.md       # This file
```

### Opportunity Detection Patterns

The app uses keyword matching to identify opportunities:

```javascript
// Example patterns:
- Carrier mentions → Carrier Switch opportunity
- "expensive", "too much" → Price Concern
- "slow data", "no signal" → Coverage Issue
- "old phone", "battery dies" → Device Upgrade
// ... and 12 more patterns
```

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

## Future Enhancements

Potential features for future versions:
- [ ] Product catalog integration
- [ ] CRM export functionality
- [ ] Custom opportunity patterns
- [ ] Multi-language support
- [ ] Offline AI analysis
- [ ] Sales coaching tips
- [ ] Performance analytics

## Support

For issues or questions:
- Check browser compatibility
- Verify microphone permissions
- Clear browser cache and reload

## License

Internal tool for Verizon sales associates.

---

**Built for Verizon Sales Associates** | Version 1.0
