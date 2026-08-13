export default function MissionVisionSection({ data, loading }) {
  const tag = data.mvv_tag || 'Corporate Purpose'
  const visionTitle = data.vision_title || 'Our Vision'
  const visionContent = data.vision_content || 'To become the premiere global workforce solutions partner recognized for ethical recruitment, speed, legal compliance, and candidate dignity across Saudi Arabia and international markets.'
  const missionTitle = data.mission_title || 'Our Mission'
  const missionContent = data.mission_content || 'To connect premier corporate employers with trade-tested Bangladeshi talent, delivering fast deployment within 30-45 days while guaranteeing zero fraudulent fees for candidates.'
  const whyTitle = data.why_title || 'Why Eminent?'
  const whyContent = data.why_content || null

  const defaultWhyItems = [
    'Dual Licensing (BD RL & Saudi CR)',
    'In-house Trade Testing Centers',
    'Direct Saudi Embassy Visa Stamping',
    'Post-Arrival Airport & Onsite Support',
  ]

  const whyItems = whyContent
    ? whyContent.split('\n').filter(function (item) { return item.trim() !== '' })
    : defaultWhyItems

  return (
    <section id="mission-vision" className="section-padding bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-tagline">{tag}</span>
          <h2 className="section-title">Our Mission & Vision</h2>
        </div>

        <div className="row g-4">
          <div className="col-md-6 col-lg-4">
            <div className="p-4 bg-white rounded-3 shadow-sm h-100 border-top border-3 border-navy">
              <div className="text-navy display-5 mb-3"><i className="bi bi-eye-fill"></i></div>
              <h4 className="fw-bold text-navy">{visionTitle}</h4>
              <p className="text-muted mb-0">{visionContent}</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="p-4 bg-white rounded-3 shadow-sm h-100 border-top border-3 border-maroon">
              <div className="text-maroon display-5 mb-3"><i className="bi bi-bullseye"></i></div>
              <h4 className="fw-bold text-navy">{missionTitle}</h4>
              <p className="text-muted mb-0">{missionContent}</p>
            </div>
          </div>

          <div className="col-md-12 col-lg-4">
            <div className="p-4 bg-white rounded-3 shadow-sm h-100 border-top border-3 border-gold">
              <div className="text-gold display-5 mb-3"><i className="bi bi-shield-check"></i></div>
              <h4 className="fw-bold text-navy">{whyTitle}</h4>
              <ul className="list-unstyled text-muted mb-0">
                {whyItems.map(function (item, index) {
                  return (
                    <li key={index} className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i> {item.trim()}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}