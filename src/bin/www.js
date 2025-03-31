/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */

const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const config = require('../config');
const sequelize = require('../config/database.config'); // Sequelize instance
require('../models'); // Initializes associations

const app = express();
const server = http.Server(app);
const routes = require('../routes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(config.corsOptions));
app.use(express.static(path.join(__dirname, '../../public')));

// Views
app.set('views', path.join(__dirname, '../views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Root route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Register routes
app.use(routes);

// Error middleware
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: `${err.name}: ${err.message}` });
    }
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            code: err.code,
            msg: err.message
        }
    });
});

// Start server after DB connection
const PORT = process.env.SERVER_PORT || 3000;

sequelize.authenticate()
    .then(() => {
        console.info('PostgreSQL connection established.');
        server.listen(PORT, () => console.info(`Listening on Port: ${PORT}`));
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    });

server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    if (error.syscall !== 'listen') throw error;

    const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    console.info(`Listening on ${bind}`);
}

// Utility: List all registered endpoints
const listEndpoints = (app) => {
    const routes = [];

    app._router.stack.forEach((middleware) => {
        if (middleware.route) {
            const { path, methods } = middleware.route;
            const methodNames = Object.keys(methods).map(m => m.toUpperCase()).join(', ');
            routes.push(`${methodNames} ${path}`);
        } else if (middleware.name === 'router') {
            middleware.handle.stack.forEach((handler) => {
                if (handler.route) {
                    const methodNames = Object.keys(handler.route.methods).map(m => m.toUpperCase()).join(', ');
                    routes.push(`${methodNames} ${handler.route.path}`);
                }
            });
        }
    });

    console.log('Registered routes:', routes);
};

listEndpoints(app);