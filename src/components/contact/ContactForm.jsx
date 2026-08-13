import { useState } from 'react'
import axios from 'axios'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    user_type: 'Corporate Employer (Seeking Workers)',
    subject: '',
    message: ''
  })

  const [alertMsg, setAlertMsg] = useState('')
  const [alertType, setAlertType] = useState('danger') // or 'success'
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setAlertMsg('')

    try {
      // তোমার API এর সঠিক URL এখানে দিবে
      const response = await axios.post('http://127.0.0.1:8000/api/contact-store', formData)
      
      if (response.data.success) {
        setAlertType('success')
        setAlertMsg(response.data.message)
        // ফর্ম রিসেট করা
        setFormData({
          name: '', phone: '', email: '', user_type: 'Corporate Employer (Seeking Workers)', subject: '', message: ''
        })
      }
    } catch (error) {
      setAlertType('danger')
      if (error.response && error.response.data.errors) {
        // Validation errors
        const firstError = Object.values(error.response.data.errors)[0][0]
        setAlertMsg(firstError)
      } else {
        setAlertMsg('Something went wrong. Please try again later.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-900 mx-auto bg-white p-4 p-md-5 rounded-4 shadow-sm border">
      <div className="text-center mb-4">
        <span className="section-tagline">Get In Touch</span>
        <h2 className="section-title">SEND US A DIRECT MESSAGE</h2>
        <p className="text-muted">Whether you are an employer seeking bulk workforce or a job candidate inquiring about open visas, our team is ready to assist you.</p>
      </div>

      {alertMsg && (
        <div className={`alert alert-${alertType} mb-4`} role="alert">
          {alertMsg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-bold">Full Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="e.g. Abdullah Al-Mansoor / Rahim Ahmed" required />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">Phone / WhatsApp Number *</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-control" placeholder="e.g. +966 50 123 4567 or +880 1711..." required />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="name@example.com" />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">I am a...</label>
            <select name="user_type" value={formData.user_type} onChange={handleChange} className="form-select">
              <option value="Corporate Employer (Seeking Workers)">Corporate Employer (Seeking Workers)</option>
              <option value="Jobseeker / Candidate">Jobseeker / Candidate</option>
              <option value="Recruitment Agent / Partner">Recruitment Agent / Partner</option>
              <option value="General Inquiry">General Inquiry</option>
            </select>
          </div>
          <div className="col-12">
            <label className="form-label fw-bold">Subject</label>
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="form-control" placeholder="e.g. Inquiry regarding 50 Construction Workers in Riyadh" />
          </div>
          <div className="col-12">
            <label className="form-label fw-bold">Message Details *</label>
            <textarea name="message" value={formData.message} onChange={handleChange} className="form-control" rows="4" placeholder="Please describe your manpower requirement, job query, or office visit request in detail..." required></textarea>
          </div>
        </div>
        <div className="mt-4 text-center">
          <button type="submit" className="btn btn-brand-navy px-5 py-3 fw-bold" disabled={loading}>
            {loading ? (
              <><span className="spinner-border spinner-border-sm me-2"></span> Sending...</>
            ) : (
              <><i className="bi bi-send-fill me-2"></i> Send Message</>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}