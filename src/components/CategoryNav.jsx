export default function CategoryNav({ categories, activeCategory, onChange }) {
  return (
    <nav className="category-nav" aria-label="Menu categories">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`category-chip ${activeCategory === category ? 'active' : ''}`}
          onClick={() => onChange(category)}
          aria-pressed={activeCategory === category}
        >
          {category}
        </button>
      ))}
    </nav>
  );
}
