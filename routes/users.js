const express = require('express');
const Datastore = require('nedb');
const router = express.Router();

const users = new Datastore({ filename: './db/users.db', autoload: true });

// User registration
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  // TODO: Add input validation
  const newUser = {
    username: req.body.username,
    password: req.body.password,
    goals: [],
    achievements: []
  };

  users.insert(newUser, (err, user) => {
    if (err) {
      // TODO: Add proper error handling
      console.error(err);
      return res.redirect('/users/register');
    }
    req.session.user = user;
    res.redirect('/users/dashboard');
  });
});

// User login
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  // TODO: Add input validation
  users.findOne({ username: req.body.username }, (err, user) => {
    if (err || !user || user.password !== req.body.password) {
      // TODO: Add proper error handling
      return res.redirect('/users/login');
    }
    req.session.user = user;
    res.redirect('/users/dashboard');
  });
});

// User dashboard
router.get('/dashboard', (req, res) => {
  // TODO: Add user authentication middleware
  res.render('dashboard', { user: req.session.user });
});

// User goals
router.get('/goals', (req, res) => {
  // TODO: Add user authentication middleware
  res.render('goals', { user: req.session.user });
});

router.post('/goals', (req, res) => {
  // TODO: Add user authentication middleware and input validation
  // TODO: Implement add, remove, and modify functionality for goals

  // Redirect to the goals page after updating the goals
  res.redirect('/users/goals');
});

// User achievements
router.get('/achievements', (req, res) => {
  // TODO: Add user authentication middleware
  res.render('achievements', { user: req.session.user });
});

router.post('/achievements', (req, res) => {
  // TODO: Add user authentication middleware and input validation
  // TODO: Implement record and review functionality for achievements

  // Redirect to the achievements page after updating the achievements
  res.redirect('/users/achievements');
});

module.exports = router;
