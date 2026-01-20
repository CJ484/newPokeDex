import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Footer, Languagelist } from './Components';
import HomePage from './pages/homePage';
import NotFoundPage from './pages/notFoundPage';
import './styles/index.css';
import './styles/styles.scss';
import './styles/variables.css';

export default function Layout() {
  return (
    <>
      <main className="body">
        <Languagelist />
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </main>
    </>
  );
}

