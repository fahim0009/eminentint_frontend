import { useState, useMemo } from 'react'
import TopBar from '../components/layout/TopBar'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingButtons from '../components/FloatingButtons'
import { EmployerDemandModal } from '../components/home/Modals'
import GalleryBanner from '../components/gallery/GalleryBanner'
import GalleryFilters from '../components/gallery/GalleryFilters'
import GalleryGrid from '../components/gallery/GalleryGrid'
import GalleryLightbox from '../components/gallery/GalleryLightbox'
import { useApi } from '../hooks/useApi'

export default function GalleryPage() {
  const { data: response, loading } = useApi('/galleries')
  const galleries = response?.data || []

  const [search, setSearch] = useState('')
  const [mediaType, setMediaType] = useState('all')
  const [orderBy, setOrderBy] = useState('category-asc')
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const categories = useMemo(() => {
    const map = new Map()
    galleries.forEach((item) => {
      if (item.category && !map.has(item.category.id)) {
        map.set(item.category.id, {
          id: item.category.id,
          name: item.category.name,
          slug: item.category.slug,
          icon: item.category.icon_class,
        })
      }
    })
    return Array.from(map.values()).sort((a, b) => a.id - b.id)
  }, [galleries])

  const stats = useMemo(() => ({
    photos: galleries.filter((g) => g.media_type === 'image').length,
    videos: galleries.filter((g) => g.media_type === 'youtube' || g.media_type === 'video').length,
  }), [galleries])

  const filteredItems = useMemo(() => {
    let items = [...galleries]

    if (activeCategory !== 'all') {
      items = items.filter((item) => item.category?.slug === activeCategory)
    }

    if (mediaType !== 'all') {
      items = items.filter((item) => item.media_type === mediaType)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter(
        (item) =>
          item.title?.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q) ||
          item.location?.toLowerCase().includes(q) ||
          item.category?.name?.toLowerCase().includes(q)
      )
    }

    switch (orderBy) {
      case 'date-desc':
        items.sort((a, b) => new Date(b.media_date) - new Date(a.media_date))
        break
      case 'date-asc':
        items.sort((a, b) => new Date(a.media_date) - new Date(b.media_date))
        break
      case 'title-asc':
        items.sort((a, b) => (a.title || '').localeCompare(b.title || ''))
        break
      case 'category-asc':
      default:
        items.sort((a, b) => (a.order || 0) - (b.order || 0))
        break
    }

    return items
  }, [galleries, activeCategory, mediaType, search, orderBy])

  const resetFilters = () => {
    setSearch('')
    setMediaType('all')
    setOrderBy('category-asc')
    setActiveCategory('all')
  }

  const openDemandModal = () => {
    setTimeout(() => {
      const el = document.getElementById('employerDemandModal')
      if (el) {
        const modal = window.bootstrap.Modal.getOrCreateInstance(el)
        modal.show()
      }
    }, 50)
  }

  return (
    <>
      <TopBar />
      <Navbar onOpenDemandModal={openDemandModal} />
      <GalleryBanner stats={stats} loading={loading} />
      <section className="section-padding bg-light">
        <div className="container">
          <GalleryFilters
            search={search}
            setSearch={setSearch}
            mediaType={mediaType}
            setMediaType={setMediaType}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categories={categories}
            itemCount={filteredItems.length}
          />
          <GalleryGrid
            items={filteredItems}
            loading={loading}
            onOpen={(index) => setLightboxIndex(index)}
            onReset={resetFilters}
          />
        </div>
      </section>
      <GalleryLightbox
        items={filteredItems}
        index={lightboxIndex}
        setIndex={setLightboxIndex}
      />
      <Footer />
      <FloatingButtons />
      <EmployerDemandModal />
    </>
  )
}