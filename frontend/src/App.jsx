import { Routes, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import NotesScreen from './screens/NotesScreen';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Header />
      <ToastContainer />
      <Container className="py-3">
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/" element={<NotesScreen />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
