export default function Loading() {
  return (
    <div
      className="absolute inset-0
        z-10 grid place-content-center bg-neutral-800 bg-opacity-40 backdrop-blur-2xl"
    >
      <div className="h-[3em] w-[3em] animate-spin rounded-full border-[3px] border-[hsla(251,100%,73%,0.2)] border-t-indigo-400"></div>
    </div>
  );
}
