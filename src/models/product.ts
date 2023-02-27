import db from '../database';

export type Product = {
    id?: string;
    name: string;
    price: number;
    category: string;
};

class ProductModel {
    // Create products
    async create(p: Product): Promise<Product> {
        try {
            const connection = await db.connect();
            const result = await connection.query(
                `INSERT INTO products (name, price, category)
            values ($1, $2, $3) RETURNING id, name, price, category`,
                [p.name, p.price, p.category]
            );

            connection.release();

            const res = result.rows[0];
            return res;
        } catch (error) {
            throw new Error(`Unable to create product (${p.name}), ${error}`);
        }
    }
    // Get all products
    async getProducts(): Promise<Product[]> {
        try {
            const connection = await db.connect();

            const result = await connection.query(
                'SELECT id, name, price, category from products'
            );

            connection.release();

            const res = result.rows;
            return res;
        } catch (error) {
            throw new Error(`Error at retrieving products, ${error}`);
        }
    }

    // Get product
    async getProduct(id: string): Promise<Product> {
        try {
            const connection = await db.connect();

            const result = await connection.query(
                'SELECT id, name, price, category from products WHERE id=($1)',
                [id]
            );

            connection.release();

            const res = result.rows[0];
            return res;
        } catch (error) {
            throw new Error(`Could not find product with id ${id}, ${error}`);
        }
    }

    // Update product
    async updateProduct(u: Product): Promise<Product> {
        try {
            const connection = await db.connect();

            const result = await connection.query(
                'UPDATE products SET name=$1, price=$2, category=$3 WHERE id=$4 RETURNING id, name, price, category',
                [u.name, u.price, u.category, u.id]
            );

            connection.release();

            const res = result.rows[0];
            return res;
        } catch (error) {
            throw new Error(`Could not update product ${u.name}, ${error}`);
        }
    }

    // Delete product
    async deleteProduct(id: string): Promise<Product> {
        try {
            const connection = await db.connect();

            const result = await connection.query(
                'DELETE FROM products WHERE id=($1) RETURNING id, name, price, category',
                [id]
            );

            connection.release();

            const res = result.rows[0];
            return res;
        } catch (error) {
            throw new Error(`Could not delete product with id ${id}, ${error}`);
        }
    }
}

export default ProductModel;
