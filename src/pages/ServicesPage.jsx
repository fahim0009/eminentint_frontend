import TopBar from '../components/layout/TopBar'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingButtons from '../components/FloatingButtons'
import { EmployerDemandModal } from '../components/home/Modals'
import ServiceBanner from '../components/services/ServiceBanner'
import ServiceGrid from '../components/services/ServiceGrid'
import { useApi } from '../hooks/useApi'

export default function ServicesPage() {
  const { data: response, loading } = useApi('/services')
  const services = response?.data || []

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
      <ServiceBanner />
      
      <section className="section-padding">
        <div className="container">
          {loading ? (
            <div className="row g-4">
              {Array.from({ length: 6 }).map(function (_, i) {
                return (
                  <div key={i} className="col-md-6 col-lg-4">
                    <div className="skeleton-pulse" style={{ height: '300px', borderRadius: '16px' }}></div>
                  </div>
                )
              })}
            </div>
          ) : (
            <ServiceGrid services={services} />
          )}
        </div>
      </section>

      <Footer />
      <FloatingButtons />
      <EmployerDemandModal />
    </>
  )
}