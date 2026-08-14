import defaultImg from '../../assets/images/saudi_employer_1785857965458.jpg'

export default function ChairmanMessage({ data, loading }) {
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'
  const LARAVEL_URL = API_BASE_URL.replace('/api', '')
  const chairmanImage = data?.chairman_image ? `${LARAVEL_URL}${data.chairman_image}` : defaultImg

  return (
    <section id="chairman-message" className="section-padding bg-white border-bottom">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-4 text-center">
            <div className="position-relative d-inline-block">
              {loading ? (
                <div className="skeleton-pulse rounded-4" style={{ width: '280px', height: '320px' }}></div>
              ) : (
                <img
                  src={chairmanImage}
                  alt="Chairman"
                  className="img-fluid rounded-4 shadow border border-4 border-gold"
                  style={{ width: '280px', height: '320px', objectFit: 'cover' }}
                />
              )}
              <span className="badge bg-gold text-dark position-absolute bottom-0 start-50 translate-middle-x mb-2 px-3 py-2 fw-bold">Board Chairman</span>
            </div>
            <h4 className="fw-bold text-navy mt-4 mb-1">{data?.chairman_name || 'Al-Haj Dr. Mohammad Rahman'}</h4>
            <small className="text-maroon fw-bold text-uppercase d-block">{data?.chairman_designation || 'Chairman, Eminent Group'}</small>
          </div>
          <div className="col-lg-8">
            <span className="section-tagline">{data?.chairman_tag || 'Leadership Insight'}</span>
            <h2 className="section-title">{data?.chairman_title || 'Message From The Chairman'}</h2>
            <i className="bi bi-quote display-3 text-gold opacity-50"></i>
            <blockquote className="blockquote fs-5 text-navy fw-normal">{data?.chairman_quote || ''}</blockquote>
            <div className="fw-bold text-navy mt-3">— {data?.chairman_name || ''}</div>
          </div>
        </div>
      </div>
    </section>
  )
}