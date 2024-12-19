import { Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './Pages/MainPage';
import NewsPage from './Pages/NewsPage';


function App() {

  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/news' element={<NewsPage />} />
    </Routes>
  )
}

export default App
