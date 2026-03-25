import { useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import { useGSAP } from 'gsap/react';
import Hero from './components/Hero';
import CategoryNav from './components/CategoryNav';
import MenuGrid from './components/MenuGrid';
import FeaturedSpotlight from './components/FeaturedSpotlight';
import FooterCTA from './components/FooterCTA';
import { categories, featuredItem, menuItems } from './data/menuData';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

function usePrefersReducedMotion() {
  return useMemo(() => window.matchMedia(reducedMotionQuery).matches, []);
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const reducedMotion = usePrefersReducedMotion();
  const root = useRef(null);

  useGSAP(
    () => {
      if (reducedMotion) return;

      const sections = gsap.utils.toArray('.section-shell');
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 78%'
            }
          }
        );
      });

      const split = new SplitText('.section-heading', { type: 'lines' });
      gsap.fromTo(
        split.lines,
        { yPercent: 100 },
        {
          yPercent: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.section-heading',
            start: 'top 80%'
          }
        }
      );

      gsap.to('.hero-orb', {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.7
        }
      });

      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <div className="app" ref={root}>
      <Hero reducedMotion={reducedMotion} />

      <main>
        <section className="section-shell menu-shell" aria-label="Interactive menu">
          <div className="menu-shell-header">
            <p className="eyebrow">Menu</p>
            <h2 className="section-heading">Taste in motion</h2>
          </div>
          <CategoryNav categories={categories} activeCategory={activeCategory} onChange={setActiveCategory} />
          <MenuGrid activeCategory={activeCategory} items={menuItems} reducedMotion={reducedMotion} />
        </section>

        <FeaturedSpotlight featured={featuredItem} />
      </main>

      <FooterCTA />
    </div>
  );
}
