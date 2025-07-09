import { Mail, Phone, MessageSquare, Github, Linkedin } from "lucide-react";
import GradientBackground from "@/components/GradientBackground";
import { useState } from "react";
import SEOHead from "@/components/SEOHead";

const Contact = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const glowStyle = {
    '--mouse-x': `${mousePosition.x}px`,
    '--mouse-y': `${mousePosition.y}px`,
  } as React.CSSProperties;

  return (
    <>
      <SEOHead 
        title="Contact Jonathan Caudill"
        description="Get in touch with Jonathan Caudill. Contact information including email, phone, GitHub, and LinkedIn profiles."
        keywords="contact Jonathan Caudill, email, phone, GitHub, LinkedIn, jonathan.s.caudill@gmail.com"
        url="/contact"
        type="profile"
      />
      <div className="relative min-h-screen">
        <GradientBackground />
        <div className="relative">
          <div className="container max-w-5xl mx-auto px-4 py-12 pt-24">
            <h1 className="text-4xl font-bold mb-8 text-white">Contact Jonathan Caudill</h1>
            <p className="text-gray-300 mb-12 text-lg">
              Have a question or want to chat? Feel free to reach out to Jonathan Caudill!
            </p>

            <div className="max-w-2xl space-y-8">
              <a 
                href="mailto:jonathan.s.caudill@gmail.com"
                className="block group relative"
                onMouseMove={handleMouseMove}
                style={glowStyle}
              >
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.15) 0%, transparent 80%)`,
                    transform: `perspective(1000px) rotateX(calc((var(--mouse-y) - 50%) * 0.1deg)) rotateY(calc((var(--mouse-x) - 50%) * 0.1deg))`,
                  }}
                />
                <div className="relative bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6 transition-all duration-300 hover:bg-white/20">
                  <div className="flex items-center gap-4 mb-4">
                    <Mail className="w-6 h-6 text-white" />
                    <h2 className="text-xl font-semibold text-white">Email Jonathan Caudill</h2>
                  </div>
                  <p className="text-gray-300 group-hover:text-white transition-colors">
                    jonathan.s.caudill@gmail.com
                  </p>
                </div>
              </a>

              <a 
                href="sms:+6627011626"
                className="block group relative"
                onMouseMove={handleMouseMove}
                style={glowStyle}
              >
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.15) 0%, transparent 80%)`,
                    transform: `perspective(1000px) rotateX(calc((var(--mouse-y) - 50%) * 0.1deg)) rotateY(calc((var(--mouse-x) - 50%) * 0.1deg))`,
                  }}
                />
                <div className="relative bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6 transition-all duration-300 hover:bg-white/20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Phone className="w-6 h-6 text-white" />
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">Phone</h2>
                  </div>
                  <p className="text-gray-300 group-hover:text-white transition-colors">
                    (662) 701-1626
                  </p>
                </div>
              </a>

              <a 
                href="https://github.com/jonathancaudill" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group relative"
                onMouseMove={handleMouseMove}
                style={glowStyle}
              >
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.15) 0%, transparent 80%)`,
                    transform: `perspective(1000px) rotateX(calc((var(--mouse-y) - 50%) * 0.1deg)) rotateY(calc((var(--mouse-x) - 50%) * 0.1deg))`,
                  }}
                />
                <div className="relative bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6 transition-all duration-300 hover:bg-white/20">
                  <div className="flex items-center gap-4 mb-4">
                    <Github className="w-6 h-6 text-white" />
                    <h2 className="text-xl font-semibold text-white">GitHub</h2>
                  </div>
                  <p className="text-gray-300 group-hover:text-white transition-colors">
                    github.com/jonathancaudill
                  </p>
                </div>
              </a>

              <a 
                href="https://linkedin.com/in/jonathancaudill" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group relative"
                onMouseMove={handleMouseMove}
                style={glowStyle}
              >
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.15) 0%, transparent 80%)`,
                    transform: `perspective(1000px) rotateX(calc((var(--mouse-y) - 50%) * 0.1deg)) rotateY(calc((var(--mouse-x) - 50%) * 0.1deg))`,
                  }}
                />
                <div className="relative bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6 transition-all duration-300 hover:bg-white/20">
                  <div className="flex items-center gap-4 mb-4">
                    <Linkedin className="w-6 h-6 text-white" />
                    <h2 className="text-xl font-semibold text-white">LinkedIn</h2>
                  </div>
                  <p className="text-gray-300 group-hover:text-white transition-colors">
                    linkedin.com/in/jonathancaudill
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
