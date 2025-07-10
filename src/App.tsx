import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className="p-6 text-xl">✅ It works!</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;