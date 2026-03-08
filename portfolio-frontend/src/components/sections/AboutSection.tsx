import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { label: "Years Experience", value: "1.5+" },
  { label: "Projects Completed", value: "10+" },
  { label: "Technologies", value: "20+" },
  { label: "GitHub Stars", value: "see" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const x2 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="about" className="section-container" ref={ref}>
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-mono text-primary tracking-[0.2em] uppercase mb-2">About</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Who <span className="text-gradient">I Am</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div style={{ x: x1 }}>
            <Card className="glass-panel border-border">
              <CardContent className="p-8">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I'm a passionate full-stack developer who thrives on building immersive,
                  high-performance web applications. With a deep focus on the MERN stack
                  and modern frontend technologies, I create experiences that push the boundaries
                  of what's possible on the web.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  My journey in software development started with curiosity about how things work
                  under the hood. Today, I specialize in crafting scalable architectures, real-time
                  applications, and interactive 3D experiences.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  When I'm not coding, you'll find me exploring new technologies, contributing
                  to open source, or experimenting with creative coding and generative art.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div className="grid grid-cols-2 gap-4" style={{ x: x2 }}>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, rotateY: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="glass-panel border-border">
                  <CardContent className="p-6 text-center">
                    <span className="text-3xl font-bold text-gradient block mb-1">{stat.value}</span>
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
