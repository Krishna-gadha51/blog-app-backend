const Express = require('express');
 const Mongoose = require('mongoose');
const Bcrypt = require('bcrypt');
// const Jwt = require('jsonwebtoken');
const Cors = require('cors');
const userModel = require('./models/users.js');



let app = Express();

app.use(Express.json());
app.use(Cors());




Mongoose.connect("mongodb://krishnagadha:gadha55@ac-c6tjfyj-shard-00-00.7plurii.mongodb.net:27017,ac-c6tjfyj-shard-00-01.7plurii.mongodb.net:27017,ac-c6tjfyj-shard-00-02.7plurii.mongodb.net:27017/blogappdb?ssl=true&replicaSet=atlas-vpubjr-shard-0&authSource=admin&appName=Cluster0")

app.post('/signup',async (req, res) => {
    let input = req.body;
    let hashedPassword = Bcrypt.hashSync(req.body.password, 10);
    console.log(hashedPassword);
    req.body.password = hashedPassword;
    
    
     userModel.find({ email: req.body.email }).then(
        (items)=>{
       
    
        if (items.length > 0) {

            res.json({ "status": "email id already exists" });
         } 
         else {
             let result=new userModel(input);
              result.save();
             res.json({ "status": "created successfully" });
       
    }
    });
});


app.listen (3030, () => {
    console.log('Server stared');
})