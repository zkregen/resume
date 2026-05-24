import React, { useEffect, useRef } from 'react';

const AmbientOrbs = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Parallax scroll factor (0.5 means particles scroll at half the speed of content)
    const scrollFactor = 0.5;
    let docHeight = height;

    // Track mouse position
    let mouse = { x: null, y: null, radius: 140 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Colors matching theme tokens
    const colors = [
      'rgba(0, 217, 126, ',   // Emerald primary
      'rgba(240, 192, 64, ',  // Gold secondary
      'rgba(238, 242, 248, ', // Light white
    ];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * docHeight; // Spans the entire logical height
        this.radius = Math.random() * 2.2 + 0.6; // slightly larger dust particles 0.6px to 2.8px
        this.speedX = (Math.random() - 0.5) * 0.12;
        this.speedY = (Math.random() - 0.5) * 0.12;
        this.baseOpacity = Math.random() * 0.35 + 0.15;
        this.opacity = this.baseOpacity;
        
        const r = Math.random();
        if (r < 0.7) {
          this.colorIndex = 0;
        } else if (r < 0.9) {
          this.colorIndex = 1;
        } else {
          this.colorIndex = 2;
        }
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap boundaries inside the dynamic logical parallax height
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = docHeight;
        if (this.y > docHeight) this.y = 0;

        // Mouse interaction relative to rendered Y coordinate (viewport relative)
        const drawY = this.y - window.scrollY * scrollFactor;
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = drawY - mouse.y;
          const distance = Math.hypot(dx, dy);
          
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force * 0.7;
            this.y += Math.sin(angle) * force * 0.7; // Modifies logical coordinates
            
            this.opacity = Math.min(this.baseOpacity + force * 0.4, 0.85);
          } else {
            if (this.opacity > this.baseOpacity) {
              this.opacity -= 0.01;
            }
          }
        } else {
          if (this.opacity > this.baseOpacity) {
            this.opacity -= 0.01;
          }
        }
      }

      draw() {
        const drawY = this.y - window.scrollY * scrollFactor;
        // Optimization: Only render particles that are currently inside the viewport
        if (drawY < -20 || drawY > height + 20) return;

        ctx.beginPath();
        ctx.arc(this.x, drawY, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = colors[this.colorIndex] + this.opacity + ')';
        ctx.fill();
        
        if (this.radius > 1.6) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = this.colorIndex === 0 
            ? 'rgba(0, 217, 126, 0.5)' 
            : this.colorIndex === 1 
            ? 'rgba(240, 192, 64, 0.5)' 
            : 'rgba(255, 255, 255, 0.3)';
        } else {
          ctx.shadowBlur = 0;
        }
      }
    }

    const initParticles = () => {
      particles = [];
      const count = Math.floor((width * docHeight) / 16000); // 50% more density
      const boundedCount = Math.min(Math.max(count, 70), 160); // 70 to 160 range
      
      for (let i = 0; i < boundedCount; i++) {
        particles.push(new Particle());
      }
    };

    // Use ResizeObserver to monitor the body scrollHeight changes
    let lastWidth = width;
    const resizeObserver = new ResizeObserver(() => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const currentScrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      
      // Recalculate docHeight based on actual scrollable height
      docHeight = height + (currentScrollHeight - height) * scrollFactor;
      
      // Re-initialize particles if they haven't been created yet, or if width changed significantly
      if (particles.length === 0 || Math.abs(width - lastWidth) > 50) {
        lastWidth = width;
        initParticles();
      }
    });

    resizeObserver.observe(document.body);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const currentScroll = window.scrollY * scrollFactor;

      // 1. Draw neural constellation lines based on rendered viewport Y positions
      for (let i = 0; i < particles.length; i++) {
        const drawYi = particles[i].y - currentScroll;
        if (drawYi < -110 || drawYi > height + 110) continue;

        for (let j = i + 1; j < particles.length; j++) {
          const drawYj = particles[j].y - currentScroll;
          if (drawYj < -110 || drawYj > height + 110) continue;

          const dx = particles[i].x - particles[j].x;
          const dy = drawYi - drawYj;
          const dist = Math.hypot(dx, dy);

          if (dist < 110) {
            const opacity = (110 - dist) / 110 * 0.045;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, drawYi);
            ctx.lineTo(particles[j].x, drawYj);
            
            const grad = ctx.createLinearGradient(particles[i].x, drawYi, particles[j].x, drawYj);
            grad.addColorStop(0, colors[particles[i].colorIndex] + opacity + ')');
            grad.addColorStop(1, colors[particles[j].colorIndex] + opacity + ')');
            
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
      }

      // 2. Draw and update particles
      ctx.shadowBlur = 0;
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: 'var(--bg-base)',
      }}
    >
      {/* Primary emerald orb — top left */}
      <div
        style={{
          position: 'absolute',
          top: '-20vh',
          left: '-15vw',
          width: '70vw',
          height: '70vw',
          maxWidth: '700px',
          maxHeight: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,217,126,0.10) 0%, rgba(0,184,104,0.04) 50%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float 12s ease-in-out infinite',
        }}
      />

      {/* Gold accent orb — bottom right */}
      <div
        style={{
          position: 'absolute',
          bottom: '-10vh',
          right: '-20vw',
          width: '60vw',
          height: '60vw',
          maxWidth: '600px',
          maxHeight: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(240,192,64,0.07) 0%, rgba(240,192,64,0.02) 50%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'float 18s ease-in-out infinite reverse',
        }}
      />

      {/* Small bright emerald — mid right */}
      <div
        style={{
          position: 'absolute',
          top: '30vh',
          right: '-8vw',
          width: '30vw',
          height: '30vw',
          maxWidth: '320px',
          maxHeight: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,217,126,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'float 9s ease-in-out infinite',
          animationDelay: '-4s',
        }}
      />

      {/* Interactive canvas particles with parallax scrolling */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.85,
        }}
      />

      {/* Deep void vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(5,5,8,0.75) 100%)',
        }}
      />
    </div>
  );
};

export default AmbientOrbs;
