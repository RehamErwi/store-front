import OrderModel from '../order';

const orderModel = new OrderModel();

describe('Product Model', () => {
    describe('Check If Product CRUD Operations Exists', () => {
        it('Should have createProduct method', () => {
            expect(orderModel.create).toBeDefined();
        });

        it('Should have getProducts method', () => {
            expect(orderModel.getOrders).toBeDefined();
        });

        it('Should have getProduct method', () => {
            expect(orderModel.deleteOrder).toBeDefined();
        });

        it('Should have deleteProduct method', () => {
            expect(orderModel.deleteOrder).toBeDefined();
        });
    });
});
