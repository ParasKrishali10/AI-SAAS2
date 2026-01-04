import { motion, AnimatePresence } from "framer-motion"
const reactions = [
  { emoji: "🤔", count: 2 },
  { emoji: "💯", count: 1 },
  { emoji: "😆", count: 2 },
  { emoji: "😢", count: 1 },
]

export function AnimatedReactions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex items-center gap-3 rounded-full bg-black/40 px-4 py-2 backdrop-blur-md shadow-lg"
    >
      {reactions.map((r, i) => (
        <motion.div
          key={r.emoji}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: i * 0.1,
            type: "spring",
            stiffness: 400,
          }}
          className="flex items-center gap-1"
        >
          {/* Emoji pulse */}
          <motion.span
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
            className="text-lg"
          >
            {r.emoji}
          </motion.span>

          {/* Count animation */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-slate-300"
          >
            {r.count}
          </motion.span>
        </motion.div>
      ))}
    </motion.div>
  )
}
