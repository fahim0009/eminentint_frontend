import { useRef, useState, useEffect } from 'react'
import { useApi } from '../../hooks/useApi'

export default function PartnersSection() {
  const { data: response, loading } = useApi('/partners')
  
  
  const partners = Array.isArray(response) ? response : (response?.data || [])

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
  }, [partners]) 

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
            {loading ? (
              
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="partner-logo-card">
                  <div className="skeleton-pulse" style={{ width: '40px', height: '40px', borderRadius: '50%', margin: '0 auto 10px' }}></div>
                  <div className="skeleton-pulse" style={{ height: '16px', width: '100px', margin: '0 auto' }}></div>
                </div>
              ))
            ) : (
              partners.map((partner) => {
                
                const iconClass = partner.icon_class?.startsWith('bi ') 
                  ? partner.icon_class 
                  : `bi ${partner.icon_class || 'bi-building'}`
                
                  
                const colorName = partner.icon_color ? partner.icon_color.replace('text-', '') : 'primary'
                
                return (
                  <div key={partner.id} className="partner-logo-card">
                    <div className={`partner-icon-badge bg-${colorName} bg-opacity-10 ${partner.icon_color || 'text-primary'}`}>
                      <i className={iconClass}></i>
                    </div>
                    <div className="fw-bold text-navy fs-7">{partner.name}</div>
                    <span className="badge bg-light text-dark border mt-1">
                      {partner.country_flag} {partner.country}
                    </span>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </section>
  )
}