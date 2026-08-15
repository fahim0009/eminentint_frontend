import { useState, useMemo } from 'react'
import TopBar from '../components/layout/TopBar'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingButtons from '../components/FloatingButtons'
import { EmployerDemandModal, TrackerModal } from '../components/home/Modals'
import JobBanner from '../components/jobs/JobBanner'
import JobFilters from '../components/jobs/JobFilters'
import JobGrid from '../components/jobs/JobGrid'
import CandidateApplyModal from '../components/jobs/CandidateApplyModal' 
import { useApi } from '../hooks/useApi'

export default function JobsPage() {
  const { data: response, loading } = useApi('/job-listings?lang=en')
  const jobs = response?.data || []

  const [country, setCountry] = useState('all')
  const [industry, setIndustry] = useState('all')
  const [search, setSearch] = useState('')
   
  const [selectedJob, setSelectedJob] = useState(null)
 
  const uniqueCountries = useMemo(() => {
    const set = new Set(jobs.map((j) => j.country))
    return Array.from(set).sort()
  }, [jobs])

  const uniqueIndustries = useMemo(() => {
    const set = new Set(jobs.map((j) => j.industry))
    return Array.from(set).sort()
  }, [jobs])

  // Core filtering logic
  const filteredJobs = useMemo(() => {
    let items = [...jobs]

    if (country !== 'all') {
      items = items.filter((j) => j.country === country)
    }

    if (industry !== 'all') {
      items = items.filter((j) => j.industry === industry)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter(
        (j) =>
          j.title?.toLowerCase().includes(q) ||
          j.company_name?.toLowerCase().includes(q) ||
          j.city?.toLowerCase().includes(q) ||
          j.country?.toLowerCase().includes(q)
      )
    }

    return items
  }, [jobs, country, industry, search])

  const handleApply = (job) => {
    setSelectedJob(job) // পুরো জব অবজেক্টটি সেট করা হচ্ছে
  }

  const openTrackerModal = () => {
    setTimeout(() => {
      const el = document.getElementById('trackerModal')
      if (el) window.bootstrap.Modal.getOrCreateInstance(el).show()
    }, 50)
  }

  const openDemandModal = () => {
    setTimeout(() => {
      const el = document.getElementById('employerDemandModal')
      if (el) window.bootstrap.Modal.getOrCreateInstance(el).show()
    }, 50)
  }

  return (
    <>
      <TopBar />
      <Navbar onOpenDemandModal={openDemandModal} />
      
      <JobBanner 
        totalJobs={jobs.length} 
        onOpenTracker={openTrackerModal} 
        onOpenApply={handleApply} 
      />
      
      <section className="section-padding">
        <div className="container">
          <JobFilters
            country={country}
            setCountry={setCountry}
            industry={industry}
            setIndustry={setIndustry}
            search={search}
            setSearch={setSearch}
            countries={uniqueCountries}
            industries={uniqueIndustries}
          />
          
          <JobGrid items={filteredJobs} loading={loading} onApply={handleApply} />
        </div>
      </section>


      {selectedJob && (
        <CandidateApplyModal 
          selectedJob={selectedJob} 
          onClose={() => setSelectedJob(null)} 
        />
      )}

      <Footer />
      <FloatingButtons />
      <EmployerDemandModal />
      <TrackerModal />
    </>
  )
}
