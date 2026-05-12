import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero__inner">
        <div className="hero__copy">
          <h1 className="hero__title" id="hero-title">
            Little Lemon
          </h1>
          <p className="hero__city">Chicago</p>
          <p className="hero__lead">
            Nous sommes un restaurant méditerranéen familial, axé sur les recettes
            traditionnelles servies avec une touche moderne.
          </p>
          <a className="btn btn--accent" href="#reservations">
            Reserve a table
          </a>
        </div>
        <figure className="hero__figure">
          <img
            src={`${process.env.PUBLIC_URL}/assets/icons_assets/restauranfood.jpg`}
            alt="Assortiment de bruschetta servi par un chef du Little Lemon"
            width={440}
            height={520}
            loading="eager"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}
