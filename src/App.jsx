import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import ContactSection from './components/ContactSection';
import LoginSection from './components/LoginSection';
import Blogs from './components/Blogs';

function App() {
  return (
    <div>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/AboutSection" element={<AboutSection />} />
          <Route path="/features" element={<FeaturesSection />} />
          <Route path="/contact" element={<ContactSection />} />
          <Route path="/login" element={<LoginSection />} />
          <Route path="/Blogs" element={<Blogs />} />

        </Routes>

        
      </div>
    </Router>

    <Router>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs1" element={<Blogs1 />} />
      </Routes>
    </Router>

    </div>

    



  );
}

export default App;