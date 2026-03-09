import express from 'express';
import cors from 'cors';
import dashboardRoutes from './modules/dashboard/dashboard.routes';
import ridesRoutes from './modules/rides/rides.routes';
import driversRoutes from './modules/drivers/drivers.routes';
import paymentsRoutes from './modules/payments/payments.routes';
import promosRoutes from './modules/promos/promos.routes';
import usersRoutes from './modules/users/users.routes';
import { logEvent } from './database/elasticsearch';

const app = express();

app.use(cors());
app.use(express.json());

// Logging Middleware
app.use((req, res, next) => {
    res.on('finish', () => {
        logEvent('api-logs', 'REQUEST', {
            method: req.method,
            path: req.path,
            status: res.statusCode,
        });
    });
    next();
});

// Routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/rides', ridesRoutes);
app.use('/api/drivers', driversRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/promos', promosRoutes);
app.use('/api/users', usersRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
