'use client'
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  baseSize: number;
  speedX: number;
  speedY: number;
  update: () => void;
  draw: () => void;
}

const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  let particles: Particle[] = [];
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const header = headerRef.current;

    // Check if canvas, context, and header are available before proceeding
    if (!canvas || !ctx || !header) {
      console.error('Canvas, context, or header is null');
      return;
    }

    class ParticleClass implements Particle {
      x: number;
      y: number;
      size: number;
      baseSize: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.baseSize = this.size;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        const headerRect = header.getBoundingClientRect();
        if (
          this.x > headerRect.left &&
          this.x < headerRect.right &&
          this.y > headerRect.top &&
          this.y < headerRect.bottom
        ) {
          const dx = this.x - (headerRect.left + headerRect.width / 2);
          const dy = this.y - (headerRect.top + headerRect.height / 2);
          const distance = Math.sqrt(dx * dx + dy * dy);
          const force = Math.min(1, (50 - distance) / 50);

          this.speedX += dx * 0.0005 * force;
          this.speedY += dy * 0.0005 * force;
        }

        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const angle = Math.atan2(dy, dx);
          const force = (150 - distance) / 150;
          this.x += Math.cos(angle) * force * 3;
          this.y += Math.sin(angle) * force * 3;
          this.size = this.baseSize * (1 + force);
        }

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }
      }

      draw() {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function init() {
      if (!canvas || !ctx) return;  // Check if canvas or context is null

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: 400 }, () => new ParticleClass());
    }

    function animate() {
      if (!canvas || !ctx) return;  // Check if canvas or context is null

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const parallaxX = (mouseX / canvas.width - 0.5) * 20;
      const parallaxY = (mouseY / canvas.height - 0.5) * 20;

      if (header) {
        header.style.transform = `translate(-50%, 0) translate(${parallaxX}px, ${parallaxY}px)`;
      }

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    window.addEventListener('resize', init);
    init();
    animate();

    return () => {
      window.removeEventListener('mousemove', () => {});
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />
    </div>
  );
};

export default BackgroundCanvas;
