export default function MeetingModal() {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Virtual meeting scheduled! Check your email for Google Meet link.')
    
    // Modal hide করার জন্য
    var el = document.getElementById('meetingModal')
    if (el && window.bootstrap) {
      window.bootstrap.Modal.getInstance(el).hide()
    }
  }

  return (
    <div className="modal fade" id="meetingModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-4">
          <h4 className="fw-bold text-navy mb-2">
            <i className="bi bi-camera-video-fill text-gold me-2"></i> Book Online Video Meeting
          </h4>
          <p className="text-muted small">Schedule a Google Meet or Zoom session with our Saudi Arabia or Bangladesh recruitment directors.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-bold">Your Name / Company Name</label>
              <input type="text" className="form-control" placeholder="e.g. Sheikh Abdullah / Al Yamama Co" required />
            </div>
            <div className="mb-3">
              <label className="form-label small fw-bold">Email Address</label>
              <input type="email" className="form-control" placeholder="hr@company.com" required />
            </div>
            <div className="mb-3">
              <label className="form-label small fw-bold">Preferred Platform</label>
              <select className="form-select">
                <option value="Google Meet">Google Meet</option>
                <option value="Zoom">Zoom</option>
                <option value="MS Teams">Microsoft Teams</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label small fw-bold">Date & Time</label>
              <input type="datetime-local" className="form-control" required />
            </div>
            <div className="text-end">
              <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" className="btn btn-brand-gold">Confirm Schedule</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}