## About Covvo Backend

This is the backend of the Covvo project. It is a RESTful API that provides endpoints for the frontend to interact with the database. The backend is built using:
- Node.js
- Express.js
- Postgres
- Sequelize
- JWT
- Bcrypt

## Installation

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Rename `.env.example` file in the root directory to `.env` and replace the values with your own:

```
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=your_db_port
JWT_SECRETE=your_jwt_secrete
JWT_SECRETE_FOR_INCOMING_DATA=your_jwt_secrete_for_incoming_data
ENCRYPTOR_SECRET=your_encryptor_secret
```

4. Run `npx sequelize db:create` to create the database
5. Run `npx sequelize db:migrate` to run the migrations
6. Run `npx sequelize-cli db:seed:all` to seed the database
7. Run `npm start` to start the server
8. The server will be running on `http://localhost:[SERVER_PORT]`
9. You can now make requests to the server