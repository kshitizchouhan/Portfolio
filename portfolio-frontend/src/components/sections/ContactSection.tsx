import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const contactInfo = [
  { icon: Mail, label: "Email", value: "chouhankshitiz25@gmail.com", href: "mailto:chouhankshitiz25@gmail.com" },
  { icon: MapPin, label: "Location", value: "Chennai, India", href: null },
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/kshitizchouhan" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/kshitiz-chouhan-3689b831a" },
  { icon: Twitter, label: "Twitter", href: "https://x.com/KshitizChouhan" },
];

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Strict validation: Ensure no fields are empty or just whitespace
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setSending(true);

      const API_URL = "https://portfolio-backend-u9h2.onrender.com/api/contact";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message.");
      }

      toast.success("Message sent successfully! I will get back to you soon. ✅");
      
      // Reset form on success
      setForm({ name: "", email: "", message: "" });

    } catch (error: any) {
      console.error("Submission Error:", error);
      toast.error(error.message || "Unable to reach the server. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section-container pb-20" ref={ref}>
      <motion.div className="max-w-5xl mx-auto w-full" style={{ y }}>
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-mono text-primary tracking-[0.2em] uppercase mb-2">
            Get in Touch
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Let's <span className="text-gradient">Connect</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* CONTACT INFO CARD */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 4 }}
              >
                <Card className="glass-panel border-border">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-mono">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-foreground hover:text-primary transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-foreground">{item.value}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            <div className="flex gap-3 pt-2">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <s.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* FORM CARD */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Card className="glass-panel border-border">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-mono text-muted-foreground">Name</Label>
                    <Input
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your Full Name"
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-mono text-muted-foreground">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="email@example.com"
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-mono text-muted-foreground">Message</Label>
                    <Textarea
                      id="message"
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about your project or inquiry..."
                      className="resize-none h-32 bg-background/50"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={sending}
                    className="w-full shadow-lg shadow-primary/20"
                  >
                    {sending ? "Sending Message..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.p
          className="text-center text-xs text-muted-foreground mt-12 font-mono"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          © 2026 — Kshitiz Chouhan
        </motion.p>
      </motion.div>
    </section>
  );
};

export default ContactSection;