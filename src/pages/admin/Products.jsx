import React, { useEffect, useState } from 'react'
import { deleteProduct, getAllProducts } from '../../api/productsApi';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaSpinner, FaEye } from 'react-icons/fa';
import { Table, Button, InputGroup, FormControl } from 'react-bootstrap';
import '../../css/Products.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductAction, getAllProductsAction } from '../../store/productSlice';

export default function Products() {


    const { products, isLoading, errors } = useSelector(store => store.productSlice)

    const dispatch = useDispatch();
    useEffect(  () => {
        dispatch(getAllProductsAction())
    }, [] )

    const deleteHandler = async (productId) => {
        dispatch(deleteProductAction(productId))
    }


    return (
        <div className="products-container">
            <div className="products-header">
                <h2 className="section-title">Product Management</h2>

                <div className="products-controls">
                    <InputGroup className="search-box">
                        <InputGroup.Text>
                            <FaSearch />
                        </InputGroup.Text>
                        <FormControl
                            placeholder="Search products..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>

                    <Link to="0/edit" className="gradient-button">
                        <FaPlus className="button-icon" />
                        Add New Product
                    </Link>
                </div>
            </div>

            {isLoading && !errors && (
                <div className="loading-state">
                    <FaSpinner className="spinner-icon" />
                    <span>Loading Products...</span>
                </div>
            )}

            {errors && (
                <div className="error-alert">
                    ⚠️ Error loading products: {errors.message}
                </div>
            )}

            {!isLoading && !errors && (
                <div className="products-table-container">
                    <Table hover responsive className="luxury-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td className="product-id">#{product.id}</td>
                                    <td className="product-info">
                                        <div className="product-image">
                                            <img src={product.image} alt={product.name} />
                                        </div>

                                    </td>

                                    <td className="product-info">
                                        <div className="product-details">
                                            <h5>{product.name}</h5>
                                            <p>{product.description}</p>
                                        </div>
                                    </td>



                                    <td className="product-price">${product.price}</td>
                                    <td className="product-category">
                                        <span className="category-badge">{product.category}</span>
                                    </td>
                                    <td className="product-stock">
                                        <span className={`stock-indicator ${product.quantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
                                            {product.quantity} units
                                        </span>
                                    </td>
                                    
                                    <td className="product-actions">
                                        <Link
                                            to={`${product.id}`}
                                            className="action-button view-button"
                                        >
                                            <FaEye />
                                        </Link>

                                        <Link
                                            to={`${product.id}/edit`}
                                            className="action-button edit-button"
                                        >
                                            <FaEdit />
                                        </Link>
                                        <button
                                            onClick={() => deleteHandler(product.id)}
                                            className="action-button delete-button"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    )
}