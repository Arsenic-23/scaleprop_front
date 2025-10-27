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
      <motion.div
        animate={
          active ? { scale: 1.45, y: -4 } : { scale: 1, y: 0 }
        }
        transition={{ type: "spring", stiffness: 390, damping: 28 }}
        className={`${
          active
            ? "text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]"
            : "text-white/70"
        }`}
        style={{
          filter: active ? "brightness(1.25)" : "brightness(0.95)",
        }}
      >
        <Icon size={22} strokeWidth={2.2} />
      </motion.div>

      {active && (
        <motion.div
          layoutId="activeIndicator"
          transition={{ type: "spring", stiffness: 440, damping: 30 }}
          className="absolute bottom-1.5 w-2.5 h-2.5 rounded-full bg-white
            shadow-[0_0_20px_rgba(255,255,255,1)]"
        />
      )}
    </motion.button>
  );
}
