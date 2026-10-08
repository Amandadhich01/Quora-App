# 💬 ChatSphere – WhatsApp CRUD Clone

ChatSphere is a simple WhatsApp-inspired chat web application built using Node.js, Express, MongoDB, and EJS.  
It allows users to create, view, and edit chat messages using RESTful CRUD operations.  
This project is beginner-friendly and focuses on backend fundamentals and database integration.

> 🚀 **Live Demo Website**: [https://quora-app-oic0.onrender.com](https://quora-app-oic0.onrender.com)  
> *(Directly accessible on web without running local server)*

---

## 🚀 Features
- Create new chat messages  
- View all chats  
- Edit existing chat messages  
- MongoDB database integration using Mongoose  
- RESTful routing with Express  
- Server-side rendering with EJS  
- Method Override for PUT requests  

## 🛠 Tech Stack
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- EJS  
- Method-Override  
- HTML & CSS  

## 📁 Project Structure
ChatSphere/
models/
chat.js
views/
index.ejs
new.ejs
edit.ejs
public/
static files
index.js
package.json
README.md

## ⚙️ Installation & Setup
1. Clone the repository  
git clone https://github.com/your-username/chatsphere.git  

2. Go to project folder  
cd chatsphere  

3. Install dependencies  
npm install  

4. Start MongoDB  
mongod  

5. Run the server  
node index.js  

6. Open in browser  
http://localhost:8080/chats  

## 🧪 CRUD Routes
GET /chats – View all chats  
GET /chats/new – New chat form  
POST /chats – Create chat  
GET /chats/:id/edit – Edit chat  
PUT /chats/:id – Update chat  

## 🎯 Learning Outcomes
- Express routing and middleware  
- MongoDB CRUD operations  
- Mongoose schemas and models  
- RESTful API design  
- EJS templating  
- Form handling and HTTP methods  

## 🌱 Future Improvements
- User authentication  
- Real-time chat using Socket.io  
- UI improvements with Bootstrap or Tailwind  
- Better timestamp formatting  

## 📜 License
MIT License

## 👨‍💻 Author
Anurag  
Engineering Student | Full-Stack Web Development Learner 
