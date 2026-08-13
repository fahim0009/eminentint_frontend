function TrackRecordCard({ record }) {
  const { badge_text, title, description, footer_text } = record

  return (
    <div className="col-md-6 col-lg-4">
      <div className="p-4 border rounded-4 bg-white shadow-sm h-100">
        <div className="badge bg-navy mb-2">{badge_text}</div>
        <h5 className="fw-bold text-navy">{title}</h5>
        <p className="text-muted small mb-2">{description}</p>
        <div className="text-gold fw-bold">{footer_text}</div>
      </div>
    </div>
  )
}

export default function TrackRecordsGrid({ records }) {
  if (!records || records.length === 0) return null

  return (
    <div className="row g-4">
      {records.map(function (record) {
        return <TrackRecordCard key={record.id} record={record} />
      })}
    </div>
  )
}