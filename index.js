const express = require('express');
const bodyParser = require('body-parser');
const multer  = require('multer')
const path = require('path')
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const data =[{
  id:1,
name:"zeeshan",
age:"16",
email:"zeeshn@gml.com"
},
{
  id:2,
  name:"zee",
  age:"17",
  email:"zeeshn@gml.com"
  },
  {
    id:3,
    name:"zeeshan nawa",
    age:"18",
    email:"zeeshn@gml.com"
    }];


app.post('/post', (req, res) => {

  const postData = req.body;
   postdataid=postData.id;
  console.log( postdataid);
  for (let index = 0; index < data.length; index++) {
    console.log(data[index].id);
    if(data[index].id==postdataid){
      res.send("User already exist")
    }  
  }
  data.push(postData)
  res.send( data );
});

app.delete('/delete/:id',  (req, res) => {
    const { id } = req.params;
    const newData = data.filter((item) => item.id !== parseInt(id));
     res.send(newData);
  })
  app.put('/update/:id', (req, res) => {
      const { id, name, age, email } = req.body;
      const findUser = data.find((item) => item.id === parseInt(req.params.id));
      if (findUser) {
        if (id) {
          findUser.id = id;
        }
        if (name) {
          findUser.name = name;
        }
        if (age) {
          findUser.age = age;
        }
        if (email) {
          findUser.email = email;
        }
       
      }
     
      res.send(data);
    }
    )
    app.use('/', express.static(path.join(__dirname,'uploads')))




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })


app.post('/profile', upload.single('upload'), function (req, res, next) {
  res.send("file uploaded")
})
app.get('/get', (req, res) => {
  res.send(data)
})
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

