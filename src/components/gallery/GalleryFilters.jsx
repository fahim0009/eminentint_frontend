export default function GalleryFilters({
  search, setSearch,
  mediaType, setMediaType,
  orderBy, setOrderBy,
  activeCategory, setActiveCategory,
  categories,
  itemCount,
}) {
  return (
    <div className="p-4 bg-white border rounded-4 shadow-sm mb-4">
      <div className="row g-3 align-items-center">
        {/* Search */}
        <div className="col-lg-4">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0 text-muted">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0 ps-0"
              placeholder="Search gallery (e.g., Electrician, Riyadh, Flight)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Media Type Filter */}
        <div className="col-md-6 col-lg-3">
          <div className="d-flex align-items-center gap-2">
            <label className="form-label mb-0 small fw-bold text-navy text-nowrap">Media Type:</label>
            <select
              className="form-select form-select-sm"
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="image">Photos Only</option>
              <option value="video">Videos Only</option>
              <option value="youtube">YouTube Videos</option>
            </select>
          </div>
        </div>

        {/* Order Filter */}
        <div className="col-md-6 col-lg-3">
          <div className="d-flex align-items-center gap-2">
            <label className="form-label mb-0 small fw-bold text-navy text-nowrap">Sort By:</label>
            <select
              className="form-select form-select-sm"
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
            >
              <option value="category-asc">Category Sequence</option>
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="title-asc">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Item Count Badge */}
        <div className="col-lg-2 text-lg-end">
          <span className="badge bg-navy px-3 py-2">
            Showing {itemCount} Item{itemCount !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="d-flex flex-wrap gap-2 mt-3 pt-3 border-top">
        <button
          className={`gallery-category-pill${activeCategory === 'all' ? ' active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          <i className="bi bi-grid-fill me-1"></i> All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`gallery-category-pill${activeCategory === cat.slug ? ' active' : ''}`}
            onClick={() => setActiveCategory(cat.slug)}
          >
            <i className={`bi ${cat.icon} me-1`}></i> {cat.name}
          </button>
        ))}
      </div>
    </div>
  )
}