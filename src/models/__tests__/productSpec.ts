import ProductModel from '../product';

const productModel = new ProductModel();

describe('Product Model', () => {
    describe('Check If Product CRUD Operations Exists', () => {
        it('Should have createProduct method', () => {
            expect(productModel.create).toBeDefined();
        });

        it('Should have getProducts method', () => {
            expect(productModel.getProducts).toBeDefined();
        });

        it('Should have getProduct method', () => {
            expect(productModel.getProduct).toBeDefined();
        });

        it('Should have updateProduct method', () => {
            expect(productModel.updateProduct).toBeDefined();
        });

        it('Should have deleteProduct method', () => {
            expect(productModel.deleteProduct).toBeDefined();
        });
    });
});
