import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
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

  // Get latest 3 products for the carousel
  const carouselItems = products.slice(0, 3);
  // Get latest 6 products for the product section
  const productItems = products.slice(0, 6);

  return (
    <div className="home-page">
      <section className="carousel-section">
        <Carousel className="custom-carousel">
          {carouselItems.map((product) => (
            <Carousel.Item key={product.id}>
              <img className="d-block w-100 carousel-image" src={product.image} alt={product.name} />
              <Carousel.Caption>
                <h1 className="carousel-title ">
                  <Link to={`/user/products/${product.id}`} className="text-danger carousel-link text-decoration-none">
                    {product.name}
                  </Link>
                </h1>
                <p className="carousel-price fs-2">${product.price} | {product.category}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
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
              {productItems.map((product, index) => (
                <Col key={product.id} md={4} lg={4} xl={4}>
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
                          to={`/user/products/${product.id}`} 
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
    </div>
  );
}
