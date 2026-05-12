import './Testimonials.css';

const REVIEWS = [
  {
    id: '1',
    name: 'Sara Lopez',
    rating: 5,
    quote: 'Accueil chaleureux et bruschetta divine. Vivement la prochaine fois !',
    initials: 'SL',
  },
  {
    id: '2',
    name: 'Marc Dupont',
    rating: 5,
    quote: 'Parfait pour un dîner en couple. Service rapide malgré l’affluence.',
    initials: 'MD',
  },
  {
    id: '3',
    name: 'Lina Kim',
    rating: 4,
    quote: 'J’ai adoré la salade grecque et le dessert au citron. On reviendra.',
    initials: 'LK',
  },
  {
    id: '4',
    name: 'Ahmed Rahmani',
    rating: 5,
    quote: 'Excellent rapport qualité-prix à Chicago. Réservation en ligne très simple.',
    initials: 'AR',
  },
];

function Stars({ count }) {
  return (
    <p className="testimonial-card__stars" aria-label={`${count} sur 5 étoiles`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden className={i < count ? 'on' : 'off'}>
          ★
        </span>
      ))}
    </p>
  );
}

export default function Testimonials() {
  return (
    <section className="testimonials" aria-labelledby="testimonials-title">
      <div className="testimonials__inner">
        <h2 className="testimonials__title" id="testimonials-title">
          Testimonials
        </h2>
        <ul className="testimonials__grid">
          {REVIEWS.map((r) => (
            <li key={r.id}>
              <article className="testimonial-card" aria-labelledby={`tcard-${r.id}`}>
                <Stars count={r.rating} />
                <div className="testimonial-card__user">
                  <span className="testimonial-card__avatar" aria-hidden>
                    {r.initials}
                  </span>
                  <h3 className="testimonial-card__name" id={`tcard-${r.id}`}>
                    {r.name}
                  </h3>
                </div>
                <blockquote className="testimonial-card__quote">
                  <p>{`« ${r.quote} »`}</p>
                </blockquote>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
