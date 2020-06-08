"use strict";
var bcrypt = require('bcryptjs');
var methods = {};

const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./data/data.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the blog database.');
});
methods.getDate = function () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds() + ' | ' + mm + '/' + dd + '/' + yyyy;
    return today
};


methods.generateHash = function (Password, callback) {

    bcrypt.hash(Password, 8, function (err, hash) {

        callback(hash);
    });
};


methods.getAllNews = function (callback) {
    let sql;


    sql = 'SELECT * FROM News';


    db.all(sql, function (err, allRows) {

        if (err != null) {
            console.log(err);

        }
        return callback(allRows);
        console.log(allRows);

    });
};

methods.getTimePlanDay = function (Day, callback) {
    let sql;


    sql = 'SELECT * FROM Zeitplan WHERE Wochentag = ?';


    db.all(sql, [Day], function (err, DayRow) {

        if (err != null) {
            console.log(err);

        }
        return callback(DayRow, Day);
        console.log(DayRow);

    });
};

methods.getGalleryAll = function (callback) {
    let sql;


    sql = 'SELECT * FROM Galerie';


    db.all(sql, function (err, AllRows) {

        if (err != null) {
            console.log(err);

        }
        return callback(AllRows);
        console.log(AllRows);

    });
};

methods.changeGalleryByID = function (ID, BildReference, Kommentar) {
    let sql;


    sql = 'UPDATE Galerie SET BildReference = ?, Kommentar = ? WHERE ID = ?';


    db.run(sql, [BildReference, Kommentar, ID], function (err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        console.log(`The ID:${ID}\nHas been changed from Gallery`);

    });
};

methods.changeGalleryByIDWithoutPic = function (ID, Kommentar) {
    let sql;


    sql = 'UPDATE Galerie SET  Kommentar = ? WHERE ID = ?';


    db.run(sql, [Kommentar, ID], function (err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        console.log(`The ID:${ID}\nHas been changed from Gallery`);

    });
};

methods.addGallery = function (BildReference, Kommentar) {


    db.run(`INSERT INTO Galerie VALUES("${BildReference}","${Kommentar}",null)`, function (err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);

    });
};

methods.changeNewsByID = function (ID, Titel, Text) {
    let sql;


    sql = 'UPDATE News SET Titel = ?, Text = ? WHERE ID = ?';


    db.run(sql, [Titel, Text, ID], function (err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        console.log(`The ID:${ID}\nHas been changed from News`);

    });
};
methods.changeUsernameByID = function (ID, Username, Password, role) {
    let sql;


    sql = 'UPDATE User SET Username = ?, Password = ?, role = ? WHERE ID = ?';


    db.run(sql, [Username, Password, role, ID], function (err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        console.log(`The User where${ID}\nHas been changed `);

    });
};

methods.getUsernameByName = function (Name, callback) {
    let sql;

    sql = 'SELECT * FROM User WHERE Username = ?';

    db.get(sql, [Name], function (err, row) {

        if (err != null) {
            return callback(null);

        }
        return callback(row);
    });
};

methods.changeTimePlanByID = function (ID, Wochentag, Anfang, Ende, Kurs, Ort, Trainer) {
    let sql;


    sql = 'UPDATE Zeitplan SET Wochentag = ?, Anfang = ?, Ende = ?, Kurs = ?, Ort = ?, Trainer = ? WHERE ID = ?';


    db.run(sql, [Wochentag, Anfang, Ende, Kurs, Ort, Trainer, ID], function (err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        console.log(`The User weith the${ID}\nHas been changed from TimePlan`);

    });
};


methods.getByID = function (Table, ID, callback) {
    let sql;

    sql = 'SELECT * FROM ? WHERE ID = ?';

    db.get(sql, [Table, ID], function (err, row) {

        if (err != null) {
            console.log(err);

        }
        return callback(row);
    });
};

methods.deleteByID = function (Table, ID) {
    let sql;


    sql = 'DELETE FROM ${ID} WHERE ID = ?';


    db.run(`DELETE FROM ${Table} WHERE ID = ${ID}`, function (err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        console.log(`The ID:${ID}\n from${Table}\nHas been deleted`);

    });
};

methods.newTimePlanEntry = function (day, begin, end, course, location, trainer) {

    db.run(`INSERT INTO Zeitplan VALUES("${day}","${begin}","${end}","${course}","${location}","${trainer}",null)`, function (err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);

    });
};

methods.newKontakt = function (Vorname, Nachname, Email, Nachricht) {

    db.run(`INSERT INTO Kontakte VALUES("${Vorname}","${Nachname}","${Email}",${Nachricht}",null)`, function (err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);

    });
};

methods.newNewsEntry = function (titel, Text) {

    db.run(`INSERT INTO News VALUES("${titel}","${Text}",null)`, function (err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);

    });
};

methods.registerNewUser = function (Username, Password, role) {
    methods.generateHash(Password, function (callback) {


        db.run(`INSERT INTO User VALUES("${Username}","${callback}",null,"${role}")`, function (err) {
            if (err) {
                return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);

        });
    });

};


exports.data = methods;
