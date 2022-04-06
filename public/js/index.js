const MONTHS = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
}

const DAYS = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
}

// calendar data entry display
const cde = document.getElementById("calendar-entry");
// date calculations and reset button
const dc = document.getElementById("date-calculations");
// multimonth calendar display
const mmc = document.getElementById("multi-month-calendar");



window.addEventListener('DOMContentLoaded', (event) => {
    if (localStorage.getItem("mmc-3")) {
        refresh();
    } else {
        cde.innerHTML += `<form action = "/semester" method="POST">
                <div class = "form-group">
                    <label for = "semesterStartDate">Enter the Semester Start Date</label>
                    <input type = "date" value = "2022-03-06" name = "semesterStartDate" id = "semesterStartDate">
                </div>
                <div class = "form-group">
                    <label for = "semesterStartDate">Enter the Semester End Date</label>
                    <input type = "date" value = "2022-04-30" name = "semesterEndDate" id = "semesterEndDate">
                </div>
                <button id = "semesterDatesSubmit" type = "submit">Submit</button>
        </form>
        `;
        const semesterDatesListener = document.getElementById("semesterDatesSubmit");

        semesterDatesListener.addEventListener("mouseover", (event) => {
            laterStartDateHandler();
            earlierStartDateHandler();
        });

        semesterDatesListener.addEventListener("click", (event) => {
            event.preventDefault();
            if (confirm("Are you sure these are the correct dates?")) {
                getDates(semesterDatesListener);
            } else {
                location.reload();
            }
        });
    }
});

laterStartDateHandler = function () {
    const startDate = document.getElementById("semesterStartDate");
    const endDate = document.getElementById("semesterEndDate");
    if (startDate.value > endDate.value) {
        endDate.value = `${startDate.value}`;
    }
}

earlierStartDateHandler = function () {
    const startDate = document.getElementById("semesterStartDate");
    const endDate = document.getElementById("semesterEndDate");
    if (endDate.value < startDate.value) {
        startDate.value = `${endDate.value}`;
    }
}



// Calendar date entry

let semesterStartDate;
let semesterEndDate;
let totalNumberOfDays;
getDates = function (listener) {
    const startDateForm = document.getElementById("semesterStartDate");
    const endDateForm = document.getElementById("semesterEndDate");
    semesterStartDate = startDateForm.value;
    semesterEndDate = endDateForm.value;
    listener.disabled = true;
    startDateForm.disabled = true;
    endDateForm.disabled = true;

    // dateArray(semesterStartDate, semesterEndDate)
    let objectToStore = generateDayDescriptors(semesterStartDate, semesterEndDate);
    localStorage.setItem("mmc-3", JSON.stringify({
        numDaysToGo: objectToStore.length,
        dateData: objectToStore
    }));
    refresh();
}




function generateDayDescriptors(startDate, endDate) {
    let dayDescriptors = [];
    let arrayOfDates = [];
    for (let date = new Date(startDate); date <= new Date(endDate); date.setDate(date.getDate() + 1)) {
        arrayOfDates.push(new Date(date));
    }
    totalNumberOfDays = Math.abs((new Date(semesterEndDate) - new Date(semesterStartDate)) / (1000 * 60 * 60 * 24));
    arrayOfDates.forEach((element, index) => {
        dayDescriptors[index] = {
            date: new Date(element),
            day: element.getUTCDate(),
            dayOfTheWeek: element.getDay() === 6 ? 0 : element.getDay() + 1,
            isChecked: false,
            month: element.getUTCMonth(),
            monthText: MONTHS[element.getUTCMonth()],
        }
    })
    localStorage.setItem("originalNumberOfDays", dayDescriptors.length);
    return dayDescriptors;
}




refresh = function () {
    let myMMCInfo = JSON.parse(localStorage.getItem("mmc-3"));
    let originalNumberOfDays = JSON.parse(localStorage.getItem("originalNumberOfDays"));
    cde.innerHTML = '';

    dc.innerHTML = `<nav class = "navbar fixed-top bg-light">
        <div>${originalNumberOfDays - myMMCInfo.numDaysToGo} days down out of ${originalNumberOfDays}! ${myMMCInfo.numDaysToGo} days to go!</div>
        <div><button id = "clearSemesterButton">Clear Semester</button></div>
        <div><button id = "checkAllAvailableDaysButton">Check all available days!</button></div>
    </nav>
    `;

    mmc.innerHTML = `
    <div id = "managerTable">
        <div class = "table-responsive fixTableHead">
            <table class = "table table-bordered">
                    <thead>
                        <tr class = "black" height = "125px">
                            <th style="width: 9%">WEEK</th>
                            <th style="width: 13%">Sunday</th>
                            <th style="width: 13%">Monday</th>
                            <th style="width: 13%">Tuesday</th>
                            <th style="width: 13%">Wednesday</th>
                            <th style="width: 13%">Thursday</th>
                            <th style="width: 13%">Friday</th>
                            <th style="width: 13%">Saturday</th>
                        </tr>
                    </thead>
                <tbody>
                    ${generateNumbers(myMMCInfo.dateData)}
                </tbody>    
            </table>
        </div>
    </div>
`;

    checkBoxListener(myMMCInfo);
    resetListener();
    checkAllAvailableDaysListener(myMMCInfo);
}

resetListener = function () {
    const resetListenerButton = document.getElementById("clearSemesterButton");

    resetListenerButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (confirm("Are you sure you want to delete this semester?")) {
            localStorage.removeItem("mmc-3");
        }
        document.location.reload();
    })
}


dayIsInThePast = function (date) {
    return new Date(new Date(date).toDateString()) < new Date(new Date().toDateString());
}

checkBoxListener = function (info) {
    // Checkbox listener
    const checkboxListener = document.querySelectorAll("input[type=checkbox]");
    checkboxListener.forEach(checkbox => {
        checkbox.addEventListener("click", () => {
            let id = parseInt(checkbox.id.substring(4, checkbox.id.length));
            if (dayIsInThePast(info.dateData[id].date) && !checkbox.isChecked) {
                info.dateData[id].isChecked = true;
                checkbox.parentElement.classList += "align-middle text-center bg-lightblue";
                checkbox.parentElement.innerHTML = "<p>Completed!</p>";
                info.numDaysToGo--;
                localStorage.setItem("mmc-3", JSON.stringify(info));
                refresh();
            } else {
                checkbox.checked = !checkbox.checked;
            }
        })
    })
}

function checkAllAvailableDaysListener(info) {
    const checkAllAvailableDaysButton = document.getElementById("checkAllAvailableDaysButton");
    checkAllAvailableDaysButton.addEventListener('click', () => {
        const checkboxListener = document.querySelectorAll("input[type=checkbox]");
        checkboxListener.forEach(checkbox => {
            let id = parseInt(checkbox.id.substring(4, checkbox.id.length));
            if (dayIsInThePast(info.dateData[id].date) && !checkbox.isChecked) {
                info.dateData[id].isChecked = true;
                checkbox.parentElement.parentElement.classList += "align-middle text-center bg-lightblue";
                checkbox.parentElement.innerHTML = "<p>Completed!</p>";
                info.numDaysToGo--;
                localStorage.setItem("mmc-3", JSON.stringify(info));
                refresh();
            } else {
                checkbox.checked = !checkbox.checked;
            }
        })
    });
}







generateNumbers = function (infoArray) {
    let dayText = "";
    let week = 1;
    let day = 0;
    let placeholders = [];
    for (var i = 0; i < infoArray[0].dayOfTheWeek; i++) {
        placeholders.push({
            date: "",
            day: "",
            dayOfTheWeek: "",
            isChecked: true,
            month: "",
            monthText: "",
        });
    }
    placeholders.forEach((ph) => {
        infoArray.unshift(ph);
    })

    do {
        dayText += `<tr height = "150px" class = "font-weight-bold black"><th scope = "row">${week}</th>`
        for (let i = 0; i < 7; i++) {
            if (day < infoArray.length - 1) {
                if (infoArray[day].isChecked === true) {
                    dayText += `<td class = "align-middle text-center bg-grey"><h4 class = "font-purple">${infoArray[day].monthText} ${infoArray[day].day}
                        </h4><p class = "font-purple">Completed!</p>`;
                } else {
                    dayText += `<td class = "align-middle text-center border"><h4>${infoArray[day].monthText}  ${infoArray[day].day}
                        </h4><div><input type = 'checkbox' id = 'test${String(day).padStart(5, '0')}' class = 'big-checkbox'>`;
                }
            } else if (day < infoArray.length) {
                dayText += `<td class = "align-middle text-center bg-winninggold"><h4>${infoArray[day].monthText}  ${infoArray[day].day}
                    </h4><div><input type = 'checkbox' id = 'test${String(day).padStart(5, '0')}' class = 'big-checkbox'>`;
            } else {
                dayText += `</td>`;
            }
            day++;
        }
        dayText += "</div></td>";
        dayText += "</tr>";
        week++;
    } while (day < infoArray.length);

    return dayText;
}


