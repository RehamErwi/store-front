# store-front-backend

## Project Setup

1. Clone the repository using `git clone` followed by repo link

2. Navigate to the cloned project using `cd` followed by file name

3. Install all the dependencies using `yarn install`
4. You need to add the necessary environment variables into your local `.env` file. If it doesn't exist and to quickly start create one and add the following:

```bash
PORT=3000
NODE_ENV=dev
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=store_dev
POSTGRES_DB_TEST=store_test
POSTGRES_USER={Add your pg username} default is (postgres)
POSTGRES_PASSWORD={Here add your own password}
BCRYPT_PASSWORD={Add your own password}
SALT_ROUNDS=10
SECRET_TOKEN={Add your own secret token}
```

-   Note: You need to have postgreSQL installed in your local machine and create two databases in your server `store_dev` and `store_test`

5. Next you can run `yarn migration:run`
6. Start the server using `yarn start`

## Testing

For testing you can run the following command

```bash
yarn test
```

## Dev dependencies

-   "eslint"
-   "eslint-config-prettier"
-   "eslint-plugin-prettier"
-   "jasmine"
-   "jasmine-spec-reporter"
-   "nodemon"
-   "prettier"
-   "supertest"
-   "ts-node"
-   "typescript"
-   "rimraf"