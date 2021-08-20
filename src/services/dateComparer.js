/**
 * class with compare methods
 */

import dates from './dates'

class DateComparer {
    /**
     *
     * @param y - year
     * @param m - month
     * @param d - date
     * @returns {boolean}
     */
    isWeekend (y, m, d) {
        const day = dates().year(y).month(m).date(d).day()
        return day === 0 || day === 6
    }

    /**
     *
     * @param y - year
     * @param m - month
     * @param d - date
     * @returns {boolean}
     */
    isToday (y, m, d) {
        const today = dates()
        return y === today.year() && m === today.month() && d === today.date()
    }

    /**
     *
     * @param y - year
     * @param m - month
     * @param d - date
     * @returns {boolean}
     */
    isPrevDate (y, m, d) {
        const currentDate = dates()

        if (currentDate.year() > y) return true
        if (currentDate.year() < y) return false

        if (currentDate.month() > m) return true
        if (currentDate.month() < m) return false

        if (currentDate.date() > d) return true

        return false
    }

    /**
     *
     * @param year
     * @returns {boolean}
     */
    isCurrentYear (year) {
        return +dates().year() !== +year
    }
}
export default new DateComparer()
