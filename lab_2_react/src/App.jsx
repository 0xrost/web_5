import { useEffect, useState } from 'react';
import Header from './components/Header';
import Summary from './components/Summary';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Languages from './components/Languages';
import Hackathons from './components/Hackathons';
import Hobbies from './components/Hobbies';
import Reviews from './components/Reviews';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function getThemeByTime() {
  const hours = new Date().getHours();
  return hours >= 7 && hours < 21 ? 'light' : 'dark';
}

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setTheme(getThemeByTime());
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.classList.toggle('dark-mode', theme === 'dark');
  }, [theme]);

  function toggleTheme() {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }

  return (
    <div className={`app ${theme}`}>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Summary />
        <Experience />
        <Education />
        <Skills />
        <Languages />
        <Hackathons />
        <Hobbies />
        <Reviews />
      </main>
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;
