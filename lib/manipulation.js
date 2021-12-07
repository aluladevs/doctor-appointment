import moment from "moment";

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