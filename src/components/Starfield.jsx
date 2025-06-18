import { useEffect, useRef, useContext, useMemo } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const colors = {
  dark: {
    background: '#0f0f1a',
    star: '#ffffff',
    meteor: '#f3f4f6',
    nebulas: ['#2563eb40', '#7c3aed30', '#dc262640'],
  },
  light: {
    background: '#f9fafb',
    star: '#111827',
    meteor: '#111827',
    nebulas: ['#6d28d930', '#2563eb40', '#b91c1c30'],
  },
};

const generateStaticStars = (width, height) => {
  return Array.from({ length: 500 }, () => [
    Math.random() * width,
    Math.random() * height,
  ]);
};

const createMeteor = () => {
  return {
    x: Math.random() * window.innerWidth,
    y: -20,
    length: Math.random() * 80 + 20,
    speed: Math.random() * 4 + 2,
    angle: Math.PI / 4,
    opacity: Math.random() * 0.5 + 0.3,
  };
};

const generateNebulas = (count, width, height) => {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 100 + Math.random() * 150,
    offset: Math.random() * 100,
  }));
};

const Starfield = () => {
  const canvasRef = useRef(null);
  const { darkMode } = useContext(ThemeContext);

  // Generar estrellas estáticas una sola vez
  const starPositions = useMemo(() => {
    if (typeof window !== 'undefined') {
      return generateStaticStars(window.innerWidth, window.innerHeight);
    }
    return [];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let meteors = Array.from({ length: 5 }, createMeteor);
    const nebulas = generateNebulas(4, width, height);
    let animationFrameId;

    // Dibujar estrellas estáticas (solo una vez)
    const drawStaticStars = () => {
      ctx.fillStyle = colors[darkMode ? 'dark' : 'light'].star;
      starPositions.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const render = (time) => {
      const mode = darkMode ? 'dark' : 'light';
      ctx.fillStyle = colors[mode].background;
      ctx.fillRect(0, 0, width, height);

      // Dibujar estrellas estáticas (ya no se regeneran)
      drawStaticStars();

      // Nebulas (animadas)
      nebulas.forEach((nebula, i) => {
        const movement = Math.sin(time / 4000 + nebula.offset) * 20;
        const gradient = ctx.createRadialGradient(
          nebula.x + movement, nebula.y + movement, 0,
          nebula.x + movement, nebula.y + movement, nebula.radius
        );
        gradient.addColorStop(0, colors[mode].nebulas[i % colors[mode].nebulas.length]);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(nebula.x + movement, nebula.y + movement, nebula.radius, 0, 2 * Math.PI);
        ctx.fill();
      });

      // Meteors (animados)
      meteors.forEach((meteor) => {
        ctx.beginPath();
        const endX = meteor.x + meteor.length * Math.cos(meteor.angle);
        const endY = meteor.y + meteor.length * Math.sin(meteor.angle);
        const gradient = ctx.createLinearGradient(meteor.x, meteor.y, endX, endY);
        gradient.addColorStop(0, `rgba(255,255,255,${meteor.opacity})`);
        gradient.addColorStop(1, 'transparent');
        ctx.strokeStyle = colors[mode].meteor;
        ctx.globalAlpha = meteor.opacity;
        ctx.lineWidth = 2;
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.globalAlpha = 1;

        meteor.x += meteor.speed;
        meteor.y += meteor.speed;

        if (meteor.x > width || meteor.y > height) {
          Object.assign(meteor, createMeteor());
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [darkMode, starPositions]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default Starfield;