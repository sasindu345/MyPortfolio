# Sasindu Wijewardana - Professional Portfolio

A premium, highly responsive developer portfolio built for **Sasindu Wijewardana**, Software Engineering Undergraduate at the University of Moratuwa. This website highlights academic achievements, personal projects, technical skills, and development experience in a professional, authentic format designed to appeal to industry recruiters and secure IT internships.

## 🚀 Key Features

* **Deep Navy & Amber Aesthetic:** Sleek, modern, and high-contrast styling custom-designed to harmonize with a professional avatar wearing a rose shirt.
* **Animated Skills Marquee:** Dual-marquee loop animations running in opposite directions for technical skills with pause-on-hover capability.
* **Non-Overhyped About Me:** A realistic, professional two-column student narrative that highlights core goals and academic highlights honestly.
* **Balanced Experience Timeline:** A 5-card timeline mapping out:
  1. Software Developer experience at Gmora (Startup)
  2. AWS & ML Certifications (Coursera/Kaggle)
  3. Hackathons & CTF placements (BioFusion, Zero-Day CTF, OCTWAVE, Colombo Mini Hackathon)
  4. BSc (Hons) in IT at the University of Moratuwa
  5. G.C.E. Advanced Levels
* **Filtered Projects Showcase:** Toggle filters between All, Finished, and Ongoing projects with direct source and live links.
* **Curved Wave Footer:** A customized mathematical curved SVG top divider with quick site navigation and personal contacts.
* **EmailJS Form Integration:** Fully functioning contact form validation and automated client-side email delivery.
* **Circular Progress Loader:** Smooth entrance loading animation tracking resource downloads.

---

## 🛠️ Tech Stack

* **Frontend Library:** React 18
* **Build Tool:** Vite
* **Styling Framework:** Tailwind CSS & daisyUI (Vanilla CSS configurations inside `src/index.css`)
* **Icons Package:** `react-icons` (FontAwesome, Heroicons)
* **Email Client:** `@emailjs/browser` SDK

---

## 📂 Project Structure

```bash
├── public/
│   ├── data/
│   │   ├── profile.json       # Personal stats, contact, and about bio
│   │   ├── skills.json        # Technical skills list for marquees
│   │   ├── projects.json      # Showcase projects and github repositories
│   │   ├── timeline.json      # Structured education/work timeline details
│   │   └── achievements.json  # Hackathons, placements, and certifications
│   ├── images/                # Project and achievement image assets
│   └── cv/
│       └── resume.pdf         # Resume PDF for download
├── src/
│   ├── components/            # React layout components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Timeline.jsx
│   │   ├── Projects.jsx
│   │   ├── Achievements.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── LoadingScreen.jsx
│   ├── hooks/
│   │   └── useScrollAnimation.js # Intersection Observer animations
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css              # Global styles, scrollbars, and keyframes
├── tailwind.config.js         # Custom theme configuration
└── package.json
```

---

## 💻 Getting Started

### Prerequisites

* Node.js (v18 or higher recommended)
* npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sasindu345/MyPortfolio.git
   cd MyPortfolio
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Development Server

Run the development server locally:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Production Build

Create an optimized production build:
```bash
npm run build
```
The output files will be built inside the `dist/` directory, ready to be hosted on Firebase Hosting, GitHub Pages, or Netlify.

---

## 📄 License

This project is licensed under the MIT License.
