const path = require("path");
const fs = require("fs");
const express = require("express");
const serialize = require("serialize-javascript");

const { render } = require("../server-dist/index.js");

const PORT = process.env.PORT || 3006;
const app = express();

// const manifest = require("../client-build/manifest.json");
// console.log("render", render);

app.use(express.static("./client-dist"));

app.get("/*", (req, res) => {
  // inside a request
  // use `some` to imitate `<Switch>` behavior of selecting only
  // the first to match
  // promise.then((data) => {
  try {
    
    render(req).then(({ preloadedState, context, app }) => {
      const indexFile = path.resolve("./client-dist/client.html");
      fs.readFile(indexFile, "utf8", (err, rootData) => {
        if (err) {
          console.error("Something went wrong:", err);
          return res.status(500).send("Oops, better luck next time!");
        }

        // console.log('context=====', context);

        if (context.status === 404) {
          res.status(404);
        }

        if (context.url) {
          return res.redirect(301, context.url);
        }

        return res.send(
          rootData
            .replace(`<div id="root">`, `<div id="root">${app}`)
            .replace(
              "<head>",
              `<head><script>window.__PRELOADED_STATE__ = ${JSON.stringify(
                preloadedState
              ).replace(/</g, "\\u003c")}</script>`
            )
        );
      });
    });
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

app.listen(PORT, () => {
  console.log(`😎 Server is listening on port ${PORT}`);
});
