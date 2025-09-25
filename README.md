# PineTribe - Move in Nature. Meet your Tribe. Grow Together.

A modern outdoor fitness community app built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🌲 **Onboarding Flow**: Welcome screens and profile setup
- 🎫 **Digital Membership**: QR code membership card
- 🏃 **Activity Booking**: Class timetable and booking system
- 📊 **Progress Tracking**: Badges, streaks, and achievements
- 👥 **Group Formation**: Find your tribe and social features
- 🧊 **Icebreaker Social**: Break the Pinecone with fun prompts
- ⚙️ **Settings**: Profile management and preferences

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **QR Codes**: qrcode library
- **Calendar**: react-big-calendar

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── (auth)/         # Authentication pages
│   ├── dashboard/      # Main app dashboard
│   └── globals.css     # Global styles
├── components/         # Reusable UI components
├── lib/               # Utilities and stores
└── types/             # TypeScript definitions
```

## Design System

- **Colors**: Forest green (#2D5016), Pine brown (#8B4513), Soft beige (#F5F5DC)
- **Typography**: Inter font family
- **Components**: Card-based layouts with rounded corners and subtle shadows

## Features Overview

### Onboarding
- Multi-step welcome flow
- Quick signup with email/social
- Profile setup with fitness level and interests

### Membership
- Digital membership card with QR code
- Plan details and renewal information
- Guest pass sharing

### Activities
- Class timetable with filtering
- One-tap booking system
- Instructor ratings and class details

### Progress
- Badge system with different rarities
- Streak tracking and monthly goals
- Activity history and achievements

### Groups
- Join existing tribes or create new ones
- Group chat and coordination
- Icebreaker prompts for social bonding

### Settings
- Profile management
- Notification preferences
- Privacy controls

## Mock Data

The app uses localStorage to simulate user data and backend functionality. All interactions are fully functional prototypes without requiring a real backend.

## Contributing

This is a prototype application. Feel free to extend and modify as needed for your specific requirements.
