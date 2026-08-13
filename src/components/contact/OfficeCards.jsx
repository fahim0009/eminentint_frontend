export default function OfficeCards({ company }) {
  if (!company) return null

  return (
    <div className="row g-4">
      {/* Bangladesh Office Card */}
      <div className="col-lg-6">
        <div className="p-4 p-md-5 bg-white border border-2 border-navy rounded-4 shadow-sm h-100">
          <span className="badge bg-maroon mb-2 fs-6">Headquarters — Bangladesh</span>
          <h3 className="fw-bold text-navy mb-3">Bangladesh Office</h3>
          
          <div className="mb-3 d-flex gap-3 align-items-start">
            <i className="bi bi-geo-alt-fill fs-4 text-gold"></i>
            <div><strong>Address:</strong><br />{company.address1}</div>
          </div>

          <div className="mb-3 d-flex gap-3 align-items-center">
            <i className="bi bi-telephone-fill fs-4 text-gold"></i>
            <div>
              <strong>Phone Hotline:</strong><br />
              <a href={`tel:${company.phone1}`} className="text-navy fw-bold text-decoration-none">{company.phone1}</a>
            </div>
          </div>

          <div className="mb-4 d-flex gap-3 align-items-center">
            <i className="bi bi-envelope-fill fs-4 text-gold"></i>
            <div>
              <strong>Email:</strong><br />
              <a href={`mailto:${company.email1}`} className="text-navy text-decoration-none">{company.email1}</a>
            </div>
          </div>

          {/* Map Rendering from API HTML string */}
          <div className="rounded-3 overflow-hidden border mb-3" style={{ height: '200px' }} dangerouslySetInnerHTML={{ __html: company.google_map }} />

          <div className="d-flex gap-2">
            <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-success w-100">
              <i className="fab fa-whatsapp me-1"></i> WhatsApp BD Office
            </a>
          </div>
        </div>
      </div>

      {/* Saudi Arabia Office Card */}
      <div className="col-lg-6">
        <div className="p-4 p-md-5 bg-white border border-2 border-navy rounded-4 shadow-sm h-100 border-start border-4 border-success">
          <span className="badge bg-success mb-2 fs-6">Licensed Branch — Kingdom of Saudi Arabia</span>
          <h3 className="fw-bold text-navy mb-3">Saudi Arabia Office</h3>
          
          <div className="mb-3 d-flex gap-3 align-items-start">
            <i className="bi bi-geo-alt-fill fs-4 text-success"></i>
            <div><strong>Address:</strong><br />{company.address2}</div>
          </div>

          <div className="mb-3 d-flex gap-3 align-items-center">
            <i className="bi bi-telephone-fill fs-4 text-success"></i>
            <div>
              <strong>Saudi Hotline:</strong><br />
              <a href={`tel:${company.phone2}`} className="text-navy fw-bold text-decoration-none">{company.phone2}</a>
            </div>
          </div>

          <div className="mb-4 d-flex gap-3 align-items-center">
            <i className="bi bi-envelope-fill fs-4 text-success"></i>
            <div>
              <strong>Email:</strong><br />
              <a href={`mailto:${company.email2}`} className="text-navy text-decoration-none">{company.email2}</a>
            </div>
          </div>

          <div className="rounded-3 overflow-hidden border mb-3" style={{ height: '200px' }} dangerouslySetInnerHTML={{ __html: company.google_map2 }} />

          <div className="d-flex gap-2">
            <a href={`https://wa.me/${company.phone2}`} target="_blank" rel="noreferrer" className="btn btn-success w-100">
              <i className="fab fa-whatsapp me-1"></i> WhatsApp Saudi Office
            </a>
            <button className="btn btn-brand-gold w-100" data-bs-toggle="modal" data-bs-target="#meetingModal">
              <i className="bi bi-calendar-event me-1"></i> Book Virtual Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}