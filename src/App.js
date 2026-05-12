import BookingForm from './components/BookingForm';
import './App.css';

export default function App() {
  return (
    <main className="app-shell">
      <div className="app-shell__bg" aria-hidden />
      <header className="brand">
        <img
          className="brand__logo"
          src={`${process.env.PUBLIC_URL}/assets/icons_assets/Logo.svg`}
          alt=""
          width={220}
          height={48}
        />
        <p className="brand__tagline">Chicago · cuisine méditerranéenne familiale</p>
      </header>
      <BookingForm />
      <footer className="brand-footer">
        © {new Date().getFullYear()} Little Lemon · 123 Mediterranean Ave, Chicago
      </footer>
    </main>
  );
}
