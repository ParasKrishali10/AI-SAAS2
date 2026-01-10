import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import { useCallback, useEffect, useRef, useState } from "react"
import { pusherClient } from "@/lib/pusher-client"
import { data } from "framer-motion/client"
import toast from "react-hot-toast"

type Reaction = {
  emoji: string
  count: number
}

type Props = {
  messageId: string,
  onClose :()=>void
}

const MAX_VISIBLE = 3

export function AnimatedReactions({ messageId ,onClose}: Props) {
  const [reactions, setReactions] = useState<Reaction[]>([])
  // const [loading, setLoading] = useState(true)
  const [discordMessageIds,setDiscordMessageId]=useState<string|null>(null)
  const visibleReactions = reactions.slice(0, MAX_VISIBLE)
  const hiddenReactions = reactions.slice(MAX_VISIBLE)
// console.log("cummm")
  const fetchAnalytics = useCallback(async () => {
    // console.log(messageId)
    const resi = await axios.get(`/api/analytics/?messageId=${messageId}`)
    const discordMessageId = resi.data
    if (!discordMessageId) {

      return
    }

    setDiscordMessageId(discordMessageId)
    const res = await axios.get(
      `/api/analytics/reactions?messageId=${discordMessageId}`
    )

    setReactions(res.data.reactions || [])

  }, [messageId])

 useEffect(() => {
  const load = async () => {
    try {
      await fetchAnalytics()
    } catch (error) {
      console.log(error)
    } finally {
      onClose()
    }
  }
  load()
}, [fetchAnalytics,onClose])




  useEffect(() => {
     const handler=(e:Event)=>{
      const custom=e as CustomEvent
      if(custom.detail.messageId===discordMessageIds)
      {
        console.log("Analysis recorded")
        // alert("Look for analaysis")

        fetchAnalytics()
      }
     }
     window.addEventListener("reaction-update",handler)

     return ()=>{
      window.removeEventListener("reaction-update",handler)
     }

  }, [messageId, fetchAnalytics])

  if ( reactions.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex max-w-full items-center gap-2 overflow-hidden rounded-full bg-black/40 px-3 py-2 backdrop-blur-md shadow-lg"
    >
      {visibleReactions.map((r, i) =>
        r.count > 0 ? (
          <ReactionItem key={r.emoji} reaction={r} index={i} />
        ) : null
      )}

      {hiddenReactions.length > 0 && (
        <OverflowReactions reactions={hiddenReactions} />
      )}
    </motion.div>
  )
}


function ReactionItem({
  reaction,
  index,
}: {
  reaction: Reaction
  index: number
}) {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: index * 0.05,
        type: "spring",
        stiffness: 400,
      }}
      className="flex shrink-0 items-center gap-1"
    >
      <motion.span
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: index * 0.2,
          ease: "easeInOut",
        }}
        className="text-lg"
      >
        {reaction.emoji}
      </motion.span>

      <span className="text-sm text-slate-300">{reaction.count}</span>
    </motion.div>
  )
}



function OverflowReactions({ reactions }: { reactions: Reaction[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative shrink-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-full bg-white/10 px-2 py-1 text-sm text-white hover:bg-white/20"
      >
        +{reactions.length}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute right-0 top-full z-50 mt-3 flex gap-2 rounded-xl bg-black/80 p-3 backdrop-blur-md"
          >
            {reactions.map((r) => (
              <div
                key={r.emoji}
                className="flex items-center gap-1"
              >
                <span className="text-lg">{r.emoji}</span>
                <span className="text-sm text-slate-300">{r.count}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
