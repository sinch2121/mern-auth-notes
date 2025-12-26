import { useEffect, useState } from 'react';
import { fetchNotes, createNote, deleteNote } from '../services/noteService';

const Dashboard = ({ user }) => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const token = user.token;

  const loadNotes = async () => {
    const data = await fetchNotes(token);
    setNotes(data);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    await createNote({ title, content }, token);
    setTitle('');
    setContent('');
    loadNotes();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🔐 Secure Notes</h2>

      <form onSubmit={submitHandler}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Your secure note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <br />
        <button type="submit">Save Note</button>
      </form>

      <hr />

      {notes.map((note) => (
        <div key={note._id} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem' }}>
          <h4>{note.title}</h4>
          <p>{note.content}</p>
          <button onClick={() => deleteNote(note._id, token).then(loadNotes)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
