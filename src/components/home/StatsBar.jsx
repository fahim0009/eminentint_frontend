import { useEffect, useRef, useState } from 'react'
import { useApi } from '../../hooks/useApi'

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  const formatted = count.toLocaleString()

  return (
    <span ref={ref}>
      {formatted}{suffix}
    </span>
  )
}

export default function StatsBar() {
  const { data: stats, loading } = useApi('/hero-stats')

  if (loading) {
    return (
      <div className="container my-4">
        <div className="stats-floating-bar p-4">
          <div className="d-flex justify-content-center">
            <div className="spinner-border spinner-border-sm text-navy"></div>
          </div>
        </div>
      </div>
    )
  }

  const defaultStats = [
    { icon: 'bi-people-fill', label: 'Workers Deployed', count: 10000, suffix: '+', color: 'text-navy' },
    { icon: 'bi-handshake-fill', label: 'Corporate Partners', count: 500, suffix: '+', color: 'text-navy' },
    { icon: 'bi-globe2', label: 'Countries Served', count: 20, suffix: '+', color: 'text-navy' },
    { icon: 'bi-briefcase-fill', label: 'Active Job Orders', count: 200, suffix: '+', color: 'text-navy' },
    { icon: 'bi-award-fill', label: 'Visa Success Rate', count: 98, suffix: '%', color: 'text-gold', textColor: 'text-maroon' },
  ]

  const items = stats?.length > 0
    ? stats.map((s) => ({
        icon: s.icon || 'bi-bar-chart-fill',
        label: s.label,
        count: Number(s.value) || 0,
        suffix: s.suffix || '+',
        color: s.color || 'text-navy',
        textColor: s.text_color || '',
      }))
    : defaultStats

  return (
    <div className="container">
      <div className="stats-floating-bar">
        <div className="row g-3 text-center text-md-start">
          {items.map((item, i) => (
            <div key={i} className="col-6 col-md-4 col-lg">
              <div className="stat-item">
                <div className="stat-icon-wrapper">
                  <i className={`bi ${item.icon} ${item.color}`}></i>
                </div>
                <div>
                  <div className={`stat-number ${item.textColor}`}>
                    <AnimatedCounter target={item.count} suffix={item.suffix} />
                  </div>
                  <div className="stat-label">{item.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}