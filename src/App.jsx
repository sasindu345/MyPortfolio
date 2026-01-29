import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState(null);
  const [projects, setProjects] = useState(null);
  const [timeline, setTimeline] = useState(null);
  const [achievements, setAchievements] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileRes, skillsRes, projectsRes, timelineRes, achievementsRes] = await Promise.all([
          fetch('/data/profile.json'),
          fetch('/data/skills.json'),
          fetch('/data/projects.json'),
          fetch('/data/timeline.json'),
          fetch('/data/achievements.json'),
        ]);

        const profileData = await profileRes.json();
        const skillsData = await skillsRes.json();
        const projectsData = await projectsRes.json();
        const timelineData = await timelineRes.json();
        const achievementsData = await achievementsRes.json();

        setProfile(profileData);
        setSkills(skillsData);
        setProjects(projectsData);
        setTimeline(timelineData);
        setAchievements(achievementsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setDataLoaded(true);
      }
    };

    loadData();
  }, []);

  const handleLoadingComplete = () => {
    if (dataLoaded) {
      setShowLoading(false);
    }
  };

  return (
    <>
      {/* Loading Screen */}
      {showLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Main Content - render immediately but hidden behind loading screen */}
      <div className={`min-h-screen bg-black ${showLoading ? 'overflow-hidden' : ''}`}>
        <Navbar />
        <Hero profile={profile} />
        <About profile={profile} />
        <Skills skills={skills} />
        <Timeline timeline={timeline} />
        <Projects projects={projects} />
        <Achievements achievements={achievements} />
        <Contact />
        <Footer profile={profile} />
      </div>
    </>
  );
}

export default App;
