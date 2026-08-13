import { Link } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'

const iconMap = {
  construction: 'bi-building',
  hospitality: 'bi-cup-hot',
  restaurant: 'bi-egg-fried',
  hotel: 'bi-building-gear',
  'facility management': 'bi-tools',
  logistics: 'bi-truck',
  manufacturing: 'bi-gear-wide-connected',
  healthcare: 'bi-heart-pulse',
  retail: 'bi-shop',
  agriculture: 'bi-tree',
  cleaning: 'bi-stars',
}

export default function IndustriesSection() {
  const { data: industries, loading } = useApi('/industries')

  const defaultIndustries = [
    { name: 'Construction', icon: 'bi-building' },
    { name: 'Hospitality', icon: 'bi-cup-hot' },
    { name: 'Restaurant', icon: 'bi-egg-fried' },
    { name: 'Hotel', icon: 'bi-building-gear' },
    { name: 'Facility Mgmt', icon: 'bi-tools' },
    { name: 'Logistics', icon: 'bi-truck' },
    { name: 'Manufacturing', icon: 'bi-gear-wide-connected' },
    { name: 'Healthcare', icon: 'bi-heart-pulse' },
    { name: 'Retail', icon: 'bi-shop' },
    { name: 'Agriculture', icon: 'bi-tree' },
    { name: 'Cleaning', icon: 'bi-stars' },
  ]

  const items = industries?.data?.length > 0 ? industries.data : defaultIndustries

  return (
    <section className="section-padding">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-tagline">Specialized Sectors</span>
          <h2 className="section-title">INDUSTRIES WE SUPPLY</h2>
          <p className="section-desc mx-auto">
            We provide vetted, trade-tested skilled technicians, semi-skilled workers, and general labor across major global industries.
          </p>
        </div>

        <div className="row g-4">
          {loading
            ? Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="col-6 col-md-4 col-lg-2">
                  <div className="industry-card skeleton-pulse" style={{ height: '120px' }}></div>
                </div>
              ))
            : items.map((industry, i) => {
                const icon = industry.icon || iconMap[industry.name?.toLowerCase()] || 'bi-briefcase'
                return (
                  <div key={industry.id || i} className="col-6 col-md-4 col-lg-2">
                    <div className="industry-card">
                      <div className="industry-icon"><i className={`bi ${icon}`}></i></div>
                      <h5 className="industry-title">{industry.name}</h5>
                    </div>
                  </div>
                )
              })
          }
          <div className="col-6 col-md-4 col-lg-2">
            <Link
              to="/industries"
              className="industry-card text-decoration-none d-flex flex-column align-items-center justify-content-center"
            >
              <div className="industry-icon text-gold"><i className="bi bi-three-dots"></i></div>
              <h5 className="industry-title text-navy">View All</h5>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}