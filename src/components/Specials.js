import './Specials.css';

const DISHES = [
  {
    title: 'Greek salad',
    price: '$12.99',
    description:
      'La célèbre salade grecque de feta croquante, olives parfumées et légumes frais du marché, relevée à l’ail rôti et au romarin.',
    image: 'greek salad.jpg',
    alt: 'Bol de salade grecque',
  },
  {
    title: 'Bruschetta',
    price: '$ 5.99',
    description:
      'Notre pain grillé maison garni de tomates cerises confites, ail et origan — un classique italien revisité.',
    image: 'restauranfood.jpg',
    alt: 'Bruschetta sur ardoise',
  },
  {
    title: 'Lemon Dessert',
    price: '$ 5.00',
    description:
      'Recette de famille : crème onctueuse, biscuit croquant, zeste de citron, sourire garanti.',
    image: 'lemon dessert.jpg',
    alt: 'Dessert au citron',
  },
];

function DeliveryIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
      <circle cx="6" cy="17" r="2.5" />
      <circle cx="17" cy="17" r="2.5" />
      <path d="M3 13V8h7l2 4h5l2 5h-2M10 12V8" />
    </svg>
  );
}

export default function Specials() {
  return (
    <section className="specials" id="menu" aria-labelledby="specials-title">
      <div className="specials__inner">
        <header className="specials__head">
          <h2 className="specials__title" id="specials-title">
            Specials
          </h2>
          <a className="btn btn--accent btn--compact" href="#menu">
            Online Menu
          </a>
        </header>
        <ul className="specials__grid">
          {DISHES.map((d) => (
            <li key={d.title}>
              <article className="dish-card">
                <img
                  className="dish-card__image"
                  src={`${process.env.PUBLIC_URL}/assets/icons_assets/${encodeURIComponent(d.image)}`}
                  alt={d.alt}
                  width={400}
                  height={220}
                  loading="lazy"
                  decoding="async"
                />
                <div className="dish-card__body">
                  <div className="dish-card__row">
                    <h3 className="dish-card__name">{d.title}</h3>
                    <p className="dish-card__price">{d.price}</p>
                  </div>
                  <p className="dish-card__text">{d.description}</p>
                  <a className="dish-card__delivery" href="#order">
                    <span>Order a delivery</span>
                    <DeliveryIcon />
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
