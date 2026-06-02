import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import ListProprietario from './components/ListProprietario';
import AddProprietario from './components/AddProprietario';
import ReadProprietario from './components/ReadProprietario';
import UpdateProprietario from './components/UpdateProprietario';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListProprietario />} />
        <Route path="/addProprietario" element={<AddProprietario />} />
        <Route path="readProprietario/:id" element={<ReadProprietario />} />
        <Route path="/updateProprietario/:id" element={<UpdateProprietario />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App