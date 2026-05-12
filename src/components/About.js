import './About.css';

export default function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="about__inner">
        <div className="about__copy">
          <h2 className="about__title" id="about-title">
            Little Lemon
          </h2>
          <p className="about__city">Chicago</p>
          <p className="about__text">
            Restaurant familial fondé par Mario et Adrian, Little Lemon est ancré dans les
            traditions méditerranéennes. Nous travaillons des produits frais et de saison
            pour proposer une cuisine généreuse, accessible et résolument moderne.
          </p>
          <p className="about__text">
            Notre équipe — du chef au sommelier — vous accueille du mardi au dimanche, midi
            et soir, dans une salle chaleureuse au cœur de Chicago.
          </p>
        </div>
        <div className="about__gallery" aria-hidden>
          <img
            className="about__image about__image--front"
            src={`${process.env.PUBLIC_URL}/assets/icons_assets/Mario and Adrian A.jpg`}
            alt=""
            width={320}
            height={400}
            loading="lazy"
            decoding="async"
          />
          <img
            className="about__image about__image--back"
            src={`${process.env.PUBLIC_URL}/assets/icons_assets/Mario and Adrian b.jpg`}
            alt=""
            width={320}
            height={400}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
