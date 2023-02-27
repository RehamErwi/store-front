import UserModel from '../user';

const userModel = new UserModel();

describe('User Model', () => {
    describe('Check If User CRUD Operations Exists', () => {
        it('Should have createUser method', () => {
            expect(userModel.create).toBeDefined();
        });

        it('Should have getUsers method', () => {
            expect(userModel.getUsers).toBeDefined();
        });

        it('Should have getUser method', () => {
            expect(userModel.getUser).toBeDefined();
        });

        it('Should have updateUser method', () => {
            expect(userModel.updateUser).toBeDefined();
        });

        it('Should have deleteUser method', () => {
            expect(userModel.deleteUser).toBeDefined();
        });
    });
});
