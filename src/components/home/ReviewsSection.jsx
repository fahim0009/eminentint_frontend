const reviews = [
  {
    text: '"Eminent International supplied 250 skilled steel fixers and masons for our Riyadh megaproject within 35 days. Their trade testing center in Dhaka guarantees genuine skills."',
    name: 'Engr. Abdullah Youssef',
    role: 'Project Director, Al Yamama Contracting (KSA)',
    initials: 'AY',
    color: 'bg-navy',
  },
  {
    text: '"Outstanding service! All 80 baristas, chefs, and waitstaff passed GAMCA medical checks and Saudi visa stamping without a single delay. Very professional team."',
    name: 'Tariq Al-Falah',
    role: 'Head of HR, Al Falah Catering (Jeddah, KSA)',
    initials: 'AF',
    color: 'bg-maroon',
  },
  {
    text: '"Transparent recruitment partner. They handle BMET clearance and pre-departure orientation rigorously so workers arrive disciplined and project-ready."',
    name: 'Sultan Al-Mansoori',
    role: 'Operations Lead, Rapid Express LLC (Dubai, UAE)',
    initials: 'RE',
    color: 'bg-gold',
  },
  {
    text: '"Direct Saudi Embassy visa stamping and zero hassle. Their dual Bangladesh RL and Saudi CR legal standing gives total peace of mind for bulk hiring."',
    name: 'Marcus Vance',
    role: 'Recruitment Director, Malta Ground Services (EU)',
    initials: 'DO',
    color: 'bg-green',
  },
]

export default function ReviewsSection() {
  return (
    <section className="section-padding bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-tagline">Client Satisfaction</span>
          <h2 className="section-title">CLIENT REVIEWS & TESTIMONIALS</h2>
          <p className="section-desc mx-auto">
            See what corporate HR directors, project managers, and business owners in Saudi Arabia and worldwide say about our recruitment speed and worker quality.
          </p>
        </div>

        <div className="row g-4">
          {reviews.map((review, i) => (
            <div key={i} className="col-md-6 col-lg-3">
              <div className="review-card">
                <div>
                  <div className="review-stars">
                    {[...Array(5)].map((_, j) => (
                      <i key={j} className="bi bi-star-fill"></i>
                    ))}
                  </div>
                  <p className="review-text">{review.text}</p>
                </div>
                <div className="reviewer-profile">
                  <div className={`reviewer-avatar ${review.color}`}>{review.initials}</div>
                  <div>
                    <div className="reviewer-name">{review.name}</div>
                    <div className="reviewer-role">{review.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}