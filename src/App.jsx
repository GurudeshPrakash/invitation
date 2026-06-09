import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Phone, 
  Music, 
  VolumeX, 
  Volume2, 
  Sparkles, 
  Heart, 
  ArrowRight, 
  Download, 
  Check, 
  Users, 
  MessageSquare,
  Gift
} from 'lucide-react';
import './App.css';
import goldBg from './assets/gold_birthday_bg.png';
import toastImg from './assets/toast.png';

const decadeData = [
  {
    id: 'decade1',
    years: '1976-1985',
    title: 'Childhood & Wonders',
    description: 'The foundation of a beautiful journey. Born in July 1976, this decade was filled with the simplicity of childhood play, the warmth of family, and early steps of learning in a vibrant world.',
    highlights: ['Vavuniya Roots', 'Family Warmth', 'First Steps', 'Early School Days']
  },
  {
    id: 'decade2',
    years: '1986-1995',
    title: 'Youth & Ambition',
    description: 'A decade of exploration, growth, and academic achievements. A time when big dreams were born, values were shaped, and lifelong friendships were forged in Vavuniya.',
    highlights: ['Teenage Dreams', 'Academic Pursuits', 'Lifelong Friends', 'Sports & Hobbies']
  },
  {
    id: 'decade3',
    years: '1996-2005',
    title: 'New Horizons & Milestones',
    description: 'Stepping into adulthood, launching a career, and building core life milestones. A period defined by hard work, passion, responsibility, and establishing a home.',
    highlights: ['Career Beginnings', 'Building Foundations', 'Independence', 'Key Milestones']
  },
  {
    id: 'decade4',
    years: '2006-2015',
    title: 'Flourishing & Leadership',
    description: 'Years of professional success, leadership, and nurturing others. A decade of spreading wings, overcoming challenges with resilience, and enjoying the fruits of labor.',
    highlights: ['Leadership Roles', 'Professional Success', 'Mentorship', 'Global Travel']
  },
  {
    id: 'decade5',
    years: '2016-2026',
    title: 'Wisdom & Golden Jubilee',
    description: 'Entering the golden 50th year with grace, wisdom, and immense gratitude. A celebration of a rich, impactful life surrounded by loving family and dear friends.',
    highlights: ['Wisdom & Grace', 'Gratitude', 'Golden Jubilee', 'Legacy Building']
  }
];

function App() {
  const [particles, setParticles] = useState([]);
  const [activeTab, setActiveTab] = useState('decade5');
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, completed: false });
  
  // RSVP Form States
  const [name, setName] = useState('');
  const [attending, setAttending] = useState('yes');
  const [guests, setGuests] = useState('1');
  const [food, setFood] = useState('non-veg');
  const [wish, setWish] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  // Audio Ref
  const audioRef = useRef(null);

  // Load guestbook RSVPs from localStorage
  const [rsvps, setRsvps] = useState(() => {
    const saved = localStorage.getItem('kaarththi_birthday_rsvps');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse local rsvps", e);
      }
    }
    return [
      {
        name: 'Anjali & Dev',
        attending: 'yes',
        guests: 2,
        food: 'veg',
        message: "Happy 50th Birthday, Kaarththi! Wishing you a day as wonderful and glowing as the legacy you've built over these 50 years. Can't wait to celebrate with you!"
      },
      {
        name: 'Ramanan',
        attending: 'yes',
        guests: 1,
        food: 'non-veg',
        message: "Fifty years of spreading joy, love, and laughter! You are an inspiration to all of us. Wishing you the happiest of birthdays and many more glorious years ahead."
      },
      {
        name: 'Priyan',
        attending: 'no',
        guests: 0,
        food: 'veg',
        message: "Happy Golden Jubilee! So proud of the amazing journey you've had. Sending you lots of love and best wishes from afar."
      }
    ];
  });

  // Save RSVPs to localStorage
  useEffect(() => {
    localStorage.setItem('kaarththi_birthday_rsvps', JSON.stringify(rsvps));
  }, [rsvps]);

  // Particle Background Generator
  useEffect(() => {
    const newParticles = Array.from({ length: 45 }).map((_, idx) => ({
      id: idx,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${7 + Math.random() * 8}s`,
      scale: Math.random() * 0.7 + 0.3,
    }));
    setParticles(newParticles);
  }, []);

  // Countdown timer logic
  useEffect(() => {
    const targetDate = new Date('2026-07-12T18:00:00');

    const updateTimer = () => {
      const difference = +targetDate - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          completed: false
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, completed: true });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Dual confetti cannon launcher
  const triggerGoldConfetti = () => {
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.8 },
        colors: ['#BF953F', '#FCF6BA', '#B38728', '#FBF5B7', '#AA771C']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.8 },
        colors: ['#BF953F', '#FCF6BA', '#B38728', '#FBF5B7', '#AA771C']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  // Music toggle handler
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.log("Audio playback blocked by user interaction", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  // RSVP Form submit handler
  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newRsvp = {
      name: name.trim(),
      attending,
      guests: attending === 'yes' ? parseInt(guests, 10) : 0,
      food: attending === 'yes' ? food : 'n/a',
      message: wish.trim() || "Warmest congratulations on your 50th birthday, Kaarththi!"
    };

    setRsvps(prev => [newRsvp, ...prev]);
    setSubmitted(true);
    triggerGoldConfetti();
  };

  // Reset RSVP form (for editing or another guest)
  const resetForm = () => {
    setName('');
    setAttending('yes');
    setGuests('1');
    setFood('non-veg');
    setWish('');
    setSubmitted(false);
  };

  // Create WhatsApp pre-filled text
  const getWhatsAppUrl = () => {
    const phone = '94772305777'; // country code + RSVP number
    const statusText = attending === 'yes' 
      ? `I am attending (with ${guests} guest${parseInt(guests, 10) > 1 ? 's' : ''})` 
      : 'I regretfully decline';
    const foodText = attending === 'yes' ? `Food Preference: ${food === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}` : '';
    const messageText = wish.trim() ? `My Wishes: "${wish.trim()}"` : '';

    const text = `Hi Kaarththi,\n\nI just RSVP'd for your 50th Birthday Celebration! 🎉\n\n*Status:* ${statusText}\n${foodText ? `*Food:* ${foodText}\n` : ''}${messageText ? `*Message:* ${messageText}\n` : ''}\nLooking forward to it!`;
    
    return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;
  };

  // Google Calendar Link generator
  const getGoogleCalendarUrl = () => {
    const title = "Kaarththi's 50th Birthday Celebration";
    const dates = "20260712T123000Z/20260712T173000Z"; // UTC Time (Sri Lanka is UTC+5:30, 6pm-11pm local is 12:30pm-5:30pm UTC)
    const details = "Join us for an evening of celebration, dinner, and memories. RSVP: 077 230 5777";
    const location = "Hotel Northway, Vavuniya";
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dates}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&sf=true&output=xml`;
  };

  // .ics File Generator
  const downloadICSFile = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      'URL:' + window.location.href,
      'DTSTART:20260712T123000Z',
      'DTEND:20260712T173000Z',
      'SUMMARY:Kaarththi\'s 50th Birthday Celebration',
      'DESCRIPTION:Join us for an evening of celebration, dinner, and memories. RSVP: 077 230 5777',
      'LOCATION:Hotel Northway\, Vavuniya',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Kaarththi_50th_Birthday.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app-container">
      {/* Floating Gold Dust Particles */}
      <div className="dust-particles">
        {particles.map((p) => (
          <div
            key={p.id}
            className="dust-particle"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
              transform: `scale(${p.scale})`,
            }}
          />
        ))}
      </div>

      {/* Hidden Audio Player */}
      <audio 
        ref={audioRef} 
        src="https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3" 
        loop
      />

      {/* Floating Audio Controls */}
      <button 
        className={`audio-control ${isPlaying ? 'playing' : ''}`} 
        onClick={togglePlay}
        aria-label="Toggle Background Music"
        title={isPlaying ? "Mute Background Music" : "Play Background Music"}
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      {/* Floating Confetti Cannon Button */}
      <button 
        className="celebrate-btn" 
        onClick={triggerGoldConfetti}
        aria-label="Celebrate!"
      >
        <Sparkles size={18} />
        <span>CELEBRATE</span>
      </button>

      {/* Hero Section */}
      <section className="hero-section">
        <div 
          className="hero-background" 
          style={{ backgroundImage: `url(${goldBg})` }} 
        />
        <div className="hero-content">
          <svg className="hero-ornament" viewBox="0 0 100 20" fill="none">
            <path d="M10 10 H90 M50 2 L54 10 L50 18 L46 10 Z M20 10 A5 5 0 1 1 20 9 Z M80 10 A5 5 0 1 1 80 9 Z" stroke="#c5a059" strokeWidth="1" />
          </svg>
          <span className="hero-subtitle-top">You Are Cordially Invited To</span>
          <h1 className="hero-title gold-text-gradient">
            KAARTHTHI'S
            <span>50th Birthday Celebration</span>
          </h1>
          <div className="hero-celebration-pill">GOLDEN JUBILEE</div>
          
          <button 
            className="hero-scroll-btn" 
            onClick={() => document.getElementById('details').scrollIntoView({ behavior: 'smooth' })}
          >
            <span>View Details</span>
            <ArrowRight size={18} style={{ transform: 'rotate(90deg)' }} />
          </button>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="section-wrapper" id="countdown">
        <div className="section-title-container">
          <h2 className="section-title gold-text-gradient">The Countdown</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Counting down the moments until the grand celebration</p>
          <div className="section-divider"></div>
        </div>

        {timeLeft.completed ? (
          <div className="glass-card gold-border" style={{ padding: '2.5rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h3 className="gold-text-gradient" style={{ fontSize: '1.8rem', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
              Let the Celebration Begin! 🎉
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              We are gathered at Hotel Northway, Vavuniya to honor Kaarththi's 50th year milestone. Thank you for joining us in creating beautiful memories!
            </p>
          </div>
        ) : (
          <div className="countdown-container">
            <div className="countdown-box glass-card gold-border">
              <div className="countdown-value">{String(timeLeft.days).padStart(2, '0')}</div>
              <div className="countdown-label">Days</div>
            </div>
            <div className="countdown-box glass-card gold-border">
              <div className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="countdown-label">Hours</div>
            </div>
            <div className="countdown-box glass-card gold-border">
              <div className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="countdown-label">Minutes</div>
            </div>
            <div className="countdown-box glass-card gold-border">
              <div className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="countdown-label">Seconds</div>
            </div>
          </div>
        )}
      </section>

      {/* Event Details Section */}
      <section className="section-wrapper" id="details" style={{ background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)' }}>
        <div className="section-title-container">
          <h2 className="section-title gold-text-gradient">Celebration Details</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Join us for an exquisite evening of dining, joy, and memories</p>
          <div className="section-divider"></div>
        </div>

        <div className="details-grid">
          {/* Date & Time */}
          <div className="details-card glass-card gold-border">
            <div className="details-icon-wrapper">
              <Calendar size={32} />
            </div>
            <h3 className="details-title">Date & Time</h3>
            <p className="details-content">
              Sunday, 12th July <br />
              <strong>6:00 PM onwards</strong>
            </p>
            <div className="calendar-actions" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a 
                href={getGoogleCalendarUrl()} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-gold"
                style={{ fontSize: '0.75rem', padding: '10px 18px' }}
              >
                Google Calendar
              </a>
              <button 
                onClick={downloadICSFile} 
                className="btn-gold"
                style={{ fontSize: '0.75rem', padding: '10px 18px' }}
              >
                <Download size={14} /> iCal
              </button>
            </div>
          </div>

          {/* Venue */}
          <div className="details-card glass-card gold-border">
            <div className="details-icon-wrapper">
              <MapPin size={32} />
            </div>
            <h3 className="details-title">The Venue</h3>
            <p className="details-content">
              Hotel Northway <br />
              <strong>Kandy Road, Vavuniya</strong>
            </p>
            <a 
              href="https://maps.google.com/?q=Hotel+Northway+Vavuniya" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-gold"
            >
              Get Directions
            </a>
          </div>

          {/* RSVP Contact */}
          <div className="details-card glass-card gold-border">
            <div className="details-icon-wrapper">
              <Phone size={32} />
            </div>
            <h3 className="details-title">RSVP Contacts</h3>
            <p className="details-content">
              Kindly confirm by July 5th <br />
              <strong>077 230 5777</strong>
            </p>
            <a href="tel:0772305777" className="btn-gold">Call To RSVP</a>
          </div>
        </div>

        {/* Embedded Dark Theme Google Maps */}
        <div className="map-wrapper gold-border">
          <iframe 
            title="Hotel Northway Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.4468603610996!2d80.49386347575306!3d9.022923588970005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afc192d6e355555%3A0xbcc0e513813ffea8!2sHotel%20Northway!5e0!3m2!1sen!2slk!4v1717800000000!5m2!1sen!2slk"
            className="map-iframe" 
            allowFullScreen="" 
            loading="lazy"
          ></iframe>
        </div>

        {/* Description Section */}
        <div className="toast-block">
          <div className="toast-image-container gold-border">
            <img src={toastImg} alt="Cheers to 50 Years" className="toast-image" />
          </div>
          <div className="toast-text">
            <h3 className="gold-text-gradient" style={{ fontSize: '2rem', fontFamily: 'var(--font-display)' }}>
              Cheers to 50 Golden Years!
            </h3>
            <p className="toast-quote">
              "Age is not lost youth, but a new stage of opportunity and strength."
            </p>
            <p className="toast-description">
              Fifty years of life is a tapestry woven with threads of love, wisdom, laughter, and beautiful relationships. 
              Join us for an evening dedicated to celebrating this remarkable milestone in Kaarththi's life. 
              We look forward to sharing an unforgettable night filled with nostalgic memories, laughter, elegant dinner, and toasts to the future.
            </p>
            <button 
              className="btn-gold" 
              onClick={() => document.getElementById('rsvp-section').scrollIntoView({ behavior: 'smooth' })}
              style={{ alignSelf: 'flex-start' }}
            >
              RSVP Now <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Decades Timeline Section */}
      <section className="section-wrapper" id="timeline">
        <div className="section-title-container">
          <h2 className="section-title gold-text-gradient">The Journey</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Reflecting on five decades of wisdom, growth, and milestones</p>
          <div className="section-divider"></div>
        </div>

        <div className="decades-container">
          <div className="decades-tabs">
            {decadeData.map((d) => (
              <button
                key={d.id}
                className={`decade-tab-btn ${activeTab === d.id ? 'active' : ''}`}
                onClick={() => setActiveTab(d.id)}
              >
                {d.years}
              </button>
            ))}
          </div>

          <div className="decade-content-card glass-card gold-border">
            {decadeData.filter(d => d.id === activeTab).map((d) => (
              <React.Fragment key={d.id}>
                <div className="decade-year-badge">
                  {d.years.split('-')[0]}
                  <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: '400', color: '#111', marginTop: '5px' }}>to</span>
                  {d.years.split('-')[1]}
                </div>
                <div className="decade-details">
                  <h3 className="decade-title">{d.title}</h3>
                  <p className="decade-description">{d.description}</p>
                  <div className="decade-highlights">
                    {d.highlights.map((hl, i) => (
                      <span key={i} className="decade-highlight-tag">✦ {hl}</span>
                    ))}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP Form Section */}
      <section className="section-wrapper" id="rsvp-section" style={{ background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)' }}>
        <div className="section-title-container">
          <h2 className="section-title gold-text-gradient">RSVP Portal</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Please let us know if you will be celebrating with us</p>
          <div className="section-divider"></div>
        </div>

        <div className="glass-card gold-border rsvp-form-container">
          {!submitted ? (
            <form onSubmit={handleRsvpSubmit}>
              <p className="rsvp-intro-text">
                Your presence would make this landmark celebration truly special. Please fill out the form below.
              </p>
              
              <div className="form-group">
                <label className="form-label" htmlFor="guest-name">Your Full Name</label>
                <input 
                  type="text" 
                  id="guest-name" 
                  className="form-input" 
                  placeholder="e.g., Kumar Vignesh" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group">
                <span className="form-label">Will you attend?</span>
                <div className="attendance-toggle">
                  <button 
                    type="button"
                    className={`attendance-btn ${attending === 'yes' ? 'active-yes' : ''}`}
                    onClick={() => setAttending('yes')}
                  >
                    Joyfully Attend
                  </button>
                  <button 
                    type="button"
                    className={`attendance-btn ${attending === 'no' ? 'active-no' : ''}`}
                    onClick={() => setAttending('no')}
                  >
                    Regretfully Decline
                  </button>
                </div>
              </div>

              {attending === 'yes' && (
                <div className="form-group-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="num-guests">Number of Guests</label>
                    <select 
                      id="num-guests" 
                      className="form-input" 
                      value={guests} 
                      onChange={(e) => setGuests(e.target.value)}
                    >
                      <option value="1">Just Me (1)</option>
                      <option value="2">Couples (2)</option>
                      <option value="3">Family of 3</option>
                      <option value="4">Family of 4</option>
                      <option value="5">Family of 5</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <span className="form-label">Food Preference</span>
                    <div className="food-selection">
                      <button 
                        type="button"
                        className={`food-btn ${food === 'veg' ? 'active' : ''}`}
                        onClick={() => setFood('veg')}
                      >
                        Veg
                      </button>
                      <button 
                        type="button"
                        className={`food-btn ${food === 'non-veg' ? 'active' : ''}`}
                        onClick={() => setFood('non-veg')}
                      >
                        Non-Veg
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor="birthday-wish">Birthday Wish for Kaarththi</label>
                <textarea 
                  id="birthday-wish" 
                  className="form-input" 
                  rows="4" 
                  placeholder="Share a message, memory, or blessing..." 
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="submit-btn-gold">Confirm RSVP</button>
            </form>
          ) : (
            <div className="success-overlay">
              <div className="success-icon-wrapper">
                <Check size={44} />
              </div>
              <h3 className="gold-text-gradient" style={{ fontSize: '1.8rem', fontFamily: 'var(--font-display)' }}>
                RSVP Logged Successfully!
              </h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '500px' }}>
                {attending === 'yes' 
                  ? `Thank you, ${name}! We are excited to welcome you and your party of ${guests} at Hotel Northway on Sunday, 12th July.`
                  : `Thank you for letting us know, ${name}. You will be missed, but your warm wishes will be shared with Kaarththi.`
                }
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', alignItems: 'center' }}>
                <a 
                  href={getWhatsAppUrl()} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="whatsapp-share-btn"
                >
                  <MessageSquare size={18} /> Send Confirmation via WhatsApp
                </a>
                
                <button 
                  onClick={resetForm} 
                  className="btn-gold" 
                  style={{ width: 'auto', fontSize: '0.8rem', padding: '10px 20px' }}
                >
                  RSVP for another guest
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Live Guestbook Section */}
      <section className="section-wrapper" id="guestbook">
        <div className="section-title-container">
          <h2 className="section-title gold-text-gradient">Celebration Wishes</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Kind words and blessings from our honored guests</p>
          <div className="section-divider"></div>
        </div>

        <div className="guestbook-grid">
          {rsvps.map((r, i) => (
            <div key={i} className="guestbook-card glass-card">
              <p className="guestbook-message">"{r.message}"</p>
              <div className="guestbook-footer">
                <span className="guestbook-author">{r.name}</span>
                <span className={`guestbook-badge ${r.attending === 'no' ? 'declined' : ''}`}>
                  {r.attending === 'yes' ? 'Attending' : 'Decline'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="invitation-footer">
        <svg className="footer-ornament" viewBox="0 0 100 20" fill="none">
          <path d="M10 10 H90 M50 2 L54 10 L50 18 L46 10 Z M20 10 A5 5 0 1 1 20 9 Z M80 10 A5 5 0 1 1 80 9 Z" stroke="#c5a059" strokeWidth="1" />
        </svg>
        <p className="footer-text">We look forward to celebrating with you.</p>
        <p className="footer-copyright">Kaarththi's 50th Birthday Invitation • Vavuniya</p>
      </footer>
    </div>
  );
}

export default App;
