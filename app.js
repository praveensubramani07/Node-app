const express=require('express');


//middlewares
const app=express();
const cors=require('cors');
app.use(cors());
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//connecting to mongoDB
const mongoose = require('mongoose');
const url = 'mongodb+srv://praveen01:praveen001@cluster0.5ulr1mm.mongodb.net/';
(async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
})();


//routers
const employee=require('./routers/employee');

app.get('/employee',employee);
app.post('/employee',employee);
app.get('/employee/:id',employee);
app.delete('/employee/:id', employee);


//port
const port=3000;
app.listen(port,()=>{
    console.log("listening in port 3000");
});
