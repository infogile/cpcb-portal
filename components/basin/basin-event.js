/**
 * Template file for Event layer
 * Work In Progress
 * TODO : complete the files, remove this comment
 */

// import MessageQueueHelpers from 'src/libraries/message-queue';
// import  from 'libraries/job-schedule';

const JobScheduleHelpers = require('libraries/job-schedule');
const key = 'basin-event';
// const messageQueue = new MessageQueueHelpers();
const jobSchedule = new JobScheduleHelpers();

// messageQueue.publishMessage(key, 'default message queue event for basin');

//Example

// jobSchedule.scheduleRecurringJob('basin job-schedule definition', '1 minute', function () {
//     console.warn('please implement basin job-schedule here', new Date());
// });

// messageQueue.consumeMessage(key, messageCallback);

function messageCallback(msg) {
    console.log(' [x] Received %s', msg.content.toString());
}
