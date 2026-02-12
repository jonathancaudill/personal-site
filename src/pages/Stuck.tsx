import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Loader2, Download } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const Stuck = () => {
  const [note, setNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

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
      <div className="mx-auto max-w-4xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-center font-display text-5xl leading-tight text-foreground md:text-7xl">
          <span className="block">MacOS Stickies,</span>
          <span className="block">Fixed.</span>
        </h1>

        <div className="mb-16 flex flex-col items-center">
          <Button
            onClick={handleDownload}
            size="lg"
            className="rounded-none border border-border bg-foreground px-8 py-6 text-lg font-ui font-medium text-background hover:bg-foreground/90"
          >
            <Download className="mr-2 h-5 w-5" />
            Download for Mac
          </Button>
          <a
            href="https://github.com/jonathancaudill/stuck/releases/tag/v1.0.2"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-xs font-ui uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground"
          >
            Note for MacOS 15 users
          </a>
        </div>

        <div className="relative mb-32" style={{ marginTop: "15vh" }}>
          <div className="rounded-none border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-rose-500"></div>
                <div className="h-3 w-3 rounded-full bg-amber-400"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex items-center gap-2 text-xs font-ui text-muted-foreground">
                {isSaving && (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Saving…</span>
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
              className="min-h-[400px] w-full resize-none border-none bg-transparent font-serif text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0"
              placeholder="start typing…"
            />
          </div>
        </div>

        <section className="space-y-12">
          <h2 className="mb-8 text-center font-display text-2xl text-foreground">Features</h2>

          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 font-display text-xl text-foreground">Beautiful, Minimal Design</h3>
              <p className="font-serif text-sm text-muted-foreground">
                Inspired by macOS aesthetics but reimagined for the modern desktop. Clean,
                focused, and distraction-free writing that stays out of your way.
              </p>
            </div>
            <div className="flex h-48 items-center justify-center rounded-lg bg-transparent p-4">
              <img
                src="/assets/stuck-minimal.webp"
                alt="Screenshot of Stuck app showing beautiful, minimal design"
                className="mx-auto h-full max-h-40 w-auto rounded-lg object-contain shadow"
              />
            </div>
          </div>

          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="order-2 flex h-48 items-center justify-center rounded-lg bg-transparent p-4 md:order-1">
              <img
                src="/assets/stuck-compact.webp"
                alt="Screenshot of Stuck app showing mini mode"
                className="mx-auto h-full max-h-40 w-auto rounded-lg object-contain shadow"
              />
            </div>
            <div className="order-1 flex flex-col justify-center md:order-2">
              <h3 className="mb-4 font-display text-xl text-foreground">Mini Mode</h3>
              <p className="font-serif text-sm text-muted-foreground">
                Shrink Stuck down to a tiny scratchpad that hovers where you need it—perfect
                for quick notes while you work in other apps.
              </p>
            </div>
          </div>

          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 font-display text-xl text-foreground">Pinnable</h3>
              <p className="font-serif text-sm text-muted-foreground">
                Pin Stuck above everything else so your most important notes never disappear
                behind a wall of windows.
              </p>
            </div>
            <div className="flex h-48 items-center justify-center rounded-lg bg-transparent p-4">
              <img
                src="/assets/stuck-pinnable.webp"
                alt="Screenshot of Stuck app showing pinnable feature"
                className="mx-auto h-full max-h-40 w-auto rounded-lg object-contain shadow"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Stuck;
