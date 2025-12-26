import axios from 'axios';

const API_URL = '/api/notes';

export const fetchNotes = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createNote = async (noteData, token) => {
  const res = await axios.post(API_URL, noteData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteNote = async (id, token) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
