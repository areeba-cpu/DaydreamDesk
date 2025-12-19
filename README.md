# DaydreamDesk 🌸

DaydreamDesk is a serene, desktop-based productivity web application designed
to help users manage time, focus, and planning in a calm and gentle way.
Inspired by cozy productivity tools like Momentum, it emphasizes minimalism,
soft visuals, and mindful interaction.

## Features
- Tomato-shaped Pomodoro timer with pause/reset
- Random motivational mantras
- Real-time weather and daily forecast
- Calendar-style planner with note saving
- Self-hosted ambient soundboard
- Night mode for evening use
- Animated cloud visuals
- Responsive desktop web layout

## Target Users
- College students
- Creatives
- Remote workers
- Anyone who struggles with focus in high-pressure productivity tools

## Target Browsers
- Chrome (Desktop)
- Firefox (Desktop)
- Safari (Desktop)

## Technologies Used
- HTML & CSS (layout and styling)
- JavaScript (application logic)
- Open-Meteo API (weather & forecast)
- Supabase (planner note storage)
- Vercel (deployment)

## APIs
**Open-Meteo Weather API**
- Provides real-time temperature and daily forecast
- No authentication required

**Supabase**
- Stores planner notes
- Acts as backend database and API layer


## Installation
1. Clone the repository
2. Run `npm install`
3. Create a `.env` file with Supabase keys
4. Run `npm run dev`

## Running the Server
- Node.js backend using Express
- Front-end served via Vercel

## API Endpoints
GET /api/todos – Retrieves saved planner items  
POST /api/todos – Saves updated planner items  

## Known Bugs
- Mobile layout not fully optimized
- Limited planner filtering

## Future Roadmap
- User accounts
- Productivity analytics
- Sound layering
- Mobile optimization

## Author
Areeba Rehman  
© 2025 DaydreamDesk

