export default function CompanySection({ data, loading }) {
  const title = data.company_title || 'Bridging Skilled Talent with Global Opportunities'
  const content1 = data.company_content1 || 'Eminent International was established with a single vision: to transform international manpower recruitment into a seamless, transparent, and ethically compliant operation. Holding <strong>Recruiting License (RL-1842)</strong> from the Bangladesh Ministry of Expatriates\' Welfare and <strong>Commercial Registration (CR-1010778401)</strong> in Saudi Arabia, we provide direct end-to-end recruitment services.'
  const content2 = data.company_content2 || 'With dedicated corporate offices in Dhaka and Riyadh, our expert recruiters, trade testers, and legal officers ensure that every candidate is thoroughly vetted, medically tested, and pre-oriented before flight deployment.'
  const stat1Label = data.stat1_label || 'Workers Deployed'
  const stat1Number = data.stat1_number || '10,000+'
  const stat2Label = data.stat2_label || 'Saudi & Global Clients'
  const stat2Number = data.stat2_number || '500+'

  return (
    <section id="company" className="section-padding">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <span className="section-tagline">Our Company</span>
            <h2 className="section-title">{title}</h2>
            <p className="text-muted">{content1}</p>
            <p className="text-muted">{content2}</p>
            <div className="row g-3 mt-2">
              <div className="col-6">
                <div className="border-start border-maroon border-3 ps-3">
                  <h4 className="fw-bold text-navy mb-0">{stat1Number}</h4>
                  <small className="text-muted fw-semibold">{stat1Label}</small>
                </div>
              </div>
              <div className="col-6">
                <div className="border-start border-gold border-3 ps-3">
                  <h4 className="fw-bold text-navy mb-0">{stat2Number}</h4>
                  <small className="text-muted fw-semibold">{stat2Label}</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            {loading ? (
              <div className="skeleton-pulse rounded-4" style={{ height: '350px' }}></div>
            ) : data.company_image ? (
              <img
                src={data.company_image}
                alt="Eminent International Office"
                className="img-fluid rounded-4 shadow-lg border"
              />
            ) : (
              <img
                src="/src/assets/images/saudi_employer_1785857965458.jpg"
                alt="Eminent International Office"
                className="img-fluid rounded-4 shadow-lg border"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}