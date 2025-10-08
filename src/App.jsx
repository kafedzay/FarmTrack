import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import FeaturesSection from "./components/FeaturesSection";
import ContactSection from "./components/ContactSection";
import LoginSection from "./components/LoginSection";
import Blogs from "./components/Blogs";
import AdminPage from "./Pages/AdminPage";
import NextPage from "./Pages/NextPage";
import FarmsPage from "./Pages/FarmsPage";
import RecordsTracking from "./Pages/Records";
import OperationsTracking from "./Pages/OperationsTracking";
import ExpenseTracker from "./Pages/ExpenseTracker";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./Pages/DashboardPage";
import FarmRecords from "./components/FarmRecords";

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
            path="/AdminPage"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="farm" element={<FarmsPage />} />

            <Route path="farms/:farmId/records" element={<FarmRecords />} />

            <Route path="records" element={<RecordsTracking />} />
            <Route path="operationTracking" element={<OperationsTracking />} />
            <Route path="expense" element={<ExpenseTracker />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
