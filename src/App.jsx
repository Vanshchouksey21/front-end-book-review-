import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import BookList from './BookList';
import AddBook from './AddBook';
import BookDetail from './BookDetail';
import HomePage from './HomePage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<HomePage />} /> {/* Home page */}
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/books" element={<BookList />} />
    <Route path="/add-book" element={<AddBook />} />
    <Route path="/book/:id" element={<BookDetail />} />
</Routes>
    </BrowserRouter>
  );
}

export default App;
