import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import BookList from './BookList';
import AddBook from './AddBook';
import BookDetail from './BookDetail';
import HomePage from './HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AllReviews from './AllReviews';
import PrivateRoute from './components/PrivateRoute'; // ✅ Make sure this file exists

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Protected Routes */}
        <Route path="/add-book" element={<PrivateRoute><AddBook /></PrivateRoute>} />
        <Route path="/books" element={<PrivateRoute><BookList /></PrivateRoute>} />
        <Route path="/book/:id" element={<PrivateRoute><BookDetail /></PrivateRoute>} />
        <Route path="/all-reviews" element={<PrivateRoute><AllReviews /></PrivateRoute>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
