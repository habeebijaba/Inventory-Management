const express = require('express');
const app = express()
const logger = require('morgan')
const dotenv = require('dotenv')
const cookieparser = require('cookie-parser')
const multer = require('multer')
const cors = require('cors');
dotenv.config();

const { connectdb } = require('./config/db')

//ROUTES

const authRoutes = require('./routes/authRoutes.js')
const productRoutes = require('./routes/productRoutes.js')
const customerRoutes = require('./routes/customerRoutes')
const salesRoutes = require('./routes/salesRoutes')
const reportRoutes = require('./routes/reportRoutes.js')

// app.use(function (req, res, next) {
//     res.header(
//       "Access-Control-Allow-Origin",
//       'https://'
//     );
//     next();
//   });


app.use(cors());
app.use(express.json());
app.use(cookieparser())
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

//FILE UPLOAD

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../inventoryManagement/public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage })

app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file
    res.status(200).json(file.filename)
})

app.get('/', (req, res) => {
    res.send("works")
})

//Routes
app.use('/api', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/customers', customerRoutes)
app.use('/api/sales', salesRoutes)
app.use('/api/reports', reportRoutes)




// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    connectdb();
    console.log("server started");
})