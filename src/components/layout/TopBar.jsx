import { useApi } from '../../hooks/useApi'

// Format: first 3 digits, space, next 5 digits, space, remaining digits
// e.g.  "88001894123123"  ->  "880 01894 123123"
//       "+880 1894-123123" ->  "880 18941 23123" (non-digits stripped first)
const formatPhone = (phone) => {
  if (!phone) return ''
  const digits = String(phone).replace(/\D/g, '') // keep digits only
  if (!digits) return phone // nothing to format, return as-is
  const p1 = digits.slice(0, 3)
  const p2 = digits.slice(3, 8)
  const p3 = digits.slice(8)
  return [p1, p2, p3].filter(Boolean).join(' ')
}

// Build a clean tel: link (digits only, with optional +)
const telHref = (phone) => {
  if (!phone) return ''
  const digits = String(phone).replace(/[^\d+]/g, '').replace(/^\++/, '+')
  return `tel:${digits}`
}

export default function TopBar() {
  // ✅ Fix: unwrap the Laravel-style { data: {...} } response
  const { data: response } = useApi('/company-details')
  const company = response?.data || {}

  const phoneBd = formatPhone(company.phone_bd || company.phone1)
  const phoneSa = formatPhone(company.phone_sa || company.phone2)

  const email = company.email || company.email1 || 'info@eminentint.com'

  const socialLinks = [
    { icon: 'facebook-f', url: company.facebook },
    { icon: 'twitter',    url: company.twitter },
    { icon: 'linkedin-in', url: company.linkedin },
    { icon: 'youtube',    url: company.youtube },
  ].filter(s => s.url)

  return (
    <div className="top-bar d-none d-lg-block">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-4">
            <span>
              <i className="bi bi-telephone-fill text-gold me-1"></i>
              <strong>Bangladesh Office:</strong>{' '}
              <a href={telHref(company.phone_bd || company.phone1)}>
                {phoneBd || '+880 01894 XXXXXX'}
              </a>
            </span>
            <span>
              <i className="bi bi-telephone-fill text-gold me-1"></i>
              <strong>Saudi Office:</strong>{' '}
              <a href={telHref(company.phone_sa || company.phone2)}>
                {phoneSa || '+966 5X XXX XXXX'}
              </a>
            </span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span>
              <i className="bi bi-envelope-fill text-gold me-1"></i>
              <a href={`mailto:${email}`}>{email}</a>
            </span>
            <div className="top-bar-social ms-2">
              {socialLinks.map(s => (
                <a key={s.icon} href={s.url} target="_blank" rel="noreferrer" aria-label={s.icon}>
                  <i className={`fab fa-${s.icon}`}></i>
                </a>
              ))}
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