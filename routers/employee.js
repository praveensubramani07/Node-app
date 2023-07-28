const express=require('express');
const router=express.Router();
const employee=require('../schema/employee');


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





module.exports=router;
