import moment from "moment";

export const generateDays = (year, month) => {
    const prevMonth = moment(`${month === 0 ? year - 1 : year}-${month === 0 ? 12 : month}-01`);
    const currMonth = moment(`${year}-${month + 1}-01`);

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
                        month: month + 2,
                        date: moment(`${year}-${month + 2}-${numDayInWeek}`).format("YYYY-MM-DD")
                    });
                    numDayInWeek++;
                } else {
                    break;
                }
            } else {
                row.push({
                    isToday: moment(`${year}-${month + 1}-${num}`).isSame(new Date(), 'day'),
                    isCurrentMonth: true,
                    day: num,
                    month: month + 1,
                    date: moment(`${year}-${month + 1}-${num}`).format("YYYY-MM-DD")
                });
                num++;
            }
        }

        detail.push(row);
    }

    return detail;
}

export const groupedByDate = (data) => {
    const group = {};

    data?.forEach(item => {
        const date = moment(item.date).format("YYYY-MM-DD");

        if (group[date]) {
            group[date].push(item);
        } else {
            group[date] = [item];
        }
    });

    return group;
}