// components/stats-section.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const stats = [
  { number: '99.9%', label: 'Uptime' },
  { number: '500K+', label: 'Users' },
  { number: '50+', label: 'Countries' },
  { number: '24/7', label: 'Support' },
];

export function StatsSection() {
  const sectionRef = useRef(null);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate numbers counting up
      numbersRef.current.forEach((numberEl, index) => {
        if (numberEl) {
          const target = numberEl.textContent;
          if (target) {
            gsap.fromTo(
              numberEl,
              { textContent: '0', opacity: 0 },
              {
                textContent: target,
                opacity: 1,
                duration: 2,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: numberEl,
                  start: 'top 80%',
                  toggleActions: 'play none none reverse',
                },
                delay: index * 0.2,
                onUpdate: function () {
                  numberEl.textContent =
                    Math.floor(parseInt(this.targets()[0].textContent)).toString() +
                    target.replace(/[0-9]/g, '');
                },
              }
            );
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLSpanElement | null) => {
    if (el && !numbersRef.current.includes(el)) {
      numbersRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className='py-20 bg-gradient-to-r from-blue-600 to-purple-700'>
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
          {stats.map((stat, index) => (
            <div key={index} className='text-center text-white'>
              <span ref={addToRefs} className='block text-4xl md:text-6xl font-bold mb-2'>
                {stat.number}
              </span>
              <span className='text-xl opacity-90'>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
