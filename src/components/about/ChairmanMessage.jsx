export default function ChairmanMessage({ data, loading }) {
  const tag = data.chairman_tag || 'Leadership Insight'
  const title = data.chairman_title || 'Message From The Chairman'
  const name = data.chairman_name || 'Al-Haj Dr. Mohammad Rahman'
  const designation = data.chairman_designation || 'Chairman, Eminent Group'
  const quote = data.chairman_quote || '"Over the past decade, Eminent International has established itself as a beacon of trust and legal excellence in cross-border manpower recruitment. Our founding principle has always been to build genuine partnerships between employers in Saudi Arabia, Gulf, and Europe with hardworking professionals from Bangladesh. We remain committed to 100% legal compliance, zero candidate exploitation, and maximum client satisfaction."'

  return (
    <section id="chairman-message" className="section-padding bg-white border-bottom">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-4 text-center">
            <div className="position-relative d-inline-block">
              {loading ? (
                <div className="skeleton-pulse rounded-4" style={{ width: '280px', height: '320px', objectFit: 'cover' }}></div>
              ) : data.chairman_image ? (
                <img
                  src={data.chairman_image}
                  alt="Chairman"
                  className="img-fluid rounded-4 shadow border border-4 border-gold"
                  style={{ width: '280px', height: '320px', objectFit: 'cover' }}
                />
              ) : (
                <img
                  src="/src/assets/images/saudi_employer_1785857965458.jpg"
                  alt="Chairman"
                  className="img-fluid rounded-4 shadow border border-4 border-gold"
                  style={{ width: '280px', height: '320px', objectFit: 'cover' }}
                />
              )}
              <span className="badge bg-gold text-dark position-absolute bottom-0 start-50 translate-middle-x mb-2 px-3 py-2 fw-bold">Board Chairman</span>
            </div>
            <h4 className="fw-bold text-navy mt-4 mb-1">{name}</h4>
            <small className="text-maroon fw-bold text-uppercase d-block">{designation}</small>
          </div>
          <div className="col-lg-8">
            <span className="section-tagline">{tag}</span>
            <h2 className="section-title">{title}</h2>
            <i className="bi bi-quote display-3 text-gold opacity-50"></i>
            <blockquote className="blockquote fs-5 text-navy fw-normal">{quote}</blockquote>
            <div className="fw-bold text-navy mt-3">— {name}</div>
          </div>
        </div>
      </div>
    </section>
  )
}