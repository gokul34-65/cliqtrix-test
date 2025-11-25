import { useState } from 'react'
import './App.css'

function App() {
  const [activeFeature, setActiveFeature] = useState(null)

  const features = [
    {
      id: 1,
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Built with Vite for instant hot module replacement and blazing fast builds.'
    },
    {
      id: 2,
      icon: '🎨',
      title: 'Beautiful Design',
      description: 'Modern, premium aesthetics with smooth animations and glassmorphism effects.'
    },
    {
      id: 3,
      icon: '📱',
      title: 'Fully Responsive',
      description: 'Perfectly optimized for all devices, from mobile phones to large displays.'
    },
    {
      id: 4,
      icon: '🚀',
      title: 'Production Ready',
      description: 'Optimized bundle size and performance for real-world applications.'
    },
    {
      id: 5,
      icon: '🎯',
      title: 'SEO Optimized',
      description: 'Built with best practices for search engine optimization and accessibility.'
    },
    {
      id: 6,
      icon: '💎',
      title: 'Premium Quality',
      description: 'Crafted with attention to detail and modern web development standards.'
    }
  ]

  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        
        <div className="container">
          <div className="hero-content fade-in-up">
            <h1 className="hero-title">
              Build Amazing
              <br />
              <span className="gradient-text">Web Experiences</span>
            </h1>
            <p className="hero-subtitle">
              A modern React template with stunning visuals, smooth animations,
              and premium design. Start building your next project today.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary">
                Get Started
                <span>→</span>
              </button>
              <button className="btn btn-secondary">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Powerful <span className="gradient-text">Features</span>
            </h2>
            <p className="section-subtitle">
              Everything you need to build modern web applications
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`card feature-card ${activeFeature === feature.id ? 'active' : ''}`}
                onMouseEnter={() => setActiveFeature(feature.id)}
                onMouseLeave={() => setActiveFeature(null)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content glass">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-subtitle">
              Join thousands of developers building amazing projects
            </p>
            <button className="btn btn-primary btn-large">
              Start Building Now
              <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p className="footer-text">
              Built with <span className="gradient-text">React</span> + <span className="gradient-text">Vite</span>
            </p>
            <div className="footer-links">
              <a href="#" className="footer-link">Documentation</a>
              <a href="#" className="footer-link">GitHub</a>
              <a href="#" className="footer-link">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
