const express = require("express");
const port = process.env.PORT || 3333;
const app = express();
const db = require("./db");
const cors = require("cors");

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   next();
// });
app.use(cors());
app.use(express.json());

app.get("/api/article", (req, res) => {
  db.query("select * from articles;", (err, result) => {
    res.json(result);
  });
});

app.get("/api/article/:id", (req, res) => {
  const { id } = req.params;
  db.query("select * from articles where _id=?", [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internet Server Error" });
    }
    res.json(result);
  });
});

app.post("/api/article", (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  db.query(
    "insert into articles (title,body) value(?,?)",
    [title, body],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "databases error" });
      }
      res.json(result);
    }
  );
});

app.put("/api/article/:id", (req, res) => {
  let { id } = req.params;
  let title = req.body.title;
  let body = req.body.body;
  console.log(id);

  db.query(
    "UPDATE articles set title= ?, body=? where _id= ?",
    [title, body, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(404).json({ error: "databases error " });
      }
      res.json(result);
    }
  );
});

app.delete("/api/article/:id", (req, res) => {
  const { id } = req.params;
  db.query("delete from articles where _id=?", [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(404).json({ error: "database error" });
    }
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
