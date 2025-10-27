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
      className="relative flex items-center justify-center w-12 h-12 select-none bg-transparent border-0 outline-none"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <motion.div
        animate={
          active
            ? { scale: 1.6, y: -6 }
            : { scale: 1, y: 0 }
        }
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        className={active ? "text-white" : "text-white/50"}
        style={{
          filter: active ? "brightness(1.32)" : "brightness(0.85)",
        }}
      >
        <Icon size={24} strokeWidth={2.2} />
      </motion.div>

      {active && (
        <motion.div
          layoutId="active-dot"
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
          className="absolute bottom-0.5 w-2 h-2 rounded-full bg-white"
        />
      )}
    </motion.button>
  );
}
