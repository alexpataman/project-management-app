/* eslint-disable no-console */
import * as task from '../constants/requirements';

console.log(`%c${task.taskTitle}`, 'font-weight: bold; font-size: 18px');
console.log(`${task.taskLink}\n\n`);

console.log(`%cСамооценка:`, 'font-weight: bold;');
console.log(task.content);
console.log(
  `%cИтого: ${task.myScore}/${task.maxScore} => ${task.resultScore}`,
  'font-weight: bold'
);
console.log(`\n%c${task.authorName}`, 'font-weight: bold;');
console.log(`${task.authorLink}\n\n`);
