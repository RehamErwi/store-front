import db from '../database';
import Product from '../types/product.type';

class ProductModel {
    // Create products
    async create(p: Product): Promise<Product> {
        try {
            const connection = await db.connect();
            const sql = `INSERT INTO products (name, price, category)
                values ($1, $2, $3) returning id, name, price, category`;

            const result = await connection.query(sql, [
                p.name,
                p.price,
                p.category,
            ]);

            connection.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Unable to create product (${p.name}): ${
                    (error as Error).message
                }`
            );
        }
    }
    // Get all products
    async getProducts(): Promise<Product[]> {
        try {
            const connection = await db.connect();
            const sql = 'SELECT id, name, price, category from products';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(
                `Error at retrieving products ${(error as Error).message}`
            );
        }
    }

    // Get product
    async getProduct(id: string): Promise<Product> {
        try {
            const connection = await db.connect();
            const sql =
                'SELECT id, name, price, category from products WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Could not find product with id ${id}, ${
                    (error as Error).message
                }`
            );
        }
    }

    // Update product
    async updateProduct(u: Product): Promise<Product> {
        try {
            const connection = await db.connect();
            const sql =
                'UPDATE products SET name=$1, price=$2, category=$3 WHERE id=$4 RETURNING id, name, price, category';
            const result = await connection.query(sql, [
                u.name,
                u.price,
                u.category,
                u.id,
            ]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Could not update product ${u.name}, ${
                    (error as Error).message
                }`
            );
        }
    }

    // Delete product
    async deleteProduct(id: string): Promise<Product> {
        try {
            const connection = await db.connect();
            const sql =
                'DELETE FROM products WHERE id=($1) RETURNING id, name, price, category';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Could not delete product with id ${id}, ${
                    (error as Error).message
                }`
            );
        }
    }
}

export default ProductModel;
