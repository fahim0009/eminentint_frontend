export default function LicenseBanner() {
  return (
    <section className="bg-navy text-white py-5 position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A1E2C 0%, #113045 100%)' }}>
      <div className="container py-4 position-relative z-1">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <span className="badge bg-gold text-navy fw-bold mb-3 px-3 py-2">
              <i className="bi bi-shield-check me-1"></i> 100% Legal Government Accreditation
            </span>
            <h1 className="fw-bold display-5 mb-3">Government Licenses & Certifications</h1>
            <p className="lead text-light mb-4">Official recruiting license in Bangladesh (RL-1842) and verified commercial business registration in Saudi Arabia (CR-1010778401).</p>
            <div className="d-flex flex-wrap gap-3">
              <span className="badge bg-white bg-opacity-10 text-white border border-white border-opacity-25 px-3 py-2 fs-7">
                <i className="bi bi-patch-check-fill text-gold me-2"></i>Ministry of Expatriates' Welfare BD
              </span>
              <span className="badge bg-white bg-opacity-10 text-white border border-white border-opacity-25 px-3 py-2 fs-7">
                <i className="bi bi-patch-check-fill text-success me-2"></i>Ministry of Commerce Saudi Arabia
              </span>
            </div>
          </div>
          <div className="col-lg-4 text-center mt-4 mt-lg-0">
            <div className="p-4 bg-white bg-opacity-10 rounded-4 border border-white border-opacity-25 text-white">
              <i className="bi bi-qr-code display-1 text-gold mb-2 d-block"></i>
              <div className="fw-bold fs-6">Live Verification QR Code</div>
              <small className="text-light opacity-75">Instant government portal audit ready</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}