const Express = require('express');
const Mongoose = require('mongoose');
const Bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const Cors = require('cors');
const userModel = require('./models/users.js');
const postModel = require('./models/posts.js');




let app = Express();

app.use(Express.json());
app.use(Cors());




Mongoose.connect("mongodb://krishnagadha:gadha55@ac-c6tjfyj-shard-00-00.7plurii.mongodb.net:27017,ac-c6tjfyj-shard-00-01.7plurii.mongodb.net:27017,ac-c6tjfyj-shard-00-02.7plurii.mongodb.net:27017/blogappdb?ssl=true&replicaSet=atlas-vpubjr-shard-0&authSource=admin&appName=Cluster0")

//create a post

app.post("/create",async(req,res)=>{
    let input=req.body

    let token=req.headers.token
    Jwt.verify(token,"blogapp",async(error,decoded)=>{
        if(decoded && decoded.email){

            let result=new postModel(input)
            await result.save()
            res.json({"status":"success"})


        }else{
            res.json({"status":"Invalid authentication"})
        }
    })
})


//view all posts api
 app.post("/viewall",async(req,res)=>{

    let token=req.headers.token
    
    Jwt.verify(token,"blogapp",(error,decoded)=>{
        if (decoded && decoded.email){

            postModel.find().then(
                (items)=>{
                    res.json(items)
                }
            ).catch(
                (error)=>{
                    res.json({"status":"error"})
                }
            )
        }else{
            res.json({"status":"invalid authentication"})
        }
    })

})



//view my post

app.post("/viewmypost",async(req,res)=>{

    let token=req.headers.token
    let input=req.body
    Jwt.verify(token,"blogapp",(error,decoded)=>{
        if (decoded && decoded.email){

            postModel.find(input).then(
                (items)=>{
                    res.json(items)
                }
            ).catch(
                (error)=>{
                    res.json({"status":"error"})
                }
            )
        }else{
            res.json({"status":"invalid authentication"})
        }
    })

})












//signin api
app.post('/signIn', async (req, res) =>{

    let input = req.body;
    let result=userModel.find({email:req.body.email}).then(
        (items)=>{
            if(items.length>0){

                const passwordValidator=Bcrypt.compareSync(req.body.password,items[0].password);
                if(passwordValidator){
                    Jwt.sign({email:req.body.email},"blogapp",{expiresIn:"2d"},
                    Jwt.sign({email:req.body.email},"blogapp",{expiresIn:"1d"},
                        (error,token)=>{
                        if(error){
                            res.json({"status":"error", "errormeassage":error});

                        }    
                        else{
                            res.json({"status":"success", "token":token,"userId":items[0]._id,


                            });
                        }
                    })




                }else{
                    res.json({"status":"password is incorrect"});
                }


        }else{
            res.json({"status":"email id not found"});
        }
    }
    ).catch()
})















//sign up api
app.post('/signup', async (req, res) => {
    let input = req.body;
    let hashedPassword = Bcrypt.hashSync(req.body.password, 10);
    console.log(hashedPassword);
    req.body.password = hashedPassword;


    userModel.find({ email: req.body.email }).then(
        (items) => {


            if (items.length > 0) {

                res.json({ "status": "email id already exists" });
            }
            else {
                let result = new userModel(input);
                result.save();
                res.json({ "status": "created successfully" });

            }
        });
});


app.listen(3030, () => {
    console.log('Server stared');
})