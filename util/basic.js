/**
 * Converts the time in milliseconds to text (110000 => 1 minute and 50 seconds)
 * @param {number} time the time to convert
 * @returns {Promise<string>} the time string
 */
module.exports.timeToText = (time) => {
    if (isNaN(time)) {
        return
    };
    var defTime = time
    var timeToText = ''
    var yearOrYears = 'year'
    var monthOrMonths = 'month'
    var weekOrWeeks = 'week'
    var dayOrDays = 'day'
    var hourOrHours = 'hour'
    var minuteOrMinutes = 'minute'
    var secondOrSeconds = 'second'
    var years = Math.floor(time / (365.25 * 24 * 60 * 60 * 1000))
    time = time - (years * 365.25 * 24 * 60 * 60 * 1000)
    var months = Math.floor(time / (30 * 24 * 60 * 60 * 1000))
    time = time - (months * 30 * 24 * 60 * 60 * 1000)
    var weeks = Math.floor(time / (7 * 24 * 60 * 60 * 1000))
    time = time - (weeks * 7 * 24 * 60 * 60 * 1000)
    var days = Math.floor(time / (24 * 60 * 60 * 1000))
    time = time - (days * 24 * 60 * 60 * 1000)
    var hours = Math.floor(time / (60 * 60 * 1000))
    time = time - (hours * 60 * 60 * 1000)
    var minutes = Math.floor(time / (60 * 1000))
    time = time - (minutes * 60 * 1000)
    var seconds = (time / (1000)).toFixed(1)
    if (Number((time / 1000).toFixed(1)) == Math.round(time / 1000)) seconds = Math.round(time / 1000);
    time = time - (seconds * 1000)

    var valsAbove0 = 0
    if (years > 0) valsAbove0++
    if (months > 0) valsAbove0++
    if (weeks > 0) valsAbove0++
    if (days > 0) valsAbove0++
    if (hours > 0) valsAbove0++
    if (minutes > 0) valsAbove0++
    if (seconds > 0) valsAbove0++

    if (years !== 1) {
        yearOrYears += 's'
    };
    if (months !== 1) {
        monthOrMonths += 's'
    };
    if (weeks !== 1) {
        weekOrWeeks += 's'
    };
    if (days !== 1) {
        dayOrDays += 's'
    };
    if (hours !== 1) {
        hourOrHours += 's'
    };
    if (minutes !== 1) {
        minuteOrMinutes += 's'
    };
    if (seconds !== 1) {
        secondOrSeconds += 's'
    };

    if (years > 0) {
        valsAbove0--
        if (valsAbove0 > 1) {
            timeToText = timeToText + years + ' ' + yearOrYears + ', '
        } else if (valsAbove0 > 0) {
            timeToText = timeToText + years + ' ' + yearOrYears + ' and '
        } else {
            timeToText = timeToText + years + ' ' + yearOrYears
        };
    };
    if (months > 0) {
        valsAbove0--
        if (valsAbove0 > 1) {
            timeToText = timeToText + months + ' ' + monthOrMonths + ', '
        } else if (valsAbove0 > 0) {
            timeToText = timeToText + months + ' ' + monthOrMonths + ' and '
        } else {
            timeToText = timeToText + months + ' ' + monthOrMonths
        };
    };
    if (weeks > 0) {
        valsAbove0--
        if (valsAbove0 > 1) {
            timeToText = timeToText + weeks + ' ' + weekOrWeeks + ', '
        } else if (valsAbove0 > 0) {
            timeToText = timeToText + weeks + ' ' + weekOrWeeks + ' and '
        } else {
            timeToText = timeToText + weeks + ' ' + weekOrWeeks
        };
    };
    if (days > 0) {
        valsAbove0--
        if (valsAbove0 > 1) {
            timeToText = timeToText + days + ' ' + dayOrDays + ', '
        } else if (valsAbove0 > 0) {
            timeToText = timeToText + days + ' ' + dayOrDays + ' and '
        } else {
            timeToText = timeToText + days + ' ' + dayOrDays
        };
    };
    if (hours > 0) {
        valsAbove0--
        if (valsAbove0 > 1) {
            timeToText = timeToText + hours + ' ' + hourOrHours + ', '
        } else if (valsAbove0 > 0) {
            timeToText = timeToText + hours + ' ' + hourOrHours + ' and '
        } else {
            timeToText = timeToText + hours + ' ' + hourOrHours
        };
    };
    if (minutes > 0) {
        valsAbove0--
        if (valsAbove0 > 1) {
            timeToText = timeToText + minutes + ' ' + minuteOrMinutes + ', '
        } else if (valsAbove0 > 0) {
            timeToText = timeToText + minutes + ' ' + minuteOrMinutes + ' and '
        } else {
            timeToText = timeToText + minutes + ' ' + minuteOrMinutes
        };
    };
    if (seconds > 0) {
        valsAbove0--
        if (valsAbove0 > 1) {
            timeToText = timeToText + seconds + ' ' + secondOrSeconds + ', '
        } else if (valsAbove0 > 0) {
            timeToText = timeToText + seconds + ' ' + secondOrSeconds + ' and '
        } else {
            timeToText = timeToText + seconds + ' ' + secondOrSeconds
        };
    };

    return timeToText
}

/**
 * Converts text to time in seconds (1 h => 3600)
 * @param {string} text the text to convert
 * @returns {Promise<number>} the time in seconds
 */
module.exports.textToTime = (text) => {
    var time = -0.01;
    if (text) {
        var i;
        const textArray = text.split('');
        var endText = '';
        var timeToConvert = '';
        var timeSetter = '';
        const validTimes = ['y', 'mon', 'w', 'd', 'h', 'm', 's'] //['y', 'year', 'years', 'month', 'months', 'mon', 'w', 'week', 'weeks', 'd', 'day', 'days', 'h', 'hour', 'hours', 'min', 'mins', 'minute', 'minutes', 's', 'sec', 'second', 'seconds', 'secs']
        const conversionTable = {
            y: 31557600,
            mon: 2592000,
            w: 604800,
            d: 86400,
            h: 3600,
            m: 60,
            s: 1,
        }
        for (i = 0; i < textArray.length; i++) {
            var currentCharacter = textArray[i];
            if (parseInt(currentCharacter) == currentCharacter) {
                if (i > 0) {
                    if (isNaN(textArray[i - 1])) {
                        timeToConvert = '';
                    }
                }
                timeSetter = '';
                timeToConvert = timeToConvert + currentCharacter;
            } else {
                timeSetter = timeSetter + currentCharacter;
                if (validTimes.includes(timeSetter)) { // && !isNan(textArray[i+1])
                    if (timeSetter == 'm') {
                        if (textArray[i + 1] == 'o') {

                        } else {
                            time += parseInt(parseInt(timeToConvert) * conversionTable[timeSetter]);
                            timeToConvert = '';
                            timeSetter = '';
                        }
                    } else {
                        time += parseInt(parseInt(timeToConvert) * conversionTable[timeSetter]);
                        timeToConvert = '';
                        timeSetter = '';
                    }
                }
            }
        }
        time = Math.floor(time);
        if (time >= 0) {
            time++
        };
    }
    return time
}

/**
 * Turns the time in seconds into formatted time string
 * @param {number} time the time in seconds
 * @returns {Promise<string>} the formatted time (hours:minutes:seconds or minutes:seconds if the time is shorter than an hour)
 */
module.exports.timeToFormattedTime = (time) => {
    time = parseInt(time);
    let hours = (time - (time % 3600)) / 3600;
    time -= hours * 3600;
    let minutes = (time - (time % 60)) / 60;
    time -= minutes * 60;
    let seconds = time;
    let formattedTime = "";
    if (hours > 0) {
        formattedTime += `${hours}:`
    }
    if (minutes < 10) {
        formattedTime += "0"
    }
    formattedTime += `${minutes}:`
    if (seconds < 10) {
        formattedTime += "0"
    }
    formattedTime += `${seconds}`
    return formattedTime;
}

/**
 * Returns the frequency of a substring in a string
 * @param {string} pattern the pattern to search for
 * @param {string} text the text to search in
 * @returns {Promise<number>} the frequency
 */
module.exports.countFreq = (pattern, text) => {
    let M = pattern.length;
    let N = text.length;
    let res = 0;

    // A loop to slide pat[] one by one
    for (let i = 0; i <= N - M; i++) {

        // For current index i, check for
        // pattern match
        let j;
        for (j = 0; j < M; j++) {
            if (text[i + j] != pattern[j]) {
                break;
            }
        }

        // If pat[0...M-1] = txt[i, i+1, ...i+M-1]
        if (j == M) {
            res++;
            j = 0;
        }
    }
    return res;
}