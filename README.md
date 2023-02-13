# store-front-backend

This is the backend for a store front project. It uses the following packages:

-   express
-   nodemon
-   typescript
-   pg
-   ts-node
-   prettier
-   supertest
-   dotenv
-   helmet
-   jsonwebtoken
-   bcrypt
-   morgan
-   db-migrate
-   eslint

## How to run

### Step 1

Clone the repository using `git clone` followed by repo link

### Step 2

Navigate to the cloned project using `cd` followed by file name

### Step 3

Install all the dependencies using `yarn install`

### Step 4

You need to add the necessary environment variables into your local `.env` file. If it doesn't exist and to quickly start create one and add the following:

```bash
PORT=3000
NODE_ENV=dev
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=store_dev
POSTGRES_DB_TEST=store_test
POSTGRES_USER=(Add your pg user)
POSTGRES_PASSWORD=(Here add your own password)
BCRYPT_PASSWORD=(Add your own password)
SALT_ROUNDS=10
SECRET_TOKEN=(Add your own secret token)
```

### Step 5

Next you can run `yarn migration:run`

### Step 6

start the server using `yarn start`

## Testing

For testing you can run the following command

```bash
yarn test
```

## API

### USERS

#### Create users

```http
  POST /api/users
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
  GET /api/users
```

#### Get user by id

```http
  GET /api/users/:id
```

#### Delete user

```http
  DELETE /api/users/:id
```

#### Update user

```http
  UPDATE /api/users/:id
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
  POST /api/users/authenticate
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
  POST /api/products
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
  GET /api/products
```

#### Get product by id

```http
  GET /api/products/:id
```

#### Update product

```http
  UPDATE /api/products/:id
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
  GET /api/products/:id
```

### Orders

#### Create order

```http
  POST /api/orders
```

Example:

```JSON
{
  "product_id": "3b33242a-79a3-4b3f-bc55-bf33a99380aa",
  "quantity": "1",
  "user_id": "b053fbdc-defd-4b22-871f-8a8e6db8d854",
  "status": "Active"
}
```

#### Get all orders by user id

```http
  GET /api/orders/:id
```

#### Get order by id

```http
  GET /api/orders/single/:id
```

#### Delete order

```http
  GET /api/orders/:id
```
