import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'

const navLinks = [
  { label: 'Home', path: '/' },
  {
    label: 'About Us',
    path: '/about',
    children: [
      { label: 'Our Company', path: '/about#company', icon: 'bi-building', color: 'text-navy' },
      { label: 'Our Mission & Vision', path: '/about#mission-vision', icon: 'bi-bullseye', color: 'text-maroon' },
      { label: 'Chairman Message', path: '/about#chairman-message', icon: 'bi-person-badge', color: 'text-gold' },
      { label: 'CEO Message', path: '/about#ceo-message', icon: 'bi-award', color: 'text-navy' },
    ],
  },
  {
    label: 'Services',
    path: '/services',
    children: [
      { label: 'Permanent Recruitment', path: '/services#permanent' },
      { label: 'Bulk Workforce Supply', path: '/services#bulk' },
      { label: 'Trade Testing & Screening', path: '/services#trade' },
      { label: 'Visa Processing & Deployment', path: '/services#visa' },
    ],
  },
  { label: 'Countries', path: '/countries' },
  { label: 'Industries', path: '/industries' },
  { label: 'For Employers', path: '/employers' },
  { label: 'Jobs', path: '/jobs' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar({ onOpenDemandModal }) {
  const [openDropdown, setOpenDropdown] = useState(null)
  const location = useLocation()
  const { data: response } = useApi('/company-details')
  const company = response?.data || {}

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'
  const LARAVEL_URL = API_BASE_URL.replace('/api', '/uploads/company')

  const logoUrl = company.company_logo 
    ? (company.company_logo.startsWith('http') ? company.company_logo : `${LARAVEL_URL}/${company.company_logo}`)
    : '/assets/logo.svg' 

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="navbar navbar-expand-xl main-navbar">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logoUrl} alt={company.company_name || 'Eminent International Logo'} className="brand-logo-img" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {navLinks.map((link) =>
              link.children ? (
                <li
                  key={link.label}
                  className="nav-item dropdown"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    className={'nav-link dropdown-toggle' + (isActive(link.path) ? ' active' : '')}
                    to={link.path}
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded={openDropdown === link.label}
                  >
                    {link.label}
                  </Link>
                  <ul className={'dropdown-menu' + (openDropdown === link.label ? ' show' : '')}>
                    {link.children.map((child) => (
                      <li key={child.label}>
                        <Link className="dropdown-item" to={child.path}>
                          {child.icon && <i className={'bi ' + child.icon + ' me-2 ' + child.color}></i>}
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={link.label} className="nav-item">
                  <Link className={'nav-link' + (isActive(link.path) ? ' active' : '')} to={link.path}>
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            <Link to="/jobs" className="btn btn-brand-navy">Apply for Job</Link>
            <button
              className="btn btn-brand-gold"
              onClick={onOpenDemandModal}
            >
              Hire Workers
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}