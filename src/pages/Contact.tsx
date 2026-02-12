import { Mail, Phone, MessageSquare, Github, Linkedin } from "lucide-react";
import { useState } from "react";
import SEOHead from "@/components/SEOHead";

const Contact = () => {
  return (
    <>
      <SEOHead 
        title="Contact Jonathan Caudill"
        description="Get in touch with Jonathan Caudill. Contact information including email, phone, GitHub, and LinkedIn profiles."
        keywords="contact Jonathan Caudill, email, phone, GitHub, LinkedIn, jonathan.s.caudill@gmail.com"
        url="/contact"
        type="profile"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="border-b border-border pb-8 pt-4">
          <p className="text-xs font-ui uppercase tracking-[0.22em] text-muted-foreground">
            Contact
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
            Say hello.
          </h1>
        </header>

        <main className="py-10">
          <div className="grid gap-6 md:grid-cols-2">
            <a
              href="mailto:jonathan.s.caudill@gmail.com"
              className="group rounded-none border border-border px-5 py-4 transition-colors hover:bg-muted"
            >
              <div className="mb-3 flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <h2 className="font-ui text-xs uppercase tracking-[0.22em] text-foreground">
                  Email
                </h2>
              </div>
              <p className="font-serif text-sm text-muted-foreground">
                jonathan.s.caudill@gmail.com
              </p>
            </a>

            <a
              href="sms:+6627011626"
              className="group rounded-none border border-border px-5 py-4 transition-colors hover:bg-muted"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                <h2 className="font-ui text-xs uppercase tracking-[0.22em] text-foreground">
                  Phone
                </h2>
              </div>
              <p className="font-serif text-sm text-muted-foreground">(662) 701-1626</p>
            </a>

            <a
              href="https://github.com/jonathancaudill"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-none border border-border px-5 py-4 transition-colors hover:bg-muted"
            >
              <div className="mb-3 flex items-center gap-3">
                <Github className="h-5 w-5 text-primary" />
                <h2 className="font-ui text-xs uppercase tracking-[0.22em] text-foreground">
                  GitHub
                </h2>
              </div>
              <p className="font-serif text-sm text-muted-foreground">
                github.com/jonathancaudill
              </p>
            </a>

            <a
              href="https://linkedin.com/in/jonathancaudill"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-none border border-border px-5 py-4 transition-colors hover:bg-muted"
            >
              <div className="mb-3 flex items-center gap-3">
                <Linkedin className="h-5 w-5 text-primary" />
                <h2 className="font-ui text-xs uppercase tracking-[0.22em] text-foreground">
                  LinkedIn
                </h2>
              </div>
              <p className="font-serif text-sm text-muted-foreground">
                linkedin.com/in/jonathancaudill
              </p>
            </a>
          </div>
        </main>
      </div>
    </>
  );
};

export default Contact;
