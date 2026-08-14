export default function MissionVisionSection({ data, loading }) {
  return (
    <section id="mission-vision" className="section-padding bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-tagline">{data?.mvv_tag || 'Corporate Purpose'}</span>
          <h2 className="section-title">{data?.mvv_title || 'Our Mission & Vision'}</h2>
        </div>

        <div className="row g-4">
          <div className="col-md-6 col-lg-4">
            <div className="p-4 bg-white rounded-3 shadow-sm h-100 border-top border-3 border-navy">
              <div className="text-navy display-5 mb-3"><i className="bi bi-eye-fill"></i></div>
              <h4 className="fw-bold text-navy">{data?.vision_title || 'Our Vision'}</h4>
              <p className="text-muted mb-0">{data?.vision_content || ''}</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="p-4 bg-white rounded-3 shadow-sm h-100 border-top border-3 border-maroon">
              <div className="text-maroon display-5 mb-3"><i className="bi bi-bullseye"></i></div>
              <h4 className="fw-bold text-navy">{data?.mission_title || 'Our Mission'}</h4>
              <p className="text-muted mb-0">{data?.mission_content || ''}</p>
            </div>
          </div>

          <div className="col-md-12 col-lg-4">
            <div className="p-4 bg-white rounded-3 shadow-sm h-100 border-top border-3 border-gold">
              <div className="text-gold display-5 mb-3"><i className="bi bi-shield-check"></i></div>
              <h4 className="fw-bold text-navy">{data?.why_title || 'Why Eminent?'}</h4>
              {/* HTML লিস্ট রেন্ডার করার জন্য */}
              <div className="text-muted mb-0" dangerouslySetInnerHTML={{ __html: data?.why_content || '' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}