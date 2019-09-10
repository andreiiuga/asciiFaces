/**
 * CONSTANTS used in date formating
 */
const MONTHS = {
  'jan': 1,
  'feb': 2,
  'mar': 3,
  'apr': 4,
  'may': 5,
  'jun': 6,
  'jul': 7,
  'aug': 8,
  'sep': 9,
  'oct': 10,
  'nov': 11,
  'dec': 12
}

const WEEK_DAY = 0;
const MONTH = 1;
const DAY = 2;
const YEAR = 3;

const START_YEAR = 2018;
const START_MONTH = 1;
const START_DAY = 1;

const HOURS_IN_YEAR = 8760;
const HOURS_IN_MONTH = 8760;
const HOURS_IN_DAY = 24;



/**
 * function returns the numbers of hours from january until the end of the month given as parameter
 */
function getHoursInFirstMonths(months) {
  let acc = 0;
  if (months === 0 ) {
    return 0;
  }

  [...Array(months).keys()].forEach((month) => {
    if (month === 1) {
      acc += 28 * HOURS_IN_DAY;
    } else {
      if( month < 7 ) {
        if(month % 2 === 1) {
          acc += 31* HOURS_IN_DAY;
        } else {
          acc += 30 * HOURS_IN_DAY
        }
      } else {
        if(month % 2 === 1) {
          acc += 30* HOURS_IN_DAY;
        } else {
          acc += 31 * HOURS_IN_DAY
        }
      }
    }
  })

  return acc;
}


/**
 * function returns 2 posible date formats '
 * 
 * calculating the differece in hours between current time and given date'
 * if the difference is greater than the nubers of hours in one week
 * returns the full date
 * else returns how many days passed
 * 
 * 
 * I did not use the Date() api of JavaScript to format the dates, only to get the current time
 */
export function formatDate(rawDate) {
  const arrayDate = rawDate.split(' ');
  const nowTime = new Date();

  const refDay = parseInt(arrayDate[DAY]);
  const refMonth = MONTHS[arrayDate[MONTH].toLowerCase()] - 1;
  const refYear = parseInt(arrayDate[YEAR]);

  const nowDay = nowTime.getDate();
  const nowMonth = nowTime.getMonth();
  const nowYear = nowTime.getFullYear();

  // console.log(refMonth, nowMonth);

  const hoursFromInitToRef = (refYear - 2018) * 8760 + getHoursInFirstMonths(refMonth) + refDay * HOURS_IN_DAY
  const hoursFromInitToNow = (nowYear - 2018) * 8760 + getHoursInFirstMonths(nowMonth) + nowDay * HOURS_IN_DAY

  if( hoursFromInitToNow - hoursFromInitToRef > 7 * HOURS_IN_DAY ) {
    return " on " + arrayDate[WEEK_DAY] + " " + arrayDate[MONTH] + " " + arrayDate[DAY] + " " + arrayDate[YEAR];
  } else {
    return Math.floor((hoursFromInitToNow - hoursFromInitToRef) / 24) + " days ago" 
  }


}