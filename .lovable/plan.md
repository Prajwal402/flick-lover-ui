

# Netflix-Style Movie Browser 🎬

## Overview
A sleek, Netflix-inspired movie browsing app with a dark black & red theme, featuring a hero banner, horizontal scrolling movie rows, and smooth hover animations — all powered by the OMDB API.

## Design & Theme
- **Dark theme**: Deep black background with Netflix-signature red accents
- **Typography**: Bold, clean fonts for titles and descriptions
- **Fully responsive**: Optimized for mobile, tablet, and desktop

## Key Features

### 1. Navigation Bar
- Netflix-style top navbar with logo/brand name
- Fixed position with transparent-to-dark scroll effect

### 2. Hero Banner
- Large featured movie section with backdrop image
- Movie title, description, and "Play" / "More Info" buttons
- Gradient overlay for text readability

### 3. Movie Category Rows
- Horizontal scrollable rows for each category:
  - **Trending Now**
  - **Popular**
  - **Top Rated**
  - **Action**
  - **Drama**
- Each row populated using curated OMDB API search queries

### 4. Movie Cards
- Poster image display
- Hover animation: scale up + shadow + slight z-index lift
- Smooth CSS transitions
- Click to view movie details

### 5. Movie Detail Modal
- Opens on card click showing:
  - Full poster, title, year, rating
  - Plot summary, genre, director, actors
  - Smooth fade-in animation

### 6. Data Integration
- OMDB API integration using the provided API key
- Curated keyword searches to populate each category row
- Loading skeletons while data fetches

