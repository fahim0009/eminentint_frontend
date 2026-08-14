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
  const { data: response, loading } = useApi('/countries')
  const countries = response?.data || []

  
  const featuredCountry = countries.find(function (c) { return c.is_featured === 1 })
  
  
  const otherCountries = countries.filter(function (c) { return c.is_featured !== 1 })

  const openDemandModal = () => {
    setTimeout(function () {
      var el = document.getElementById('employerDemandModal')
      if (el && window.bootstrap) {
        window.bootstrap.Modal.getOrCreateInstance(el).show()
      }
    }, 50)
  }

  return (
    <>
      <TopBar />
      <Navbar onOpenDemandModal={openDemandModal} />
      <CountryBanner />

      <section className="section-padding">
        <div className="container">
          {/* Loading State */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-gold" role="status"></div>
            </div>
          ) : (
            <>
              {/* Featured Country */}
              {featuredCountry && (
                <div className="mb-5">
                  <FeaturedCountryCard country={featuredCountry} onDemand={openDemandModal} />
                </div>
              )}

              {/* Other Countries Grid */}
              {otherCountries.length > 0 && (
                <div className="row g-4">
                  <CountryGrid countries={otherCountries} />
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
      <FloatingButtons />
      <EmployerDemandModal />
    </>
  )
}