import axios from "axios";
const baseUrl = "http://localhost:5000/products";

const getAllProducts = ()=> axios.get(baseUrl);
const getProductById = (productId) => axios.get (`${baseUrl}/${productId}`);
const addNewProduct = (product) => axios.post(`${baseUrl}`, product);
const deleteProduct = (productId) => axios.delete(`${baseUrl}/${productId}`);
const editProduct = (productId, product) => axios.put(`${baseUrl}/${productId}`, product);


export {
    getAllProducts,
    getProductById,
    addNewProduct,
    deleteProduct,
    editProduct,
}



