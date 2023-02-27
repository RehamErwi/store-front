# API Requirements

## API Endpoints

### USERS

#### Create users

```http
  POST /users
```

Example:

```JSON
{
  "email": "test@example.com",
  "user_name": "testUser",
  "first_name": "Test",
  "last_name": "User",
  "password": "test123"
}
```

#### Get all users

```http
  GET /users
```

#### Get user by id

```http
  GET /users/:id
```

#### Delete user

```http
  DELETE /users/:id
```

#### Update user

```http
  UPDATE /users/:id
```

Example:

```JSON
{
  "id":"3333ac34-dfda-45c1-95e8-82a0749ac674",
  "email": "updated@example.com",
  "user_name": "UpdatedUser",
  "first_name": "Updated",
  "last_name": "User",
  "password": "test123"
}
```

#### Auth user

```http
  POST /users/authenticate
```

Example:

```JSON
{
  "email":"test@example.com",
  "password":"test123"
}
```

### PRODUCTS

#### Create product

```http
  POST /products
```

Example:

```JSON
{
  "name": "Galaxy S23 Ultra",
  "price": "1199",
  "category": "Electronics"
}
```

#### Get all products

```http
  GET /products
```

#### Get product by id

```http
  GET /products/:id
```

#### Update product

```http
  UPDATE /products/:id
```

Example:

```JSON
{
  "id": "361482ed-b6c7-4899-afd3-80bcd413aa03",
  "name": "iPhone 14 Pro Max",
  "price": "1999",
  "category": "Electronics"
}
```

#### Delete product

```http
  GET /products/:id
```

### Orders

#### Create order

```http
  POST /orders
```

Example:

```JSON
{
  "user_id": "b053fbdc-defd-4b22-871f-8a8e6db8d854",
  "status": "Active"
}
```

#### Create order details

```http
  POST /orders/details
```

Example:

```JSON
{
    "product_id": "f9199f5c-c38a-472e-b490-509c9f186a93",
    "order_id": "2ede063a-f9e9-422f-9c63-3768b419a357",
    "quantity": "5"
}
```

#### Get all orders by user id

```http
  GET /orders/:id
```

#### Get order by id

```http
  GET /orders/single/:id
```

#### Get order details by id

```http
  GET /orders/details/:id
```

#### Delete order

```http
  GET /orders/:id
```

## Data Shapes

### USERS

-   id
-   email
-   user_name
-   first_name
-   last_name
-   password

### PRODUCTS

-   id
-   name
-   price
-   category

### ORDERS

-   id
-   user_id
-   status

### ORDER DETAILS

-   id
-   product_id
-   order_id
-   quantity
