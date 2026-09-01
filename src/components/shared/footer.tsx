import React from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 px-6 border-t border-border bg-background text-muted-foreground text-xs font-mono">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {currentYear} Firdaus Khotibul Zickrian. All rights reserved.</p>
        <p className="flex items-center gap-1.5 text-muted-foreground">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Available for projects & roles</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
