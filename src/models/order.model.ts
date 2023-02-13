import db from '../database';
import Order from '../types/order.type';

class OrderModel {
    // Create orders
    // async create(id: string): Promise<Order> {
    //     try {
    //         const connection = await db.connect();
    //         const sql = `INSERT INTO orders (user_id)
    //             values ($1) RETURNING *`;

    //         const result = await connection.query(sql, [id]);

    //         connection.release();

    //         return result.rows[0];
    //     } catch (error) {
    //         throw new Error(
    //             `Unable to create order ${(error as Error).message}`
    //         );
    //     }
    // }
    async create(o: Order): Promise<Order> {
        try {
            const connection = await db.connect();
            const sql = `INSERT INTO orders (product_id, quantity, user_id, status)
                values ($1, $2, $3, $4) RETURNING *`;

            const result = await connection.query(sql, [
                o.product_id,
                o.quantity,
                o.user_id,
                o.status,
            ]);

            connection.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Unable to create order ${(error as Error).message}`
            );
        }
    }

    // Get all orders
    async getOrders(id: string): Promise<Order[]> {
        try {
            const connection = await db.connect();
            const sql =
                'SELECT id, product_id, quantity, user_id, status from orders WHERE user_id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(
                `Unable to retrieve orders for user ${id}, ${
                    (error as Error).message
                }`
            );
        }
    }

    // Get order
    async getOrder(id: string): Promise<Order> {
        try {
            const connection = await db.connect();
            const sql =
                'SELECT id, product_id, quantity, user_id, status from orders WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Could not find order with id ${id}, ${
                    (error as Error).message
                }`
            );
        }
    }

    // // Update order
    // async updateOrder(o: Order): Promise<Order> {
    //     try {
    //         const connection = await db.connect();
    //         const sql = 'UPDATE orders SET quantity=$1, status=$2 RETURNING *';
    //         const result = await connection.query(sql, [o.quantity, o.status]);
    //         connection.release();
    //         return result.rows[0];
    //     } catch (error) {
    //         throw new Error(
    //             `Could not update order ${o.id}, ${(error as Error).message}`
    //         );
    //     }
    // }

    // Delete order
    async deleteOrder(id: string): Promise<Order> {
        try {
            const connection = await db.connect();
            const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Could not delete order with id ${id}, ${
                    (error as Error).message
                }`
            );
        }
    }
}

export default OrderModel;
