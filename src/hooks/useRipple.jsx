import { useCallback } from "react";

export default function useRipple(color) {
  const createRipple = useCallback(e => {
    const ripple = document.createElement("span");

    ripple.classList.add("animate-ripple");

    let button = e.currentTarget;
    let buttonRect = button.getBoundingClientRect();
    let size = Math.max(buttonRect.width, buttonRect.height);

    ripple.style.height = ripple.style.width = `${size}px`;
    ripple.style.background = color;

    ripple.style.left = `${e.clientX - buttonRect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - buttonRect.top - size / 2}px`;
    ripple.classList.add("ripple");

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 800);
  }, []);

  return { createRipple };
}
