const express = require("express");
const blogRouter = require("./routes/blogs");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const app = express();
mongoose.connect(
  "mongodb+srv://blog:ZC6xSHZN8XVre1dC@cluster0.ii5mt.mongodb.net/Cluster0?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

blogRouter.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public"));

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(methodOverride("_method"));

app.use("/blogs", blogRouter);
app.use("/blogs/edit", blogRouter);
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(4000);
