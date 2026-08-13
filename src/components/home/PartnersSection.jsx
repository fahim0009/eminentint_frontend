import { useRef, useState, useEffect } from 'react'

const defaultPartners = [
  { name: 'Al Yamama Contracting', icon: 'bi-building', color: 'primary', country: '🇸🇦 Saudi Arabia' },
  { name: 'Al Falah Hospitality', icon: 'bi-cup-hot', color: 'warning', country: '🇸🇦 Saudi Arabia' },
  { name: 'Al Yusr Facility Mgmt', icon: 'bi-tools', color: 'danger', country: '🇶🇦 Qatar' },
  { name: 'Rapid Express LLC', icon: 'bi-truck', color: 'success', country: '🇦🇪 UAE' },
  { name: 'Descon Operations', icon: 'bi-gear-fill', color: 'info', country: '🇴🇲 Oman' },
  { name: 'Malta Ground Handling', icon: 'bi-airplane', color: 'primary', country: '🇲🇹 Malta (EU)' },
  { name: 'Saudi Oger Tech', icon: 'bi-building-gear', color: 'secondary', country: '🇸🇦 Saudi Arabia' },
  { name: 'CareFirst Healthcare', icon: 'bi-heart-pulse', color: 'danger', country: '🇵🇱 Poland (EU)' },
]

export default function PartnersSection() {
  const trackRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (!trackRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current
    setCanScrollLeft(scrollLeft > 5)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5)
  }

  useEffect(() => {
    checkScroll()
    const el = trackRef.current
    if (el) el.addEventListener('scroll', checkScroll)
    return () => { if (el) el.removeEventListener('scroll', checkScroll) }
  }, [])

  const scroll = (direction) => {
    if (!trackRef.current) return
    const amount = 280
    trackRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <section className="section-padding bg-white border-bottom">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
          <div>
            <span className="section-tagline">Corporate Alliances & Clients</span>
            <h2 className="section-title mb-0">OUR TRUSTED PARTNERS</h2>
          </div>
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-outline-dark btn-sm rounded-circle p-2"
              style={{ width: '38px', height: '38px' }}
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <button
              className="btn btn-outline-dark btn-sm rounded-circle p-2"
              style={{ width: '38px', height: '38px' }}
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>

        <div className="partner-scroll-wrapper">
          <div ref={trackRef} className="partner-scroll-track">
            {defaultPartners.map((partner, i) => (
              <div key={i} className="partner-logo-card">
                <div className={`partner-icon-badge bg-${partner.color} bg-opacity-10 text-${partner.color}`}>
                  <i className={`bi ${partner.icon}`}></i>
                </div>
                <div className="fw-bold text-navy fs-7">{partner.name}</div>
                <span className="badge bg-light text-navy border mt-1">{partner.country}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}