'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

export function HeroSection() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const floatingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main title animation
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power3.out' }
      );

      // Button animation
      gsap.fromTo(
        buttonRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: 'back.out(1.7)' }
      );

      // Floating elements animation
      gsap.to(floatingRef.current, {
        y: 20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Background particles animation
      const particles = document.querySelectorAll('.particle');
      particles.forEach((particle, index) => {
        gsap.to(particle, {
          x: Math.random() * 100 - 50,
          y: Math.random() * 100 - 50,
          rotation: Math.random() * 360,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.1,
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden'
    >
      {/* Animated Background Particles */}
      <div className='absolute inset-0'>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className='particle absolute w-2 h-2 bg-purple-500/30 rounded-full'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className='container mx-auto px-6 h-screen flex items-center justify-center relative z-10'>
        <div className='text-center'>
          <h1 ref={titleRef} className='text-6xl md:text-8xl font-bold text-white mb-6'>
            Welcome to{' '}
            <span className='bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'>
              Future
            </span>
          </h1>

          <p ref={subtitleRef} className='text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto'>
            Build amazing digital experiences with cutting-edge technology and stunning animations
          </p>

          <div ref={buttonRef} className='flex gap-4 justify-center'>
            <Button
              size='lg'
              className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg'
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.05,
                  duration: 0.3,
                  ease: 'power2.out',
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  duration: 0.3,
                  ease: 'power2.out',
                });
              }}
            >
              Get Started <ArrowRight className='ml-2 h-5 w-5' />
            </Button>

            <Button
              size='lg'
              variant='outline'
              className='border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3 text-lg'
            >
              <Play className='mr-2 h-5 w-5' />
              Watch Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div ref={floatingRef} className='absolute bottom-10 left-1/2 transform -translate-x-1/2'>
        <div className='w-6 h-10 border-2 border-white rounded-full flex justify-center'>
          <div className='w-1 h-3 bg-white rounded-full mt-2 animate-bounce' />
        </div>
      </div>
    </section>
  );
}
