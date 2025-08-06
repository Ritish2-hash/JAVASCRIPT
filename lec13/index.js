const express=require('express');
const app=express();
const path=require('path');
const fs = require('fs');
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}))

app.post('/register',(req,res)=>{
 const { email, password } = req.body;


    fs.readFile("data.json", "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
        }

        
        let users = [];
        if (data) {
            try {
                users = JSON.parse(data);
            } catch (err) {
                console.error(err);
                
            }
        }
        users.push({ email, password });

        fs.writeFile("data.json", JSON.stringify(users, null, 2), (writeErr) => {
            if (err) {
                console.error(err);
                
            }

            res.send("User registered successfully!");
        });
    });
})

app.listen(3000,()=>{
    console.log("Server started");
})