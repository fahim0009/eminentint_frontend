export default function LicenseFaq() {
  return (
    <div className="mt-5 p-4 bg-white border rounded-4 shadow-sm">
      <h4 className="fw-bold text-navy mb-4"><i className="bi bi-question-circle-fill text-gold me-2"></i> How to Verify Our Government Licenses</h4>
      
      <div className="accordion" id="licenseFaqAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button fw-bold text-navy" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
              How can employers verify Recruiting License RL-1842 on Bangladesh Govt BMET portal?
            </button>
          </h2>
          <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#licenseFaqAccordion">
            <div className="accordion-body text-muted small">
              Employers and applicants can visit the official Bureau of Manpower, Employment and Training (BMET) portal at <code>bmet.gov.bd</code>, navigate to "Valid Agency List", and search for License <strong>RL-1842</strong>. You will see Eminent International listed with full operational permissions.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed fw-bold text-navy" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
              How to audit Saudi Commercial Registration (CR: 1010778401) on Wathq / MOCI?
            </button>
          </h2>
          <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#licenseFaqAccordion">
            <div className="accordion-body text-muted small">
              Saudi companies can verify our CR number <strong>1010778401</strong> through the Ministry of Commerce Wathq database or Qiwa portal. Our registered Saudi entity is fully certified for labor contracting, facility management support, and manpower recruitment.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed fw-bold text-navy" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
              Are candidate visas processed through government Musaned & Enjaz portals?
            </button>
          </h2>
          <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#licenseFaqAccordion">
            <div className="accordion-body text-muted small">
              Yes! All candidate visa block authorizations and visa stamping are executed strictly through official Saudi government portals (Musaned and KSA Ministry of Foreign Affairs MOFA/Enjaz system) ensuring 100% legal security for overseas employers.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}