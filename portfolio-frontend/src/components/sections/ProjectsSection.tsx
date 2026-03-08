import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import civicfixImg from "@/assets/projects/civicfix.png";
import eventsphereImg from "@/assets/projects/eventsphere.jpeg";
import alertDashboardImg from "@/assets/projects/alert-dashboard.png";
import conversyImg from "@/assets/projects/conversy.jpeg";
import { ClearMaskPass } from "postprocessing";

const projects = [
  {
    title: "CivicFix",
    description: "AI-powered civic platform for reporting issues easily and transparently. Upload images, let AI identify issues, and track resolution in real-time.",
    tech: ["Next.js", "AI/ML", "Tailwind CSS", "Node.js", "MongoDB", "clerk-auth"],
    image: civicfixImg,
    color: "hsl(230 65% 55%)",
    url: "https://smart-civic-reporter.vercel.app/"
  },
  {
    title: "EventSphere",
    description: "College event management platform to create, manage, and celebrate campus events — from tech fests to cultural celebrations.",
    tech: ["Next.js", "React", "Tailwind CSS", "MongoDB"],
    image: eventsphereImg,
    color: "hsl(170 70% 45%)",
    url: "https://example.com"
  },
  {
    title: "Alert Analysis Dashboard",
    description: "Power BI dashboard for analyzing 88K+ alerts across 218 companies with visualizations for alert types, trends, and priority tracking.",
    tech: ["Power BI", "SQL Server", "Data Analysis", "Zabbix"],
    image: alertDashboardImg,
    color: "hsl(260 45% 60%)",
    url: "https://example.com"
  },
  {
    title: "Conversy",
    description: "Real-time chat application for practicing conversations, making friends worldwide, and growing naturally — together.",
    tech: ["React", "Streamfy", "Node.js", "MongoDB"],
    image: conversyImg,
    color: "hsl(155 60% 45%)",
    url: "https://conversy.onrender.com/"
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={() => window.open(project.url, "_blank")}
    >
      <Card className="glass-panel border-border overflow-hidden cursor-pointer group relative">

        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at 50% 0%, ${project.color}10, transparent 60%)`,
          }}
        />

        <div className="relative z-10">

          <AspectRatio ratio={16 / 9}>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-contain bg-black/20 p-2"
            />
          </AspectRatio>

          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: project.color,
                  boxShadow: `0 0 6px ${project.color}40`
                }}
              />
              <CardTitle className="text-lg">{project.title}</CardTitle>
            </div>

            <CardDescription className="leading-relaxed">
              {project.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-0">

            <div className="flex flex-wrap gap-2 mb-3">
              {project.tech.map((t) => (
                <Badge key={t} variant="outline" className="text-xs font-mono">
                  {t}
                </Badge>
              ))}
            </div>

            <motion.div
              className="text-sm font-medium"
              style={{ color: project.color }}
              animate={{ x: hovered ? 5 : 0 }}
            >
              View Project →
            </motion.div>

          </CardContent>
        </div>

      </Card>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="projects" className="section-container" ref={ref}>
      <motion.div className="max-w-6xl mx-auto w-full" style={{ y }}>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-mono text-primary tracking-[0.2em] uppercase mb-2">
            Portfolio
          </p>

          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

      </motion.div>
    </section>
  );
};

export default ProjectsSection;
// import { motion, useScroll, useTransform } from "framer-motion";
// import { useState, useRef } from "react";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { AspectRatio } from "@/components/ui/aspect-ratio";

// import civicfixImg from "@/assets/projects/civicfix.png";
// import eventsphereImg from "@/assets/projects/eventsphere.jpeg";
// import alertDashboardImg from "@/assets/projects/alert-dashboard.png";
// import conversyImg from "@/assets/projects/conversy.jpeg";
// import { ClearMaskPass } from "postprocessing";

// const projects = [
//   {
//     title: "CivicFix",
//     description: "AI-powered civic platform for reporting issues easily and transparently. Upload images, let AI identify issues, and track resolution in real-time.",
//     tech: ["Next.js", "AI/ML", "Tailwind CSS", "Node.js","MongoDB" ,"clerk-auth"],
//     image: civicfixImg,
//     color: "hsl(230 65% 55%)",
//   },
//   {
//     title: "EventSphere",
//     description: "College event management platform to create, manage, and celebrate campus events — from tech fests to cultural celebrations.",
//     tech: ["Next.js", "React", "Tailwind CSS", "MongoDB"],
//     image: eventsphereImg,
//     color: "hsl(170 70% 45%)",
//   },
//   {
//     title: "Alert Analysis Dashboard",
//     description: "Power BI dashboard for analyzing 88K+ alerts across 218 companies with visualizations for alert types, trends, and priority tracking.",
//     tech: ["Power BI", "SQL Server", "Data Analysis", "Zabbix"],
//     image: alertDashboardImg,
//     color: "hsl(260 45% 60%)",
//   },
//   {
//     title: "Conversy",
//     description: "Real-time chat application for practicing conversations, making friends worldwide, and growing naturally — together.",
//     tech: ["React", "Streamfy", "Node.js", "MongoDB"],
//     image: conversyImg,
//     color: "hsl(155 60% 45%)",
//   },
// ];

// const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 60, rotateX: 10 }}
//       whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
//       viewport={{ once: true, margin: "-80px" }}
//       transition={{ delay: index * 0.15, duration: 0.7, ease: "easeOut" }}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       whileHover={{ y: -5, scale: 1.02 }}
//     >
//       <Card className="glass-panel border-border overflow-hidden cursor-none group relative">
//         <div
//           className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//           style={{
//             background: `radial-gradient(600px circle at 50% 0%, ${project.color}10, transparent 60%)`,
//           }}
//         />

//         <div className="relative z-10">
//           <AspectRatio ratio={16 / 9}>
//             <img
//               src={project.image}
//               alt={project.title}
//               className="w-full h-full object-cover object-top"
//             />
//           </AspectRatio>

//           <CardHeader className="pb-2">
//             <div className="flex items-center gap-2 mb-1">
//               <div
//                 className="w-2 h-2 rounded-full"
//                 style={{ background: project.color, boxShadow: `0 0 6px ${project.color}40` }}
//               />
//               <CardTitle className="text-lg">{project.title}</CardTitle>
//             </div>
//             <CardDescription className="leading-relaxed">{project.description}</CardDescription>
//           </CardHeader>

//           <CardContent className="pt-0">
//             <div className="flex flex-wrap gap-2 mb-3">
//               {project.tech.map((t) => (
//                 <Badge key={t} variant="outline" className="text-xs font-mono">
//                   {t}
//                 </Badge>
//               ))}
//             </div>

//             <motion.div
//               className="text-sm font-medium"
//               style={{ color: project.color }}
//               animate={{ x: hovered ? 5 : 0 }}
//             >
//               View Project →
//             </motion.div>
//           </CardContent>
//         </div>
//       </Card>
//     </motion.div>
//   );
// };

// const ProjectsSection = () => {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
//   const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

//   return (
//     <section id="projects" className="section-container" ref={ref}>
//       <motion.div className="max-w-6xl mx-auto w-full" style={{ y }}>
//         <motion.div
//           className="mb-16"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           <p className="text-sm font-mono text-primary tracking-[0.2em] uppercase mb-2">Portfolio</p>
//           <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
//             Featured <span className="text-gradient">Projects</span>
//           </h2>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {projects.map((project, i) => (
//             <ProjectCard key={project.title} project={project} index={i} />
//           ))}
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default ProjectsSection;
