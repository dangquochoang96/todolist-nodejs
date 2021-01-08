const express = require('express')
const bodyParser = require('body-parser')
const date = require(__dirname + "/date.js")
const app = express()
const port = 5000


const items = ["Go Market", "Buy Food", "Eat Food"]
const workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', (_req, res) => {
  const day = date.getDate()

  res.render("list", { listTitle: day, newListItem: items });
})
app.post("/", (req, res) => {
  const item = req.body.newItem

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work")
  } else {
    items.push(item)
    res.redirect("/");
  }

});
app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work List", newListItem: workItems })
})
app.get("/work", (req, res) => {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
