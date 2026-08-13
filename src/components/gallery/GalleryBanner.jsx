export default function GalleryBanner({ stats, loading }) {
  return (
    <section
      className="bg-navy text-white py-5 position-relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A1E2C 0%, #113045 100%)' }}
    >
      <div className="container py-4 position-relative z-1">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <span className="badge bg-gold text-navy fw-bold mb-3 px-3 py-2">
              <i className="bi bi-camera-reels-fill me-1"></i> Verified Operations & Deployment Media
            </span>
            <h1 className="fw-bold display-5 mb-3">Photo & Video Gallery</h1>
            <p className="lead text-light mb-0">
              Explore our trade testing evaluations, BMET orientation sessions, airport flight farewells,
              and workplace success stories in Saudi Arabia & worldwide.
            </p>
          </div>
          <div className="col-lg-4 text-center mt-4 mt-lg-0">
            <div className="d-flex justify-content-center gap-3">
              <div className="p-3 bg-white bg-opacity-10 rounded-3 border border-white border-opacity-25 text-center flex-fill">
                <div className="fw-bold fs-3 text-gold">
                  {loading ? '...' : `${stats.photos}+`}
                </div>
                <small className="text-light opacity-75">HD Photos</small>
              </div>
              <div className="p-3 bg-white bg-opacity-10 rounded-3 border border-white border-opacity-25 text-center flex-fill">
                <div className="fw-bold fs-3 text-gold">
                  {loading ? '...' : `${stats.videos}+`}
                </div>
                <small className="text-light opacity-75">Video Clips</small>
              </div>
              <div className="p-3 bg-white bg-opacity-10 rounded-3 border border-white border-opacity-25 text-center flex-fill">
                <div className="fw-bold fs-3 text-gold">100%</div>
                <small className="text-light opacity-75">Verified</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}