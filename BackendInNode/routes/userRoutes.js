// routes/userRoutes.js
const express = require('express');
const {
  insertUser,
  deleteUser,
  selectUser,
  updateUser,
  getAllUsers,
} = require('../controllers/userController');

const router = express.Router();

router.post('/insert', insertUser);
router.delete('/delete/:id', deleteUser);
router.get('/select/:id', selectUser);
router.put('/update/:id', updateUser);
router.get('/all', getAllUsers);

module.exports = router;
