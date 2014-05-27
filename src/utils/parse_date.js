"use strict";

var DIGITS = /^\d+$/
  , YEAR = /^\d{4}$/
  , MONTH = /^(0[0-9]|1[0-2])$/
  , DAY = /^([0-2][0-9]|3[0-1])$/

function isDigit(str) { return str.match(DIGITS) }
function isYear(str) { return str.match(YEAR) }
function isMonth(str) { return str.match(MONTH) }
function isDay(str) { return str.match(DAY) }

module.exports = function (str) {
  var parts = str.split('-')
    , year = parts[0]
    , month = parts[1] || null
    , day = parts[2] || null

  if (parts.length > 3) return null;
  if (!parts.every(isDigit)) return null;
  if (!isYear(year)) return null;
  if (parts.length > 1 && !isMonth(month)) return null;
  if (parts.length > 2 && !isDay(day)) return null;

  return {
    parts: {
      year: year,
      month: month,
      day: day
    },
    str: year + '-' + (month || '00') + '-' + (day || '00')
  }
}
