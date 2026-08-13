function AdvantageCard({ advantage }) {
  const { icon, icon_color, title, description } = advantage

  return (
    <div className="col-md-6 col-lg-3">
      <div className="p-4 bg-white border rounded-4 shadow-sm text-center h-100">
        <i className={(icon || 'bi bi-shield-check') + ' display-4 mb-3 ' + (icon_color || 'text-navy')}></i>
        <h5 className="fw-bold text-navy">{title}</h5>
        <p className="text-muted small">{description}</p>
      </div>
    </div>
  )
}

export default function AdvantageGrid({ advantages }) {
  if (!advantages || advantages.length === 0) return null

  return (
    <div className="row g-4">
      {advantages.map(function (advantage) {
        return <AdvantageCard key={advantage.id} advantage={advantage} />
      })}
    </div>
  )
}