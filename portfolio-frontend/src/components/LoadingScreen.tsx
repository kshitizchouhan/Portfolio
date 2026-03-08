import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-8">
            <div className="relative w-24 h-24">
              <div
                className="absolute inset-0 rounded-full animate-spin-slow"
                style={{
                  border: "2px solid transparent",
                  borderTopColor: "hsl(230 65% 55%)",
                  borderRightColor: "hsl(260 45% 60% / 0.5)",
                }}
              />
              <div
                className="absolute inset-2 rounded-full"
                style={{
                  border: "2px solid transparent",
                  borderBottomColor: "hsl(230 65% 55% / 0.4)",
                  animation: "spin 1.5s linear infinite reverse",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-3 h-3 rounded-full animate-pulse-glow"
                  style={{ background: "hsl(230 65% 55%)" }}
                />
              </div>
            </div>
            <motion.p
              className="text-sm font-mono tracking-[0.3em] uppercase text-muted-foreground"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Initializing
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
