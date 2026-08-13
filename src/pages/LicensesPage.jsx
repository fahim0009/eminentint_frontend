import { useState } from 'react'
import TopBar from '../components/layout/TopBar'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingButtons from '../components/FloatingButtons'
import { EmployerDemandModal } from '../components/home/Modals'

import LicenseBanner from '../components/licenses/LicenseBanner'
import LicenseGrid from '../components/licenses/LicenseGrid'
import LicenseViewerModal from '../components/licenses/LicenseViewerModal'
import LicenseFaq from '../components/licenses/LicenseFaq'

import { useApi } from '../hooks/useApi'

export default function LicensesPage() {
  const { data: response, loading } = useApi('/licenses')
  const licenses = response?.data || []
  
  // কোন লাইসেন্সের কার্ডে View বাটনে ক্লিক করা হয়েছে সেটা সেভ করার জন্য State
  const [selectedLicense, setSelectedLicense] = useState(null)

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
      <LicenseBanner />

      <section className="section-padding bg-light">
        <div className="container">
          
          {/* Scanner Box */}
          <div className="p-4 bg-white border border-navy rounded-4 shadow-sm mb-5">
            <div className="row align-items-center g-3">
              <div className="col-md-8">
                <h4 className="fw-bold text-navy mb-1">
                  <i className="bi bi-qr-code-scan text-gold me-2"></i> Interactive License & Verification Center
                </h4>
                <p className="text-muted small mb-0">Click any certificate below to view live government QR codes, official document registration details, and download certified PDF copies.</p>
              </div>
              <div className="col-md-4 text-md-end">
                <button className="btn btn-brand-navy btn-sm" onClick={() => alert('Verification Portal Connected. All 6 licenses are active & in good standing.')}>
                  <i className="bi bi-check-circle-fill text-success me-1"></i> System Status: All Licenses Active
                </button>
              </div>
            </div>
          </div>

          {/* License Cards Grid */}
          {loading ? (
            <div className="row g-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="col-md-6 col-lg-4">
                  <div className="skeleton-pulse" style={{ height: '380px', borderRadius: '16px' }}></div>
                </div>
              ))}
            </div>
          ) : (
            <LicenseGrid licenses={licenses} onVerify={setSelectedLicense} />
          )}

          {/* FAQ Accordion */}
          <LicenseFaq />

        </div>
      </section>

      <Footer />
      <FloatingButtons />
      <EmployerDemandModal />

      {/* Dynamic Verify Modal */}
      <LicenseViewerModal selectedLicense={selectedLicense} />
    </>
  )
}