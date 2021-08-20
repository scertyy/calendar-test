/**
 * class with calculate methods
 */

import dates from "./dates";

class DateCalculator {
    constructor() {}

    /**
   *
   * @param y - year
   * @param m - month
   * @returns {*}
   */
    calculateNextMonth(y, m) {
        let incMonth = m + 1;
        let year = y;
        if (incMonth > 11) {
            incMonth = 0;
            year++;
        }
        return dates([year, incMonth]);
    }

    /**
   *
   * @param y - year
   * @param m - month
   * @returns {*}
   */
    calculatePrevMonth(y, m) {
        let decMonth = m - 1;
        let year = y;
        if (decMonth < 0) {
            decMonth = 11;
            year--;
        }
        return dates([year, decMonth]);
    }
}

export default new DateCalculator();
