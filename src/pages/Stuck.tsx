import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Loader2, Download } from "lucide-react";
import GradientBackground from "@/components/GradientBackground";
import SEOHead from "@/components/SEOHead";

const Stuck = () => {
  const [note, setNote] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollPosition / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle auto-saving
  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    if (note) {
      setIsSaving(true);
      setIsSaved(false);
      
      saveTimeoutRef.current = setTimeout(() => {
        // Simulate saving to localStorage
        localStorage.setItem('stuck-note', note);
        setIsSaving(false);
        setIsSaved(true);
        
        // Reset saved status after 2 seconds
        setTimeout(() => {
          setIsSaved(false);
        }, 2000);
      }, 1000);
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [note]);

  // Load saved note on mount
  useEffect(() => {
    const savedNote = localStorage.getItem('stuck-note');
    if (savedNote) {
      setNote(savedNote);
    }
  }, []);

  const handleDownload = () => {
    const downloadUrl = "https://github.com/jonathancaudill/stuck/releases/download/v1.0.2/stuck.zip";
    window.open(downloadUrl, "_blank");
  };

  return (
    <>
      <SEOHead 
        title="Stuck - MacOS Stickies App by Jonathan Caudill"
        description="Download Stuck, a beautiful MacOS stickies app created by Jonathan Caudill. Features minimal design, mini mode, and pinnable windows for distraction-free note-taking."
        keywords="Stuck app, MacOS stickies, Jonathan Caudill, note-taking app, Mac app, sticky notes, minimal design"
        url="/stuck"
        type="website"
      />
      <div className="relative min-h-screen">
        {/* Fixed gradient background */}
        <GradientBackground scrollProgress={scrollProgress} />

        {/* Content */}
        <div className="relative">
          <div className="container max-w-4xl mx-auto px-4 py-12 pt-64">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 text-center leading-tight text-white">
              <span className="block">MacOS Stickies,</span>
              <span className="block">Fixed.</span>
            </h1>
            
            {/* Download Button */}
            <div className="flex flex-col items-center mb-16">
              <Button
                onClick={handleDownload}
                size="lg"
                className="bg-white text-black hover:bg-white/90 px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Download className="mr-2 h-5 w-5" />
                Download for Mac
              </Button>
              <a 
                href="https://github.com/jonathancaudill/stuck/releases/tag/v1.0.2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-2 text-sm text-white/70 hover:text-white/90 italic"
              >
                Note for MacOS 15 users
              </a>
            </div>
            
            {/* Sticky Note Editor */}
            <div className="relative mb-32" style={{ marginTop: '15vh' }}>
              <div className="bg-white/20 backdrop-blur-xl rounded-xl shadow-lg p-6 border border-white/30">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    {isSaving && (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    )}
                    {isSaved && (
                      <>
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Saved</span>
                      </>
                    )}
                  </div>
                </div>
                
                <textarea
                  ref={textareaRef}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full bg-transparent border-none resize-none focus:outline-none focus:ring-0 min-h-[400px] font-sans text-white placeholder:text-white/50"
                  placeholder="start typing..."
                />
              </div>
            </div>
            
            {/* Features section */}
            <section className="space-y-12">
              <h2 className="text-3xl font-bold text-center mb-8 text-white">Features</h2>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-white">Beautiful, Minimal Design</h3>
                  <p className="text-white/80">
                    Inspired by macOS aesthetics but reimagined for the modern web. Clean, 
                    focused, and distraction-free writing experience that adapts to your system's theme.
                  </p>
                </div>
                <div className="bg-transparent rounded-lg p-4 h-48 flex items-center justify-center">
                  <img src="/assets/stuck-minimal.webp" alt="Screenshot of Stuck app showing beautiful, minimal design" className="rounded-lg shadow-lg object-contain h-full max-h-40 w-auto mx-auto" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="bg-transparent rounded-lg p-4 h-48 flex items-center justify-center order-2 md:order-1">
                  <img src="/assets/stuck-compact.webp" alt="Screenshot of Stuck app showing mini mode" className="rounded-lg shadow-lg object-contain h-full max-h-40 w-auto mx-auto" />
                </div>
                <div className="order-1 md:order-2 flex flex-col justify-center">
                  <h3 className="text-2xl font-semibold mb-4 text-white">Mini Mode</h3>
                  <p className="text-white/80">
                    Stuck features a mini mode, allowing you to make the window as small as you want. Like your own personal scratchpad!
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-white">Pinnable</h3>
                  <p className="text-white/80">
                    With the click of a button, you can pin the window to the top of your desktop.
                    Just like a real sticky note.
                  </p>
                </div>
                <div className="bg-transparent rounded-lg p-4 h-48 flex items-center justify-center">
                  <img src="/assets/stuck-pinnable.webp" alt="Screenshot of Stuck app showing pinnable feature" className="rounded-lg shadow-lg object-contain h-full max-h-40 w-auto mx-auto" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stuck;
