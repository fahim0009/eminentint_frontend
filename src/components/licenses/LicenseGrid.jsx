function LicenseCard({ license, onVerify }) {
  const { title, description, reg_no, reg_detail, icon_class, icon_color, status_badge, badge_color, prefix_badge, prefix_badge_color, border_class } = license

  return (
    <div className="col-md-6 col-lg-4">
      <div className={'p-4 bg-white border rounded-4 shadow-sm h-100 d-flex flex-column justify-content-between text-center position-relative ' + (border_class || '')}>
        <span className={'badge position-absolute top-0 end-0 m-3 px-2 py-1 ' + (badge_color || 'bg-success')}>
          <i className="bi bi-check-circle-fill me-1"></i> {status_badge}
        </span>
        <div>
          <div className={'badge text-white mb-3 ' + (prefix_badge_color || 'bg-navy')}>{prefix_badge}</div>
          <h5 className="fw-bold text-navy mb-2">{title}</h5>
          <p className="text-muted small">{description}</p>
          <div className="p-3 bg-light rounded my-3 border position-relative">
            <i className={'bi display-4 d-block mb-1 ' + (icon_class || 'bi-file-earmark-pdf-fill') + ' ' + (icon_color || 'text-maroon')}></i>
            <div className="fw-bold text-navy fs-6">Reg No: {reg_no}</div>
            <small className="text-muted d-block mt-1">{reg_detail}</small>
          </div>
        </div>
        <div className="d-grid gap-2">
          <button className="btn btn-brand-navy btn-sm" onClick={() => onVerify(license)}>
            <i className="bi bi-eye-fill me-1"></i> View & Verify Certificate
          </button>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => alert(`Downloading Certified Copy of License ${reg_no} PDF...`)}>
            <i className="bi bi-download me-1"></i> Download PDF
          </button>
        </div>
      </div>
    </div>
  )
}

export default function LicenseGrid({ licenses, onVerify }) {
  const list = Array.isArray(licenses) ? licenses : (licenses?.data || [])
  if (!list || list.length === 0) return null

  return (
    <div className="row g-4">
      {list.map((license) => (
        <LicenseCard key={license.id} license={license} onVerify={onVerify} />
      ))}
    </div>
  )
}