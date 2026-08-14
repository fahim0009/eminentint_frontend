import { useApi } from '../../hooks/useApi'

export default function TimelineSection({ data }) {
  const { data: response, loading } = useApi('/milestones')
  const milestones = response?.data || []

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-tagline">{data?.timeline_tag || 'Our Journey'}</span>
          <h2 className="section-title">{data?.timeline_title || 'Company Timeline'}</h2>
        </div>

        <div className="row g-4 position-relative">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="col-md-4 col-lg-2 text-center">
                <div className="p-3 border rounded bg-white shadow-sm h-100">
                  <div className="skeleton-pulse" style={{ height: '20px', width: '50%', margin: '0 auto 10px' }}></div>
                  <div className="skeleton-pulse" style={{ height: '20px', width: '80%', margin: '0 auto 10px' }}></div>
                  <div className="skeleton-pulse" style={{ height: '40px', width: '100%' }}></div>
                </div>
              </div>
            ))
          ) : (
            milestones.map(function (item) {
              const badgeClass = item.badge_color === 'bg-gold' ? 'bg-gold text-dark' : item.badge_color
              
              return (
                <div key={item.id} className="col-md-4 col-lg-2 text-center">
                  <div className={'p-3 border rounded bg-white shadow-sm h-100' + (item.badge_color === 'bg-success' ? ' border-success' : '')}>
                    <div className={'badge ' + badgeClass + ' mb-2 fs-6'}>{item.year}</div>
                    <h6 className="fw-bold text-navy">{item.title}</h6>
                    <small className="text-muted">{item.description}</small>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}