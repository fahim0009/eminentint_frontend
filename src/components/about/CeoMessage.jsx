import defaultImg from '../../assets/images/saudi_employer_1785857965458.jpg'

export default function CeoMessage({ data, loading }) {
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'
  const LARAVEL_URL = API_BASE_URL.replace('/api', '')
  const ceoImage = data?.ceo_image ? `${LARAVEL_URL}${data.ceo_image}` : defaultImg

  return (
    <section id="ceo-message" className="section-padding bg-light">
      <div className="container">
        <div className="row align-items-center g-5 flex-lg-row-reverse">
          <div className="col-lg-4 text-center">
            <div className="position-relative d-inline-block">
              {loading ? (
                <div className="skeleton-pulse rounded-4" style={{ width: '280px', height: '320px' }}></div>
              ) : (
                <img
                  src={ceoImage}
                  alt="Managing Director & CEO"
                  className="img-fluid rounded-4 shadow border border-4 border-navy"
                  style={{ width: '280px', height: '320px', objectFit: 'cover' }}
                />
              )}
              <span className="badge bg-navy text-white position-absolute bottom-0 start-50 translate-middle-x mb-2 px-3 py-2 fw-bold">Managing Director & CEO</span>
            </div>
            <h4 className="fw-bold text-navy mt-4 mb-1">{data?.ceo_name || 'Engr. Kazi Muhammadullah'}</h4>
            <small className="text-maroon fw-bold text-uppercase d-block">{data?.ceo_designation || 'Managing Director & CEO'}</small>
          </div>
          <div className="col-lg-8">
            <span className="section-tagline">{data?.ceo_tag || 'Operational Excellence'}</span>
            <h2 className="section-title">{data?.ceo_title || 'Message From The CEO'}</h2>
            <i className="bi bi-quote display-3 text-gold opacity-50"></i>
            <blockquote className="blockquote fs-5 text-navy fw-normal">{data?.ceo_quote || ''}</blockquote>
            <div className="fw-bold text-navy mt-3">— {data?.ceo_name || ''}</div>
          </div>
        </div>
      </div>
    </section>
  )
}