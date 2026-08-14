import TopBar from '../components/layout/TopBar'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingButtons from '../components/FloatingButtons'
import { EmployerDemandModal } from '../components/home/Modals'

import AboutBanner from '../components/about/AboutBanner'
import CompanySection from '../components/about/CompanySection'
import MissionVisionSection from '../components/about/MissionVisionSection'
import ChairmanMessage from '../components/about/ChairmanMessage'
import CeoMessage from '../components/about/CeoMessage'
import TimelineSection from '../components/about/TimelineSection'

import { useApi } from '../hooks/useApi'

export default function AboutPage() {
  const { data: response, loading } = useApi('/about-page')
  const aboutData = response?.data || {}

  const openDemandModal = () => {
    setTimeout(function () {
      var el = document.getElementById('employerDemandModal')
      if (el && window.bootstrap) {
        window.bootstrap.Modal.getOrCreateInstance(el).show()
      }
    }, 50)
  }

  return (
    <>
      <TopBar />
      <Navbar onOpenDemandModal={openDemandModal} />
      <AboutBanner data={aboutData} loading={loading} />
      <CompanySection data={aboutData} loading={loading} />
      <MissionVisionSection data={aboutData} loading={loading} />
      <ChairmanMessage data={aboutData} loading={loading} />
      <CeoMessage data={aboutData} loading={loading} />
      <TimelineSection data={aboutData} loading={loading} />
      
      <Footer />
      <FloatingButtons />
      <EmployerDemandModal />
    </>
  )
}