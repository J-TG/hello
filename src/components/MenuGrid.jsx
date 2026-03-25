import { useState } from 'react';
import gsap from 'gsap';
import Flip from 'gsap/Flip';
import { useGSAP } from 'gsap/react';
import MenuCard from './MenuCard';

gsap.registerPlugin(Flip);

export default function MenuGrid({ activeCategory, items, reducedMotion }) {
  const [visibleItems, setVisibleItems] = useState(items.filter((item) => item.category === activeCategory));

  useGSAP(
    ({ contextSafe }) => {
      const nextItems = items.filter((item) => item.category === activeCategory);

      if (reducedMotion) {
        setVisibleItems(nextItems);
        return;
      }

      const animateSwap = contextSafe(() => {
        const state = Flip.getState('.menu-card');
        setVisibleItems(nextItems);

        requestAnimationFrame(() => {
          Flip.from(state, {
            duration: 0.72,
            ease: 'power3.inOut',
            absolute: true,
            stagger: 0.04,
            onEnter: (els) => gsap.fromTo(els, { y: 28, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, stagger: 0.05 }),
            onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.92, duration: 0.25 })
          });
        });
      });

      animateSwap();
    },
    { dependencies: [activeCategory] }
  );

  return (
    <section className="menu-grid-wrap section-shell" id="menu">
      <div className="menu-grid">
        {visibleItems.map((item) => (
          <MenuCard key={item.id} item={item} reducedMotion={reducedMotion} />
        ))}
      </div>
    </section>
  );
}
