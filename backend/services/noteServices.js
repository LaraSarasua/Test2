const { Note } = require('../models');

exports.getAll = async () => Note.findAll({ order: [['createdAt','DESC']] });
exports.create = async data => Note.create(data);
exports.update = async (id, data) => {
  const note = await Note.findByPk(id);
  if (!note) throw new Error('Note not found');
  return await note.update(data);
};
exports.delete = async id => {
  const deleted = await Note.destroy({ where: { id } });
  if (!deleted) throw new Error('Note not found');
};
exports.toggleArchive = async id => {
  const note = await Note.findByPk(id);
  if (!note) throw new Error('Note not found');
  note.isArchived = !note.isArchived;
  await note.save();
  return note;
};
