import { useEffect, useRef, useCallback } from 'react'

function getYoutubeEmbedUrl(url) {
  const match = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : url
}

export default function GalleryLightbox({ items, index, setIndex }) {
  const modalRef = useRef(null)
  const bsModal = useRef(null)

  const isOpen = index !== null && items[index]

  // 1. Initialize Bootstrap modal instance (runs once)
  useEffect(() => {
    if (!modalRef.current || !window.bootstrap) return
    bsModal.current = new window.bootstrap.Modal(modalRef.current)
    return () => {
      if (bsModal.current) {
        bsModal.current.dispose()
        bsModal.current = null
      }
    }
  }, [])

  // 2. Show/hide when index changes
  useEffect(() => {
    if (!bsModal.current) return
    if (isOpen) {
      bsModal.current.show()
    } else {
      bsModal.current.hide()
    }
  }, [isOpen])

  // 3. Sync Bootstrap hide event back to React state
  useEffect(() => {
    const el = modalRef.current
    if (!el) return
    const handleHidden = () => setIndex(null)
    el.addEventListener('hidden.bs.modal', handleHidden)
    return () => el.removeEventListener('hidden.bs.modal', handleHidden)
  }, [setIndex])

  // 4. Keyboard navigation
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

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') setIndex(null)
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, goPrev, goNext])

  // ALL hooks are above this line — no hooks after conditional return
  if (!isOpen) return null

  const item = items[index]
  const isYoutube = item.media_type === 'youtube'
  const isVideo = item.media_type === 'video'

  return (
    <div className="modal fade" ref={modalRef} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content lightbox-modal-content">

          <div className="modal-header border-bottom border-white border-opacity-10 py-3 px-4 d-flex justify-content-between align-items-center">
            <div>
              <span className="badge bg-gold text-navy fw-bold me-2">
                {isYoutube ? 'YOUTUBE' : isVideo ? 'VIDEO' : 'PHOTO'}
              </span>
              <span className="badge bg-white bg-opacity-20 text-white">
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
                  src={item.media_url}
                  controls
                  autoPlay
                  className="lightbox-video"
                ></video>
              ) : (
                <img
                  src={item.media_url}
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
                <p className="small text-light opacity-50 mt-1 mb-0">{item.description}</p>
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