/**
 * Template file for Transformer functions
 * Work In Progress
 * TODO : complete the files, remove this comment
 */

module.exports = {
    dashboardReport(data) {
        const { totalAssigned, totalInspected, totalBypass, totalClosed } = data[0];
        return { totalAssigned, totalInspected, totalBypass, totalClosed };
    },
    s3BucketFileslocation(data) {
        let location = [];
        data.forEach(e => location.push(e.location));
        return location;
    },
};
