import TopBar from '../components/layout/TopBar'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingButtons from '../components/FloatingButtons'
import { EmployerDemandModal } from '../components/home/Modals'
import IndustryBanner from '../components/industries/IndustryBanner'
import IndustryGrid from '../components/industries/IndustryGrid'
import { useApi } from '../hooks/useApi'

export default function IndustriesPage() {
  const { data: response, loading } = useApi('/industries')
  const industries = response?.data || []

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
      <IndustryBanner />
      <section className="section-padding">
        <div className="container">
          {loading ? (
            <div className="row g-4">
              {Array.from({ length: 12 }).map(function (_, i) {
                return (
                  <div key={i} className="col-md-6 col-lg-4">
                    <div className="skeleton-pulse" style={{ height: '220px', borderRadius: '16px' }}></div>
                  </div>
                )
              })}
            </div>
          ) : (
            <IndustryGrid
              industries={industries}
              onOpenDemand={openDemandModal}
            />
          )}
        </div>
      </section>
      <Footer />
      <FloatingButtons />
      <EmployerDemandModal />
    </>
  )
}