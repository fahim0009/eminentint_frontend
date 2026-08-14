var timelineData = [
  { year: '2021', badge: 'bg-maroon', title: 'Company Started', desc: 'Established in Dhaka with BMET recruiting license RL-1842.' },
  { year: '2022', badge: 'bg-navy', title: 'Saudi Market Entry', desc: 'First bulk recruitment contracts signed for Saudi construction & hospitality.' },
  { year: '2023', badge: 'bg-gold text-dark', title: 'Global Expansion', desc: 'Expanded deployment to UAE, Qatar, Oman, and Malaysia.' },
  { year: '2024', badge: 'bg-navy', title: 'B2B Alliances', desc: 'Over 300 corporate clients added across Gulf & European healthcare & logistics.' },
  { year: '2025', badge: 'bg-maroon', title: 'Saudi Office Established', desc: 'Opened full Riyadh branch on King Fahd Road for local client care.' },
  { year: '2026', badge: 'bg-success', title: 'Saudi Licensed Company', desc: 'Obtained official Saudi CR and Trading License for direct staffing.' },
]

export default function TimelineSection({ data, loading }) {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-tagline">{data?.timeline_tag || 'Our Journey'}</span>
          <h2 className="section-title">{data?.timeline_title || 'Company Timeline (2021 - 2026)'}</h2>
        </div>

        <div className="row g-4 position-relative">
          {timelineData.map(function (item, index) {
            return (
              <div key={index} className="col-md-4 col-lg-2 text-center">
                <div className={'p-3 border rounded bg-white shadow-sm h-100' + (item.badge === 'bg-success' ? ' border-success' : '')}>
                  <div className={'badge ' + item.badge + ' mb-2 fs-6'}>{item.year}</div>
                  <h6 className="fw-bold text-navy">{item.title}</h6>
                  <small className="text-muted">{item.desc}</small>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}