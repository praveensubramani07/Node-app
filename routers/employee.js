const express=require('express');
const router=express.Router();
const employee=require('../schema/employee');

const multer = require('multer');

// Set up multer to handle the file upload
const upload = multer({ dest: 'uploads/' }); // Change 'uploads/' to the desired folder where you want to store uploaded files


router.get('/employee',async(req,res)=>{
    try{
        const employees=await employee.find();
        console.log(employees);
        res.json(employees);
    }
    catch(err){
        res.send(err);
        console.log(err);
    }
});

router.get('/employee/:id', async (req, res) => {
    try {
      const employe = await employee.findById(req.params.id);
      console.log(`Employee Details:\nName: ${employe.name}\nPosition: ${employe.course}`);
      res.json(employe);
    } catch (err) {
      res.send(err);
      console.log(err);
    }
  });


router.delete("/employee/:id", async (req, res) => { 
  try {
      const { id } = req.params;

      // Find the employee by ID and delete it
    const deletedEmployee = await employee.findByIdAndDelete(id);

    if (deletedEmployee) {
      return res.json({ message: "Employee deleted successfully." });
    } else {
      return res.status(404).json({ error: "Employee not found." });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal server error." });
  }
});
  
router.post('/employee',async(req,res)=>{
    const employe=new employee({
        name:req.body.name,
        course:req.body.course
    })
    try{
        const e1=await employe.save();
        res.json(e1);
        console.log(e1);
    }catch(err){
        res.send(err);
        console.log(err);
    }
});

router.post('/upload', upload.single('image'), (req, res) => {
  // 'req.file' contains the information about the uploaded file
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // You can access the uploaded file properties via 'req.file', e.g., req.file.filename, req.file.originalname, etc.

  // Process the uploaded image (e.g., save to database, resize, etc.)
  // For demonstration purposes, we'll just send a response with the uploaded file details
  res.send(`File uploaded: ${req.file.filename}`);
});



module.exports=router;
