'use client'
import React, { useRef, useEffect, useState } from 'react';

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
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  let particles: Particle[] = [];

  useEffect(() => {
    setMouseX(window.innerWidth / 2);
    setMouseY(window.innerHeight / 2);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    headerRef.current = document.querySelector('header');

    if (!canvas || !ctx || !headerRef.current) {
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
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 3 + 1;
        this.baseSize = this.size;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        const headerRect = headerRef.current!.getBoundingClientRect();
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

        if (this.x < 0 || this.x > canvas!.width || this.y < 0 || this.y > canvas!.height) {
          this.x = Math.random() * canvas!.width;
          this.y = Math.random() * canvas!.height;
        }
      }

      draw() {
        ctx!.beginPath();
        const gradient = ctx!.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
        ctx!.fillStyle = gradient;
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createParticles();
      }
    };

    const createParticles = () => {
      if (!canvas) return;
      particles = [];
      const numberOfParticles = (canvas.height * canvas.width) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new ParticleClass());
      }
    };

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const parallaxX = (mouseX / canvas.width - 0.5) * 20;
      const parallaxY = (mouseY / canvas.height - 0.5) * 20;

      if (headerRef.current) {
        headerRef.current.style.transform = `translate(-50%, 0) translate(${parallaxX}px, ${parallaxY}px)`;
      }

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      setMouseX(event.clientX);
      setMouseY(event.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();
    createParticles();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 -z-10"></canvas>;
};

export default BackgroundCanvas;
