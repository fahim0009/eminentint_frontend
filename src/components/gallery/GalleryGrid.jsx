function getYoutubeVideoId(url) {
  const match = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
  return match ? match[1] : null
}

// Laravel বেস URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'
const LARAVEL_URL = API_BASE_URL.replace('/api', '')

function getMediaUrl(url) {
  if (!url) return ''
  if (url.startsWith('http') || url.startsWith('https://img.youtube.com')) return url
  return `${LARAVEL_URL}${url}`
}

function GalleryCard({ item, onOpen, index }) {
  const isYoutube = item.media_type === 'youtube'
  const isVideo = item.media_type === 'video'
  const videoId = isYoutube ? getYoutubeVideoId(item.media_url) : null
  
  // ইউটিউব থাম্বনেইল বা সাধারণ ইমেজের URL ঠিক করা হলো
  const thumbnail = isYoutube
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : getMediaUrl(item.media_url)

  return (
    <div className="col-6 col-md-4 col-lg-3" onClick={() => onOpen(index)}>
      <div className="gallery-card">
        <div className="gallery-thumb-container">
          <img
            src={thumbnail}
            alt={item.title}
            className="gallery-thumb-img"
            loading="lazy"
          />
          <div className="gallery-overlay"></div>
          
          {(isYoutube || isVideo) && (
            <div className={`gallery-play-btn ${isYoutube ? 'youtube-btn' : ''}`}>
              <i className="bi bi-play-fill"></i>
            </div>
          )}
          
          <span className="gallery-type-badge bg-dark bg-opacity-75 text-white">
            {isYoutube ? '▶ YouTube' : isVideo ? '🎥 Video' : '📷 Photo'}
          </span>
        </div>
        
        <div className="gallery-card-body">
          <h5 className="gallery-card-title">{item.title}</h5>
          <div className="gallery-meta d-flex flex-wrap gap-2">
            <span><i className="bi bi-geo-alt-fill me-1 text-gold"></i>{item.location}</span>
            <span><i className="bi bi-calendar3 me-1 text-gold"></i>{item.media_date}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function GalleryGrid({ items, loading, onOpen, onReset }) {
  if (loading) {
    return (
      <div className="row g-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="col-6 col-md-4 col-lg-3">
            <div className="skeleton-pulse" style={{ height: '320px', borderRadius: '14px' }}></div>
          </div>
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-images display-1 text-muted"></i>
        <h4 className="fw-bold text-navy mt-3">No Gallery Media Found</h4>
        <p className="text-muted">Try adjusting your search query or selected category filter.</p>
        <button className="btn btn-brand-navy btn-sm" onClick={onReset}>
          Reset Filters
        </button>
      </div>
    )
  }

  return (
    <div className="row g-4">
      {items.map((item, index) => (
        <GalleryCard key={item.id} item={item} index={index} onOpen={onOpen} />
      ))}
    </div>
  )
}