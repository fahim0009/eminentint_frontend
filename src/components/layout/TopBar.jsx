import { useApi } from '../../hooks/useApi'

export default function TopBar() {
  const { data: company } = useApi('/company-details')

  return (
    <div className="top-bar d-none d-lg-block">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-4">
            <span>
              <i className="bi bi-telephone-fill text-gold me-1"></i>
              <strong>Bangladesh Office:</strong>{' '}
              <a href={`tel:${company?.phone_bd || ''}`}>
                {company?.phone_bd || '+880 01894-XXXXXX'}
              </a>
            </span>
            <span>
              <i className="bi bi-telephone-fill text-gold me-1"></i>
              <strong>Saudi Office:</strong>{' '}
              <a href={`tel:${company?.phone_sa || ''}`}>
                {company?.phone_sa || '+966 5X XXX XXXX'}
              </a>
            </span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span>
              <i className="bi bi-envelope-fill text-gold me-1"></i>
              <a href={`mailto:${company?.email || 'info@eminentint.com'}`}>
                {company?.email || 'info@eminentint.com'}
              </a>
            </span>
            <div className="top-bar-social ms-2">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
            <div className="ms-3">
              <select
                className="form-select form-select-sm bg-dark text-white border-secondary py-0 px-2"
                style={{ fontSize: '0.8rem', height: '26px' }}
                defaultValue="en"
              >
                <option value="en">🇺🇸 English</option>
                <option value="ar">🇸🇦 العربية</option>
                <option value="bn">🇧🇩 বাংলা</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}