const express = require('express');
var app = express();
const fileUpload = require('express-fileupload');
const controller = require('./src/blog/controller');
const formcontroller = require('./src/blog/formController');
const expressNunjucks = require('express-nunjucks');
const isDev = app.get("env") === "development";
var session = require('express-session');
var params = require('express-params');

const njk = expressNunjucks(app, {
    watch: isDev,
    noCache: isDev,
    autoescape: true
});

params.extend(app);
var bodyParser = require('body-parser');

const port = 3200;
app.use(session({secret: "ewqrrasfaffufdsafuöidsoufehkhfjkhfajkfjkaehui4", resave: false, saveUninitialized: true}));
app.use(bodyParser());
app.use('/Dokumentation', express.static('Dokumentation'));
app.use('/css', express.static('style'));
app.use('/bilder', express.static('bilder'));
app.use('/video', express.static('video'));

app.use(fileUpload({safeFileNames: true, preserveExtension: true}))

app.post('/gallery/upload', function (req, res) {

    var startup_image = req.files.foo;


    startup_image.mv('bilder/' + startup_image.name, function (err) {
        if (err) {
            res.render('/gallery', {
                error: "Wrong Password or Login"
            });
        } else {
            console.log("uploaded");
            formcontroller.addGallery('../bilder/' + startup_image.name, req)
            res.redirect('/gallery');
        }
    });
});
app.post('/gallery/changeUpload/:id', function (req, res) {

    var startup_image = req.files.foo;


    if (startup_image != null || undefined) {
        startup_image.mv('bilder/' + startup_image.name, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("uploaded");
                formcontroller.changeGallery(true, req.params.id, '../bilder/' + startup_image.name, req);
                res.redirect('/gallery');
            }
        });
    } else {
        formcontroller.changeGallery(false, req.params.id, '../bilder/' + startup_image, req);
        res.redirect('/gallery');
    }


});

app.post('/gallery/deleteUpload/:id', function (req, res) {


    formcontroller.deleteGallery(req.params.id);
    res.redirect('/gallery');

});


app.get("/",
    function (req, res) {
        res.render('showIndex');
    });

app.get("/index",
    function (req, res) {

        res.render('showIndex');
    });

app.get("/impressum",
    function (req, res) {

        res.render('impressum');
    });

app.get("/kindertanzen",
    function (req, res) {

        res.render('kindertanzen');
    });

app.get("/kontakt",
    function (req, res) {

        res.render('kontakt');
    });

app.post('/kontakt', function (req, res) {


    console.log("Hallo");
    formcontroller.addKontakt(req);


});

app.get("/linedance",
    function (req, res) {

        res.render('linedance');
    });

app.get("/login",
    function (req, res) {

        res.render('showLogin');
    });

app.get("/rocknroll",
    function (req, res) {

        res.render('rocknroll');
    });

app.get("/specials",
    function (req, res) {

        res.render('specials');
    });

app.get("/streetdance",
    function (req, res) {

        res.render('streetdance');
    });

app.get("/tanzkreise",
    function (req, res) {

        res.render('tanzkreise');
    });

app.get("/tanzkurse",
    function (req, res) {

        res.render('tanzkurse');
    });

app.get("/turniertanzsport",
    function (req, res) {

        res.render('turniertanzsport');
    });

app.get("/videoclipdancing",
    function (req, res) {

        res.render('videoclipdancing');
    });

app.get("/news",
    function (req, res) {

        controller.GetNews(req, res);
    });

app.post("/news",
    function (req, res) {
        formcontroller.addNews(req);

    });

app.post("/news/add",
    function (req, res) {
        formcontroller.addNews(req);
        res.redirect('/TimePlan');
    });

app.post("/news/delete/:id", function (req, res) {

    formcontroller.deleteNews(req.params.id);
    res.redirect('/TimePlan');
});

app.post("/news/change/:id", function (req, res) {

    formcontroller.changeNews(req.params.id);
    res.redirect('/TimePlan');
});

app.get("/timePlan",
    function (req, res) {

        controller.GetTimePlan(req, res);
    });


app.get("/Gallery",
    function (req, res) {

        controller.GetGallery(req, res);
    });


app.get("/login",
    function (req, res) {

        res.render('showLogin', {
                user: req.session.user,
                permission: req.session.permission,
            }
        );

    });
app.post("/login",
    function (req, res) {
        console.log("Hallo pose");
        formcontroller.checkUser(req, res);
        console.log("Hallo pose");

    });

app.post("/register",
    function (req, res) {

        formcontroller.addUser(req, res);
    });

app.post("/TimePlan/add", function (req, res) {

        formcontroller.addTimePlan(req, res);
        res.redirect('/TimePlan');
    }
);


app.post("/TimePlan/change/:id", function (req, res) {

        formcontroller.changeTimePlan(req.params.id, req);
        res.redirect('/TimePlan');
    }
);
app.post("/TimePlan/delete/:id", function (req, res) {

        formcontroller.deleteTimePlan(req.params.id);
        res.redirect('/TimePlan');
    }
);

app.listen(port, () =>
    console.log(`Server (${app.get("env")}) listening on
port ${port}!`)
);