const express = require('express');
const app = express();
const port = 3000; // Port where the server runs

// Serve the frontend (static files) from the 'public' folder
app.use(express.static('public'));

// Start the server and listen on port 3000
app.listen(port, '127.0.0.1', () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
// Middleware to handle form data
app.use(express.urlencoded({ extended: true }));

// Serve the static frontend files
app.use(express.static('public'));

// Handle the form submission
app.post('/submit', (req, res) => {
  const newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
  });
  newContact.save()
      .then(() => res.send(`Thank you for submitting, ${newContact.name}!`))
      .catch(err => res.status(400).send(err));
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/SiteDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected!'))
.catch(err => console.log(err));
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.model('Contact', contactSchema);
