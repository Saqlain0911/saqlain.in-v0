const Preloader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-portfolio-bg">
      <div className="text-6xl font-bold">
        <span className="text-portfolio-accent">Loading</span>
        <span className="text-white">
          <span className="inline-block animate-dot-fill-1">.</span>
          <span className="inline-block animate-dot-fill-2">.</span>
          <span className="inline-block animate-dot-fill-3">.</span>
        </span>
      </div>
    </div>
  );
};

export default Preloader;
