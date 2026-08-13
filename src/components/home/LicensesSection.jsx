import { Link } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'

const iconMap = {
  'recruiting agency license': { icon: 'bi-file-earmark-pdf-fill', color: 'text-maroon' },
  'bmet approval certificate': { icon: 'bi-award-fill', color: 'text-navy' },
  'trade license': { icon: 'bi-file-text-fill', color: 'text-gold' },
  'saudi commercial registration': { icon: 'bi-shield-check', color: 'text-success' },
  'saudi trading license': { icon: 'bi-file-earmark-check-fill', color: 'text-primary' },
  'chamber membership': { icon: 'bi-building-check', color: 'text-warning' },
}

export default function LicensesSection() {
  const { data: licenses, loading } = useApi('/licenses')

  const defaultLicenses = [
    { title: 'Bangladesh Recruiting License', sub: 'RL-1842 (BMET)', type: 'Recruiting Agency License', reg_no: 'RL-1842' },
    { title: 'BMET Registration', sub: 'Govt Approval', type: 'BMET Approval Certificate', reg_no: 'BMET-REG-8821' },
    { title: 'Trade License', sub: 'City Corporation', type: 'Trade License', reg_no: 'TRAD/DNCC/019241' },
    { title: 'Saudi Commercial Registration', sub: 'CR: 1010778401', type: 'Saudi Commercial Registration', reg_no: 'CR: 1010778401' },
    { title: 'Saudi Service & Trading', sub: 'Riyadh Municipality', type: 'Saudi Trading License', reg_no: 'MOCI-SAUDI-2024' },
    { title: 'Chamber of Commerce', sub: 'Verified Member', type: 'Chamber Membership', reg_no: 'DCCI-2026-MEM' },
  ]

  const items = licenses?.data?.length > 0 ? licenses.data.slice(0, 6) : defaultLicenses

  return (
    <section className="licenses-banner-section">
      <div className="container">
        <div className="row align-items-center mb-4">
          <div className="col-md-8">
            <span className="text-gold fw-bold text-uppercase" style={{ letterSpacing: '0.1em' }}>
              100% Government Legal Compliance
            </span>
            <h2 className="text-white fw-bold mb-0">OUR LICENSES & CERTIFICATIONS</h2>
          </div>
          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <Link to="/licenses" className="btn btn-outline-light">
              View All Licenses & Verify QR
            </Link>
          </div>
        </div>

        <div className="row g-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="col-6 col-md-4 col-lg-2">
                  <div className="license-card skeleton-pulse" style={{ height: '140px' }}></div>
                </div>
              ))
            : items.map((license, i) => {
                const key = license.type?.toLowerCase() || ''
                const mapped = iconMap[key] || { icon: 'bi-file-earmark-fill', color: 'text-navy' }
                return (
                  <div key={license.id || i} className="col-6 col-md-4 col-lg-2">
                    <div className="license-card">
                      <div className="license-thumb-box">
                        <i className={`bi ${license.icon || mapped.icon} display-4 ${license.icon_color || mapped.color}`}></i>
                      </div>
                      <div className="license-card-title">{license.title}</div>
                      <div className="license-card-sub">{license.sub || license.reg_no}</div>
                    </div>
                  </div>
                )
              })
          }
        </div>
      </div>
    </section>
  )
}