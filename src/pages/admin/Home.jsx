import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaPlus, FaList, FaEdit, FaTrash, FaArrowRight, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsAction } from '../../store/productSlice';
import '../../css/Home.css';

export function Home() {
  const dispatch = useDispatch();
  const { products, isLoading, errors } = useSelector(store => store.productSlice);

  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [dispatch]);

  return (
    <div className="home-page">
      <section className="hero-section">
        <Container>
          <div className="hero-content text-center">
            <h1 className="hero-title">Manage Your Data with Elegance</h1>
            <p className="hero-subtitle">Experience seamless CRUD operations with our sophisticated interface</p>
            <Button variant="light" size="lg" className="cta-button">
              <Link className='text-light text-decoration-none' to="/products">
                Get Started <FaArrowRight className="ms-2" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      <section className="products-section">
        <Container>
          <h2 className="section-title text-center mb-5">Featured Products</h2>
          {isLoading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : errors ? (
            <div className="error-alert text-center">
              ⚠️ Error loading products: {errors.message}
            </div>
          ) : (
            <Row className="g-4">
              {products.map((product) => (
                <Col key={product.id} md={6} lg={4} xl={3}>
                  <Card className="product-card">
                    <Card.Img 
                      variant="top" 
                      src={product.image} 
                      className="product-card-image"
                    />
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="product-category">{product.category}</span>
                        <div className="product-rating">
                          <FaStar className="text-warning" />
                          <span className="ms-1">5.0</span>
                        </div>
                      </div>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text className="product-price">${product.price}</Card.Text>
                      <Card.Text className="product-description">
                        {product.description.slice(0, 80)}...
                      </Card.Text>
                      <div className="d-grid">
                        <Link 
                          to={`/products/${product.id}`} 
                          className="btn btn-primary btn-sm"
                        >
                          View Details
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      <section className="features-section">
        <Container>
          <h2 className="section-title text-center mb-5">Core Features</h2>
          <Row className="g-4">
            <Col md={6} lg={3}>
              <Card className="feature-card">
                <Card.Body className="text-center">
                  <div className="icon-wrapper">
                    <FaPlus className="feature-icon" />
                  </div>
                  <Card.Title>Create</Card.Title>
                  <Card.Text>
                    Effortlessly add new records with our intuitive creation interface
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card className="feature-card">
                <Card.Body className="text-center">
                  <div className="icon-wrapper">
                    <FaList className="feature-icon" />
                  </div>
                  <Card.Title>Read</Card.Title>
                  <Card.Text>
                    Beautifully display your data with modern visualization
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card className="feature-card">
                <Card.Body className="text-center">
                  <div className="icon-wrapper">
                    <FaEdit className="feature-icon" />
                  </div>
                  <Card.Title>Update</Card.Title>
                  <Card.Text>
                    Smooth editing experience with instant preview capabilities
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card className="feature-card">
                <Card.Body className="text-center">
                  <div className="icon-wrapper">
                    <FaTrash className="feature-icon" />
                  </div>
                  <Card.Title>Delete</Card.Title>
                  <Card.Text>
                    Secure deletion process with confirmation safeguards
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="cta-section">
        <Container className="text-center">
          <h2 className="cta-title">Ready to Transform Your Data Management?</h2>
          <Button variant="light" size="lg" className="cta-button">
            <Link className='text-light text-decoration-none' to="/products">
              Start Now
            </Link>
            <FaArrowRight className="ms-2" />
          </Button>
        </Container>
      </section>
    </div>
  );
}