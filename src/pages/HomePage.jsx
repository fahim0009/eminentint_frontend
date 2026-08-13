import { useState } from 'react'
import TopBar from '../components/layout/TopBar'
import Navbar from '../components/layout/Navbar'
import HeroSection from '../components/home/HeroSection'
import StatsBar from '../components/home/StatsBar'
import CountriesSection from '../components/home/CountriesSection'
import IndustriesSection from '../components/home/IndustriesSection'
import DualFeatureSection from '../components/home/DualFeatureSection'
import LicensesSection from '../components/home/LicensesSection'
import PartnersSection from '../components/home/PartnersSection'
import ReviewsSection from '../components/home/ReviewsSection'
import TrustSection from '../components/home/TrustSection'
import { TrackerModal, EmployerDemandModal } from '../components/home/Modals'
import FloatingButtons from '../components/FloatingButtons'
import Footer from '../components/layout/Footer'

export default function HomePage() {
  const [demandModalOpen, setDemandModalOpen] = useState(false)

  const openDemandModal = () => {
    setDemandModalOpen(true)
    // Bootstrap modal needs a small delay to find the DOM element
    setTimeout(() => {
      const modalEl = document.getElementById('employerDemandModal')
      if (modalEl) {
        const modal = window.bootstrap.Modal.getOrCreateInstance(modalEl)
        modal.show()
      }
    }, 50)
  }

  return (
    <>
      <TopBar />
      <Navbar onOpenDemandModal={openDemandModal} />
      <HeroSection onOpenDemandModal={openDemandModal} />
      <StatsBar />
      <CountriesSection />
      <IndustriesSection />
      <DualFeatureSection onOpenDemandModal={openDemandModal} />
      <LicensesSection />
      <PartnersSection />
      <ReviewsSection />
      <TrustSection onOpenDemandModal={openDemandModal} />
      <Footer />
      <FloatingButtons />
      <TrackerModal />
      <EmployerDemandModal />
    </>
  )
}