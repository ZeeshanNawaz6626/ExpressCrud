const express = require('express')
const app = express()
const port = 3000
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
    name:"zeeshan nawaz",
    age:"18",
    email:"zeeshn@gml.com"
    }]

app.post('/create',  (req, res) => {
  try {
    const { id } = req.body;
    const user = data.find((item) => item.id === id);
    if (user) {
      // return res.send(user);
        //  return res.send("user allready exist")
        console.log("User All Ready Exists")
        return res.json({ error: "User already exists" });
    } else {
      data.push(req.body);
      return res.send(data);
    }
  } catch (error) {
    console.log("server error", error);
    return res.json({ error: "Internal server error" });
  }
})

app.get('/get/:id',(req, res) => {
  const findUser = data.find((item) => item.id === parseInt(req.params.id));
  return res.send(findUser);
} )
app.delete('/delete/:id',  (req, res) => {
  const { id } = req.params;
  const newData = data.filter((item) => item.id !== parseInt(id));
  return res.send(newData);
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
    // findUser.id = id;
    // findUser.name = name;
    // findUser.age = age;
    // findUser.email = email
  }
  // data.save(findUser)
  res.send(data);
}
)


app.get('/', (req, res) => {
  res.send(data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})