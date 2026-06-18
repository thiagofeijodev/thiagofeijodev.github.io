import { renderHook, act } from "@testing-library/react";
import useSnapScroll, { getSnapTarget } from "../useSnapScroll";

const mockExperience = (top) => {
  jest.spyOn(document, "getElementById").mockImplementation((id) => {
    if (id !== "experience") return null;
    return {
      getBoundingClientRect: () => ({ top: top - window.scrollY }),
    };
  });
};

describe("getSnapTarget", () => {
  const experienceTop = 800;

  beforeEach(() => {
    Object.defineProperty(window, "innerHeight", {
      value: 800,
      writable: true,
      configurable: true,
    });
  });

  test("snaps down from hero top", () => {
    expect(getSnapTarget(0, experienceTop, "down")).toBe(800);
  });

  test("snaps up from partial hero scroll", () => {
    expect(getSnapTarget(200, experienceTop, "up")).toBe(0);
  });

  test("snaps down from partial hero scroll", () => {
    expect(getSnapTarget(200, experienceTop, "down")).toBe(800);
  });

  test("does not snap inside experience section", () => {
    expect(getSnapTarget(2000, experienceTop, "up")).toBeNull();
    expect(getSnapTarget(2000, experienceTop, "down")).toBeNull();
  });

  test("snaps up near experience boundary", () => {
    expect(getSnapTarget(780, experienceTop, "up")).toBe(0);
  });
});

describe("useSnapScroll", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    window.scrollTo = jest.fn();
    window.requestAnimationFrame = (cb) => {
      cb();
      return 0;
    };
    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(window, "innerHeight", {
      value: 800,
      writable: true,
      configurable: true,
    });
    window.location.hash = "";
    mockExperience(800);
  });

  afterEach(() => {
    jest.useRealTimers();
    window.location.hash = "";
    document.getElementById.mockRestore();
  });

  test("showBelow starts false and becomes true after 500ms", () => {
    const { result } = renderHook(() => useSnapScroll());
    expect(result.current.showBelow).toBe(false);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.showBelow).toBe(true);
  });

  test("scrolls to hash target when showBelow becomes true", () => {
    const scrollIntoView = jest.fn();
    const el = {
      scrollIntoView,
      getBoundingClientRect: () => ({ top: 4000 }),
    };
    document.getElementById.mockImplementation((id) =>
      id === "skills" ? el : null,
    );
    window.location.hash = "#skills";

    renderHook(() => useSnapScroll());

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
  });

  test("snaps to experience on wheel down in hero zone", () => {
    renderHook(() => useSnapScroll());

    act(() => {
      jest.advanceTimersByTime(500);
    });

    act(() => {
      window.dispatchEvent(
        new WheelEvent("wheel", { deltaY: 100, bubbles: true }),
      );
    });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 800,
      behavior: "smooth",
    });
  });

  test("snaps to hero on wheel up from partial hero scroll", () => {
    Object.defineProperty(window, "scrollY", {
      value: 200,
      writable: true,
      configurable: true,
    });

    renderHook(() => useSnapScroll());

    act(() => {
      jest.advanceTimersByTime(500);
    });

    act(() => {
      window.dispatchEvent(
        new WheelEvent("wheel", { deltaY: -100, bubbles: true }),
      );
    });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  test("snaps to hero on wheel up near experience boundary", () => {
    Object.defineProperty(window, "scrollY", {
      value: 780,
      writable: true,
      configurable: true,
    });

    renderHook(() => useSnapScroll());

    act(() => {
      jest.advanceTimersByTime(500);
    });

    act(() => {
      window.dispatchEvent(
        new WheelEvent("wheel", { deltaY: -100, bubbles: true }),
      );
    });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  test("does not snap on wheel inside experience section", () => {
    Object.defineProperty(window, "scrollY", {
      value: 2000,
      writable: true,
      configurable: true,
    });

    renderHook(() => useSnapScroll());

    act(() => {
      jest.advanceTimersByTime(500);
    });

    act(() => {
      window.dispatchEvent(
        new WheelEvent("wheel", { deltaY: -100, bubbles: true }),
      );
    });

    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  test("snaps to experience on touch swipe up in hero zone", () => {
    renderHook(() => useSnapScroll());

    act(() => {
      jest.advanceTimersByTime(500);
    });

    act(() => {
      window.dispatchEvent(
        new TouchEvent("touchstart", {
          touches: [{ clientY: 200 }],
          bubbles: true,
        }),
      );
      window.dispatchEvent(
        new TouchEvent("touchend", {
          changedTouches: [{ clientY: 100 }],
          bubbles: true,
        }),
      );
    });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 800,
      behavior: "smooth",
    });
  });
});
