import BlogList from '../models/bloglist.js';

const initialNotes = [
  {
    content: 'HTML is easy',
    date: new Date(),
    important: false,
  },
  {
    content: 'Browser can execute only Javascript',
    date: new Date(),
    important: true,
  },
];

//该函数可用于创建不属于数据库中任何便笺对象的数据库对象 ID
const nonExistingId = async () => {
  const note = new BlogList({
    content: 'willremovethissoon',
    date: new Date(),
  });
  await note.save();
  await note.remove();

  return note._id.toString();
};

//该函数可用于检查数据库中存储的便笺。 包含初始数据库状态的 initialNotes 数组也在模块中
const notesInDb = async () => {
  const notes = await BlogList.find({});
  return notes.map((note) => note.toJSON());
};

export default {
  initialNotes,
  nonExistingId,
  notesInDb,
};
