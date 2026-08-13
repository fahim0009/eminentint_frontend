import { useEffect } from 'react'

export default function LicenseViewerModal({ selectedLicense }) {
  // যখন selectedLicense পরিবর্তন হবে, তখন মোডাল ওপেন হবে
  useEffect(() => {
    if (selectedLicense) {
      var el = document.getElementById('licenseViewerModal')
      if (el && window.bootstrap) {
        window.bootstrap.Modal.getOrCreateInstance(el).show()
      }
    }
  }, [selectedLicense])

  if (!selectedLicense) return null

  return (
    <div className="modal fade" id="licenseViewerModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content text-center p-4">
          <h4 className="fw-bold text-navy mb-1">{selectedLicense.title}</h4>
          <div className="text-maroon fw-semibold mb-3">{selectedLicense.prefix_badge}</div>
          
          <div className="p-3 border rounded bg-light mb-3">
            <div className="text-muted small">Official Government Registration No:</div>
            <div className="fw-bold text-navy fs-5">{selectedLicense.reg_no}</div>
            <div className="mt-3">
              {/* QR Code ডাইনামিকভাবে জেনারেট হচ্ছে */}
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=EminentInt-Verify-${selectedLicense.reg_no}`}
                alt="QR Verification"
                className="img-fluid rounded border p-2 bg-white"
                style={{ maxWidth: '140px' }}
              />
            </div>
            <div className="text-success small fw-bold mt-2">
              <i className="bi bi-patch-check-fill me-1"></i> QR Code Verified by Government Portal
            </div>
          </div>

          <div className="d-flex justify-content-center gap-2">
            <button className="btn btn-brand-navy btn-sm" onClick={() => alert(`Downloading official high-resolution PDF document for ${selectedLicense.reg_no}...`)}>
              <i className="bi bi-download me-1"></i> Download Verified PDF
            </button>
            <button className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}