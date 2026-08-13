import { useState, useEffect, useRef } from 'react'
import api from '../../api/axios'

export default function ApplyModal({ selectedJobTitle }) {
  const modalRef = useRef(null)
  const bsModal = useRef(null)
  const [form, setForm] = useState({
    name: '',
    passport: '',
    mobile: '',
    trade: '',
    country: 'Saudi Arabia',
    experience: 'Fresh',
  })
  const [passportFile, setPassportFile] = useState(null)
  const [cvFile, setCvFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Bootstrap modal initialize - safe check added
  useEffect(() => {
    if (!modalRef.current || !window.bootstrap) return
    bsModal.current = new window.bootstrap.Modal(modalRef.current)
    return () => {
      if (bsModal.current) {
        bsModal.current.dispose()
        bsModal.current = null
      }
    }
  }, [])

  // Reset form when modal hides
  useEffect(() => {
    const el = modalRef.current
    if (!el) return
    const handleHidden = () => {
      setForm({ name: '', passport: '', mobile: '', trade: '', country: 'Saudi Arabia', experience: 'Fresh' })
      setPassportFile(null)
      setCvFile(null)
      setSuccess(false)
    }
    el.addEventListener('hidden.bs.modal', handleHidden)
    return () => el.removeEventListener('hidden.bs.modal', handleHidden)
  }, [])

  // Update trade when selectedJobTitle changes
  useEffect(() => {
    if (selectedJobTitle) {
      setForm((prev) => ({ ...prev, trade: selectedJobTitle }))
    }
  }, [selectedJobTitle])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('candidate_name', form.name)
      formData.append('passport_number', form.passport)
      formData.append('mobile', form.mobile)
      formData.append('trade', form.trade)
      formData.append('preferred_country', form.country)
      formData.append('experience_level', form.experience)
      if (passportFile) formData.append('passport_file', passportFile)
      if (cvFile) formData.append('cv_file', cvFile)

      await api.post('/candidate-apply', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setSuccess(true)
    } catch (err) {
      alert(err.response?.data?.message || 'Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal fade" id="candidateApplyModal" ref={modalRef} tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-navy text-white" style={{ backgroundColor: '#113045' }}>
            <h5 className="modal-title fw-bold">
              <i className="bi bi-person-plus me-2 text-gold"></i>
              Direct Candidate Application & Passport Upload
            </h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>

          <div className="modal-body p-4">
            {success ? (
              <div className="text-center py-4">
                <div className="text-success mb-3">
                  <i className="bi bi-check-circle-fill display-1"></i>
                </div>
                <h4 className="fw-bold text-navy">Application Submitted!</h4>
                <p className="text-muted">Your tracking reference ID is <strong>EM-2026-9921</strong>. You can track status on our portal.</p>
                <button className="btn btn-brand-navy btn-sm" data-bs-dismiss="modal">
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Full Candidate Name (as per Passport) *</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="e.g. MD. SHAHIN ALAM"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Passport Number *</label>
                    <input
                      type="text"
                      name="passport"
                      className="form-control"
                      placeholder="e.g. A12345678"
                      value={form.passport}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Mobile Number (WhatsApp) *</label>
                    <input
                      type="tel"
                      name="mobile"
                      className="form-control"
                      placeholder="+880 17XX XXXXXX"
                      value={form.mobile}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Target Position / Trade *</label>
                    <select name="trade" className="form-select" value={form.trade} onChange={handleChange} required>
                      <option value="">Select Primary Trade...</option>
                      <option value="Barista">Barista / Coffee Specialist</option>
                      <option value="Electrician">Electrician / Technician</option>
                      <option value="Cleaner">General Cleaner / Helper</option>
                      <option value="Waiter">Restaurant Waiter / Steward</option>
                      <option value="Chef">Cook / Chef</option>
                      <option value="Driver">Heavy / Light Driver</option>
                      <option value="Loader">Airport / Warehouse Loader</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Preferred Destination Country</label>
                    <select name="country" className="form-select" value={form.country} onChange={handleChange}>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="UAE">UAE</option>
                      <option value="Qatar">Qatar</option>
                      <option value="Malta">Malta</option>
                      <option value="Poland">Poland</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Experience Level</label>
                    <select name="experience" className="form-select" value={form.experience} onChange={handleChange}>
                      <option value="Fresh">Fresh / Beginner</option>
                      <option value="1-3 Years">1 - 3 Years Bangladesh Exp</option>
                      <option value="Saudi Return">Saudi Arabia / Gulf Returnee</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Upload Passport Scan (PDF / JPG)</label>
                    <input
                      type="file"
                      className="form-control"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => setPassportFile(e.target.files[0] || null)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Upload CV / Resume (Optional)</label>
                    <input
                      type="file"
                      className="form-control"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={(e) => setCvFile(e.target.files[0] || null)}
                    />
                  </div>
                </div>

                <div className="alert alert-warning mt-3 py-2 small">
                  <i className="bi bi-shield-exclamation me-1"></i>
                  Eminent International never charges registration fees. All processing is government verified.
                </div>

                <div className="text-end mt-3">
                  <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-brand-gold px-4" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
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