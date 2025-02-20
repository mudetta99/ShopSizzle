import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaFrown } from 'react-icons/fa'
import '../../css/NotFound.css'

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="error-content">
        <div className="error-code">
          <span className="gradient-text">4</span>
          <span className="gradient-text">0</span>
          <span className="gradient-text">4</span>
        </div>
        
        <div className="error-message">
          <FaFrown className="frown-icon" />
          <h1>Page Not Found</h1>
          <p>The page you're looking for doesn't exist or has been moved</p>
        </div>

        <Link to="/" className="home-button">
          <Button variant="primary" size="lg">
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  )
}