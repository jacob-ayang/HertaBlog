import React, { useEffect, useRef } from 'react';

const SimulatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Canvas Setup
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Mouse Tracking for Spotlight CSS Variables
    const handleMouseMove = (e: MouseEvent) => {
      // Update CSS variables on the document root
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Particle System
    interface Hexagon {
      x: number;
      y: number;
      size: number;
      opacity: number;
      speed: number;
    }

    const hexagons: Hexagon[] = [];
    const maxHexagons = 35;

    for (let i = 0; i < maxHexagons; i++) {
      hexagons.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 40 + 10,
        opacity: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.4 + 0.1
      });
    }

    const drawHexagon = (x: number, y: number, size: number, opacity: number) => {
      ctx.beginPath();
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = '#a855f7'; 
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        const angle = 2 * Math.PI / 6 * i;
        const x_i = x + size * Math.cos(angle);
        const y_i = y + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(x_i, y_i);
        else ctx.lineTo(x_i, y_i);
      }
      ctx.closePath();
      ctx.stroke();
    };

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Deep Space Gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#0f0518');
      gradient.addColorStop(1, '#24123a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Grid Overlay (Subtle)
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for(let x=0; x<width; x+=50) { ctx.moveTo(x,0); ctx.lineTo(x,height); }
      for(let y=0; y<height; y+=50) { ctx.moveTo(0,y); ctx.lineTo(width,y); }
      ctx.stroke();

      hexagons.forEach(hex => {
        hex.y -= hex.speed;
        if (hex.y + hex.size < 0) {
          hex.y = height + hex.size;
          hex.x = Math.random() * width;
        }
        drawHexagon(hex.x, hex.y, hex.size, hex.opacity);
      });

      animationFrameId = window.requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default SimulatedBackground;