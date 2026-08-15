import { useApi } from '../../hooks/useApi'


function getInitials(name) {
  if (!name) return '';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export default function ReviewsSection() {
  const { data: response, loading } = useApi('/testimonials')
  
  
  const reviews = Array.isArray(response) ? response : (response?.data || [])

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
          {loading ? (
            
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <div className="review-card">
                  <div className="skeleton-pulse" style={{ height: '20px', width: '100px', marginBottom: '15px' }}></div>
                  <div className="skeleton-pulse" style={{ height: '100px', marginBottom: '20px' }}></div>
                  <div className="d-flex align-items-center gap-2">
                    <div className="skeleton-pulse" style={{ width: '45px', height: '45px', borderRadius: '50%' }}></div>
                    <div className="w-100">
                      <div className="skeleton-pulse" style={{ height: '16px', width: '80%', marginBottom: '5px' }}></div>
                      <div className="skeleton-pulse" style={{ height: '12px', width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="col-md-6 col-lg-3">
                <div className="review-card">
                  <div>
                    <div className="review-stars">
                      
                      {[...Array(review.stars || 5)].map((_, j) => (
                        <i key={j} className="bi bi-star-fill"></i>
                      ))}
                    </div>
                    <p className="review-text">"{review.review_text}"</p>
                  </div>
                  <div className="reviewer-profile">
                    <div className={`reviewer-avatar ${review.avatar_bg_color || 'bg-navy'}`}>
                      {getInitials(review.reviewer_name)}
                    </div>
                    <div>
                      <div className="reviewer-name">{review.reviewer_name}</div>
                      <div className="reviewer-role">{review.reviewer_role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}