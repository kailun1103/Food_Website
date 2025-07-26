# Food Review Website

A React‑based restaurant review platform where users can browse, rate, and review restaurants, as well as add and manage restaurant entries.

---

## 🎥 Demo

Watch the demo walkthrough on YouTube:

[![VIDEO](https://img.youtube.com/vi/VvKFSDbbvzY/0.jpg)](https://www.youtube.com/watch?v=VvKFSDbbvzY)

---

## ✨ Features

- **Browse & Search**  
  View a list of restaurants with name, address, current average rating and number of reviews.  
- **Sorting & Filtering**  
  Sort by rating, number of reviews, or name.  
- **Top 5 Highlights**  
  Quickly see this month’s top‑rated five restaurants on the homepage.  
- **Add & Edit Restaurants**  
  Authenticated users can create new restaurant entries or update existing ones.  
- **User Reviews & Ratings**  
  Leave a star rating (1–5) and a text review for any restaurant.  
- **Interactive Map**  
  See restaurant locations on Google Maps and get directions.

---

## 🛠 Tech Stack

- **Framework:** React  
- **Routing:** React Router  
- **Styling:** HTML5, CSS3, JavaScript (ES6+)  
- **Backend & Hosting:** Firebase (Auth, Firestore, Hosting)  
- **Maps & Geocoding:** Google Maps JavaScript API, Geocoding API  

> **⚠️** You must supply your own Google Maps API key.  

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or newer)  
- A Firebase project and service account  
- Google Maps API key enabled for **Maps JavaScript** and **Geocoding APIs**

### Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/kailun1103/Food_Website.git
   cd Food_Website
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Configure environment**  
   Create a `.env.local` file in the project root and add:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_key
   ```

4. **Run the dev server**  
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Available Scripts

- `npm start` — Runs the app in development mode.  
- `npm run build` — Builds the app for production to the `build/` folder.  
- `npm test` — Launches the test runner.  
- `npm run lint` — Runs ESLint to analyze code quality.

---

## 🤝 Contributing

1. Fork the repository  
2. Create your feature branch (`git checkout -b feature/YourFeature`)  
3. Commit your changes (`git commit -m 'Add feature'`)  
4. Push to the branch (`git push origin feature/YourFeature`)  
5. Open a Pull Request

Please follow the existing code style and include clear commit messages.

---

## 📄 License

This project is licensed under the MIT License:

```
MIT License

Copyright (c) 2025 Kellen Chang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## ✉️ Contact

- **Email**: kailunchang1103@gmail.com  
- **GitHub**: [kailun1103](https://github.com/kailun1103)

Feel free to open an issue or drop a PR for any suggestions or bug reports!
