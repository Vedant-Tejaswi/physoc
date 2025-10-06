import React, { useState, useEffect } from 'react';

const PhysicsSociety = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Starfield animation
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Set initial window size
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const generateStars = (width, height) => {
      const starCount = Math.floor((width * height) / 8000); // Responsive star count
      
      return Array.from({ length: Math.min(starCount, 300) }, (_, i) => ({
        id: `${i}-${Date.now()}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        duration: Math.random() * 3 + 2,
        depth: Math.random() * 3 + 1 // Parallax depth (1-4)
      }));
    };

    setStars(generateStars(window.innerWidth, window.innerHeight));

    // Mouse move handler
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    // Regenerate stars on resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      setWindowSize({ width: newWidth, height: newHeight });
      setStars(generateStars(newWidth, newHeight));
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Loading animation
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    setCurrentPage('home');
    setIsMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const members = [
    { role: "Member", class: "XII-A" },
    { role: "Member", class: "XII-B" },
    { role: "Member", class: "XI-C" },
    { role: "Member", class: "XI-A" },
    { role: "Member", class: "XII-C" },
    { role: "Member", class: "XI-B" },
    { role: "Member", class: "XII-A" },
    { role: "Member", class: "XI-D" },
    { role: "Member", class: "XII-B" },
    { role: "Member", class: "XI-A" },
    { role: "Member", class: "XII-D" },
    { role: "Member", class: "XI-C" }
  ];

  const faculty = [
    { designation: "Incharge" },
    { designation: "Incharge" },
    { designation: "Incharge" }
  ];

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <div className="text-center">
          <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mb-6">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="text-gray-400 text-sm tracking-wider">LOADING PHYSOC</p>
          <p className="text-gray-600 text-xs mt-2">{loadingProgress}%</p>
        </div>
      </div>
    );
  }

  if (currentPage === 'resources') {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-x-hidden" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Starfield Background */}
        <div className="fixed inset-0 z-0 overflow-hidden">
          {stars.map(star => {
            const offsetX = mousePosition.x * star.depth * 20;
            const offsetY = mousePosition.y * star.depth * 20;
            return (
              <div
                key={star.id}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  opacity: star.opacity,
                  transform: `translate(${offsetX}px, ${offsetY}px)`,
                  transition: 'transform 0.3s ease-out',
                  animation: `twinkle ${star.duration}s infinite alternate`
                }}
              />
            );
          })}
        </div>

        <style>{`
          @keyframes twinkle {
            from { opacity: 0.2; }
            to { opacity: 0.8; }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>

        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-black/60 backdrop-blur-md z-50 border-b border-gray-800/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-4">
                <div>
                  <h1 className="text-lg font-medium tracking-tight">PhySoc</h1>
                </div>
              </div>
              <div className="hidden md:flex space-x-10 text-sm">
                <button onClick={() => setCurrentPage('home')} className="text-gray-400 hover:text-white transition tracking-wide">HOME</button>
                <button onClick={() => setCurrentPage('resources')} className="text-white font-medium tracking-wide">RESOURCES</button>
              </div>
              <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className={`w-full h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`w-full h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`w-full h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden bg-black/95 border-t border-gray-800/50" style={{ animation: 'fadeInUp 0.3s ease-out' }}>
              <div className="px-6 py-6 space-y-4">
                <button onClick={() => setCurrentPage('home')} className="block w-full text-left text-gray-400 hover:text-white py-2 text-sm tracking-wide">HOME</button>
                <button onClick={() => setCurrentPage('resources')} className="block w-full text-left text-white font-medium py-2 text-sm tracking-wide">RESOURCES</button>
              </div>
            </div>
          )}
        </nav>

        {/* Resources Content */}
        <div className="relative z-10 pt-40 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
            <h1 className="text-5xl md:text-7xl font-light mb-8 tracking-tight">
              Resources
            </h1>
            <div className="border border-gray-800 rounded-sm p-16 bg-black/40 backdrop-blur-sm">
              <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide">COMING SOON</p>
              <p className="text-gray-600 mt-4 text-sm tracking-wider">Currently in development</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      {/* Starfield Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {stars.map(star => {
          const offsetX = mousePosition.x * star.depth * 20;
          const offsetY = mousePosition.y * star.depth * 20;
          return (
            <div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                transform: `translate(${offsetX}px, ${offsetY}px)`,
                transition: 'transform 0.3s ease-out',
                animation: `twinkle ${star.duration}s infinite alternate`
              }}
            />
          );
        })}
      </div>

      <style>{`
        @keyframes twinkle {
          from { opacity: 0.2; }
          to { opacity: 0.8; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .card-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover:hover {
          transform: translateY(-8px);
          border-color: rgba(59, 130, 246, 0.5);
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/60 backdrop-blur-md z-50 border-b border-gray-800/50" style={{ animation: 'fadeIn 0.5s ease-out' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-lg font-medium tracking-tight">PhySoc</h1>
              </div>
            </div>
            <div className="hidden md:flex space-x-10 text-sm">
              <button onClick={() => scrollToSection('home')} className="text-gray-400 hover:text-white transition tracking-wide">HOME</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-white transition tracking-wide">ABOUT</button>
              <button onClick={() => scrollToSection('members')} className="text-gray-400 hover:text-white transition tracking-wide">MEMBERS</button>
              <button onClick={() => scrollToSection('faculty')} className="text-gray-400 hover:text-white transition tracking-wide">FACULTY</button>
              <button onClick={() => scrollToSection('events')} className="text-gray-400 hover:text-white transition tracking-wide">EVENTS</button>
              <button onClick={() => setCurrentPage('resources')} className="text-gray-400 hover:text-white transition tracking-wide">RESOURCES</button>
            </div>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-full h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 border-t border-gray-800/50" style={{ animation: 'fadeInUp 0.3s ease-out' }}>
            <div className="px-6 py-6 space-y-4">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left text-gray-400 hover:text-white py-2 text-sm tracking-wide">HOME</button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left text-gray-400 hover:text-white py-2 text-sm tracking-wide">ABOUT</button>
              <button onClick={() => scrollToSection('members')} className="block w-full text-left text-gray-400 hover:text-white py-2 text-sm tracking-wide">MEMBERS</button>
              <button onClick={() => scrollToSection('faculty')} className="block w-full text-left text-gray-400 hover:text-white py-2 text-sm tracking-wide">FACULTY</button>
              <button onClick={() => scrollToSection('events')} className="block w-full text-left text-gray-400 hover:text-white py-2 text-sm tracking-wide">EVENTS</button>
              <button onClick={() => setCurrentPage('resources')} className="block w-full text-left text-gray-400 hover:text-white py-2 text-sm tracking-wide">RESOURCES</button>
            </div>
          </div>
        )}
      </nav>

      {/* Home Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6">
        <div className="text-center z-10 max-w-5xl" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
          <h1 className="text-6xl md:text-8xl font-light mb-4 tracking-tight leading-tight">
            PhySoc
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-6 font-light tracking-wide">The Physics Society of DPS RK Puram</p>
          <p className="text-base md:text-lg text-gray-500 mb-2 font-light italic max-w-3xl mx-auto">"Not only is the Universe stranger than we think, it is stranger than we can think."</p>
          <p className="text-sm text-gray-600 mb-12">― Werner Heisenberg</p>
          <button 
            onClick={() => scrollToSection('about')}
            className="border border-gray-700 hover:border-blue-500 text-white px-10 py-4 text-sm tracking-widest transition-all hover:bg-blue-500/10"
          >
            DISCOVER MORE
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative min-h-screen flex items-center justify-center px-6 py-32">
        <div className="max-w-5xl z-10">
          <h2 className="text-5xl md:text-6xl font-light mb-16 tracking-tight">
            About Us
          </h2>
          <div className="border border-gray-800 p-12 md:p-16 bg-black/40 backdrop-blur-sm card-hover">
            <p className="text-lg text-gray-400 leading-relaxed mb-8 font-light">
              The Physics Society of DPS RK Puram is a vibrant community of students passionate about understanding the fundamental laws that govern our universe. From quantum mechanics to astrophysics, we explore the wonders of physics through interactive sessions, experiments, and discussions.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed mb-8 font-light">
              Our society aims to foster scientific curiosity, critical thinking, and a deeper appreciation for the beauty of physics. We organize workshops, guest lectures, competitions, and hands-on experiments that bring theoretical concepts to life.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed font-light">
              Whether you're a physics enthusiast or simply curious about how the world works, the Physics Society welcomes you to join us on this exciting journey of discovery and learning.
            </p>
          </div>
        </div>
      </section>

      {/* Members Section */}
      <section id="members" className="relative min-h-screen flex items-center justify-center px-6 py-32">
        <div className="max-w-7xl z-10 w-full">
          <h2 className="text-5xl md:text-6xl font-light mb-16 tracking-tight">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {members.map((member, index) => (
              <div 
                key={index} 
                className="border border-gray-800 p-8 bg-black/40 backdrop-blur-sm card-hover"
                style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.05}s backwards` }}
              >
                <div className="w-full aspect-square bg-gradient-to-br from-gray-800 to-gray-900 mb-6 flex items-center justify-center">
                  <div className="w-20 h-20 border border-gray-700"></div>
                </div>
                <p className="text-white font-medium mb-2 tracking-wide">{member.role}</p>
                <p className="text-gray-500 text-sm tracking-wider">Class {member.class}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section id="faculty" className="relative min-h-screen flex items-center justify-center px-6 py-32">
        <div className="max-w-6xl z-10 w-full">
          <h2 className="text-5xl md:text-6xl font-light mb-16 tracking-tight">
            Faculty Advisors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {faculty.map((member, index) => (
              <div 
                key={index} 
                className="border border-gray-800 p-10 bg-black/40 backdrop-blur-sm card-hover"
                style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.15}s backwards` }}
              >
                <div className="w-full aspect-square bg-gradient-to-br from-gray-800 to-gray-900 mb-8 flex items-center justify-center">
                  <div className="w-24 h-24 border border-gray-700"></div>
                </div>
                <p className="text-gray-400 text-center tracking-wide">{member.designation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="relative min-h-screen flex items-center justify-center px-6 py-32">
        <div className="max-w-5xl z-10 w-full">
          <h2 className="text-5xl md:text-6xl font-light mb-16 tracking-tight">
            Events
          </h2>
          <div className="border border-gray-800 p-16 bg-black/40 backdrop-blur-sm text-center card-hover">
            <p className="text-2xl md:text-3xl text-gray-400 font-light tracking-wide">COMING SOON</p>
            <p className="text-gray-600 mt-4 text-sm tracking-wider">Exciting events and activities are being planned</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/60 border-t border-gray-800/50 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600 text-sm tracking-wider">© 2025 PHYSOC, DPS RK PURAM</p>
        </div>
      </footer>
    </div>
  );
};

export default PhysicsSociety;