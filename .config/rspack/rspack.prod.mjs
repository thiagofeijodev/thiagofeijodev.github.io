import path from "path";
import WorkboxPlugin from "workbox-webpack-plugin";
import FaviconsRspackPlugin from "favicons-rspack-plugin";
import CompressionPlugin from "compression-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import common from "./rspack.common.mjs";
import rspack from "@rspack/core";

export default () => {
  const config = {
    ...common,
    mode: process.env.NODE_ENV === "development" ? "development" : "production",
    devtool: false,
    output: {
      ...common.output,
      path: path.resolve(process.cwd(), "docs"),
    },
    plugins: [
      new rspack.EnvironmentPlugin(["REACT_APP_GA_ID"]),
      new rspack.CopyRspackPlugin({
        patterns: [
          { from: "public/CNAME" },
          { from: "public/404.html" },
          { from: "public/cv.pdf" },
        ],
      }),
      new HtmlWebpackPlugin({
        favicon: "public/logo.png",
        template: path.join(process.cwd(), "public/index.html"),
        filename: path.join(process.cwd(), "docs/index.html"),
        inject: "body",
      }),
      new FaviconsRspackPlugin({
        logo: "public/logo.png",
        cache: true,
        inject: true,
        mode: "webapp",
        manifest: "public/manifest.json",
        favicons: {
          background: "#212121",
          theme_color: "#212121",
          appShortName: "thiagofeijodev",
          appName: "thiagofeijodev",
          appDescription:
            "React Developer specializing in high-performance, scalable applications. Expert in modern JavaScript, Node.js, and full-stack development. OpenJS certified.",
          developerName: "Thiago Feijó",
          developerURL: "https://feijo.dev",
          start_url: "/index.html",
          scope: "/",
          dir: "ltr",
          display_override: ["window-control-overlay", "minimal-ui"],
          display: "standalone",
          categories: ["business", "productivity", "utilities"],
          appleStatusBarStyle: "black-translucent", // Style for Apple status bar: "black-translucent", "default", "black". `string`
          version: "1.0",
          shortcuts: [
            {
              name: "Experience",
              url: "/#experience",
              icon: "public/logo.png",
            },
            {
              name: "Education",
              url: "/#education",
              icon: "public/logo.png",
            },
            {
              name: "Certifications",
              url: "/#certifications",
              icon: "public/logo.png",
            },
            {
              name: "Projects",
              url: "/#projects",
              icon: "public/logo.png",
            },
            {
              name: "Skills",
              url: "/#skills",
              icon: "public/logo.png",
            },
          ],
        },
      }),
      new CompressionPlugin({
        filename: "[path][base].gz",
      }),
      new WorkboxPlugin.GenerateSW(),
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  };

  return config;
};
