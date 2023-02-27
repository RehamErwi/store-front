import db from '../database';

export type Order = {
    id?: string;
    user_id: string;
    status: string;
};

export type OrderDetails = {
    id: string;
    product_id: string;
    order_id: string;
    quantity: number;
};

class OrderModel {
    async create(o: Order): Promise<Order> {
        try {
            const connection = await db.connect();

            const result = await connection.query(
                `INSERT INTO orders (user_id, status)
            values ($1, $2) RETURNING id, user_id, status`,
                [o.user_id, o.status]
            );

            connection.release();

            const res = result.rows[0];
            return res;
        } catch (error) {
            throw new Error(`Failure! Unable to create order, ${error}`);
        }
    }

    async addToOrder(o: OrderDetails): Promise<OrderDetails> {
        try {
            const connection = await db.connect();

            const result = await connection.query(
                `INSERT INTO orderDetails (product_id, order_id, quantity)
            values ($1, $2, $3) RETURNING product_id, order_id, quantity`,
                [o.product_id, o.order_id, o.quantity]
            );

            connection.release();

            const res = result.rows[0];
            return res;
        } catch (error) {
            throw new Error(
                `Failure! Unable to add order details ${
                    (error as Error).message
                }`
            );
        }
    }

    // Get all orders
    async getOrders(id: string): Promise<Order[]> {
        try {
            const connection = await db.connect();

            const result = await connection.query(
                'SELECT id, user_id, status from orders WHERE user_id=($1)',
                [id]
            );

            connection.release();

            const res = result.rows;
            return res;
        } catch (error) {
            throw new Error(
                `Failure! Unable to retrieve orders for user ${id}, ${error}`
            );
        }
    }

    // Get order
    async getOrder(id: string): Promise<Order> {
        try {
            const connection = await db.connect();

            const result = await connection.query(
                'SELECT id, user_id, status from orders WHERE id=($1)',
                [id]
            );

            connection.release();

            const res = result.rows[0];
            return res;
        } catch (error) {
            throw new Error(
                `Failure! Could not find order with id ${id}, ${error}`
            );
        }
    }

    // Get order details
    async getOrderDetails(id: string): Promise<OrderDetails[]> {
        try {
            const connection = await db.connect();

            const result = await connection.query(
                'SELECT id, product_id, order_id, quantity FROM orderDetails WHERE order_id=($1)',
                [id]
            );

            connection.release();

            const res = result.rows;
            return res;
        } catch (error) {
            throw new Error(
                `Failure! Could not retrieve order ${id}, ${error}`
            );
        }
    }

    // Delete order
    async deleteOrder(id: string): Promise<Order> {
        try {
            const connection = await db.connect();
            const result = await connection.query(
                'DELETE FROM orders WHERE id=($1) RETURNING *',
                [id]
            );

            connection.release();

            const res = result.rows[0];
            return res;
        } catch (error) {
            throw new Error(
                `Failure! Could not delete order with id ${id}, ${error}`
            );
        }
    }
}

export default OrderModel;
