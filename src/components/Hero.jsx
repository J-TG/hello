import { useRef } from 'react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import { useGSAP } from 'gsap/react';

gsap.registerPlugin(SplitText);

export default function Hero({ reducedMotion }) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (reducedMotion) {
        gsap.set('.hero-reveal', { opacity: 1, y: 0 });
        return;
      }

      const split = new SplitText('.hero-title', { type: 'lines', linesClass: 'line-mask' });
      gsap.set(split.lines, { yPercent: 120 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.to('.hero-wash', { opacity: 0.95, duration: 1.1 })
        .to(split.lines, { yPercent: 0, duration: 1, stagger: 0.12 }, 0.12)
        .fromTo('.hero-reveal', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.45)
        .fromTo('.hero-orb', { y: 40, opacity: 0 }, { y: 0, opacity: 0.6, duration: 1.1 }, 0.3);

      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <header className="hero" ref={root}>
      <div className="hero-wash" aria-hidden="true" />
      <div className="hero-orb" aria-hidden="true" />
      <p className="eyebrow hero-reveal">Downtown Test Kitchen · Since 2018</p>
      <h1 className="hero-title">EMBER & BRINE</h1>
      <p className="hero-tag hero-reveal">
        A moody menu exploration of open-fire sandwiches, lacquered wings, and modern comfort signatures.
      </p>
      <a href="#menu" className="cta hero-reveal">Explore Menu</a>
    </header>
  );
}
