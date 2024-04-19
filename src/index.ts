import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import gamePlayRouter from './router/gamePlayRouter'
import './public/style/style.css';



const app = express();

// Sử dụng EJS làm công cụ hiển thị
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sử dụng body-parser để xử lý dữ liệu POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Sử dụng middleware express.static để phục vụ các tài nguyên tĩnh từ thư mục public
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '..', 'dist')));
// Các middleware và route của ứng dụng
app.use('/gameplay', gamePlayRouter)
app.get('/', (req, res) => {
  res.render('inputNameUser')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
