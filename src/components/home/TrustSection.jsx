export default function TrustSection({ onOpenDemandModal }) {
  return (
    <section className="bg-navy text-white py-5 text-center" style={{ backgroundColor: '#113045' }}>
      <div className="container">
        <div className="mx-auto" style={{ maxWidth: '800px' }}>
          <i className="bi bi-quote display-3 text-gold opacity-50"></i>
          <h3 className="fw-bold mb-3">Trusted Workforce Partner for Saudi Arabia & Global Employers</h3>
          <p className="lead text-light mb-4">
            From sourcing and screening to deployment and post-arrival support, Eminent International delivers complete workforce solutions with full legal compliance in Bangladesh and Saudi Arabia.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-brand-gold px-4 py-2" onClick={onOpenDemandModal}>
              Submit Worker Requirement
            </button>
            <a href="/contact" className="btn btn-outline-light px-4 py-2">Contact Our Offices</a>
          </div>
        </div>
      </div>
    </section>
  )
}