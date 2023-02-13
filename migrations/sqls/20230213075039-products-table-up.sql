CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE products(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL
);