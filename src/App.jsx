import { useState, useEffect } from 'react'
import './App.css'

// Mektup mesajları
const letterMessages = [
  "Mutlu yıllar İrem!",
  "Yeni yıl sana güzellikler getirsin",
  "Bu yıl tüm hayallerin gerçek olsun",
  "Sevgiyle dolu bir yıl geçir",
  "2026'da gözlerin hep gülsün",
  "Yeni yılda bol şans, bol neşe!",
  "Her günün bir öncekinden güzel olsun",
  "Mutluluk kapını çalsın, içeri buyur etmeyi unutma!"
]

// Kar tanesi komponenti
function Snowflake({ style }) {
  return (
    <div className="snowflake" style={style}>
      ❄
    </div>
  )
}

// Kar yağışı komponenti
function Snowfall() {
  const [snowflakes, setSnowflakes] = useState([])

  useEffect(() => {
    const createSnowflake = () => {
      const id = Date.now() + Math.random()
      const snowflake = {
        id,
        left: Math.random() * 100,
        animationDuration: 3 + Math.random() * 5,
        opacity: 0.4 + Math.random() * 0.6,
        fontSize: 10 + Math.random() * 20
      }
      
      setSnowflakes(prev => [...prev, snowflake])
      
      setTimeout(() => {
        setSnowflakes(prev => prev.filter(s => s.id !== id))
      }, snowflake.animationDuration * 1000)
    }

    const interval = setInterval(createSnowflake, 150)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="snowfall">
      {snowflakes.map(flake => (
        <Snowflake
          key={flake.id}
          style={{
            left: `${flake.left}%`,
            animationDuration: `${flake.animationDuration}s`,
            opacity: flake.opacity,
            fontSize: `${flake.fontSize}px`
          }}
        />
      ))}
    </div>
  )
}

// Mektup komponenti
function Letter({ index, onClick, isOpen }) {
  const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff8fab', '#c9b1ff']
  const positions = [
    { top: '25%', left: '35%' },
    { top: '20%', left: '55%' },
    { top: '40%', left: '28%' },
    { top: '38%', left: '62%' },
    { top: '55%', left: '32%' },
    { top: '52%', left: '58%' },
    { top: '68%', left: '38%' },
    { top: '65%', left: '52%' }
  ]

  return (
    <div 
      className={`letter ${isOpen ? 'open' : ''}`}
      style={{
        ...positions[index],
        backgroundColor: colors[index % colors.length]
      }}
      onClick={onClick}
    >
      <span className="letter-icon">✉</span>
    </div>
  )
}

// Yılbaşı ağacı komponenti
function ChristmasTree({ onLetterClick, openLetters }) {
  return (
    <div className="tree-container">
      {/* Ağaç üçgenleri */}
      <div className="tree">
        <div className="tree-top">
          <div className="star">⭐</div>
        </div>
        <div className="tree-layer layer-1"></div>
        <div className="tree-layer layer-2"></div>
        <div className="tree-layer layer-3"></div>
        <div className="tree-trunk"></div>
      </div>
      
      {/* Süsler */}
      <div className="ornaments">
        <span className="ornament o1"></span>
        <span className="ornament o2"></span>
        <span className="ornament o3"></span>
        <span className="ornament o4"></span>
        <span className="ornament o5"></span>
        <span className="ornament o6"></span>
        <span className="ornament o7"></span>
        <span className="ornament o8"></span>
      </div>
      
      {/* Işıklar */}
      <div className="tree-lights">
        <span className="tree-light tl1"></span>
        <span className="tree-light tl2"></span>
        <span className="tree-light tl3"></span>
        <span className="tree-light tl4"></span>
        <span className="tree-light tl5"></span>
        <span className="tree-light tl6"></span>
      </div>

      {/* Mektuplar */}
      <div className="letters-container">
        {letterMessages.map((_, index) => (
          <Letter
            key={index}
            index={index}
            isOpen={openLetters.includes(index)}
            onClick={() => onLetterClick(index)}
          />
        ))}
      </div>
    </div>
  )
}

// Hediye kutusu komponenti
function GiftBox({ onOpen, isOpen }) {
  return (
    <div className={`gift-box-container ${isOpen ? 'opened' : ''}`} onClick={onOpen}>
      <div className="gift-box">
        <div className="gift-lid">
          <div className="gift-bow"></div>
        </div>
        <div className="gift-body">
          <div className="gift-ribbon-v"></div>
          <div className="gift-ribbon-h"></div>
        </div>
      </div>
      
      {isOpen && (
        <div className="teddy-bear">
          <div className="teddy-body">
            <div className="teddy-head">
              <div className="teddy-ear left"></div>
              <div className="teddy-ear right"></div>
              <div className="teddy-face">
                <div className="teddy-eye left"></div>
                <div className="teddy-eye right"></div>
                <div className="teddy-nose"></div>
              </div>
            </div>
            <div className="teddy-torso"></div>
            <div className="teddy-arm left"></div>
            <div className="teddy-arm right"></div>
          </div>
          <div className="teddy-message">
            <p>2026 sana çok iyi davransın İrem!</p>
            <p className="teddy-sub">Hak ettiğin tüm güzellikleri yaşa</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Mesaj popup komponenti
function MessagePopup({ message, onClose }) {
  if (!message) return null

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={e => e.stopPropagation()}>
        <p className="popup-message">{message}</p>
        <button className="popup-close" onClick={onClose}>Teşekkürler!</button>
      </div>
    </div>
  )
}

// Işık dizisi komponenti
function LightString() {
  const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff8fab', '#c9b1ff']
  return (
    <div className="light-string">
      {[...Array(20)].map((_, i) => (
        <span 
          key={i} 
          className="light-bulb"
          style={{ 
            animationDelay: `${i * 0.2}s`,
            backgroundColor: colors[i % colors.length]
          }}
        />
      ))}
    </div>
  )
}

function App() {
  const [openLetters, setOpenLetters] = useState([])
  const [currentMessage, setCurrentMessage] = useState(null)
  const [giftOpened, setGiftOpened] = useState(false)

  const handleLetterClick = (index) => {
    if (!openLetters.includes(index)) {
      setOpenLetters([...openLetters, index])
    }
    setCurrentMessage(letterMessages[index])
  }

  const handleGiftOpen = () => {
    setGiftOpened(true)
  }

  return (
    <div className="app">
      <Snowfall />
      <LightString />
      
      <header className="header">
        <h1 className="title">
          Mutlu Yıllar İrem!
        </h1>
        <p className="subtitle">Mektuplara dokun!</p>
      </header>

      <main className="main-content">
        <ChristmasTree 
          onLetterClick={handleLetterClick}
          openLetters={openLetters}
        />
        
        <GiftBox 
          onOpen={handleGiftOpen}
          isOpen={giftOpened}
        />
      </main>

      <MessagePopup 
        message={currentMessage}
        onClose={() => setCurrentMessage(null)}
      />

      <footer className="footer">
        <p>Yeni yılın ilk günü gülümsemeyle başlasın</p>
      </footer>
    </div>
  )
}

export default App
