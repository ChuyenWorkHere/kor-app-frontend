import React from "react";

const AnimatedBackground = () => {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 overflow-hidden" style={{ zIndex: -10 }} >
      
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient"></div>

      
      <div className="position-absolute top-0 start-0 w-100 h-100 opacity-50">
        <div className="position-absolute" style={{ top: "2.5rem", left: "2.5rem" }}>
          <span className="text-pink fs-1 animate-pulse">🌸</span>
        </div>
        <div className="position-absolute animate-bounce delay-1s" style={{ top: "8rem", right: "4rem" }}>
          <span className="text-pink fs-2 animate-bounce">🌺</span>
        </div>
        <div className="position-absolute animate-bounce delay-1s" style={{ top: "16rem", left: "25%" }}>
          <span className="text-pink fs-1 animate-pulse delay-1s">🌺</span>
        </div>
        <div className="position-absolute" style={{ bottom: "8rem", right: "8rem" }}>
          <span className="text-pink fs-1 animate-pulse delay-2s">🌺</span>
        </div>
        <div className="position-absolute" style={{ top: "24rem", right: "33%" }}>
          <span className="text-pink fs-2 animate-bounce delay-05s">🌸</span>
        </div>
      </div>

      
      <div className="position-absolute top-0 start-0 w-100 h-100 opacity-50">
        <div className="rounded-circle bg-pink position-absolute animate-pulse"
             style={{ top: "5rem", left: "5rem", width: "16px", height: "16px" }}></div>
        <div className="rounded-circle bg-primary position-absolute animate-bounce delay-1s"
             style={{ top: "10rem", right: "10rem", width: "24px", height: "24px" }}></div>
        <div className="rounded-circle bg-purple position-absolute animate-pulse delay-15s"
             style={{ bottom: "10rem", left: "10rem", width: "20px", height: "20px" }}></div>
        <div className="rounded-circle bg-pink position-absolute animate-bounce delay-08s"
             style={{ top: "20rem", left: "33%", width: "12px", height: "12px" }}></div>
        <div className="rounded-circle bg-info position-absolute animate-pulse delay-22s"
             style={{ bottom: "15rem", right: "25%", width: "16px", height: "16px" }}></div>
      </div>

      <div className="position-absolute top-0 start-0 w-100 h-100 opacity-50 dotted-pattern"></div>
      <div className="position-fixed top-0 start-0 w-100 h-100 pointer-events-none radial-glow"></div>
    </div>
  );
};

export default AnimatedBackground;
