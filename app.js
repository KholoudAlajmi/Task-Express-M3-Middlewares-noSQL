const express = require('express');
const app = express();
const postsRoutes = require('./api/posts/posts.routes');
const connectDb = require('./database');

connectDb();

var morgan = require('morgan')
var cors = require('cors');
const slugify = require('slugify');
const { validate, Joi } = require('express-validation'); // Import express-validation

// Validation schema for the title field

// const titleValidation = {
//   body: Joi.object({
//     title: Joi.string()
//       .pattern(/^[a-zA-Z\s]+$/)  // Only letters and spaces allowed
//       .max(40)                   // Maximum 40 characters
//       .required()                // Title is required
//       .messages({
//         'string.pattern.base': 'Title must only contain letters and spaces.',
//         'string.max': 'Title must be no more than 40 characters.',
//         'string.empty': 'Title cannot be empty.'
//       })
//   })
// };

// Middleware to generate the slug and add it to the request

// app.use((req, res, next) => {
//   if (req.body.title) {
//     const slug = slugify(req.body.title, { lower: true });
//     req.slug = slug;
//   }
//   next();
// });



// Route to create a blog post with validation and slug generation

// app.post('/blog', validate(titleValidation), (req, res) => {
//   if (req.slug) {
//     res.json({ message: `Blog post created with slug: ${req.slug}` });
//   }
// })

// Use morgan with 'dev' format for logging requests
app.use(morgan('dev'));
app.use(cors())
app.use(express.json());
app.use('/api/posts', postsRoutes);

const path = require("path");
 app.use("/media" , express.static(path.join(__dirname, 'media')));


app.use((req, res, next) => {
  res.status(404).json({ message: 'Path not found' });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || 'Internal Server Error',
  });
});


app.listen(8000, () => {
  console.log('The application is running on localhost:8000');
});
