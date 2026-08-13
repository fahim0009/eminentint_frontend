import { Link } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'

export default function CountriesSection() {
  const { data: countries, loading } = useApi('/countries')

  const defaultCountries = [
    { name: 'Saudi Arabia', flag: '🇸🇦', slug: 'saudi' },
    { name: 'UAE', flag: '🇦🇪', slug: 'uae' },
    { name: 'Qatar', flag: '🇶🇦', slug: 'qatar' },
    { name: 'Oman', flag: '🇴🇲', slug: 'oman' },
    { name: 'Malta', flag: '🇲🇹', slug: 'malta' },
    { name: 'Hungary', flag: '🇭🇺', slug: 'hungary' },
    { name: 'Poland', flag: '🇵🇱', slug: 'poland' },
    { name: 'Portugal', flag: '🇵🇹', slug: 'portugal' },
    { name: 'Malaysia', flag: '🇲🇾', slug: 'malaysia' },
    { name: 'Romania', flag: '🇷🇴', slug: 'romania' },
  ]

  const items = countries?.data?.length > 0 ? countries.data.slice(0, 10) : defaultCountries

  return (
    <section className="section-padding bg-light">
      <div className="container">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <span className="section-tagline">Global Reach</span>
            <h2 className="section-title">COUNTRIES WE SERVE</h2>
          </div>
          <Link to="/countries" className="btn btn-brand-navy">
            View All Countries <i className="bi bi-arrow-right ms-1"></i>
          </Link>
        </div>

        {loading ? (
          <div className="row g-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="col-6 col-sm-4 col-md-3 col-lg-2">
                <div className="country-card skeleton-pulse" style={{ height: '100px' }}></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="row g-3">
            {items.map((country) => (
              <div key={country.slug || country.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                <Link
                  to={`/countries#${country.slug || ''}`}
                  className="country-card"
                >
                  <span className="country-flag-icon">{country.flag}</span>
                  <div className="country-name">{country.name}</div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}