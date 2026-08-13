import { useState } from 'react'

export default function FloatingButtons() {
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: '👋 Welcome to Eminent International! I can help you submit worker demands, track candidate applications, or check our Saudi & Bangladesh licenses.' }
  ])
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { from: 'user', text: userMsg }])

    setTimeout(() => {
      let reply = "Thank you for your message. Our team will get back to you shortly. You can also call us directly or submit a worker demand form."
      const lower = userMsg.toLowerCase()
      if (lower.includes('hire') || lower.includes('worker') || lower.includes('demand')) {
        reply = "To submit a worker demand, click the 'Hire Workers' button in the navigation or I can guide you. How many workers do you need and for which country?"
      } else if (lower.includes('visa') || lower.includes('license')) {
        reply = "We hold Bangladesh Recruiting License (RL-1842), Saudi Commercial Registration (CR: 1010778401), and multiple other certifications. Visit our Licenses page for full details and QR verification."
      } else if (lower.includes('job') || lower.includes('apply')) {
        reply = "Visit our Jobs page to browse current openings. Registration is 100% free. You can filter by country, industry, and trade."
      } else if (lower.includes('track') || lower.includes('status') || lower.includes('passport')) {
        reply = "Use the 'Application Tracker' button on the home page. Enter your passport number or application reference ID to check your current status."
      }
      setMessages(prev => [...prev, { from: 'bot', text: reply }])
    }, 800)
  }

  return (
    <>
      <a
        href="https://wa.me/8801894XXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        title="Chat on WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </a>

      <div className="ai-chat-launcher" onClick={() => setChatOpen(!chatOpen)}>
        <i className="bi bi-robot text-gold fs-5"></i>
        <span>Need Workers? AI Bot</span>
      </div>

      {chatOpen && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-robot fs-5 text-gold"></i>
              <div>
                <div className="fw-bold text-white fs-7">Eminent AI Assistant</div>
                <small className="text-light opacity-75" style={{ fontSize: '0.7rem' }}>
                  24/7 Global Recruitment Concierge
                </small>
              </div>
            </div>
            <button className="btn-close btn-close-white btn-sm" onClick={() => setChatOpen(false)}></button>
          </div>
          <div className="ai-chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-bubble chat-bubble-${msg.from}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="ai-chat-footer">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Ask anything (e.g., How to hire workers?)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button className="btn btn-brand-navy btn-sm" onClick={sendMessage}>
              <i className="bi bi-send-fill"></i>
            </button>
          </div>
        </div>
      )}
    </>
  )
}