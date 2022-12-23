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

const getDateFormat = (year, month, day) => {
        let formated = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
return formated;
};
export const getISOFormat = (date, hour) => {
    let formated = `${date}T${hour}:00`;
    return formated ? new Date(formated) : new Date();
  };

const getListDaysOfWeek = (date) => {
    var days= [];
    [0, 1, 2, 3, 4, 5, 6].forEach((index) => {
      let iso = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + index + 1
      );
      let pre = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + index
      );
      let name = daysOfWeek[Math.abs(pre.getDay() % daysOfWeek.length)];
      let dayNum = Number(String(pre.getDate()).padStart(2, "0"));
      let day = dayNum < 10 ? "0" + dayNum : dayNum;
      let format = getDateFormat(
        pre.getFullYear(),
        pre.getMonth() + 1,
        pre.getDate()
      );
      days.push({ iso, format, name, day });
    });
    let startDayInWeek = days[0].format;
    let endDayInWeek = days[days.length - 1].format;
    return { days, startDayInWeek, endDayInWeek };
  }
//   console.log(getListDaysOfWeek(new Date('2022-12-11T17:00:00.000Z')))

function getCurrentWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    let weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo
}
// console.log(getCurrentWeekNumber(new Date(getISOFormat('2022-12-11', '00:00'))))

function getStartDateOfWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w-2) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 2);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    // return ISOweekStart;

    var days= [];
    [0, 1, 2, 3, 4, 5, 6].forEach((index) => {
      let iso = new Date(
        ISOweekStart.getFullYear(),
        ISOweekStart.getMonth(),
        ISOweekStart.getDate() + index + 1
      );
      let pre = new Date(
        ISOweekStart.getFullYear(),
        ISOweekStart.getMonth(),
        ISOweekStart.getDate() + index
      );
      let name = daysOfWeek[Math.abs(pre.getDay() % daysOfWeek.length)];
      let dayNum = Number(String(pre.getDate()).padStart(2, "0"));
      let day = dayNum < 10 ? "0" + dayNum : dayNum;
      let format = getDateFormat(
        pre.getFullYear(),
        pre.getMonth() + 1,
        pre.getDate()
      );
      days.push({ iso, format, name, day });
    });
    let startDayInWeek = days[0].format;
    let endDayInWeek = days[days.length - 1].format;
    return { startDayInWeek, endDayInWeek , days };
}
// console.log(getStartDateOfWeek(51, 2022));



export const getDate = (date) => {
    let hour = date.getHours();
    let day = Number(String(date.getDate()).padStart(2, "0"));
    let dayName = daysOfWeek[date.getDay()];
    let totalDaysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    let month = Number(String(date.getMonth() + 1).padStart(2, "0"));
    let monthName = monthsOfYear[date.getMonth()];
    let year = Number(date.getFullYear());
    let startDayOfWeekBySunday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 1);
    let weekNo = getCurrentWeekNumber(date);
    let weeks = getListDaysOfWeek(new Date('2022-12-27T17:00:00.000Z'))
    let startDayInWeek = weeks[0].format;
    let endDayInWeek = weeks[6].format;

    return { hour, day, month, year, totalDaysInMonth, dayName, monthName, weekNo, weeks, startDayInWeek, endDayInWeek };
};

// console.log(getDate(new Date()));


const getDiffPeriod = (
    start,
    end
) => {
    let startDate = start ? new Date(start) : new Date();
    let endDate = end ? new Date(end) : new Date();
    let diffHours = Number(Math.abs(endDate.getHours() - startDate.getHours()));
    let diffDays = Number(Math.abs(endDate.getDate() - startDate.getDate()));
    return { diffHours, diffDays };
};

// console.log(getDiffPeriod(new Date("2022-12-06T11:00:00Z"), new Date("2022-12-06T13:00:00Z")));