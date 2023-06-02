const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://api.superjob.ru",
      changeOrigin: true,
      pathRewrite: { "/api": "" },
    })
  );
};
