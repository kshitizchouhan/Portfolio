import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = ["Home", "About", "Skills", "Projects", "Experience", "Resume", "Contact"];

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    setActive(id);
    setMobileOpen(false);
    const el = document.getElementById(id.toLowerCase());
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-2xl border-b"
      style={{
        background: "hsl(var(--card) / 0.35)",
        borderColor: "hsl(0 0% 100% / 0.15)",
        boxShadow: "0 4px 30px hsl(var(--primary) / 0.06), inset 0 1px 0 hsl(0 0% 100% / 0.3)",
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <motion.span
        className="text-xl font-bold tracking-tight font-display text-gradient"
        whileHover={{ scale: 1.05 }}
      >
        Kshitiz Chouhan
      </motion.span>

      <div className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => scrollTo(item)}
            className={`relative px-3 py-2 text-sm font-medium tracking-wide transition-colors cursor-none ${
              active === item ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {active === item && (
              <motion.div
                layoutId="nav-active"
                className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/20"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{item}</span>
          </button>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="md:hidden cursor-none"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {mobileOpen && (
        <motion.div
          className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border p-4 flex flex-col gap-2 md:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className={`px-4 py-2 text-sm font-medium text-left rounded-lg cursor-none ${
                active === item ? "text-primary bg-primary/10" : "text-muted-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
