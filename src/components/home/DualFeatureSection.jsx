import { useApi } from '../../hooks/useApi'


import defaultEmployerImg from '../../assets/images/saudi_employer_1785857965458.jpg'
import defaultJobseekerImg from '../../assets/images/skilled_workers_1785857981972.jpg'

export default function DualFeatureSection({ onOpenDemandModal }) {
  const { data: response, loading } = useApi('/dual-feature')
  const data = response?.data || {}

  
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'
  const LARAVEL_URL = API_BASE_URL.replace('/api', '')

  
  const employerImg = data.employer_image 
    ? (data.employer_image.startsWith('http') ? data.employer_image : `${LARAVEL_URL}${data.employer_image}`) 
    : defaultEmployerImg

  const jobseekerImg = data.jobseeker_image 
    ? (data.jobseeker_image.startsWith('http') ? data.jobseeker_image : `${LARAVEL_URL}${data.jobseeker_image}`) 
    : defaultJobseekerImg

  return (
    <section className="section-padding bg-light">
      <div className="container">
        <div className="row g-4">
          
          {/* Employer Section */}
          <div className="col-lg-6">
            <div className="dual-feature-card">
              <div className="dual-feature-img-wrapper">
                <img
                  src={employerImg}
                  alt={data.employer_title || "Saudi Employer Handshake"}
                  className="dual-feature-img"
                />
              </div>
              <div className="dual-feature-body">
                <div>
                  <span className="section-tagline">{data.employer_tag || 'FOR EMPLOYERS'}</span>
                  <h3 className="fw-bold text-navy">{data.employer_title || 'Complete End-to-End Workforce Solutions'}</h3>
                  <p className="text-muted">
                    {data.employer_desc || 'We provide custom manpower solutions tailored to your project requirements with full legal compliance in Bangladesh and Saudi Arabia.'}
                  </p>
                  
                  
                  <div 
                    className="check-list" 
                    dangerouslySetInnerHTML={{ __html: data.employer_list || '' }} 
                  />
                </div>
                <div>
                  <button
                    className="btn btn-brand-navy btn-lg w-100"
                    onClick={onOpenDemandModal}
                  >
                    {data.employer_btn_text || 'Hire Workers Now'}
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
                  alt={data.jobseeker_title || "Bangladeshi Skilled Workers"}
                  className="dual-feature-img"
                />
              </div>
              <div className="dual-feature-body">
                <div>
                  <span className="section-tagline text-gold">{data.jobseeker_tag || 'FOR JOB SEEKERS'}</span>
                  <h3 className="fw-bold text-navy">{data.jobseeker_title || 'Build Your International Career Safely'}</h3>
                  <p className="text-muted">
                    {data.jobseeker_desc || 'Find genuine job opportunities in Saudi Arabia, Gulf & Europe with government-verified recruitment transparency.'}
                  </p>
                  
                  <div 
                    className="check-list" 
                    dangerouslySetInnerHTML={{ __html: data.jobseeker_list || '' }} 
                  />
                </div>
                <div>
                  <a href="/jobs" className="btn btn-brand-gold btn-lg w-100">
                    {data.jobseeker_btn_text || 'Apply for Job Opportunities'}
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