import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GalleryPage from './pages/GalleryPage'
import JobsPage from './pages/JobsPage'
import CountriesPage from './pages/CountriesPage'
import AboutPage from './pages/AboutPage'
import IndustriesPage from './pages/IndustriesPage'
import ServicesPage from './pages/ServicesPage'
import EmployersPage from './pages/EmployersPage'
import ContactPage from './pages/ContactPage'
import LicensesPage from './pages/LicensesPage'
import ComingSoonPage from './pages/ComingSoonPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/countries" element={<CountriesPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/industries" element={<IndustriesPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/employers" element={<EmployersPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/licenses" element={<LicensesPage />} />
      <Route path="*" element={<ComingSoonPage />} />
    </Routes>
  )
}

export default App