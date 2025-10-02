import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import FeaturesSection from "./components/FeaturesSection";
import ContactSection from "./components/ContactSection";
import LoginSection from "./components/LoginSection";
import Blogs from "./components/Blogs";
import Dashboard from "./Pages/Dashboard";
import NextPage from "./Pages/NextPage";
import FarmsPage from "./Pages/FarmsPage";
import IcomeTracking from "./Pages/IcomeTracking";
import OperationsTracking from "./Pages/OperationsTracking";
import ExpenseTracker from "./Pages/ExpenseTracker";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* public Routes */}
          <Route path="/" element={<HeroSection />} />
          <Route path="/AboutSection" element={<AboutSection />} />
          <Route path="/features" element={<FeaturesSection />} />
          <Route path="/contact" element={<ContactSection />} />
          <Route path="/login" element={<LoginSection />} />
          <Route path="/Blogs" element={<Blogs />} />
          <Route path="/next" element={<NextPage />} />

          {/* protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<FarmsPage />} />
            <Route path="farm" element={<FarmsPage />} />
            <Route path="icometracking" element={<IcomeTracking />} />
            <Route path="operationTracking" element={<OperationsTracking />} />
            <Route path="expense" element={<ExpenseTracker />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
