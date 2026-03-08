import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ExperienceSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="experience" className="section-container" ref={ref}>
      <motion.div className="max-w-4xl mx-auto w-full" style={{ y }}>
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-mono text-primary tracking-[0.2em] uppercase mb-2">Career</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Work <span className="text-gradient">Experience</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Card className="glass-panel border-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/30 rounded-full" />
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    Intern – CtrlS Datacenters Ltd.
                  </h3>
                  <p className="text-sm font-mono text-primary mb-1">MS-DB Team</p>
                  <p className="text-xs text-muted-foreground mb-4 font-mono">Tier-4 Data Center</p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Worked on SQL Server monitoring and performance analysis in a Tier-4 data center.
                    Used tools like Zabbix, Power BI, MyShift, and SHOP for server health checks,
                    alert tracking, and backup verification.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["SQL Server", "Zabbix", "Power BI", "MyShift", "SHOP", "Monitoring"].map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs font-mono">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ExperienceSection;
