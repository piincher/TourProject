const express = require('express');

const morgan = require('morgan');
const app = express();
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// 1) Middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
	console.log('hi le middleware ');
	next();
});
app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

//2) ROUTES HANDLERS

//app.get('/api/v1/tours', getAllTours);

//app.get('/api/v1/tours/:id', getTour);
//app.post('/api/v1/tours', createTour);

//app.delete('/api/v1/tours/:id', deleteTour);
//app.patch('/api/v1/tours/:id', updateTour);

// 3) ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4) START SERVER

module.exports = app;
