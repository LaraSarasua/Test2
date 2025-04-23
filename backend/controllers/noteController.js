const noteService = require('../services/noteServices');

exports.getAllNotes = async (req, res) => {
  try {
    const category = req.query.category;
    const notes = await noteService.getAll();
    res.json(notes);
  } catch (err) {
    res.status(500).send(err.message);
  }
  
};

exports.createNote = async (req, res) => {
  const note = await noteService.create(req.body);
  res.status(201).json(note);
};

exports.updateNote = async (req, res) => {
  try {
    const {title, content, category} = req.body;
    const note = await noteService.update(req.params.id, {title, content, category});
    res.json(note);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

exports.deleteNote = async (req, res) => {
  try {
    await noteService.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(404).send(err.message);
  }
};

exports.archiveNote = async (req, res) => {
  try {
    const note = await noteService.toggleArchive(req.params.id);
    res.json(note);
  } catch (err) {
    res.status(404).send(err.message);
  }
};
