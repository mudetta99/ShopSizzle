import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Button, Table, Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('http://localhost:5000/cart');
        if (!response.ok) throw new Error('Failed to fetch cart data');

        const data = await response.json();
        setCart(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Function to update quantity in the database
  const updateQuantity = async (itemId, newQuantity) => {
    try {
      const response = await fetch(`http://localhost:5000/cart/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!response.ok) throw new Error('Failed to update quantity');

      setCart(cart.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item));
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // Increase quantity
  const increaseQuantity = (itemId, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    updateQuantity(itemId, newQuantity);
  };

  // Decrease quantity (minimum 1)
  const decreaseQuantity = (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      updateQuantity(itemId, newQuantity);
    }
  };

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

  // Handle remove item from cart
  const handleRemoveFromCart = async (itemId) => {
    const confirmDelete = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this item from your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!',
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5000/cart/${itemId}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to remove item from cart');

        setCart(cart.filter(item => item.id !== itemId));
        Swal.fire('Deleted!', 'The item has been removed.', 'success');
      } catch (error) {
        console.error('Error removing item from cart:', error);
      }
    }
  };

  // Handle "Buy Now" action
  const handleBuyNow = () => {
    Swal.fire({
      title: 'Purchase Successful',
      text: 'Thank you for your purchase!',
      icon: 'success',
      confirmButtonText: 'OK'
    });

    // Optionally, clear the cart after purchase
    setCart([]);
  };

  if (loading) return <Container className="mt-4"><p>Loading cart...</p></Container>;
  if (error) return <Container className="mt-4"><Alert variant="danger">{error}</Alert></Container>;

  return (
    <Container className="mt-4">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <Alert variant="info">Your cart is empty.</Alert>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td><img src={item.image} alt={item.name} width="50" /></td>
                  <td>
                    <Link to={`/user/products/${item.id}`} className="text-decoration-none">
                      {item.name}
                    </Link>
                  </td>
                  <td>${parseFloat(item.price).toFixed(2)}</td>
                  <td>
                    <Button variant="outline-secondary" onClick={() => decreaseQuantity(item.id, item.quantity)}>-</Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button variant="outline-secondary" onClick={() => increaseQuantity(item.id, item.quantity)}>+</Button>
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => handleRemoveFromCart(item.id)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4>Total: ${totalPrice.toFixed(2)}</h4>

          <div className="text-center">
            <Button variant="success" className="m-5 w-50" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>

        </>
      )}
    </Container>
  );
}
