const express = require('express');

const nunjucks = require('nunjucks');
const model = require('./model.js');
var app = express();


nunjucks.configure('views', {
    autoescape: true,
    express: app
});


module.exports = {

    GetNews: function (req, res) {

        model.data.getAllNews(function (callback) {
            var data = callback;
            res.render('showNews', {
                entries: data,
                permission: req.session.permission,
            });

            data.forEach((row) => {
                console.log("ID: " + row.ID + "   Name/Titel: " + row.Titel);
            });
        });
    },

    GetGallery: function (req, res) {
        model.data.getGalleryAll(function (callback) {

            callback.forEach((row) => {
                console.log("ID: " + row.ID);
            });

            res.render('showGallery', {
                entries: callback,
                permission: req.session.permission
            });
        })
    },
    GetTimePlan: function (req, res) {
        var week = [];
        model.data.getTimePlanDay("Montag", function (callback, Day) {


            week.push({day: Day, data: callback});
            console.log(week);

            callback.forEach((row) => {
                console.log("ID: " + row.ID + "   Name/Titel: " + row.Titel);
            });

            model.data.getTimePlanDay("Dienstag", function (callback, Day) {


                week.push({day: Day, data: callback});
                console.log(week);

                callback.forEach((row) => {
                    console.log("ID: " + row.ID + "   Name/Titel: " + row.Titel);
                });

                model.data.getTimePlanDay("Mittwoch", function (callback, Day) {


                    week.push({day: Day, data: callback});
                    console.log(week);

                    callback.forEach((row) => {
                        console.log("ID: " + row.ID + "   Name/Titel: " + row.Titel);
                    });
                    model.data.getTimePlanDay("Donnerstag", function (callback, Day) {


                        week.push({day: Day, data: callback});
                        console.log(week);

                        callback.forEach((row) => {
                            console.log("ID: " + row.ID + "   Name/Titel: " + row.Titel);
                        });

                        model.data.getTimePlanDay("Freitag", function (callback, Day) {


                            week.push({day: Day, data: callback});
                            console.log(week);

                            callback.forEach((row) => {
                                console.log("ID: " + row.ID + "   Name/Titel: " + row.Titel);
                            });
                            model.data.getTimePlanDay("Samstag", function (callback, Day) {


                                week.push({day: Day, data: callback});
                                console.log(week);

                                callback.forEach((row) => {
                                    console.log("ID: " + row.ID + "   Name/Titel: " + row.Titel);
                                });
                                model.data.getTimePlanDay("Sonntag", function (callback, Day) {


                                    week.push({day: Day, data: callback});
                                    console.log(week);

                                    callback.forEach((row) => {
                                        console.log("ID: " + row.ID + "   Name/Titel: " + row.Titel);
                                    });
                                    res.render('showTimePlan', {
                                        entries: week,
                                        permission: req.session.permission,
                                    });
                                });
                            });
                        });
                    });
                });
            });

        });


    },


};