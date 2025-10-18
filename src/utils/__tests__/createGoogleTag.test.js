import { createGoogleTag } from "../createGoogleTag";

describe("createGoogleTag", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    // Clean up any previously added scripts
    document.head.innerHTML = "";
    // Reset dataLayer
    delete window.dataLayer;
    delete window.gtag;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  test("does not initialize GA in non-production environment", () => {
    process.env.NODE_ENV = "development";
    process.env.REACT_APP_GA_ID = "G-XXXXXX";

    createGoogleTag();

    expect(document.querySelector("script")).toBeNull();
    expect(window.dataLayer).toBeUndefined();
    expect(window.gtag).toBeUndefined();
  });

  test("does not initialize GA in production without GA ID", () => {
    process.env.NODE_ENV = "production";
    process.env.REACT_APP_GA_ID = "";

    createGoogleTag();

    expect(document.querySelector("script")).toBeNull();
    expect(window.dataLayer).toBeUndefined();
    expect(window.gtag).toBeUndefined();
  });

  test("initializes GA in production with GA ID", () => {
    process.env.NODE_ENV = "production";
    process.env.REACT_APP_GA_ID = "G-XXXXXX";

    createGoogleTag();

    const script = document.querySelector("script");
    expect(script).toBeTruthy();
    expect(script.src).toBe(
      "https://www.googletagmanager.com/gtag/js?id=G-XXXXXX",
    );
    expect(script.async).toBe(true);

    expect(window.dataLayer).toBeDefined();
    expect(Array.isArray(window.dataLayer)).toBe(true);
    expect(typeof window.gtag).toBe("function");
  });
});
