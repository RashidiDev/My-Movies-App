import useRipple from "../hooks/useRipple";

export default function RippleButton({
  children,
  className,
  color = "rgba(255, 255, 255, 0.3)",
  ...props
}) {
  const { createRipple } = useRipple(color);

  return (
    <button
      {...props}
      onClick={createRipple}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
    </button>
  );
}
