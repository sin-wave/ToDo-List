const express = require("express");
const path = require("path");
const port = 8000;
//const db = require("./config/mongoose");
const ToDo_list = require("./models/list");

const app = express();
app.use(express.urlencoded());
app.use(express.static("asset"));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// var value = [{
//     date: "10/09/2020",
//     work: "study",
//     status: "pending"
// }, {
//     date: "10/09/2021",
//     work: "play",
//     status: "pending"
// }, {
//     date: "10/09/2022",
//     work: "bath",
//     status: "pending"
// }];

app.get("/", function(req, res) {
    ToDo_list.find({}, function(e, newdata) {
        if (e) {
            console.log("Error in fetching the data");
        }
        return res.render("home", {
            title: "My To Do List",
            list: newdata
        })
    });
});


app.post("/create-list", function(req, res) {
    ToDo_list.create({
        date: req.body.date,
        work: req.body.work,
    }, function(e, newList) {
        if (e) {
            console.log("Error in adding the file");
            return;
        }
        console.log("###########", newList);
        return res.redirect("back");

    });
});
app.get("/delete-list", function(req, res) {
    let id = req.query.id;
    ToDo_list.findByIdAndDelete(id, function(e) {
        if (e) {
            console.log("Error in deleting");
        }
        return res.redirect("back");
    });
});
app.post("/mark-complete", function(req, res) {
    console.log(req.body);
    return res.redirect("back");
});


app.listen(port, function(e) {
    if (e) {
        console.log(e);
    }
    console.log("server is running at port:", port);

});