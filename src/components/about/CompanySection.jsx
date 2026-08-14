import defaultImg from '../../assets/images/saudi_employer_1785857965458.jpg'

export default function CompanySection({ data, loading }) {
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'
  const LARAVEL_URL = API_BASE_URL.replace('/api', '')

  
  const companyImage = data?.company_image ? `${LARAVEL_URL}${data.company_image}` : defaultImg

  return (
    <section id="company" className="section-padding">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <span className="section-tagline">{data?.company_tag || 'Our Company'}</span>
            <h2 className="section-title">{data?.company_title || 'Bridging Skilled Talent with Global Opportunities'}</h2>
            
            {/* HTML কন্টেন্ট রেন্ডার করার জন্য */}
            <p className="text-muted" dangerouslySetInnerHTML={{ __html: data?.company_content1 || '' }} />
            <p className="text-muted" dangerouslySetInnerHTML={{ __html: data?.company_content2 || '' }} />
            
            <div className="row g-3 mt-2">
              <div className="col-6">
                <div className="border-start border-maroon border-3 ps-3">
                  <h4 className="fw-bold text-navy mb-0">{data?.stat1_number || '10,000+'}</h4>
                  <small className="text-muted fw-semibold">{data?.stat1_label || 'Workers Deployed'}</small>
                </div>
              </div>
              <div className="col-6">
                <div className="border-start border-gold border-3 ps-3">
                  <h4 className="fw-bold text-navy mb-0">{data?.stat2_number || '500+'}</h4>
                  <small className="text-muted fw-semibold">{data?.stat2_label || 'Saudi & Global Clients'}</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            {loading ? (
              <div className="skeleton-pulse rounded-4" style={{ height: '350px' }}></div>
            ) : (
              <img
                src={companyImage}
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