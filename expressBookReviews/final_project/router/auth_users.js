const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
  let filteredUser = users.filter((user)=>user.username===username);
  if(filteredUser.length>0)
  return true;
  return false;
}


const authenticatedUser = (username,password)=>{ 
  let filteredUser=users.filter((user)=>user.username===username && user.password===password);
  if(filteredUser.length>0){
    return true;
  }
  return false;
}


regd_users.post("/login", (req,res) => {
  const {username,password} = req.body;
  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }
  if(authenticatedUser(username,password)){
    let accessToken = jwt.sign({
      data:password
    },'access',{expiresIn: 60 * 60 });
    req.session.authorization = {
      accessToken,username
    }
    return res.status(200).send('User successfully logged in');
  }
  else{
    res.status(208).json({message:'Invalid login credentials'});
  }
});


regd_users.put("/auth/review/:isbn", (req, res) => {
  const username = req.session.authorization['username'];
  const isbn = req.params.isbn;
  let a=0;
  Object.keys(books).forEach(key=>{
    if(key == isbn){
      let userReview = books[isbn].reviews[username];
      if(userReview && userReview.length>0){
        a=1;
      }
      else{
        a=2;
      }
      books[isbn].reviews[username]=req.body.review;
    }
  });
  if(a==1)
  res.send(`The review for the book ${books[isbn].title} has been updated successfully !`);
  else if(a==2)
  res.send(`The review for the book ${books[isbn].title} added successfully !`);
  else
  res.send(`Couldn't find the book with isbn ${isbn}`);
});

regd_users.delete("/auth/review/:isbn",(req,res)=>{
  const username = req.session.authorization['username'];
  // console.log(books[req.params.isbn]);
  delete books[req.params.isbn].reviews[username];
  // console.log(books[req.params.isbn]);
  res.send('The review deleted successfully');

});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
