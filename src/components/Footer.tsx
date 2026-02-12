const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
        <div>
          <p className="font-serif">
            © {new Date().getFullYear()} Jonathan Caudill.
          </p>
          <p className="mt-1 max-w-md text-xs leading-relaxed text-muted-foreground">
            Notes, experiments, and work in progress.
          </p>
        </div>
        <div className="flex gap-6">
          <a
            href="https://github.com/jonathancaudill"
            target="_blank"
            rel="noopener noreferrer"
            className="font-ui text-xs uppercase tracking-wide text-muted-foreground hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/jonathancaudill"
            target="_blank"
            rel="noopener noreferrer"
            className="font-ui text-xs uppercase tracking-wide text-muted-foreground hover:text-foreground"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
