import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Badge, Button, Carousel } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../../api/productsApi';
import { FaStar, FaArrowLeft, FaTag, FaBox, FaInfoCircle, FaDollarSign, FaShoppingCart } from 'react-icons/fa';
import Swal from 'sweetalert2';
import '../../css/UserProductDetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    getProductById(id)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  const productImages = [
    product?.image,
    `${product.image}`,
    `${product.image}`,
  ];

  const handleAddToCart = async () => {
    try {
      const cartResponse = await fetch('http://localhost:5000/cart');
      const cartData = await cartResponse.json();

      const isProductInCart = cartData.some(item => item.id === product.id);
      
      if (isProductInCart) {
        Swal.fire({
          icon: 'warning',
          title: 'Already in Cart',
          text: `${product.name} is already in your cart.`,
        });
        return;
      }

      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      };

      const response = await fetch('http://localhost:5000/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartItem),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Added to Cart!',
          text: `${product.name} has been added to your cart.`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to add product to cart.',
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Something went wrong. Please try again later.',
      });
    }
  };

  return (
    <Container className="product-details-container">
      <Link to="/home/all products" className="back-button">
        <FaArrowLeft className="me-2" />
        Back to Products
      </Link>

      <Row className="justify-content-center">
        <Col xl={8}>
          <Card className="amazon-style-card">
            <Row>
              <Col md={6}>
                <div className="product-image-gallery">
                  <Carousel activeIndex={activeImageIndex} onSelect={setActiveImageIndex} interval={null}>
                    {productImages.map((image, index) => (
                      <Carousel.Item key={index}>
                        <img className="d-block w-100" src={image} alt={`Product Image ${index + 1}`} />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
              </Col>
              <Col md={6}>
                <Card.Body className="product-details-body">
                  <Card.Title className="product-title">{product?.name}</Card.Title>
                  <div className="product-rating">
                    <Badge bg="warning" className="me-2">
                      <FaStar className="star-icon" />
                      <span className="rating-value">5.0</span>
                    </Badge>
                    <span className="reviews-link">1,234 Reviews</span>
                  </div>
                  <div className="product-price">
                    <FaDollarSign className="price-icon" />
                    <span className="price-value">{product?.price}</span>
                  </div>
                  <div className="product-meta">
                    <div className="meta-item">
                      <FaTag className="meta-icon" />
                      <span>Category: {product?.category}</span>
                    </div>
                    <div className="meta-item">
                      <FaBox className="meta-icon" />
                      <span>In Stock: {product?.quantity} units</span>
                    </div>
                  </div>
                  <Card.Text className="product-description">
                    <FaInfoCircle className="description-icon" />
                    {product?.description}
                  </Card.Text>
                  <div className="action-buttons">
                    <Button variant="primary" className="add-to-cart-button" onClick={handleAddToCart}>
                      <FaShoppingCart className="me-2" />
                      Add to Cart
                    </Button>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
