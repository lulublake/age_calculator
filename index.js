//Age calc
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;
const date = new Date;

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

function isDateInFuture(day, month, year) {
    const selectedDate = new Date(year, month - 1, day);
    const today = new Date();
    return selectedDate > today;
}

app.get("/", (req,res) => {
    res.render("index.ejs");
});

app.post("/submit", (req, res) =>{
    let userDate = parseInt(req.body.date);
    let userMonth = parseInt(req.body.month);
    let userYear = parseInt(req.body.year);

    // Server-side validation
    if (isDateInFuture(userDate, userMonth, userYear)) {
        return res.render("index.ejs", {
            error: "Date cannot be in the future"
        });
    }

    let  userAgeDate = day - userDate;
    let userAgeMonth = month - userMonth;
    let userAgeYear = year - userYear;

    if (userAgeDate < 0) {
        let lastMonth = new Date(date.getFullYear(), date.getMonth()-1, 0).getDate();
        userAgeDate += lastMonth;
        userAgeMonth--;
    }
    if (userAgeMonth < 0 || (userAgeMonth === 0 && userAgeDate < 0)) {
        userAgeYear--;
        userAgeMonth += 12;
    }

    res.render("index.ejs", {
        userDate: userDate,     
        userMonth: userMonth,    
        userYear: userYear,
        userAgeDate: userAgeDate,
        userAgeMonth: userAgeMonth,
        userAgeYear: userAgeYear
    });
});

app.listen(port, (req, res) => {
    console.log(`Started listening at port ${port}`);
});