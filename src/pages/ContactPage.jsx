import TopBar from '../components/layout/TopBar'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingButtons from '../components/FloatingButtons'
import { EmployerDemandModal } from '../components/home/Modals'

import ContactBanner from '../components/contact/ContactBanner'
import OfficeCards from '../components/contact/OfficeCards'
import ContactForm from '../components/contact/ContactForm'
import MeetingModal from '../components/contact/MeetingModal'

import { useApi } from '../hooks/useApi'

export default function ContactPage() {
  const { data: response, loading } = useApi('/company-details')
  const company = response?.data || {}

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
      <ContactBanner />

      <section className="section-padding pb-4">
        <div className="container">
          {loading ? (
            <div className="row g-4">
              <div className="col-lg-6"><div className="skeleton-pulse" style={{ height: '500px', borderRadius: '16px' }}></div></div>
              <div className="col-lg-6"><div className="skeleton-pulse" style={{ height: '500px', borderRadius: '16px' }}></div></div>
            </div>
          ) : (
            <OfficeCards company={company} />
          )}
        </div>
      </section>

      <section className="section-padding bg-light">
        <div className="container">
          <ContactForm />
        </div>
      </section>

      <Footer />
      <FloatingButtons />
      <MeetingModal />
      <EmployerDemandModal />
    </>
  )
}