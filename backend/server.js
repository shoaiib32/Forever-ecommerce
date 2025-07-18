import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import 'dotenv/config'
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import orderRouter from './routes/orderRoute.js';
import cartRouter from './routes/cartRoute.js';

const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary()

app.use(cors());
app.use(express.json());

app.use('/api/user',userRouter)
app.use('/api/product', productRouter)
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get('/', (req, res) => {
  res.send('API working');
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
