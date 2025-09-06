# WanderLust

WanderLust is a full-stack web application for listing and browsing rental accommodations. It allows users to create and manage listings, explore other listings, and leave reviews. Each listing also includes an interactive map showing its location. The project is built with Node.js, Express, MongoDB, EJS, Cloudinary, and Mapbox.

## Features
- User authentication and authorization
- Authorized users can create, edit, and delete their own listings
- Other users can leave reviews on listings
- Each listing includes an interactive map displaying its location
- Image uploads handled via Cloudinary
- Responsive design for better usability

## Tech Stack
- **Frontend:** EJS, HTML, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Other Integrations:** Cloudinary (image storage), Mapbox (maps and geocoding)

## Project Structure
WanderLust/
│── models/ # Mongoose schemas (Listing, Review, User)
│── routes/ # Express route handlers (listings, reviews, users)
│── controllers/ # Logic for routes
│── views/ # EJS templates for frontend
│── public/ # Static assets (CSS, JS, images)
│── utils/ # Helper functions (e.g., error handling)
│── app.js # Main application entry point
│── package.json # Project metadata and dependencies
│── .env # Environment variables (not committed)

## Installation
To run this project locally:

1. Clone the repository and navigate into it:
   ```bash
   git clone https://github.com/SOMESH19MISHRA/WanderLust.git
   cd WanderLust
2. Install dependencies:
    npm install
3. Create a .env file in the root directory and add your credentials:
   CLOUDINARY_CLOUD_NAME=your_cloud_name

   CLOUDINARY_KEY=your_api_key

   CLOUDINARY_SECRET=your_api_secret

   MAPBOX_TOKEN=your_mapbox_token

   MONGO_URL=your_mongo_connection_string

   SESSION_SECRET=your_secret

5. Start the application:
   npm start

The app will be available at http://localhost:3000.

Live Demo:https://wanderlust-u13t.onrender.com/listings

This project is licensed under the MIT License.
