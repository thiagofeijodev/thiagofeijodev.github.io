import { renderHook, act } from "@testing-library/react";
import useSnapScroll from "../useSnapScroll";

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
  });

  afterEach(() => {
    jest.useRealTimers();
    window.location.hash = "";
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
    const el = { scrollIntoView };
    jest.spyOn(document, "getElementById").mockReturnValue(el);
    window.location.hash = "#skills";

    renderHook(() => useSnapScroll());

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(document.getElementById).toHaveBeenCalledWith("skills");
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });

    document.getElementById.mockRestore();
  });

  test("snaps to content on wheel down in hero zone", () => {
    renderHook(() => useSnapScroll());

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

  test("snaps to hero on wheel up near content boundary", () => {
    Object.defineProperty(window, "scrollY", {
      value: 760,
      writable: true,
      configurable: true,
    });

    renderHook(() => useSnapScroll());

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

  test("snaps to content on touch swipe up in hero zone", () => {
    renderHook(() => useSnapScroll());

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
