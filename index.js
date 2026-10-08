const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
const Chat = require("./models/chat.js");

// Root route redirects to /chats
app.get("/", (req, res) => {
    res.redirect("/chats");
});

// Fallback in-memory store so the app works seamlessly even if MongoDB is not running locally or on free tier
let isDbConnected = false;
let inMemoryChats = [
    { _id: "6704b1234567890123456781", from: "Neha", to: "Priya", msg: "Hey, check out this ChatSphere web app!", created_at: new Date() },
    { _id: "6704b1234567890123456782", from: "Priya", to: "Neha", msg: "Awesome! Full CRUD operations working perfectly.", created_at: new Date() },
    { _id: "6704b1234567890123456783", from: "Aman", to: "Visitor", msg: "Welcome to ChatSphere Live Demo!", created_at: new Date() }
];

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/Whatsapp";

async function main() {
    try {
        await mongoose.connect(MONGO_URL, { serverSelectionTimeoutMS: 3000 });
        isDbConnected = true;
        console.log("MongoDB connection successful!");
    } catch (err) {
        isDbConnected = false;
        console.log("MongoDB not running, running in resilient in-memory mode.");
    }
}

main();

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});

app.get("/chats", async (req, res) => {
    try {
        let chats = isDbConnected ? await Chat.find() : inMemoryChats;
        res.render("index.ejs", { chats });
    } catch (err) {
        res.render("index.ejs", { chats: inMemoryChats });
    }
});

app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

// ******* Create Route ***************
app.post("/chats", async (req, res) => {
    let { from, to, msg } = req.body;
    if (isDbConnected) {
        try {
            let newChat = new Chat({ from, to, msg, created_at: new Date() });
            await newChat.save();
        } catch (err) {
            console.error("Save error:", err);
        }
    } else {
        inMemoryChats.push({
            _id: "chat_" + Date.now(),
            from: from || "Anonymous",
            to: to || "Friend",
            msg: msg || "",
            created_at: new Date()
        });
    }
    res.redirect("/chats");
});

// ******** Edit Route *****
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = null;
    if (isDbConnected) {
        try {
            chat = await Chat.findById(id);
        } catch (err) {}
    }
    if (!chat) {
        chat = inMemoryChats.find(c => String(c._id) === String(id)) || { _id: id, from: "User", to: "User", msg: "" };
    }
    res.render("edit.ejs", { chat });
});

// ************ Update Route */
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    if (isDbConnected) {
        try {
            await Chat.findByIdAndUpdate(id, { msg: newMsg }, { runValidators: true, new: true });
        } catch (err) {}
    } else {
        let chat = inMemoryChats.find(c => String(c._id) === String(id));
        if (chat) chat.msg = newMsg;
    }
    res.redirect("/chats");
});

// *********** Delete Route */
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    if (isDbConnected) {
        try {
            await Chat.findByIdAndDelete(id);
        } catch (err) {}
    } else {
        inMemoryChats = inMemoryChats.filter(c => String(c._id) !== String(id));
    }
    res.redirect("/chats");
});



