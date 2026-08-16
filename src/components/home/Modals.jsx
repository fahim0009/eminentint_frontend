import { useState } from 'react'
import { usePost } from '../../hooks/useApi'

export function TrackerModal() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [searching, setSearching] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setSearching(true)
    setResult(null)

    setTimeout(() => {
      if (query.toUpperCase() === 'A12345678') {
        setResult({
          name: 'MD. RAHIM UDDIN',
          passport: 'A12345678',
          appId: 'EM-2026-8842',
          status: 'Visa Stamped & Ticket Ready',
          statusColor: 'bg-success',
          currentStep: 5,
          trade: 'Steel Fixer',
          destination: 'Riyadh, Saudi Arabia',
          employer: 'Al Yamama Contracting',
          medical: 'Fit - GAMCA Cleared',
          bmet: 'Cleared & Verified',
          flight: 'Scheduled - Pending Confirmation',
          notes: 'Orientation completed at Dhaka office. Passport handover scheduled.',
        })
      } else if (query.toUpperCase() === 'B98765432') {
        setResult({
          name: 'MD. KARIM HOSSAIN',
          passport: 'B98765432',
          appId: 'EM-2026-9105',
          status: 'Trade Test Pending',
          statusColor: 'bg-warning text-dark',
          currentStep: 2,
          trade: 'Electrician',
          destination: 'Jeddah, Saudi Arabia',
          employer: 'Al Falah Hospitality',
          medical: 'Not Yet Scheduled',
          bmet: 'Pending',
          flight: 'TBD',
          notes: 'Trade test date will be communicated via SMS. Keep documents ready.',
        })
      } else {
        setResult({ notFound: true })
      }
      setSearching(false)
    }, 1200)
  }

  const steps = ['Applied', 'Screened', 'Trade Test', 'Medical Fit', 'Visa Stamped', 'Flight']

  return (
    <div className="modal fade" id="trackerModal" tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-navy text-white" style={{ backgroundColor: '#113045' }}>
            <h5 className="modal-title fw-bold">
              <i className="bi bi-search me-2 text-gold"></i> Candidate Application Status Tracker
            </h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body p-4">
            <form onSubmit={handleSearch} className="mb-4">
              <label className="form-label fw-bold">Enter Passport Number or Application Reference ID:</label>
              <div className="input-group input-group-lg">
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g., A12345678 or EM-2026-8842"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-brand-navy" disabled={searching}>
                  {searching ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ) : (
                    'Check Status'
                  )}
                </button>
              </div>
              <small className="text-muted mt-1 d-block">
                Demo search tip: Try searching <strong>A12345678</strong> or <strong>B98765432</strong>
              </small>
            </form>

            {result?.notFound && (
              <div className="alert alert-warning">
                <i className="bi bi-exclamation-triangle me-2"></i>
                No candidate found with this passport number or reference ID. Please verify and try again.
              </div>
            )}

            {result && !result.notFound && (
              <div className="p-3 border rounded bg-light">
                <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                  <div>
                    <h5 className="fw-bold text-navy mb-0">{result.name}</h5>
                    <small className="text-muted">
                      Passport: {result.passport} | App ID: {result.appId}
                    </small>
                  </div>
                  <span className={`badge ${result.statusColor} p-2`}>{result.status}</span>
                </div>

                <div className="row text-center mb-4 g-2">
                  {steps.map((step, i) => (
                    <div key={i} className="col-2">
                      <div className={`tracker-step-item step-${i + 1} ${
                        i + 1 < result.currentStep ? 'completed' :
                        i + 1 === result.currentStep ? 'active' : ''
                      }`}>
                        <div className="fw-bold small">{i + 1}. {step}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="row g-2 small text-muted">
                  <div className="col-md-6"><strong>Target Trade:</strong> {result.trade}</div>
                  <div className="col-md-6"><strong>Destination:</strong> {result.destination}</div>
                  <div className="col-md-6"><strong>Employer:</strong> {result.employer}</div>
                  <div className="col-md-6"><strong>GAMCA Medical:</strong> {result.medical}</div>
                  <div className="col-md-6"><strong>BMET Status:</strong> {result.bmet}</div>
                  <div className="col-md-6"><strong>Flight Schedule:</strong> {result.flight}</div>
                </div>
                <div className="alert alert-info mt-3 py-2 mb-0 small">{result.notes}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function EmployerDemandModal({ isOpen, onClose }) {
  const { postData, loading } = usePost()
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const payload = {
      company_name: form.emp_company.value,
      contact_person: form.emp_person.value,
      phone: form.emp_phone.value,
      email: form.emp_email.value,
      destination_country: form.emp_country.value,
      occupation: form.emp_occupation.value,
      quantity: form.emp_quantity.value,
      salary: form.emp_salary.value,
      accommodation: form.emp_accommodation.value,
    }

    try {
      await postData('/employer-demand', payload)
      setSuccess(true)
      form.reset()
    } catch (err) {
      console.error('Demand submission failed', err)
      alert('Something went wrong. Please try again.')
    }
  }

  const handleClose = () => {
    setSuccess(false)
    onClose()
  }

  
  if (!isOpen) return null

  return (
    <div 
      className="modal fade show d-block" 
      tabIndex="-1" 
      style={{ background: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-navy text-white" style={{ backgroundColor: '#113045' }}>
            <h5 className="modal-title fw-bold">
              <i className="bi bi-building me-2 text-gold"></i> Submit Worker Demand Requirement
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={handleClose}></button>
          </div>
          <div className="modal-body p-4">
            
            {success ? (
              <div className="text-center p-5">
                <div className="text-success mb-3">
                  <i className="bi bi-check-circle-fill display-1"></i>
                </div>
                <h4 className="fw-bold text-navy">Demand Request Submitted!</h4>
                <p className="text-muted">Our recruitment team will contact you within 24 hours.</p>
                <button className="btn btn-brand-navy px-4 mt-3" onClick={handleClose}>
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Company / Employer Name *</label>
                    <input type="text" name="emp_company" className="form-control" placeholder="e.g. Al Yamama Construction KSA" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Contact Person Name *</label>
                    <input type="text" name="emp_person" className="form-control" placeholder="e.g. Sheikh Abdullah / HR Manager" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Mobile / WhatsApp Number *</label>
                    <input type="tel" name="emp_phone" className="form-control" placeholder="+966 5X XXX XXXX" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Official Email Address *</label>
                    <input type="email" name="emp_email" className="form-control" placeholder="hr@company.com" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Destination Country</label>
                    <select name="emp_country" className="form-select">
                      <option value="Saudi Arabia">🇸🇦 Saudi Arabia</option>
                      <option value="UAE">🇦🇪 United Arab Emirates</option>
                      <option value="Qatar">🇶🇦 Qatar</option>
                      <option value="Oman">🇴🇲 Oman</option>
                      <option value="Malta">🇲🇹 Malta (Europe)</option>
                      <option value="Poland">🇵🇱 Poland (Europe)</option>
                      <option value="Malaysia">🇲🇾 Malaysia</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Required Worker Trade / Occupation</label>
                    <input type="text" name="emp_occupation" className="form-control" placeholder="e.g. Barista / Electrician / General Cleaner" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Worker Quantity Required</label>
                    <input type="number" name="emp_quantity" className="form-control" placeholder="e.g. 50" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Offered Monthly Salary (SAR / Local)</label>
                    <input type="text" name="emp_salary" className="form-control" placeholder="e.g. 1800 SAR + Food" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Accommodation Provided?</label>
                    <select name="emp_accommodation" className="form-select">
                      <option value="Yes - Provided by Employer">Yes - Free Accommodation</option>
                      <option value="No - Allowance Included">No - Allowance Included</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 text-end">
                  <button type="button" className="btn btn-secondary me-2" onClick={handleClose}>Cancel</button>
                  <button type="submit" className="btn btn-brand-gold px-4" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Submitting...
                      </>
                    ) : (
                      'Submit Demand Request'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}