const model = require('./model.js');
var bcrypt = require('bcryptjs');
module.exports = {


    addGallery: function (BildReference, req) {
        model.data.addGallery(BildReference, req.body.GalleryComment);

    },

    deleteGallery: function (ID) {
        model.data.deleteByID("Galerie", ID)

    },

    changeGallery: function (what, ID, Bildreference, req) {
        if (what) {
            model.data.changeGalleryByID(ID, Bildreference, req.body.ChangeGalleryComment);
        } else {
            model.data.changeGalleryByIDWithoutPic(ID, req.body.ChangeGalleryComment);
        }
    },
    changeNews: function (id, req) {


        model.data.changeNewsByID(id, req.body.TitelChange, req.body.changeNewsText);
    },

    deleteNews: function (ID) {


        model.data.deleteByID("News", ID)
    },

    addNews: function (req) {

        model.data.newNewsEntry = (req.body.addTitel, req.body.addText)
    },

    changeTimePlan: function (id, req) {


        model.data.changeTimePlanByID(id, req.body.WochentagChange, req.body.AnfangChange, req.body.EndeChange, req.body.KursChange,
            req.body.OrtChange, req.body.TrainerChange);

    },

    addTimePlan: function (req, res) {

        model.data.newTimePlanEntry(req.body.Wochentag, req.body.Anfang, req.body.Ende, req.body.Kurs, req.body.Ort, req.body.Trainer);

    },
    deleteTimePlan: function (ID) {
        model.data.deleteByID("Zeitplan", ID)
    },

    checkUser: function (req, res) {

        model.data.getUsernameByName(req.body.username, function (callback) {


            if (callback != null) {


                bcrypt.compare(req.body.password, callback.Password, function (err, compare) {
                    if (compare) {

                        req.session.user = callback.username;
                        req.session.permission = callback.role;

                        res.redirect("/");
                        console.log("You are in");


                    } else {
                        res.render('showLogin', {
                            error: "Wrong Password or Login"
                        });
                    }

                });


            } else {

                res.render('showLogin', {
                    error: "Wrong Password or Login"
                });
            }
        })
    },

    addUser: function (req, res) {

        if (req.body.adminChecker) {
            model.data.registerNewUser(req.body.username, req.body.password, "Admin");


            req.session.user = req.body.username;
            req.session.permission = "Admin";
            res.redirect("/");

        } else {
            model.data.registerNewUser(req.body.username, req.body.password, "User");

            req.session.user = req.body.username;
            req.session.permission = "User";
            res.redirect("/");

        }

    },

    addKontakt: function (req) {


        model.data.newKontakt(req.body.Vorname, req.body.Nachname, req.body.Email, req.body.Text)
    }


};