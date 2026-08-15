export default function JobBanner({ totalJobs, onOpenTracker, onOpenApply }) {
  return (
    <section className="bg-navy text-white py-5" style={{ backgroundColor: '#113045' }}>
      <div className="container py-3">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <h1 className="fw-bold display-5">Active Job Opportunities</h1>
            <p className="lead text-light">
              Verified government recruitment demands for Saudi Arabia, Gulf & Europe. Direct employment with genuine companies.
            </p>
          </div>
          <div className="col-lg-4 text-lg-end mt-3 mt-lg-0 d-none">
            <div className="d-flex flex-column gap-2 align-items-lg-end">
              <span className="badge bg-gold text-navy fw-bold px-3 py-2 fs-6">
                {totalJobs} Active Positions
              </span>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-light btn-sm" onClick={onOpenTracker}>
                  <i className="bi bi-search me-1"></i> Track Status
                </button>
                <button className="btn btn-brand-gold btn-sm" onClick={() => onOpenApply('')}>
                  <i className="bi bi-person-plus me-1"></i> Register Passport
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}