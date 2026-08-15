const countryFlags = {
  'Saudi Arabia': '🇸🇦',
  'UAE': '🇦🇪',
  'Qatar': '🇶🇦',
  'Malta': '🇲🇹',
  'Poland': '🇵🇱',
  'Oman': '🇴🇲',
  'Malaysia': '🇲🇾',
  'Hungary': '🇭🇺',
  'Romania': '🇷🇴',
  'Portugal': '🇵🇹',
}

const countryBadgeColors = {
  'Saudi Arabia': 'bg-success',
  'UAE': 'bg-info text-dark',
  'Qatar': 'bg-warning text-dark',
  'Malta': 'bg-primary',
  'Poland': 'bg-warning text-dark',
  'Oman': 'bg-secondary',
}

function JobCard({ job, onApply }) {
  const flag = countryFlags[job.country] || '🌍'
  const badgeColor = countryBadgeColors[job.country] || 'bg-dark'

  return (
    <div className="col-md-6 col-lg-4">
      <div className="p-4 bg-white border rounded-4 shadow-sm h-100 d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <span className={`badge ${badgeColor}`}>
              {flag} {job.country} ({job.city})
            </span>
            <span className="badge bg-light text-dark border">
              Dem: {job.vacancy_count} Workers
            </span>
          </div>
          <h5 className="fw-bold text-navy mb-1">{job.title}</h5>
          <small className="text-maroon fw-semibold">{job.company_name}</small>
          <hr className="my-2" />
          <div className="small mb-2">
            <strong>Salary:</strong>{' '}
            <span className="text-success fw-bold">{job.salary}</span>
          </div>
          <div className="small mb-2">
            <strong>Benefits:</strong> {job.benefits}
          </div>
          <div className="small text-muted mb-3">
            <strong>Requirements:</strong> {job.requirements}
          </div>
        </div>
        <div>
          <button
            className="btn btn-brand-gold w-100"
            onClick={() => onApply(job)} 
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default function JobGrid({ items, loading, onApply }) {
  if (loading) {
    return (
      <div className="row g-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="col-md-6 col-lg-4">
            <div className="skeleton-pulse" style={{ height: '320px', borderRadius: '16px' }}></div>
          </div>
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-briefcase display-1 text-muted"></i>
        <h4 className="fw-bold text-navy mt-3">No Jobs Found</h4>
        <p className="text-muted">Try adjusting your filters or search query.</p>
      </div>
    )
  }

  return (
    <div className="row g-4">
      {items.map((job) => (
        <JobCard key={job.id} job={job} onApply={onApply} />
      ))}
    </div>
  )
}