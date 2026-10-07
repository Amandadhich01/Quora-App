const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
const Chat = require("./models/chat.js");
app.listen(port , ()=>{
    console.log("listening to port:8080");
});

app.get("/" , (req, res)=>{
    res.send("Home Pageeee");
});

main()
    .then(()=>{
        console.log("connection successful");
    })
    .catch((err)=>{
        console.log(err);
    });

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
 
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// let chat1 = new Chat ({
//     from:"neha",
//     to:"priya",
//     message:"send me your extra sheets",
//     created_at: new Date()
// });

// chat1.save().then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });

app.get("/chats", async (req, res)=>{
    let chats = await Chat.find();
   // console.log(chats);
    res.render("index.ejs", {chats});
});

app.get("/chats/new", (req,res)=>{
    res.render("new.ejs");

});

// ******* create  Route ***************

app.post("/chats", (req,res)=>{
    let {from , to , msg} = req.body;
    let newChat = new Chat ({
        from: from,
        to:to,
        msg: msg,
        created_at: new Date()
    });
    // console.log(newChat);
    // res.send("working");

    newChat.save().then((res)=>{
        console.log("chat saved");
    })
    .catch((err)=>{
        console.log(err);
    });

    res.redirect("/chats");

});

//********Edit Route *****

app.get("/chats/:id/edit", async (req,res)=>{
    let {id}= req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs" , {chat});
    
});
//************Update Route */
app.put("/chats/:id", async (req,res)=>{
    let {id}= req.params;
    let {msg : newMsg} = req.body;
    let update = await Chat.findByIdAndUpdate(id , {msg : newMsg} ,{ runValidators:true , new :true});
    // res.redirect("/chats");
    console.log(newMsg);
    res.redirect("/chats");
});

//***********Delete */

app.delete("/chats/:id", async (req,res)=>{
    let {id}= req.params;
    let deleteChat = await Chat.findByIdAndDelete(id );
    // res.redirect("/chats");
    console.log(deleteChat);
    res.redirect("/chats");
});



