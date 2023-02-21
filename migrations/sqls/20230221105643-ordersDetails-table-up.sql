CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE orderDetails(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id uuid REFERENCES products(id) NOT NULL,
    order_id uuid REFERENCES orders(id) NOT NULL,
    quantity INTEGER NOT NULL
);