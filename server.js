const express = require("express");
const actuator = require("express-actuator");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 8080;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const actuatorOptions = {
  basePath: "/actuator", // It will set /management/info instead of /info
  infoGitMode: "simple", // the amount of git information you want to expose, 'simple' or 'full',
  infoBuildOptions: null, // extra information you want to expose in the build object. Requires an object.
  infoDateFormat: null, // by default, git.commit.time will show as is defined in git.properties. If infoDateFormat is defined, moment will format git.commit.time. See https://momentjs.com/docs/#/displaying/format/.
  customEndpoints: [], // array of custom endpoints
};

app.prepare().then(() => {
  const server = express();

  server.use(actuator(actuatorOptions));

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
