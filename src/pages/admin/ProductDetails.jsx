import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row, Badge } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../../api/productsApi'
import { FaStar, FaArrowLeft, FaTag, FaBox, FaInfoCircle, FaDollarSign } from 'react-icons/fa'
import '../../css/ProductDetails.css'

export default function ProductDetails() {
  
  const { id } = useParams()
  const [product, setProduct] = useState({})

  useEffect(() => {
    getProductById(id)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error(error))
  }, [id]) 

  return (
    <Container className="product-details-container">
      <Link to="/products" className="back-button">
        <FaArrowLeft className="me-2" />
        Back to Products
      </Link>
      
      <Row className="justify-content-center">
        <Col xl={8}>
          <Card className="luxury-product-card">
            <div className="product-image-wrapper">
              <Card.Img 
                variant="top" 
                src={product?.image} 
                alt={product?.name} 
                className="product-image"
              />
              <Badge className="product-rating">
                <FaStar className="star-icon" />
                <span className="rating-value">5.0</span>
              </Badge>
            </div>

            <Card.Body className="product-details-body">
              <Card.Title className="product-title">
                {product?.name}
                <div className="product-price">${product?.price}</div>
              </Card.Title>

              <div className="product-meta">
                <div className="meta-item">
                  <FaTag className="meta-icon" />
                  <span>Category: {product?.category}</span>
                </div>
                <div className="meta-item">
                  <FaBox className="meta-icon" />
                  <span>In Stock: {product?.quantity} units</span>
                </div>
                <div className="meta-item">
                  <FaDollarSign className="meta-icon" />
                  <span>ID: #{product?.id?.toString().padStart(6, '0')}</span>
                </div>
              </div>

              <Card.Text className="product-description">
                <FaInfoCircle className="description-icon" />
                {product?.description}
              </Card.Text>

              <div className="action-buttons">
                <Link 
                  to={`edit`} 
                  className="gradient-button edit-button"
                >
                  Edit Product
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}