function ServiceCard({ service }) {
  const { icon, icon_color, anchor_id, title, description, features } = service

  return (
    <div className="col-md-6 col-lg-4" id={anchor_id || undefined}>
      <div className="p-4 bg-white border rounded-4 shadow-sm h-100 d-flex flex-column">
        <div className={'stat-icon-wrapper mb-3 ' + (icon_color || 'text-navy')}>
          <i className={(icon || 'bi bi-gear') + ' fs-2'}></i>
        </div>
        <h4 className="fw-bold text-navy">{title}</h4>
        <p className="text-muted">{description}</p>
        
        {/* API থেকে আসা HTML স্ট্রিং এখানে রেন্ডার হচ্ছে */}
        <div className="check-list" dangerouslySetInnerHTML={{ __html: features }} />
      </div>
    </div>
  )
}

export default function ServiceGrid({ services }) {
  if (!services || services.length === 0) return null

  return (
    <div className="row g-4">
      {services.map(function (service) {
        return (
          <ServiceCard 
            key={service.id} 
            service={service} 
          />
        )
      })}
    </div>
  )
}