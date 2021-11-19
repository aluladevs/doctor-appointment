import nc from "next-connect";
import DatabaseMiddleware from "../../lib/database";

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res, next) => {
    res.status(404).end("Page is not found");
  },
})
    .use(DatabaseMiddleware)
    .get((req, res) => {
      res.send("Hello world");
    })
    .post((req, res) => {
      res.json({ hello: "world" });
    })
    .put(async (req, res) => {
      res.end("async/await is also supported!");
    })
    .patch(async (req, res) => {
      throw new Error("Throws me around! Error can be caught and handled.");
    });

export default handler;