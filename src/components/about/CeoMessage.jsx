export default function CeoMessage({ data, loading }) {
  const tag = data.ceo_tag || 'Operational Excellence'
  const title = data.ceo_title || 'Message From The CEO'
  const name = data.ceo_name || 'Engr. Kazi Muhammadullah'
  const designation = data.ceo_designation || 'Managing Director & CEO'
  const quote = data.ceo_quote || '"At Eminent International, we believe human capital is the true engine of national and corporate growth. Our promise to Saudi Arabian and global employers is simple: disciplined, trade-tested, and legally compliant workers delivered on schedule within 30-45 days. To our candidates, we offer a safe, transparent gateway to elevate their careers and family lives."'

  return (
    <section id="ceo-message" className="section-padding bg-light">
      <div className="container">
        <div className="row align-items-center g-5 flex-lg-row-reverse">
          <div className="col-lg-4 text-center">
            <div className="position-relative d-inline-block">
              {loading ? (
                <div className="skeleton-pulse rounded-4" style={{ width: '280px', height: '320px', objectFit: 'cover' }}></div>
              ) : data.ceo_image ? (
                <img
                  src={data.ceo_image}
                  alt="Managing Director & CEO"
                  className="img-fluid rounded-4 shadow border border-4 border-navy"
                  style={{ width: '280px', height: '320px', objectFit: 'cover' }}
                />
              ) : (
                <img
                  src="/src/assets/images/saudi_employer_1785857965458.jpg"
                  alt="Managing Director & CEO"
                  className="img-fluid rounded-4 shadow border border-4 border-navy"
                  style={{ width: '280px', height: '320px', objectFit: 'cover' }}
                />
              )}
              <span className="badge bg-navy text-white position-absolute bottom-0 start-50 translate-middle-x mb-2 px-3 py-2 fw-bold">Managing Director & CEO</span>
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