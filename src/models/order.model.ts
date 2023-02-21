import db from '../database';
import Order from '../types/order.type';
import OrderDetails from '../types/orderDetails.type';

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
            const sql = `INSERT INTO orders (user_id, status)
                values ($1, $2) RETURNING *`;

            const result = await connection.query(sql, [o.user_id, o.status]);

            connection.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Unable to create order ${(error as Error).message}`
            );
        }
    }

    async addToOrder(o: OrderDetails): Promise<OrderDetails> {
        try {
            const connection = await db.connect();
            const sql = `INSERT INTO orderDetails (product_id, order_id, quantity)
                values ($1, $2, $3) RETURNING *`;

            const result = await connection.query(sql, [
                o.product_id,
                o.order_id,
                o.quantity,
            ]);

            connection.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Unable to add order details ${(error as Error).message}`
            );
        }
    }

    // Get all orders
    async getOrders(id: string): Promise<Order[]> {
        try {
            const connection = await db.connect();
            const sql = 'SELECT * from orders WHERE user_id=($1)';
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
            const sql = 'SELECT * from orders WHERE id=($1)';
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

    // Get order details
    async getOrderDetails(id: string): Promise<OrderDetails[]> {
        try {
            const connection = await db.connect();
            const sql = 'SELECT * FROM orderDetails WHERE order_id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(
                `Could not retrieve order ${id}, ${(error as Error).message}`
            );
        }
    }

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
