#  AI Interview Report Generator

An AI-powered backend system that generates detailed interview reports based on candidate input.  
Designed to simulate real interview feedback using AI and provide structured evaluation.

---

##  Features

- AI-generated interview reports
- Structured feedback (technical, behavioral, skills)
- Retry logic for handling API failures (503 high demand)
- Exponential backoff for stable performance
- Error handling & clean API responses

---

##  Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- Google Generative AI API
- REST APIs

---

##  Project Structure
backend/
│── src/
│ ├── controllers/
│ ├── services/
│ ├── models/
│ ├── routes/
│ └── utils/
│
├── .env
├── package.json

---

##  Setup Instructions

### 1️ Clone the repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
PORT=3000
MONGO_URI=your_mongodb_connection
GOOGLE_API_KEY=your_api_key
npm start

Error Handling
Handles 503 (High Demand) errors from AI API
Implements:
Retry mechanism
Exponential backoff
Returns user-friendly messages when server is busy

Future Improvements
Frontend UI integration (React)
Authentication system
Save reports in database
Dashboard for analysis


API Endpoint
Generate Interview Report

POST /api/interview/report

Request Body:
{
  "name": "Neha",
  "skills": ["JavaScript", "Node.js"],
  "experience": "Fresher",
  "role": "Backend Developer"
}
Response:
{
  "technicalQuestions": [...],
  "behavioralQuestions": [...],
  "skillGaps": [...],
  "preparationPlan": "..."
}


Author
Neha Jaiswal
B.Tech CSE | Full Stack Developer | GATE Aspirant
