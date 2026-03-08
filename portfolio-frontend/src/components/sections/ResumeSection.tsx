"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ResumeSection = () => {
  const ref = useRef(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <>
      {/* Resume Section */}
      <section id="resume" className="section-container py-24" ref={ref}>
        <motion.div
          className="max-w-2xl mx-auto w-full text-center"
          style={{ y }}
        >
          {/* Heading */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-mono text-primary tracking-[0.2em] uppercase mb-2">
              Resume
            </p>

            <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
              My <span className="text-gradient">Resume</span>
            </h2>

            <p className="text-muted-foreground mt-4">
              Download or preview my resume to learn more about my qualifications.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Download */}
            <Button asChild className="shadow-lg shadow-primary/20">
              <a href="/resume.pdf" download>
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </a>
            </Button>

            {/* Preview */}
            <Button
              variant="outline"
              onClick={() => setPreviewOpen(true)}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview Resume
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Resume Preview Modal */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-0 overflow-hidden">

          <DialogHeader className="p-4 border-b">
            <DialogTitle>Resume Preview</DialogTitle>
          </DialogHeader>

          <div className="w-full h-full">
            <iframe
              src="/resume.pdf#view=FitH"
              className="w-full h-[calc(90vh-70px)]"
              title="Resume Preview"
            />
          </div>

        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResumeSection;
// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef, useState } from "react";
// import { Download, Eye, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// const ResumeSection = () => {
//   const ref = useRef(null);
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
//   const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

//   return (
//     <>
//       <section id="resume" className="section-container" ref={ref}>
//         <motion.div className="max-w-2xl mx-auto w-full text-center" style={{ y }}>
//           <motion.div
//             className="mb-12"
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <p className="text-sm font-mono text-primary tracking-[0.2em] uppercase mb-2">Resume</p>
//             <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
//               My <span className="text-gradient">Resume</span>
//             </h2>
//             <p className="text-muted-foreground mt-4">
//               Download or preview my resume to learn more about my qualifications.
//             </p>
//           </motion.div>

//           <motion.div
//             className="flex flex-col sm:flex-row gap-4 justify-center"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.2, duration: 0.6 }}
//           >
//             <Button asChild className="cursor-none shadow-lg shadow-primary/20">
//               <a href="/resume.pdf" download>
//                 <Download className="w-4 h-4 mr-2" />
//                 Download Resume
//               </a>
//             </Button>

//             <Button
//               variant="outline"
//               onClick={() => setPreviewOpen(true)}
//               className="cursor-none"
//             >
//               <Eye className="w-4 h-4 mr-2" />
//               Preview Resume
//             </Button>
//           </motion.div>
//         </motion.div>
//       </section>

//       <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
//         <DialogContent className="max-w-4xl h-[80vh] p-0">
//           <DialogHeader className="p-4 pb-0">
//             <DialogTitle>Resume Preview</DialogTitle>
//           </DialogHeader>
//           <div className="flex-1 p-4 pt-0 h-full">
//             <iframe
//               src="/resume.pdf"
//               className="w-full h-full rounded-lg border border-border"
//               title="Resume Preview"
//             />
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//               <p className="text-muted-foreground text-sm font-mono">
//                 Place your resume.pdf in the public/ folder
//               </p>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default ResumeSection;
