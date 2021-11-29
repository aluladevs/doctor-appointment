import moment from "moment";

const months = Array(12).fill('').map((e, i) => moment(`2021-${i+1}`).format("MMMM"));
const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const generateDays = (year, month) => {
    const numOfDays = moment(`${year}-${month}`).daysInMonth();
    let numOfPrevDays = moment(`${year}-${month - 1}`).daysInMonth();

    console.log(numOfDays, numOfPrevDays);
}