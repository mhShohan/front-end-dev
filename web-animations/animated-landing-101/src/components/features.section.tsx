// components/features-section.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Shield, Rocket, Code } from 'lucide-react';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Blazing fast performance with optimized animations and lazy loading',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with 99.9% uptime guarantee',
  },
  {
    icon: Rocket,
    title: 'Scalable',
    description: 'Grow from startup to enterprise without changing platforms',
  },
  {
    icon: Code,
    title: 'Developer Friendly',
    description: 'Clean APIs, comprehensive docs, and amazing developer experience',
  },
];

export function FeaturesSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              y: 100,
              opacity: 0,
              rotationY: 15,
            },
            {
              y: 0,
              opacity: 1,
              rotationY: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
              },
              delay: index * 0.2,
            }
          );
        }
      });

      // Section title animation
      gsap.fromTo(
        '.section-title',
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: '.section-title',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className='py-20 bg-slate-50'>
      <div className='container mx-auto px-6'>
        <h2 className='section-title text-4xl md:text-5xl font-bold text-center text-slate-900 mb-4'>
          Amazing Features
        </h2>
        <p className='text-xl text-slate-600 text-center mb-16 max-w-2xl mx-auto'>
          Everything you need to build modern, scalable web applications
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, index) => (
            <Card
              key={index}
              ref={addToRefs}
              className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white cursor-pointer'
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  y: -10,
                  duration: 0.3,
                  ease: 'power2.out',
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  y: 0,
                  duration: 0.3,
                  ease: 'power2.out',
                });
              }}
            >
              <CardContent className='p-6 text-center'>
                <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <feature.icon className='h-8 w-8 text-blue-600' />
                </div>
                <h3 className='text-xl font-semibold text-slate-900 mb-2'>{feature.title}</h3>
                <p className='text-slate-600'>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
