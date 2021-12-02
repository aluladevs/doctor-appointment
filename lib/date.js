import moment from "moment";

export const generateDays = (year, month, selectedDate) => {
    const prevMonth = moment(`${year}-${month}-01`);
    const currMonth = moment(`${year}-${month + 1}-01`);
    const nextMonth = moment(`${year}-${month + 2}-01`);

    const numOfDays = currMonth.daysInMonth();
    let numOfPrevDays = prevMonth.daysInMonth();

    const detail = [];
    let num = 1;

    for (let i = 0; i < 6; i++) {
        const row = [];

        let numDayInWeek = 1;
        for (let j = 0; j < 7; j++) {
            const firstDay = currMonth.format('e');

            if (i === 0 && j < firstDay) {
                row.push({
                    isCurrentMonth: false,
                    day: (numOfPrevDays - firstDay) + (j + 1),
                    month: month,
                    date: moment(`${year}-${month}-${(numOfPrevDays - firstDay) + (j + 1)}`).format("YYYY-MM-DD")
                });
            } else if (num > numOfDays) {
                if (j < 7 && j > 0) {
                    row.push({
                        isCurrentMonth: false,
                        day: numDayInWeek,
                        month: month + 1,
                        date: moment(`${year}-${month + 2}-${numDayInWeek}`).format("YYYY-MM-DD")
                    });
                    numDayInWeek++;
                } else {
                    break;
                }
            } else {
                row.push({
                    isCurrentMonth: true,
                    day: num,
                    month: nextMonth.month(),
                    date: moment(`${year}-${month + 1}-${num}`).format("YYYY-MM-DD")
                });
                num++;
            }
        }

        detail.push(row);
    }

    return detail;
}