import { useState, useEffect } from "react";

const useSnapScroll = () => {
  const [showBelow, setShowBelow] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setShowBelow(true), 500);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!showBelow || !window.location.hash) return;
    const el = document.getElementById(window.location.hash.slice(1));
    requestAnimationFrame(() => el?.scrollIntoView({ behavior: "smooth" }));
  }, [showBelow]);

  useEffect(() => {
    let isSnapping = false;
    let touchStartY = 0;

    const snapToContent = () => {
      if (isSnapping) return;
      isSnapping = true;
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
      setTimeout(() => {
        isSnapping = false;
      }, 1000);
    };

    const snapToHero = () => {
      if (isSnapping) return;
      isSnapping = true;
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        isSnapping = false;
      }, 1000);
    };

    const inSnapZone = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      return y < 50 || (y > vh - 50 && y < vh + 50);
    };

    const onWheel = (e) => {
      if (isSnapping || !inSnapZone()) return;
      if (e.deltaY > 0 && window.scrollY < 50) {
        e.preventDefault();
        snapToContent();
      } else if (e.deltaY < 0 && window.scrollY > window.innerHeight - 50) {
        e.preventDefault();
        snapToHero();
      }
    };

    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchEnd = (e) => {
      if (isSnapping || !inSnapZone()) return;
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (dy > 30 && window.scrollY < 50) snapToContent();
      else if (dy < -30 && window.scrollY > window.innerHeight - 50)
        snapToHero();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return { showBelow };
};

export default useSnapScroll;
