import { useApi } from '../../hooks/useApi'

export default function HeroSection({ onOpenDemandModal }) {
  
  const { data: response, loading } = useApi('/hero-section')
  const hero = response?.data
  
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'
  const LARAVEL_URL = API_BASE_URL.replace('/api', '')

  
  const heroImages = [
    hero?.image1 ? `${LARAVEL_URL}${hero.image1}` : null,
    hero?.image2 ? `${LARAVEL_URL}${hero.image2}` : null,
    hero?.image3 ? `${LARAVEL_URL}${hero.image3}` : null,
    hero?.image4 ? `${LARAVEL_URL}${hero.image4}` : null
  ].filter(Boolean) 

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
            
            {/* Title */}
            <h1 
              className="hero-title" 
              dangerouslySetInnerHTML={{ 
                __html: hero?.title || 'Your Gateway to<br>Global Workforce Solutions' 
              }} 
            />
            
            {/* Subtitle */}
            <p className="hero-subtitle">
              {hero?.subtitle ||
                'Connecting skilled talents from Bangladesh to leading employers in Saudi Arabia and worldwide.'}
            </p>

            {/* Badges */}
            <div className="hero-badges-container">
              <div className="hero-badge-pill">
                <div className="badge-icon-gold">
                  <i className={hero?.badge1_icon || 'bi bi-patch-check-fill'}></i>
                </div>
                <span>
                  {hero?.badge1_text || 'Bangladesh Licensed Recruiting Agency'}
                </span>
              </div>
              <div className="hero-badge-pill">
                <div className="badge-icon-green">
                  <i className={hero?.badge2_icon || 'bi bi-shield-lock-fill'}></i>
                </div>
                <span>
                  {hero?.badge2_text || 'Saudi Arabia Licensed Service & Trading Company'}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="d-flex flex-wrap gap-3">
              <button
                className="btn btn-brand-gold btn-lg px-4"
                onClick={onOpenDemandModal}
              >
                {hero?.btn1_text || 'Hire Workers'}
              </button>
              <a href="/jobs" className="btn btn-outline-brand btn-lg px-4">
                {hero?.btn2_text || 'Explore Jobs'}
              </a>
              <button
                className="btn btn-sm btn-outline-light d-flex align-items-center gap-2 mt-2 mt-sm-0 px-3 d-none"
                data-bs-toggle="modal"
                data-bs-target="#trackerModal"
              >
                <i className="bi bi-search"></i> {hero?.btn3_text || 'Application Tracker'}
              </button>
            </div>
          </div>

          {/* Images Section */}
          <div className="col-lg-6">
            <div className="hero-collage-grid">
              {heroImages.length > 0
                ? heroImages.map((imgSrc, i) => (
                    <div key={i} className={`collage-item collage-${i + 1}`}>
                      <img src={imgSrc} alt={`Hero ${i + 1}`} className="collage-img" />
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