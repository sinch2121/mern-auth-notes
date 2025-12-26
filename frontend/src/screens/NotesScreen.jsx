import { useEffect, useState } from 'react'
import axios from 'axios'

const NotesScreen = () => {
  const [notes, setNotes] = useState([])
  const [content, setContent] = useState('')

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get('/api/notes', {
        withCredentials: true,
      })
      setNotes(data)
    } catch (error) {
      console.error(error)
    }
  }

  const addNote = async () => {
    if (!content.trim()) return
    try {
      await axios.post(
        '/api/notes',
        { content },
        { withCredentials: true }
      )
      setContent('')
      fetchNotes()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: 'auto' }}>
      <h2>🔐 Secure Notes</h2>

      <textarea
        rows="4"
        placeholder="Write a secure note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: '100%', padding: '10px' }}
      />

      <button
        onClick={addNote}
        style={{
          marginTop: '10px',
          padding: '10px',
          background: '#111',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        Add Note
      </button>

      <hr />

      {notes.length === 0 && <p>No notes yet.</p>}

      {notes.map((note) => (
        <div
          key={note._id}
          style={{
            background: '#f4f4f4',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
          }}
        >
          {note.content}
        </div>
      ))}
    </div>
  )
}

export default NotesScreen
