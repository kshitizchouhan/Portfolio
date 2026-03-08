import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="home" className="section-container min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <motion.p
            className="text-sm font-mono tracking-[0.3em] uppercase text-primary"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            Hello, World_
          </motion.p>

          <motion.h1
            className="text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            <span className="text-foreground">I'm a</span>
            <br />
            <span className="text-gradient">Full Stack</span>
            <br />
            <span className="text-foreground">Developer</span>
          </motion.h1>

          <motion.p
            className="text-lg text-muted-foreground max-w-lg font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            Building immersive digital experiences with{" "}
            <span className="text-primary font-medium">Next.js</span>,{" "}
            <span className="text-primary font-medium">React</span>,{" "}
            <span className="text-secondary font-medium">Node.js</span>,{" "}
            <span className="font-medium text-foreground">MongoDB</span> & beyond.
          </motion.p>

          <motion.div
            className="flex gap-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.8 }}
          >
            <Button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="cursor-none shadow-lg shadow-primary/20"
            >
              View Projects
            </Button>
            <Button
              variant="outline"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="cursor-none"
            >
              Contact Me
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
