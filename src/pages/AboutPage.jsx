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
  const data = response?.data || {}

  const openDemandModal = () => {
    setTimeout(() => {
      const el = document.getElementById('employerDemandModal')
      if (el && window.bootstrap) window.bootstrap.Modal.getOrCreateInstance(el).show()
    }, 50)
  }

  return (
    <>
      <TopBar />
      <Navbar onOpenDemandModal={openDemandModal} />
      <AboutBanner data={data} />
      <CompanySection data={data} loading={loading} />
      <MissionVisionSection data={data} loading={loading} />
      <ChairmanMessage data={data} loading={loading} />
      <CeoMessage data={data} loading={loading} />
      <TimelineSection />
      <Footer />
      <FloatingButtons />
      <EmployerDemandModal />
    </>
  )
}