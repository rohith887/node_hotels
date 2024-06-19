const express = require('express');
const router = express.Router();
const Person = require('./../models/Person'); 


router.post('/', async (req, res) => 
{
    try {
        const data = req.body;
        console.log('Received data:', data); 
        const newPerson = new Person(data); 
        const response = await newPerson.save();
        console.log('Saved data:', response); 
        res.status(200).json(response);
    } 
    catch (err) {
        console.log('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType; 
        if (workType === 'chef' || workType === 'manager' || workType === 'waiter') 
        {
            const response = await Person.find({ work: workType });
            console.log('Response fetched:', response); 
            res.status(200).json(response);
        } 
        else 
        {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } 
    catch (err) 
    {
        console.log('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) =>
{
    try {
        const data = await Person.find();
        console.log('Data fetched:', data); 
        res.status(200).json(data);
    } 
    catch (err) 
    {
        console.log('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.put('/:id',async(req,res)=>{
  try
  {
     const personId = req.params.id;
     const updatedPersondata = req.body;
     const response = await Person.findByIdAndUpdate(personId,updatedPersondata,{
        new:true,
        runValidators:true
     })
     if(!response)
     {
        return res.status(404).json({error:'Person not found'});
     }
     console.log('data-updated');
     res.status(200).json(response);  
  }
  catch(err)
  {
    console.log(err);
    res.status(200).json({error:'Internal Server Error'});
  }
})


router.delete('/:id', async (req, res) => {
    try{
    const personId = req.params.id; 
    const response = await Person. findByIdAndDelete(personId);
    if (!response) {
    return res.status(404).json({ error: 'Person not found' });
    }

    console. log('data deleted');
    res.status(200).json({message: 'person Deleted Successfully'});
    }catch(err){
    console. log(err);
    res.status(500).json({error: 'Internal Server Error'});
    }
});
module.exports = router; 
  // hhhhh