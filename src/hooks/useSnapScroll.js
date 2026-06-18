import { useState, useEffect, useCallback } from "react";

const THRESHOLD = 50;

const getExperienceTop = () => {
  const el = document.getElementById("experience");
  return el
    ? el.getBoundingClientRect().top + window.scrollY
    : window.innerHeight;
};

export const getSnapTarget = (scrollY, experienceTop, direction) => {
  const vh = window.innerHeight;

  if (scrollY <= THRESHOLD) {
    return direction === "down" ? experienceTop : null;
  }

  if (scrollY > THRESHOLD && scrollY < vh) {
    return direction === "down" ? experienceTop : 0;
  }

  if (Math.abs(scrollY - experienceTop) <= THRESHOLD && direction === "up") {
    return 0;
  }

  return null;
};

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

  const scrollToExperience = useCallback(() => {
    window.scrollTo({ top: getExperienceTop(), behavior: "smooth" });
  }, []);

  useEffect(() => {
    let isSnapping = false;
    let touchStartY = 0;

    const snapTo = (top) => {
      if (isSnapping) return;
      isSnapping = true;
      window.scrollTo({ top, behavior: "smooth" });
      setTimeout(() => {
        isSnapping = false;
      }, 1000);
    };

    const trySnap = (direction) => {
      if (isSnapping) return;
      const target = getSnapTarget(
        window.scrollY,
        getExperienceTop(),
        direction,
      );
      if (target != null) snapTo(target);
    };

    const onWheel = (e) => {
      if (isSnapping) return;
      const direction = e.deltaY > 0 ? "down" : e.deltaY < 0 ? "up" : null;
      if (!direction) return;
      const target = getSnapTarget(
        window.scrollY,
        getExperienceTop(),
        direction,
      );
      if (target != null) {
        e.preventDefault();
        snapTo(target);
      }
    };

    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchEnd = (e) => {
      if (isSnapping) return;
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (dy > 30) trySnap("down");
      else if (dy < -30) trySnap("up");
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

  return { showBelow, scrollToExperience };
};

export default useSnapScroll;
