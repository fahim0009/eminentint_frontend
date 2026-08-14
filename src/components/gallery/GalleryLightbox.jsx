import { useEffect, useCallback } from 'react'

function getYoutubeEmbedUrl(url) {
  const match = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : url
}

// Laravel বেস URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'
const LARAVEL_URL = API_BASE_URL.replace('/api', '')

function getMediaUrl(url) {
  if (!url) return ''
  if (url.startsWith('http') || url.startsWith('https://img.youtube.com')) return url
  return `${LARAVEL_URL}${url}`
}

export default function GalleryLightbox({ items, index, setIndex }) {
  const isOpen = index !== null && items[index]

  const goPrev = useCallback(() => {
    setIndex((prev) => {
      if (prev === null) return null
      return prev <= 0 ? items.length - 1 : prev - 1
    })
  }, [items.length])

  const goNext = useCallback(() => {
    setIndex((prev) => {
      if (prev === null) return null
      return prev >= items.length - 1 ? 0 : prev + 1
    })
  }, [items.length])

  // কীবোর্ড ও বডি স্ক্রল কন্ট্রোল
  useEffect(() => {
    if (!isOpen) return
    
    const handleKey = (e) => {
      if (e.key === 'Escape') setIndex(null)
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden' // ব্যাকগ্রাউন্ড স্ক্রল বন্ধ করা

    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = '' // স্ক্রল আবার চালু করা
    }
  }, [isOpen, goPrev, goNext, setIndex])

  // যদি কোনো ইমেজ সিলেক্ট করা না থাকে, তবে কিছুই রেন্ডার করবে না
  if (!isOpen) return null

  const item = items[index]
  const isYoutube = item.media_type === 'youtube'
  const isVideo = item.media_type === 'video'
  const mediaUrl = getMediaUrl(item.media_url)

  return (
    // ব্যাকড্রপ (কালো ব্যাকগ্রাউন্ড)
    <div 
      className="modal fade show d-block" 
      tabIndex="-1" 
      aria-hidden="true"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
      onClick={() => setIndex(null)} // বাইরে ক্লিক করলে বন্ধ হবে
    >
      <div 
        className="modal-dialog modal-xl modal-dialog-centered"
        onClick={(e) => e.stopPropagation()} // ভেতরে ক্লিক করলে বন্ধ হবে না
      >
        <div className="modal-content lightbox-modal-content">
          
          <div className="modal-header border-bottom border-white border-opacity-10 py-3 px-4 d-flex justify-content-between align-items-center">
            <div>
              <span className="badge bg-gold text-navy fw-bold me-2">
                {isYoutube ? 'YOUTUBE' : isVideo ? 'VIDEO' : 'PHOTO'}
              </span>
              <span className="badge bg-opacity-20 text-white">
                {item.category?.name || 'Gallery'}
              </span>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setIndex(null)}
            ></button>
          </div>

          <div className="modal-body p-0">
            <div className="lightbox-media-container">
              {isYoutube ? (
                <div className="lightbox-youtube-wrapper">
                  <iframe
                    src={getYoutubeEmbedUrl(item.media_url)}
                    title={item.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : isVideo ? (
                <video
                  src={mediaUrl}
                  controls
                  autoPlay
                  className="lightbox-video"
                ></video>
              ) : (
                <img
                  src={mediaUrl}
                  alt={item.title}
                  className="lightbox-image"
                />
              )}
            </div>
          </div>

          <div className="modal-footer border-top border-white border-opacity-10 py-3 px-4 justify-content-between">
            <div className="text-start">
              <h5 className="fw-bold text-white mb-1">{item.title}</h5>
              <div className="small text-light opacity-75">
                <span className="me-3">
                  <i className="bi bi-geo-alt-fill text-gold me-1"></i>{item.location}
                </span>
                <span>
                  <i className="bi bi-calendar3 text-gold me-1"></i>{item.media_date}
                </span>
              </div>
              {item.description && (
                <div 
                  className="small text-light opacity-50 mt-1 mb-0" 
                  dangerouslySetInnerHTML={{ __html: item.description }} 
                />
              )}
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="text-white opacity-50 small me-2">
                {index + 1} / {items.length}
              </span>
              <button className="btn btn-outline-light btn-sm" onClick={goPrev}>
                <i className="bi bi-arrow-left me-1"></i> Previous
              </button>
              <button className="btn btn-brand-gold btn-sm" onClick={goNext}>
                Next <i className="bi bi-arrow-right ms-1"></i>
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}