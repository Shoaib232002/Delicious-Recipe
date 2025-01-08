const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;
   //midleware to serve static files
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.set('view engine','ejs');

app.use('/',userRoutes);
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});