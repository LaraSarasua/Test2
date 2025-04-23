module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    category: DataTypes.STRING,
    isArchived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  });
  return Note;
};
