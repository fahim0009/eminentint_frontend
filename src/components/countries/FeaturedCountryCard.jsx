export default function FeaturedCountryCard({ country, onDemand }) {
  const jobLink = country.job_link?.replace('jobs.html', '/jobs') || '/jobs'

  return (
    <div className="p-4 p-md-5 bg-white border border-2 border-navy rounded-4 shadow-sm">
      <div className="row align-items-center g-4">
        <div className="col-md-8">
          <span className="badge bg-success mb-2 px-3 py-2 fs-6">
            {country.flag} {country.name} (Primary Hub)
          </span>
          <h3 className="fw-bold text-navy">{country.name} Workforce Solutions</h3>
          <p className="text-muted">{country.description}</p>

          <div className="row g-3 my-2 text-navy">
            {country.current_demand && (
              <div className="col-6 col-md-3">
                <strong>Current Demand:</strong><br />
                <span className="text-muted small">{country.current_demand}</span>
              </div>
            )}
            {country.salary_range && (
              <div className="col-6 col-md-3">
                <strong>Avg. Salary:</strong><br />
                <span className="text-muted small">{country.salary_range}</span>
              </div>
            )}
            {country.deployment_time && (
              <div className="col-6 col-md-3">
                <strong>Deployment Time:</strong><br />
                <span className="text-muted small">{country.deployment_time}</span>
              </div>
            )}
            {country.visa_process && (
              <div className="col-6 col-md-3">
                <strong>Visa Process:</strong><br />
                <span className="text-muted small">{country.visa_process}</span>
              </div>
            )}
          </div>

          <div className="mt-3">
            <button className="btn btn-brand-gold me-2" onClick={onDemand}>
              Submit {country.short_name} Worker Demand
            </button>
            <a href={jobLink} className="btn btn-outline-dark">
              View {country.short_name} Job Openings
            </a>
          </div>
        </div>

        {country.image ? (
          <div className="col-md-4 text-center">
            <img src={country.image} alt={country.name} className="img-fluid rounded-3 shadow" />
          </div>
        ) : (
          <div className="col-md-4 text-center">
            <div className="d-flex align-items-center justify-content-center rounded-3 bg-light" style={{ height: '220px' }}>
              <span style={{ fontSize: '6rem' }}>{country.flag}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}