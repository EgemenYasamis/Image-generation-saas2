# AI Image Generation SaaS

This is a full-stack SaaS application that allows users to generate images through a chat-based interface.

The project was initially developed using Google Gemini APIs during the prototyping phase. In the production version, Wiro AI APIs were integrated for text-to-image generation.

## Overview

Users can:

- Register and log in securely
- Start new chats
- Generate images using prompts
- View previous chat history
- Store generated image data in the database

The application follows a secure backend proxy architecture, meaning AI API keys are never exposed on the client side.

## Tech Stack

Frontend:
- React (Vite)
- Tailwind CSS
- React Router
- Axios

Backend:
- Node.js
- Express.js
- RESTful API structure

Database & Authentication:
- Supabase (PostgreSQL)
- Supabase Auth (Email/Password)
- Row Level Security (RLS)

AI Integration:
- Google Gemini API (initial prototype)
- Wiro AI API (production image generation)

## Architecture

Client (React + Vite)  
→ Node.js Backend  
→ AI Provider (Gemini / Wiro AI)  
→ Supabase (Auth + Database)

The backend acts as a secure intermediary between the frontend and the AI provider.

## Environment Variables

Backend `.env`:

WIRO_API_KEY=your_key  
GEMINI_API_KEY=your_key  
SUPABASE_URL=your_url  
SUPABASE_SERVICE_ROLE_KEY=your_key  
JWT_SECRET=your_secret  

Frontend `.env`:

VITE_SUPABASE_URL=your_url  
VITE_SUPABASE_ANON_KEY=your_key  

## Installation

Clone the repository:

git clone https://github.com/yourusername/yourrepo.git  
cd yourrepo  

Install dependencies:

Frontend:

cd frontend  
npm install  

Backend:

cd backend  
npm install  

Run development servers:

Frontend:

npm run dev  

Backend:

npm run dev  

## Project Scope

- Landing page
- Authentication system
- Protected dashboard
- Chat interface
- Image generation
- Chat history persistence
