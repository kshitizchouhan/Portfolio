import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["Java", "Python", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Frameworks & Libraries",
    skills: ["Next.js", "React", "Express", "Node.js", "Flask", "Pandas", "NumPy", "MERN Stack", "Prisma ORM"],
  },
  {
    title: "Databases",
    skills: ["MongoDB", "PostgreSQL"],
  },
  {
    title: "Tools & Technologies",
    skills: ["Git", "GitHub", "VS Code", "Power BI", "Zabbix"],
  },
  {
    title: "Software",
    skills: ["Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint"],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="skills" className="section-container" ref={ref}>
      <motion.div className="max-w-5xl mx-auto w-full" style={{ y }}>
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-mono text-primary tracking-[0.2em] uppercase mb-2">Expertise</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Tech <span className="text-gradient">Stack</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, ci) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1, duration: 0.5 }}
            >
              <Card className="glass-panel border-border h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-mono text-muted-foreground tracking-wider uppercase">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, si) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: ci * 0.1 + si * 0.03, duration: 0.4 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        <Badge
                          variant="secondary"
                          className="cursor-none text-sm px-3 py-1.5 hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
