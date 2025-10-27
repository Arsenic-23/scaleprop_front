import { motion } from "framer-motion";

export default function NavItem({
  icon: Icon,
  active,
  onClick,
  label,
  onLongPressStart,
  onLongPressEnd,
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      onClick={onClick}
      onMouseDown={() => onLongPressStart(label)}
      onMouseUp={onLongPressEnd}
      onMouseLeave={onLongPressEnd}
      onTouchStart={() => onLongPressStart(label)}
      onTouchEnd={onLongPressEnd}
      className="relative flex items-center justify-center w-12 h-12 bg-transparent"
    >
      {active && (
        <motion.div
          layoutId="active-glow"
          transition={{ type: "spring", stiffness: 380, damping: 36 }}
          className="absolute w-10 h-10 rounded-full
          bg-white/18 blur-[24px] pointer-events-none"
        />
      )}

      <motion.div
        animate={
          active
            ? { scale: 1.55, y: -6 }
            : { scale: 1, y: 0 }
        }
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        className={active ? "text-white" : "text-white/60"}
        style={{
          filter: active ? "brightness(1.32)" : "brightness(0.85)",
        }}
      >
        <Icon size={24} strokeWidth={2.3} />
      </motion.div>

      {active && (
        <motion.div
          layoutId="active-indicator"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute bottom-0.5 w-2 h-2 rounded-full bg-white"
        />
      )}
    </motion.button>
  );
}
