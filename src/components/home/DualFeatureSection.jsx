import employerImg from '../../assets/images/saudi_employer_1785857965458.jpg'
import jobseekerImg from '../../assets/images/skilled_workers_1785857981972.jpg'

export default function DualFeatureSection({ onOpenDemandModal }) {
  return (
    <section className="section-padding bg-light">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="dual-feature-card">
              <div className="dual-feature-img-wrapper">
                <img
                  src={employerImg}
                  alt="Saudi Employer Handshake"
                  className="dual-feature-img"
                />
              </div>
              <div className="dual-feature-body">
                <div>
                  <span className="section-tagline">FOR EMPLOYERS</span>
                  <h3 className="fw-bold text-navy">Complete End-to-End Workforce Solutions</h3>
                  <p className="text-muted">
                    We provide custom manpower solutions tailored to your project requirements with full legal compliance in Bangladesh and Saudi Arabia.
                  </p>
                  <ul className="check-list">
                    <li>Skilled, Semi-Skilled & Unskilled Workers</li>
                    <li>Bulk & Fast-Track Project Recruitment</li>
                    <li>Trade Testing & Medical Screening</li>
                    <li>Legal Visa Processing & BMET Clearance</li>
                    <li>Post-Arrival & On-Site Support</li>
                  </ul>
                </div>
                <div>
                  <button
                    className="btn btn-brand-navy btn-lg w-100"
                    onClick={onOpenDemandModal}
                  >
                    Hire Workers Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="dual-feature-card jobseeker-card">
              <div className="dual-feature-img-wrapper">
                <img
                  src={jobseekerImg}
                  alt="Bangladeshi Skilled Workers"
                  className="dual-feature-img"
                />
              </div>
              <div className="dual-feature-body">
                <div>
                  <span className="section-tagline text-gold">FOR JOB SEEKERS</span>
                  <h3 className="fw-bold text-navy">Build Your International Career Safely</h3>
                  <p className="text-muted">
                    Find genuine job opportunities in Saudi Arabia, Gulf & Europe with government-verified recruitment transparency.
                  </p>
                  <ul className="check-list">
                    <li>100% Free Account Registration</li>
                    <li>Direct Employment with Verified Companies</li>
                    <li>Safe & Transparent Visa Processing</li>
                    <li>No Hidden Agent Fees or Fraud</li>
                    <li>Pre-Departure Orientation & Training</li>
                  </ul>
                </div>
                <div>
                  <a href="/jobs" className="btn btn-brand-gold btn-lg w-100">
                    Apply for Job Opportunities
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}