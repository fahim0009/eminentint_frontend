function IndustryCard({ industry, onOpenDemand }) {
  const iconClass = industry.icon || 'bi bi-building'
  const iconColor = industry.icon_color || 'text-navy'
  
  // Using default English fields directly from the API response
  const title = industry.title || ''
  const description = industry.description || ''
  const buttonText = industry.button_text || 'Request Staff'

  return (
    <div className="col-md-6 col-lg-4">
      <div className="p-4 bg-white border rounded-4 shadow-sm h-100 d-flex flex-column">
        <div className={'display-5 mb-3 ' + iconColor}>
          <i className={iconClass}></i>
        </div>
        <h4 className="fw-bold text-navy">{title}</h4>
        <p className="text-muted small flex-grow-1">{description}</p>
        <button
          className="btn btn-sm btn-outline-primary align-self-start mt-2"
          onClick={onOpenDemand}
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default function IndustryGrid({ industries, onOpenDemand }) {
  if (!industries || industries.length === 0) return null

  return (
    <div className="row g-4">
      {industries.map(function (industry) {
        return (
          <IndustryCard
            key={industry.id}
            industry={industry}
            onOpenDemand={onOpenDemand}
          />
        )
      })}
    </div>
  )
}