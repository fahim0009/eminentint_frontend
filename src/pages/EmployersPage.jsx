import TopBar from '../components/layout/TopBar'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingButtons from '../components/FloatingButtons'
import { EmployerDemandModal } from '../components/home/Modals'

import EmployerBanner from '../components/employers/EmployerBanner'
import AdvantageGrid from '../components/employers/AdvantageGrid'
import ProcessTimeline from '../components/employers/ProcessTimeline'
import TrackRecordsGrid from '../components/employers/TrackRecordsGrid'

import { useApi } from '../hooks/useApi'

export default function EmployersPage() {
  const { data: advRes, loading: advLoading } = useApi('/employer-advantages')
  const { data: stepRes, loading: stepLoading } = useApi('/recruitment-steps')
  const { data: trackRes, loading: trackLoading } = useApi('/track-records')

  const advantages = advRes?.data || []
  const steps = stepRes?.data || []
  const records = trackRes?.data || []

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
      <EmployerBanner />

      {/* Why Choose Eminent Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-tagline">Why Partner With Us</span>
            <h2 className="section-title">The Eminent Employer Advantage</h2>
          </div>
          
          {advLoading ? (
            <div className="row g-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="col-md-6 col-lg-3">
                  <div className="skeleton-pulse" style={{ height: '200px', borderRadius: '16px' }}></div>
                </div>
              ))}
            </div>
          ) : (
            <AdvantageGrid advantages={advantages} />
          )}
        </div>
      </section>

      {/* Recruitment Process Timeline */}
      <section className="section-padding bg-light" id="process">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-tagline">Step-by-Step Workflow</span>
            <h2 className="section-title">End-to-End Recruitment Process</h2>
          </div>

          {stepLoading ? (
            <div className="row g-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="col-md-3">
                  <div className="skeleton-pulse" style={{ height: '120px', borderRadius: '16px' }}></div>
                </div>
              ))}
            </div>
          ) : (
            <ProcessTimeline steps={steps} />
          )}
        </div>
      </section>

      {/* Confidential Partners & Track Records */}
      <section className="section-padding" id="partners">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-tagline">Proven Success</span>
            <h2 className="section-title">Corporate Track Records in Saudi Arabia</h2>
          </div>

          {trackLoading ? (
            <div className="row g-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="col-md-6 col-lg-4">
                  <div className="skeleton-pulse" style={{ height: '180px', borderRadius: '16px' }}></div>
                </div>
              ))}
            </div>
          ) : (
            <TrackRecordsGrid records={records} />
          )}
        </div>
      </section>

      <Footer />
      <FloatingButtons />
      <EmployerDemandModal />
    </>
  )
}