# E-commerce Backend API

Getting Started

## Installation

Clone this repository to a preffered location.

To run the project you can run following commands

     `npm install` - To install dependencies
     
     `npm run dev` - To start the server

The server will start on http://localhost:5000

## API Endpoints

Products

    Add Product
        Endpoint: POST `http://localhost:5000/api/v1/products`
        
    Get All Products
        Endpoint: GET `http://localhost:5000/api/v1/products`
        
    Get Single Product
        Endpoint: GET `http://localhost:5000/api/v1/products/:productID`
        
    Update Product
        Endpoint: PUT `http://localhost:5000/api/v1/products/:productID`
        
    Delete Product
        Endpoint: DELETE `http://localhost:5000/api/v1/products/:productID`


Cart

    Add to Cart
        Endpoint: POST `http://localhost:5000/api/v1/cart/add`
        
    Remove Product from Cart
        Endpoint: POST `http://localhost:5000/api/v1/cart/remove`
        
    Get Cart
        Endpoint: GET `http://localhost:5000/api/v1/cart`
        
    Update Cart Quantity
        Endpoint: POST `http://localhost:5000/api/v1/cart/update`


Order

    Create Order
        Endpoint: POST `http://localhost:5000/api/v1/orders`
