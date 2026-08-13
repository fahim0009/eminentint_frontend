export default function JobFilters({
  country, setCountry,
  industry, setIndustry,
  search, setSearch,
  countries, industries,
}) {
  return (
    <div className="p-3 bg-white border rounded-3 shadow-sm mb-4">
      <div className="row g-3">
        <div className="col-md-3">
          <select
            className="form-select"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="all">All Destination Countries</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          >
            <option value="all">All Industries</option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by position (e.g. Barista, Electrician, Cleaner)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <button
            className="btn btn-brand-navy w-100"
            onClick={() => {
              setCountry('all')
              setIndustry('all')
              setSearch('')
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  )
}