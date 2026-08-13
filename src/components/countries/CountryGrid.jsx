export default function CountryGrid({ countries }) {
  if (!countries || countries.length === 0) return null

  return (
    <>
      {countries.map(function (country) {
        var eu = country.name && country.name.indexOf('European Union') !== -1
        var linkClass = 'btn btn-sm '
        if (eu) {
          linkClass = linkClass + 'btn-brand-gold'
        } else {
          linkClass = linkClass + 'btn-brand-navy'
        }

        var cardClass = 'p-4 bg-white border rounded-4 shadow-sm h-100'
        if (eu) {
          cardClass = cardClass + ' border-start border-4 border-gold'
        }

        var jobLink = '/jobs'
        if (country.job_link) {
          jobLink = country.job_link.replace('jobs.html', '/jobs')
        }

        var idAttr = ''
        if (country.short_name) {
          idAttr = country.short_name.toLowerCase()
        }

        return (
          <div key={country.id} className="col-md-6 col-lg-4" id={idAttr}>
            <div className={cardClass}>
              <div className="display-4 mb-2">{country.flag}</div>
              <h4 className="fw-bold text-navy">{country.name}</h4>
              <p className="text-muted small">{country.description}</p>
              {country.salary_range ? (
                <div className="small"><strong>Salary Range:</strong> {country.salary_range}</div>
              ) : null}
              {country.deployment_time ? (
                <div className="small text-muted mb-3">Deployment: {country.deployment_time}</div>
              ) : null}
              <a href={jobLink} className={linkClass}>
                Browse {country.short_name} Jobs
              </a>
            </div>
          </div>
        )
      })}
    </>
  )
}