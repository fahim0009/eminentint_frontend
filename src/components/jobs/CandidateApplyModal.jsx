import { useState } from 'react'
import axios from 'axios'

export default function CandidateApplyModal({ selectedJob, onClose }) {
  const [loading, setLoading] = useState(false)
  const [successData, setSuccessData] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    setLoading(true)

    const formData = new FormData()
    formData.append('full_name', form.full_name.value)
    formData.append('passport_number', form.passport_number.value)
    formData.append('phone', form.phone.value)
    
    const targetPosition = selectedJob?.title || form.target_position.value
    formData.append('target_position', targetPosition)
    
    formData.append('destination_country', form.destination_country.value)
    formData.append('experience_level', form.experience_level.value)
    
    if (selectedJob?.id) {
      formData.append('job_listing_id', String(selectedJob.id))
    }

    if (form.passport_file.files[0]) {
      formData.append('passport_file', form.passport_file.files[0])
    }
    if (form.cv_file.files[0]) {
      formData.append('cv_file', form.cv_file.files[0])
    }

    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'
    const url = `${API_BASE_URL}/candidate-apply`

    try {
      const res = await axios.post(url, formData)
      setSuccessData(res.data)
      form.reset()
    } catch (err) {
      console.error('Full Error Object:', err)
      
      if (err.response) {
        const errorData = err.response.data
        if (errorData && errorData.errors) {
          const errorMessages = Object.values(errorData.errors).flat().join('\n')
          alert(errorMessages)
        } else {
          alert(errorData?.message || 'Server returned an error.')
        }
      } else if (err.request) {
        alert('No response from server. Is the Laravel server running? Or is it a CORS issue?')
      } else {
        alert('Error setting up request: ' + err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setSuccessData(null)
    onClose()
  }

  return (
    <div 
      className="modal fade show d-block" 
      tabIndex="-1" 
      aria-hidden="true"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-navy text-white" style={{ backgroundColor: '#113045' }}>
            <h5 className="modal-title fw-bold">
              <i className="bi bi-person-plus me-2 text-gold"></i> Direct Candidate Application
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={handleClose}></button>
          </div>
          <div className="modal-body p-4">
            
            {successData ? (
              <div className="text-center p-5">
                <div className="text-success mb-3">
                  <i className="bi bi-check-circle-fill display-1"></i>
                </div>
                <h4 className="fw-bold text-navy">Application Submitted!</h4>
                <p className="text-muted">Your tracking reference ID is:</p>
                <h3 className="fw-bold text-gold mb-4">{successData.tracking_id}</h3>
                <p className="small text-muted">You can track your status on our portal.</p>
                <button className="btn btn-brand-navy px-4 mt-3" onClick={handleClose}>Close</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Full Candidate Name (as per Passport) *</label>
                    <input type="text" name="full_name" className="form-control" placeholder="" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Passport Number *</label>
                    <input type="text" name="passport_number" className="form-control" placeholder="e.g. A12345678" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Mobile Number (WhatsApp) *</label>
                    <input type="tel" name="phone" className="form-control" placeholder="+880 17XX XXXXXX" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Target Position / Trade *</label>
                    <input 
                      type="text" 
                      name="target_position" 
                      className="form-control" 
                      defaultValue={selectedJob?.title || ''} 
                      placeholder="e.g. Electrician" 
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Preferred Destination Country</label>
                    <select name="destination_country" className="form-select" defaultValue="Saudi Arabia">
                      <option value="Saudi Arabia">🇸🇦 Saudi Arabia</option>
                      <option value="UAE">🇦🇪 UAE</option>
                      <option value="Qatar">🇶🇦 Qatar</option>
                      <option value="Malta">🇲🇹 Malta</option>
                      <option value="Poland">🇵🇱 Poland</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Experience Level</label>
                    <select name="experience_level" className="form-select">
                      <option value="Fresh">Fresh / Beginner</option>
                      <option value="1-3 Years">1 - 3 Years Bangladesh Exp</option>
                      <option value="Saudi Return">Saudi Arabia / Gulf Returnee</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Upload Passport Scan (PDF / JPG)</label>
                    <input type="file" name="passport_file" className="form-control" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Upload CV / Resume (Optional)</label>
                    <input type="file" name="cv_file" className="form-control" />
                  </div>
                </div>
                
                <div className="alert alert-warning mt-3 py-2 small">
                  <i className="bi bi-shield-exclamation me-1"></i> Eminent International never charges registration fees. All processing is government verified.
                </div>
                
                <div className="text-end mt-3">
                  <button type="button" className="btn btn-secondary me-2" onClick={handleClose}>Cancel</button>
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