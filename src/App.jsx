import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import FeaturesSection from './components/FeaturesSection';
import ContactSection from './components/ContactSection';
import LoginSection from './components/LoginSection';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/AboutSection" element={<AboutSection />} />
          <Route path="/services" element={<ServicesSection />} />
          <Route path="/features" element={<FeaturesSection />} />
          <Route path="/contact" element={<ContactSection />} />
          <Route path="/login" element={<LoginSection />} />
          <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;