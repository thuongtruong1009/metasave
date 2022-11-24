export const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

export const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const getCurrentWeekNumber = (d) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    let weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo
}

//start from sunday
// function getDateOfISOWeek(w, y) {
//     var simple = new Date(y, 0, 1 + (w - 1) * 7);
//     var dow = simple.getDay();
//     var ISOweekStart = simple;
//     if (dow <= 4)
//         ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
//     else
//         ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
//     return ISOweekStart;
// }
// console.log(getDateOfISOWeek(getCurrentWeekNumber(new Date()), 2022));

export const getDate = (date) => {
    let hour = date.getHours();
    let day = Number(String(date.getDate()).padStart(2, "0"));
    let dayName = daysOfWeek[date.getDay()];
    let totalDaysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    let month = Number(String(date.getMonth() + 1).padStart(2, "0"));
    let monthName = monthsOfYear[date.getMonth()];
    let year = Number(date.getFullYear());
    let startWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
    let endWeek = new Date(startWeek.getFullYear(), startWeek.getMonth(), startWeek.getDate() + 6);
    let startDayInWeek = Number(String(startWeek.getDate()).padStart(2, "0")) + 1;
    let endDayInWeek = Number(String(endWeek.getDate()).padStart(2, "0")) + 1;

    return { hour, day, month, year, totalDaysInMonth, dayName, monthName, startDayInWeek, endDayInWeek };
};

console.log(getDate(new Date()));