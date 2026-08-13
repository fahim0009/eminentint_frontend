import { useApi } from '../../hooks/useApi'

export default function HeroSection({ onOpenDemandModal }) {
  const { data: hero, loading } = useApi('/hero-section')

  if (loading) {
    return (
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center" style={{ minHeight: '400px' }}>
            <div className="col-12 text-center">
              <div className="spinner-border text-gold" role="status"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <h1 className="hero-title" dangerouslySetInnerHTML={{
              __html: hero?.title || 'Your Gateway to<br>Global Workforce Solutions'
            }} />
            <p className="hero-subtitle">
              {hero?.subtitle ||
                'Connecting skilled talents from Bangladesh to leading employers in Saudi Arabia and worldwide.'}
            </p>

            <div className="hero-badges-container">
              <div className="hero-badge-pill">
                <div className="badge-icon-gold"><i className="bi bi-patch-check-fill"></i></div>
                <span>Bangladesh Licensed Recruiting Agency</span>
              </div>
              <div className="hero-badge-pill">
                <div className="badge-icon-green"><i className="bi bi-shield-lock-fill"></i></div>
                <span>Saudi Arabia Licensed Service & Trading Company</span>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-3">
              <button
                className="btn btn-brand-gold btn-lg px-4"
                onClick={onOpenDemandModal}
              >
                Hire Workers
              </button>
              <a href="/jobs" className="btn btn-outline-brand btn-lg px-4">
                Explore Jobs
              </a>
              <button
                className="btn btn-sm btn-outline-light d-flex align-items-center gap-2 mt-2 mt-sm-0 px-3 d-none"
                data-bs-toggle="modal"
                data-bs-target="#trackerModal"
              >
                <i className="bi bi-search"></i> Application Tracker
              </button>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="hero-collage-grid">
              {hero?.images?.length > 0
                ? hero.images.map((img, i) => (
                    <div key={i} className={`collage-item collage-${i + 1}`}>
                      <img src={img.url} alt={img.alt || ''} className="collage-img" />
                    </div>
                  ))
                : [1, 2, 3, 4].map((i) => (
                    <div key={i} className={`collage-item collage-${i}`}>
                      <div
                        className="collage-img d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
                        style={{ minHeight: '150px' }}
                      >
                        <i className="bi bi-image text-white opacity-25 display-4"></i>
                      </div>
                    </div>
                  ))
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}