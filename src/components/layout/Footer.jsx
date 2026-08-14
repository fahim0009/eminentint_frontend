import { Link } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'

export default function Footer() {
  const { data: response } = useApi('/company-details')
  const company = response?.data || {}

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'
  const LARAVEL_URL = API_BASE_URL.replace('/api', '/uploads/company')

  const footerLogoUrl = company.footer_logo 
    ? (company.footer_logo.startsWith('http') ? company.footer_logo : `${LARAVEL_URL}/${company.footer_logo}`)
    : '/assets/logo.svg'

  const socialLinks = [
    { icon: 'facebook-f', url: company.facebook },
    { icon: 'twitter', url: company.twitter },
    { icon: 'linkedin-in', url: company.linkedin },
    { icon: 'youtube', url: company.youtube },
    { icon: 'whatsapp', url: company.whatsapp ? `https://wa.me/${company.whatsapp}` : null },
  ].filter(s => s.url) 

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-4">
          {/* Col 1: About */}
          <div className="col-lg-4">
            <img
              src={footerLogoUrl}
              alt="Eminent Logo"
              className="brand-logo-img mb-3 bg-white p-2 rounded"
              style={{ height: '58px' }}
            />
            <p className="text-muted">
              {company.footer_content ||
                'Eminent International is a Bangladesh licensed recruiting agency and Saudi licensed company, providing reliable workforce solutions worldwide.'}
            </p>
            <div className="top-bar-social mt-3">
              {socialLinks.map((social) => (
                <a key={social.icon} href={social.url} target="_blank" rel="noreferrer" aria-label={social.icon}>
                  <i className={'fa-brands fa-' + social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="col-6 col-lg-2">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/countries">Countries</Link></li>
              <li><Link to="/industries">Industries</Link></li>
              <li><Link to="/jobs">Job Opportunities</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 3: For Employers */}
          <div className="col-6 col-lg-2">
            <h5 className="footer-title">For Employers</h5>
            <ul className="footer-links">
              <li><Link to="/employers">Why Choose Us</Link></li>
              <li><Link to="/employers#process">Recruitment Process</Link></li>
              <li><Link to="/employers#partners">Our Partners</Link></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); document.querySelector('[data-bs-target="#employerDemandModal"]')?.click() }}>Submit Requirement</a></li>
            </ul>
          </div>

          {/* Col 4: Legal & More + Contact */}
          <div className="col-lg-4">
            <h5 className="footer-title">Legal & More</h5>
            <ul className="footer-links">
              <li><Link to="/licenses">Government Licenses</Link></li>
              <li><Link to="/portals">Candidate & Employer Portals</Link></li>
              <li><Link to="/news">News & Updates</Link></li>
            </ul>

            <h5 className="footer-title mt-4">Contact Us</h5>
            <div className="mb-3">
              <div className="fw-bold text-white">
                <i className="bi bi-geo-alt-fill text-gold me-2"></i>Bangladesh Office:
              </div>
              <div className="text-muted small">{company.address1 || 'House # 123, Road # 5, Block # F, Banani, Dhaka-1213, Bangladesh'}</div>
              <div className="text-gold small mt-1">
                <i className="bi bi-telephone me-1"></i> {company.phone1 || '+880 01894-XXXXXX'}
              </div>
            </div>

            <div className="mb-3">
              <div className="fw-bold text-white">
                <i className="bi bi-geo-alt-fill text-gold me-2"></i>Saudi Office:
              </div>
              <div className="text-muted small">{company.address2 || 'King Fahd Road, Olaya, Riyadh, Kingdom of Saudi Arabia'}</div>
              <div className="text-gold small mt-1">
                <i className="bi bi-telephone me-1"></i> {company.phone2 || '+966 5X XXX XXXX'}
              </div>
            </div>
            <div>
              <div className="text-muted small">
                <i className="bi bi-envelope me-1"></i> {company.email1 || 'info@eminentint.com'}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div>{company.copyright || `© ${new Date().getFullYear()} Eminent International. All Rights Reserved.`}</div>
          <div className="d-flex gap-3 mt-2 mt-md-0">
            <a href="#" className="text-muted text-decoration-none">Privacy Policy</a>
            <a href="#" className="text-muted text-decoration-none">Terms & Conditions</a>
            <Link to="/licenses" className="text-muted text-decoration-none">QR License Verification</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}