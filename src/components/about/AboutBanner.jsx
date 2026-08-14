export default function AboutBanner({ data, loading }) {
  if (loading) {
    return <div className="bg-navy text-white py-5" style={{ backgroundColor: '#113045', height: '150px' }}></div>
  }

  return (
    <section className="bg-navy text-white py-5 position-relative" style={{ backgroundColor: '#113045' }}>
      <div className="container py-3">
        <h1 className="fw-bold display-5">{data?.hero_title || 'About Eminent International'}</h1>
        <p className="lead text-light">
          {data?.hero_desc || 'A trusted Bangladesh government-licensed recruiting agency (RL-1842) and licensed Saudi Arabia company (CR-1010778401) supplying skilled workforce worldwide.'}
        </p>
      </div>
    </section>
  )
}