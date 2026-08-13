import { useMemo } from 'react'
import TopBar from '../components/layout/TopBar'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingButtons from '../components/FloatingButtons'
import { EmployerDemandModal } from '../components/home/Modals'
import CountryBanner from '../components/countries/CountryBanner'
import FeaturedCountryCard from '../components/countries/FeaturedCountryCard'
import CountryGrid from '../components/countries/CountryGrid'
import { useApi } from '../hooks/useApi'

export default function CountriesPage() {
  const { data: response, loading } = useApi('/countries?lang=en')
  const countries = response?.data || []

  const featured = useMemo(() => countries.find((c) => c.is_featured === 1), [countries])
  const regular = useMemo(() => countries.filter((c) => c.is_featured !== 1), [countries])

  const openDemandModal = () => {
    setTimeout(() => {
      const el = document.getElementById('employerDemandModal')
      if (el && window.bootstrap) window.bootstrap.Modal.getOrCreateInstance(el).show()
    }, 50)
  }

  return (
    <>
      <TopBar />
      <Navbar onOpenDemandModal={openDemandModal} />
      <CountryBanner />
      <section className="section-padding">
        <div className="container">
          {loading ? (
            <div className="row g-4">
              <div className="col-12">
                <div className="skeleton-pulse" style={{ height: '280px', borderRadius: '16px' }}></div>
              </div>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="col-md-6 col-lg-4">
                  <div className="skeleton-pulse" style={{ height: '260px', borderRadius: '16px' }}></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="row g-4">
              {featured && (
                <div className="col-12" id={featured.short_name?.toLowerCase()}>
                  <FeaturedCountryCard country={featured} onDemand={openDemandModal} />
                </div>
              )}
              <CountryGrid countries={regular} />
            </div>
          )}
        </div>
      </section>
      <Footer />
      <FloatingButtons />
      <EmployerDemandModal />
    </>
  )
}