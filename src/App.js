import Nav from './components/Nav';
import Hero from './components/Hero';
import Specials from './components/Specials';
import Testimonials from './components/Testimonials';
import About from './components/About';
import BookingPage from './components/BookingPage';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Specials />
        <Testimonials />
        <About />
        <BookingPage />
      </main>
      <Footer />
    </>
  );
}
