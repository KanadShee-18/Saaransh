interface BgGradientProps {
  className?: string;
  children?: React.ReactNode;
}

export const BgGradient = ({ className, children }: BgGradientProps) => {
  return (
    <div className={`relative isolate ${className}`}>
      <div
        aria-hidden={"true"}
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-30"
      >
        <div
          style={{
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 82% 59%, 91% 100%, 68% 70%, 35% 100%, 45% 59%, 18% 35%, 82% 35%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-25 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        ></div>
      </div>
    </div>
  );
};
