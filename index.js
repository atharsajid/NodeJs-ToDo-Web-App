const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.get("/", function (req, res) {
    // ./ use to access file or folder in current folder/directory
    fs.readdir("./files", function (err, files) {

        res.render("index", { files: files });
    })
})
app.get("/file/:filename", function (req, res) {
    //utf-8 use to convert hexamal to data to readable format
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, fileData) {
        res.render("show", { data: fileData, fileName: req.params.filename })

    })
})

app.post("/create", function (req, res, next) {
    if (!req.body.title) {
        res.status(400).send("Title is required.")
        return;
    }
    if (!req.body.details) {
        res.status(400).send("Details is required.")
        return;
    }
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function (err) {
        res.redirect('/')
    });
})

app.post("/delete/:fileName", function (req, res) {
    fs.unlink(`./files/${req.params.fileName}`, function (err) {
        if (err) {
            res.status("404").send("File not found")
        } else {
            res.redirect("/")
        }
    })

})


app.post("/edit/:fileName", function (req, res) {
    console.log(req.body.description)

    let newFileName = req.body.title.split(' ').join('');

    newFileName = req.body.title.includes(".txt") ? req.body.title : req.body.title + ".txt";


    fs.writeFile(`./files/${req.params.fileName}`, req.body.description, function (err) {
        if (err) {
            res.status(400).send("Something went wrong");
        } else {
            fs.rename(`./files/${req.params.fileName}`, `./files/${newFileName}`, function (err) {

                if (err) {
                    console.log(err.stack);

                    res.status(400).send("Something went wrong")
                } else {
                    res.redirect(`/file/${newFileName}`)
                }
            })
        }

    })





})

app.listen(3000);