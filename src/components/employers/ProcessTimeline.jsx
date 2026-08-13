function StepCard({ step, index }) {
  const { badge_color, border_color, badge_text, title, description } = step

  const marginClass = index >= 4 ? 'mt-md-3' : ''

  const textClass = badge_color === 'bg-gold' ? 'text-dark' : ''

  return (
    <div className={'col-md-3 ' + marginClass}>
      <div className={'p-3 bg-white border rounded-3 h-100 ' + (border_color || 'border-navy')}>
        <div className={'badge mb-2 ' + (badge_color || 'bg-navy') + ' ' + textClass}>
          {badge_text}
        </div>
        <h6 className="fw-bold text-navy">{title}</h6>
        <small className="text-muted">{description}</small>
      </div>
    </div>
  )
}

export default function ProcessTimeline({ steps }) {
  if (!steps || steps.length === 0) return null

  return (
    <div className="row g-3">
      {steps.map(function (step, index) {
        return <StepCard key={step.id} step={step} index={index} />
      })}
    </div>
  )
}