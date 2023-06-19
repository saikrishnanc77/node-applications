const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const axios = require('axios');

const public_users = express.Router();



public_users.post("/register", (req,res) => {
  const { username, password }  = req.body;
  if(!username || ! password){
    res.send('Invalid username or password');
  }
  let filteredUsers = (users.filter((user)=> user.username===username && user.password===password));
  console.log(filteredUsers);
  if(filteredUsers.length>0){
    res.send('The user already exists');
  }
  else{
    users.push({"username":username,"password":password});
    res.send(`The user with username ${username} added successfully`);
  }
});

const getBooks = () => {
  return new Promise((resolve, reject)=>{
    resolve(books);
  });
}




// Get the book list available in the shop
public_users.get('/',async (req, res) => {
  // //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  // const allBooks = fetchBooks();
  getBooks().then(
    (book) => res.send(JSON.stringify(book,null,4)),
    (err) => res.send('Access Denied!')
  )

  // res.send(JSON.stringify(books,null,4));
  
});

const getBookDetails = (isbn) =>{
  return new Promise((resolve,reject)=>{
    let book=books[isbn];
    if(book){
      resolve(book);
    }
    else{
      reject("Couldn't find the requested book!");
    }
  });
}



// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  getBookDetails(isbn).then(
    (book) => res.send(JSON.stringify(book,null,4)),
    (err) => res.send(err)
  );

  // let bookDetails=books[req.params.isbn];
  // if(bookDetails){
  //   res.send(JSON.stringify(bookDetails));
  // }
  // else{
  //   res.send('The requested book not found');
  // }
 });

const getBookByAuthor = (author) => {
  return new Promise((resolve,reject)=>{
    let reqBooks = Object.values(books).filter((book)=>book.author===author);
  
    if(reqBooks){
      resolve(reqBooks);
    }
    else{
      reject(`Couldn't find book with the author ${author}`);
    }
  });
}
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  let author = req.params.author;
  getBookByAuthor(author).then(
    (book)=> res.send(JSON.stringify(book,null,4)),
    (err) => res.send(err)
  )
  // let reqBooks = Object.values(books).filter((book)=>book.author===author);
  // res.send(JSON.stringify(reqBooks,null,4));


});

const getBookByTitle = (title) => {
  return new Promise((resolve,reject)=>{
    let reqBooks = Object.values(books).filter((book)=>book.title===title);
    if(reqBooks){
      resolve(reqBooks);
    }
    else{
      reject(`Couldn't find book with the title ${title}`);
    }
  });
}

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let title = req.params.title;
  getBookByTitle(title).then(
    (book)=>res.send(JSON.stringify(book,null,4)),
    (err)=>res.send(err)
  )
  // let reqBooks = Object.values(books).filter((book)=>book.title===title);
  // res.send(JSON.stringify(reqBooks,null,4));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  let isbn =  req.params.isbn;
  let review = books[isbn].review;
  res.send(`Review for the book with isbn ${isbn} : ${review}`);
});

module.exports.general = public_users;
