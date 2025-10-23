# 🪜 Climb the Ladder - Radiology Training Game

An interactive educational game for first-year radiology residents.

## Game Overview

**Objective:** Climb from Rung 3 (Med Student level) to Rung 10 (Attending level) by answering radiology questions correctly.

**Mechanics:**
- ✅ Correct answer → Move UP 1 rung
- ❌ Wrong answer → Drop DOWN 2 rungs
- Pass → Stay in place (2 passes per game)

**Features:**
- 8 carefully curated questions across difficulty levels
- Multiple images per question for complex cases
- Timed questions (20-30 seconds based on difficulty)
- 2 lifelines: Ask the Audience, Safety Net
- Real-time leaderboard
- Teaching points after every answer

## Technology Stack

- **Frontend:** React 18 with Vite
- **Backend:** Supabase (PostgreSQL)
- **Hosting:** Vercel
- **Styling:** Tailwind CSS

## Deployment

See `DEPLOYMENT_GUIDE.md` for complete step-by-step instructions.

## Project Structure

```
radladder-game/
├── src/
│   ├── components/         # React components
│   │   ├── game/          # Game-specific components
│   │   ├── LandingPage.jsx
│   │   ├── NameEntry.jsx
│   │   ├── GameScreen.jsx
│   │   ├── Leaderboard.jsx
│   │   └── HowToPlay.jsx
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # React entry point
│   ├── supabaseClient.js  # Database client
│   └── index.css          # Global styles
├── database/
│   ├── schema.sql         # Database tables
│   └── insert_questions.sql  # Your 8 questions
├── package.json           # Dependencies
└── vite.config.js         # Build configuration
```

## Questions Included

1. **Rung 3:** Croup (steeple sign)
2. **Rung 4:** Mesenteric hematoma (3 images)
3. **Rung 5:** Cavernous sinus anatomy
4. **Rung 5:** Button battery ingestion
5. **Rung 6:** Scleroderma (2 images)
6. **Rung 6:** Cerebral AVM (4 images)
7. **Rung 7:** Liver microabscesses (2 images)
8. **Rung 8:** Hepatic steatosis VQ scan (2 images)

**Total: 16 images across 8 questions**

## License

Educational use only.

## Credits

Created for radiology resident education.
