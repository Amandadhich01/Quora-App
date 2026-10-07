const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

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

// Chat.insertMany([
//     {
//      from:"neha",
//     to:"priya",
//     message:"send me your extra sheets",
//     created_at: new Date()
//     },
// ]);

let allChats = [
    {
    from:"neha",
    to:"priya",
    msg:"send me your extra sheets",
    created_at: new Date()
    },
    {
    from:"priya",
    to:"neha",
    msg:"send me your extra pen",
    created_at: new Date()
    },
    {
    from:"vibha",
    to:"shreya",
    msg:"hello, how are you",
    created_at: new Date()
    },

    {
    from:"shreya",
    to:"vibha",
    msg:"I am fine",
    created_at: new Date()
    },
];

Chat.insertMany(allChats);