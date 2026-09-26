# FitLog - Workout Library & Planner

This is my assignment project for B14-A6. FitLog is a dark themed workout library where you can browse lifts, check details, and add them to a daily plan or save them for later.

## Technologies Used
- Next.js (App Router)
- React
- Tailwind CSS
- react-hot-toast (for notifications)
- lucide-react (icons)

## Features
1. Home page fetches 12 workouts from the API and shows them in a responsive 3x4 grid, with a loading spinner while the data is coming in.
2. Dynamic details page for every workout (`/workout/[id]`) with specs, instructions, and two action buttons - Add to today's plan and Save for later.
3. My Plan page with Today's Plan / Saved tabs, live Exercises / Minutes / Calories totals, sort by Duration / Calories / Rating, Mark as Done, and a remove (X) button on every card.
4. Data is saved in localStorage so the plan doesn't disappear on refresh, plus a 5-lift cap on today's plan.
5. Toast notifications for every action (add, save, remove, mark as done), and a custom 404 page for invalid routes.

## Things that gave me trouble
- Getting duration, calories, rating etc. to actually be dynamic (pulled from the API and updating live in the navbar badges and the My Plan metrics) took a few tries. At first I was showing static numbers from the Figma design and had to rewire everything to come from state instead.
- Keeping the Plan/Saved counts in sync between the navbar and the My Plan page - I was updating one but not the other until I moved everything into one shared context.
- Making the layout match the Figma/Penpot design on mobile without breaking the card grid was fiddly, had to test a lot of screen sizes.
- Handling the toast + localStorage + navbar badge all updating at the same moment from one button click, without it feeling laggy or showing wrong numbers for a second.

## Getting Started
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## API Used
- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`

## Live Links
- Live Site: (add after deploying)
- GitHub Repo: (add your repo link)
