export default function FeaturedSpotlight({ featured }) {
  return (
    <section className="featured section-shell" aria-labelledby="featured-title">
      <p className="eyebrow">Featured Experience</p>
      <div className="featured-grid">
        <h2 id="featured-title">{featured.title}</h2>
        <p className="featured-sub">{featured.subtitle}</p>
        <p>{featured.description}</p>
        <strong className="featured-price">{featured.price}</strong>
      </div>
    </section>
  );
}
