# Omni 2.0 Clone - Verizon Wireless Practice Application

A comprehensive clone of Verizon Wireless Omni 2.0 customer portal for practice and learning purposes. Built with React, TypeScript, and modern web technologies.

## Overview

This is a fully functional prototype of a customer service portal similar to Verizon's Omni 2.0 platform. It includes all major features for managing mobile accounts, devices, billing, and support.

## Features

### Authentication
- Modern login interface with phone number and password
- Demo mode (accepts any 10-digit phone number and password)
- Session management with protected routes

### Dashboard
- Account overview with key metrics
- Real-time statistics (balance, data usage, billing cycle)
- Recent activity feed
- Quick action buttons
- Device summary

### Account Management
- Personal information display
- Account details and status
- Security settings (2FA, password, security questions)
- Authorized users management

### Billing & Payments
- Current balance and due dates
- Payment method management
- Billing statement history
- Auto-pay configuration
- Downloadable statements

### Usage Tracking
- Data usage with visual progress bars
- Voice minutes tracking
- Text message statistics
- Usage breakdown by device
- Historical usage data

### Device Management
- Multi-device support (phones, tablets, watches)
- Device details and specifications
- Connection status and battery levels
- Device activation/deactivation
- Protection and upgrade options

### Plans & Services
- Current plan display
- Multiple plan tiers (Welcome, Plus, Ultimate)
- Plan comparison table
- Add-ons and additional services
- Upgrade options

### Support Center
- Live chat, phone, and email support
- Comprehensive FAQ sections
- Self-service resources
- Support ticket management
- Troubleshooting guides

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Routing
- **Lucide React** - Icon library
- **CSS3** - Styling with custom properties

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd RSGREEN
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
RSGREEN/
├── src/
│   ├── components/
│   │   ├── Layout.tsx          # Main layout with sidebar navigation
│   │   └── Layout.css
│   ├── pages/
│   │   ├── Login.tsx           # Login/authentication page
│   │   ├── Dashboard.tsx       # Main dashboard
│   │   ├── AccountOverview.tsx # Account management
│   │   ├── Billing.tsx         # Billing and payments
│   │   ├── Usage.tsx           # Usage tracking
│   │   ├── Devices.tsx         # Device management
│   │   ├── Plans.tsx           # Plans and services
│   │   ├── Support.tsx         # Help and support
│   │   └── *.css               # Component styles
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── index.html                  # HTML template
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite configuration
└── README.md                   # This file
```

## Usage Guide

### Login
- Enter any 10-digit phone number (e.g., 555-123-4567)
- Enter any password
- Click "Sign In"

### Navigation
- Use the sidebar to navigate between different sections
- All pages are fully functional with realistic demo data
- The header contains a logout button

### Features to Explore
1. **Dashboard** - View account summary and quick actions
2. **Account** - Manage personal information and security
3. **Billing** - View bills and manage payments
4. **Usage** - Track data, calls, and texts
5. **Devices** - Manage connected devices
6. **Plans** - View and compare plans
7. **Support** - Access help resources

## Design Features

### Visual Design
- Verizon brand colors (black and red)
- Modern gradient backgrounds
- Card-based layouts
- Responsive design for mobile and desktop
- Smooth transitions and hover effects

### User Experience
- Intuitive navigation
- Clear visual hierarchy
- Interactive elements with feedback
- Progress bars and statistics
- Status badges and notifications

## Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Demo Data

The application uses realistic demo data for:
- User account (John Anderson)
- Multiple devices (iPhone, Apple Watch, iPad)
- Billing history
- Usage statistics
- Support tickets

## Future Enhancements

Potential features to add:
- Backend API integration
- Real user authentication
- Database for persistent data
- Payment gateway integration
- Live chat functionality
- Push notifications
- Dark mode theme
- Multi-language support

## Learning Resources

This project demonstrates:
- React component architecture
- TypeScript for type safety
- React Router for navigation
- CSS styling best practices
- Responsive design patterns
- State management
- Protected routes
- Form handling

## License

This is a practice/learning project. All Verizon trademarks and brand elements are property of Verizon Communications Inc.

## Disclaimer

This is an unofficial clone created for educational and practice purposes only. It is not affiliated with, endorsed by, or connected to Verizon Wireless or Verizon Communications Inc.

## Contact

For questions or feedback about this project, please open an issue in the repository.

---

Built with React, TypeScript, and modern web technologies.
