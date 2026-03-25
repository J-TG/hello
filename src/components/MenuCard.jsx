import { useRef } from 'react';
import gsap from 'gsap';

export default function MenuCard({ item, reducedMotion }) {
  const cardRef = useRef(null);

  const onMove = (event) => {
    if (reducedMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    gsap.to(cardRef.current, {
      rotateY: x * 5,
      rotateX: y * -4,
      transformPerspective: 900,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const reset = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.45, ease: 'power3.out' });
  };

  return (
    <article
      ref={cardRef}
      className="menu-card"
      onPointerMove={onMove}
      onPointerLeave={reset}
      onBlur={reset}
      tabIndex={0}
      aria-label={`${item.name} ${item.price}`}
    >
      <div className="card-top">
        <h3>{item.name}</h3>
        <span className="price">{item.price}</span>
      </div>
      <p>{item.description}</p>
      {item.badge && <span className="badge">{item.badge}</span>}
    </article>
  );
}
