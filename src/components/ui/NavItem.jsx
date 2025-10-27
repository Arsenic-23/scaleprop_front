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
      className="relative flex items-center justify-center w-12 h-12"
    >
      {/* behind icon glow */}
      {active && (
        <motion.div
          layoutId="active-glow"
          transition={{ type: "spring", stiffness: 380, damping: 36 }}
          className="absolute w-10 h-10 rounded-full
          bg-white/20 blur-[18px] pointer-events-none"
        />
      )}

      {/* main icon */}
      <motion.div
        animate={
          active
            ? { scale: 1.55, y: -6 }
            : { scale: 1, y: 0 }
        }
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        className={
          active
            ? "text-white drop-shadow-[0_0_28px_rgba(255,255,255,1)]"
            : "text-white/65"
        }
        style={{
          filter: active ? "brightness(1.32)" : "brightness(0.9)",
        }}
      >
        <Icon size={24} strokeWidth={2.3} />
      </motion.div>

      {/* dot indicator */}
      {active && (
        <motion.div
          layoutId="active-indicator"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute bottom-0.5 w-2.5 h-2.5 rounded-full
          bg-white shadow-[0_0_20px_rgba(255,255,255,1)]"
        />
      )}
    </motion.button>
  );
}
