const express = require('express');
const router = express.Router();
const c = require('../controllers/noteController');

router.get('/', c.getAllNotes);
router.post('/', c.createNote);
router.put('/:id', c.updateNote);
router.delete('/:id', c.deleteNote);
router.patch('/:id/archive', c.archiveNote);

module.exports = router;
