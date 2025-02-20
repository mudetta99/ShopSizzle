import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsAction } from '../../store/productSlice';
import { Button, Container, Navbar, Nav, Card, Row, Col } from 'react-bootstrap';
import { addToCart } from '../../store/cartSlice';
import { Link } from 'react-router-dom';
import { FaPlus, FaShoppingCart, FaEye } from 'react-icons/fa'; // Import FaEye icon
import Swal from 'sweetalert2'; // Import SweetAlert
import '../../css/userHome.css';

export default function AllProducts() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.productSlice.products || []);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    dispatch(getAllProductsAction());
    fetchCartItems();
  }, [dispatch]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/cart');
      if (!response.ok) throw new Error('Failed to fetch cart data');
      
      const cartData = await response.json();
      setCartItems(cartData);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const handleAddToCart = async (product) => {
    const isProductInCart = cartItems.some(item => item.id === product.id);

    if (isProductInCart) {
      Swal.fire({
        title: 'Already in Cart!',
        text: `${product.name} is already in your cart.`,
        icon: 'info',
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }

    dispatch(addToCart(product));

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1, 
    };

    try {
      const response = await fetch('http://localhost:5000/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartItem),
      });

      if (!response.ok) throw new Error('Failed to add item to cart on the server');

      setCartItems(prevItems => [...prevItems, cartItem]);

      Swal.fire({
        title: 'Added to Cart!',
        text: `${product.name} has been added to your cart.`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Nav className="ml-auto">
            <Nav.Link href="/user/cart" className="d-flex align-items-center">
              <FaShoppingCart className="me-2" />
              <span>Cart ({cartItems.length})</span>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <h2 className="text-center mb-4" style={{ fontFamily: 'Georgia, serif', color: '#333' }}>All Products</h2>
        <Row>
          {products.length > 0 ? (
            products.map(product => (
              <Col key={product.id} md={4} className="mb-4">
                <Card className="h-100 shadow-sm border-0">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    style={{ 
                      height: '300px', 
                      width: '100%', 
                      objectFit: 'cover', 
                      borderTopLeftRadius: '8px', 
                      borderTopRightRadius: '8px' 
                    }}
                  />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Link to={`/user/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Card.Title style={{ fontFamily: 'Georgia, serif', color: '#333', cursor: 'pointer' }}>
                          {product.name}
                        </Card.Title>
                      </Link>
                      <Card.Text className="text-muted">${product.price}</Card.Text>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                      <Button 
                        variant="outline-dark" 
                        onClick={() => handleAddToCart(product)}
                        style={{ borderRadius: '20px', borderWidth: '2px', fontWeight: 'bold' }}
                      >
                        <FaPlus className="me-2" />
                      </Button>
                      <Link to={`/user/products/${product.id}`}>
                        <Button 
                          variant="outline-primary" 
                          style={{ borderRadius: '20px', borderWidth: '2px', fontWeight: 'bold' }}
                        >
                          <FaEye className="me-2" />
                        </Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">Loading products...</p>
          )}
        </Row>
      </Container>
    </>
  );
}
