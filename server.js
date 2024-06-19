const express = require('express');
const app = express();
const db = require('./db');  

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/',function(req,res){
  res.send('Welcome to our Hotel:');
})
  
const MenuItem = require('./models/MenuItem');
const Person = require('./models/Person') ;

/*******************************************************PERSON DETAILS*******************************************************************/
app.post('/person', async (req, res) => 
  {
  try {
    const data = req.body
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log('data-saved'  );
    res.status(200).json(response);
  }
   catch (err) 
   {
      console.log('Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/person', async (req, res) => 
  {
  try {
    const data = await Person.find();
    console.log('data-fetched');
    res.status(200).json(data);
  } 
  catch (err)
   {
    console.log('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


/*******************************************************MENU ITEMS*************************************************************************/
app.post('/menu', async (req, res) => 
  {
  try {
    const data = req.body;
    console.log('Received data:', data);
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log('Saved data:', response);  
    res.status(200).json(response);
  } 
  catch (err) {
    console.log('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/menu', async (req, res) => 
{
  try {
    const data = await MenuItem.find();
    console.log('Fetched data:', data);  
    res.status(200).json(data);
  } 
  catch (err) {
    console.log('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
 
/*******************************************PRINTING OUTPUT IN WORKTYPE FOR PERSON***************************************************** */
app.get('/person/:workType', async (req, res) => 
{
  try {
    const workType = req.params.workType;
    console.log('Received workType:', workType);
    if (workType === 'chef' || workType === 'manager' || workType === 'waiter') 
    {
      const response = await Person.find({ work: workType });
      console.log('response fetched');
      return res.status(200).json(response);
    }
    else
    { 
      return res.status(404).json({ error: 'Invalid Parameters' });
    }
  } 
  catch(err) {
    console.error('Error:', err); // Log error
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);  
/***************************************************************PRINTING MENU ITEMS*********************************************************** */
//hello
app.get('/person/:Tastes', async (req, res) => 
  {
    try {
      const Tastes = req.params.taste;
      console.log('Received Tastes:', Tastes);
      if (Tastes === 'sweet' ||Tastes=== 'sour' || Tastes === 'spicy') 
      {
        const response = await MenuItem.find({ taste: Tastes});
        console.log('response fetched');
        return res.status(200).json(response);
      }
      else
      { 
        return res.status(404).json({ error: 'Invalid Parameters' });
      }
    } 
    catch(err) {
      console.error('Error:', err); // Log error
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });


const menuRoutes = require('./routes/menuRoutes');
app.use('/menu',menuRoutes);  


app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});


app.listen(3000, () => 
{
  console.log("Server started on port 3000");
});
