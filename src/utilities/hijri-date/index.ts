import { CONSTANTS } from './constant';

/** Class representing a Hijri date. */
class HijriDate {
  year: number;
  month: number;
  day: number;

  /**
   * Create a HijriDate object for a specific Hijri date.
   * @param year - A Hijri year
   * @param month - A Hijri month (zero indexed i.e., Moharram = 0).
   * @param day - A Hijri day of the month
   */
  constructor(year: number, month: number, day: number) {
    this.year = year;
    this.month = month;
    this.day = day;
  }

  /**
   * Get the Hijri year.
   * @return The Hijri year.
   */
  get getFullYear(): number {
    return this.year;
  }

  /**
   * Get the Hijri month.
   * @return The Hijri month (zero indexed i.e., Moharram = 0).
   */
  get getMonth(): number {
    return this.month;
  }

  /**
   * Get the Hijri day.
   * @return The Hijri day of the month.
   */
  get getDate(): number {
    return this.day;
  }

  /**
   * Get the name of the specified Hijri month.
   * @param month - A Hijri month (zero indexed i.e., Moharram = 0).
   * @returns The name of the Hijri month in UK English.
   */
  static getMonthName(month: number): string {
    return CONSTANTS.MONTH_NAMES.long.en[month];
  }

  /**
   * Get the short name of the specified Hijri month.
   * @param month - A Hijri month (zero indexed i.e., Moharram = 0).
   * @returns The short name of the Hijri month in UK English.
   */
  static getShortMonthName(month: number): string {
    return CONSTANTS.MONTH_NAMES.short.en[month];
  }

  /**
   * Determine if the specified Gregorian date is a Julian date.
   * @param date - A Gregorian date object.
   * @returns The date is a Julian date.
   */
  static isJulian(date: Date): boolean {
    if (date.getFullYear() < 1582) {
      return true;
    } else if (date.getFullYear() === 1582) {
      if (date.getMonth() < 9) {
        return true;
      } else if (date.getMonth() === 9) {
        if (date.getDate() < 5) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Get the Astronomical Julian Date of the specified Gregorian date.
   * @param date - A Gregorian date object.
   * @returns The Astronomical Julian Date.
   */
  static gregorianToAJD(date: Date): number {
    let a: number | undefined;
    let b: number;
    let year = date.getFullYear();
    let month = date.getMonth() + 1;

    const day =
      date.getDate() +
      date.getHours() / 24 +
      date.getMinutes() / 1440 +
      date.getSeconds() / 86400 +
      date.getMilliseconds() / 86400000;

    if (month < 3) {
      year--;
      month += 12;
    }

    if (HijriDate.isJulian(date)) {
      b = 0;
    } else {
      a = Math.floor(year / 100);
      b = 2 - a + Math.floor(a / 4);
    }

    return (
      Math.floor(365.25 * (year + 4716)) +
      Math.floor(30.6001 * (month + 1)) +
      day +
      b -
      1524.5
    );
  }

  /**
   * Get the Gregorian date for the specified Astronomical Julian Date.
   * @param ajd - An Astronomical Julian Date.
   * @returns The Gregorian date.
   */
  static ajdToGregorian(ajd: number): Date {
    const z = Math.floor(ajd + 0.5);
    const f = ajd + 0.5 - z;

    let a: number;
    if (z < 2299161) {
      a = z;
    } else {
      const alpha = Math.floor((z - 1867216.25) / 36524.25);
      a = z + 1 + alpha - Math.floor(0.25 * alpha);
    }
    const b = a + 1524;
    const c = Math.floor((b - 122.1) / 365.25);
    const d = Math.floor(365.25 * c);
    const e = Math.floor((b - d) / 30.6001);
    const day = b - d - Math.floor(30.6001 * e) + f;
    const hrs = (day - Math.floor(day)) * 24;
    const min = (hrs - Math.floor(hrs)) * 60;
    const sec = (min - Math.floor(min)) * 60;
    const msc = (sec - Math.floor(sec)) * 1000;
    const month = e < 14 ? e - 2 : e - 14;
    const year = month < 2 ? c - 4715 : c - 4716;

    return new Date(
      year,
      month,
      Math.floor(day),
      Math.floor(hrs),
      Math.floor(min),
      Math.floor(sec),
      Math.floor(msc),
    );
  }

  /**
   * Determine if the specified Hijri year is a Kabisa year.
   * @param year - A Hijri year.
   * @returns The year is a Kabisa year.
   */
  static isKabisa(year: number): boolean {
    return CONSTANTS.KABISA_YEAR_REMAINDERS.includes(year % 30);
  }

  /**
   * Get the number of days in the specified Hijri year and month.
   * @param year - A Hijri year.
   * @param month - A Hijri month (zero indexed i.e., Moharram = 0).
   * @returns The number of days in the year and month.
   */
  static daysInMonth(year: number, month: number): number {
    return (month === 11 && HijriDate.isKabisa(year)) || month % 2 === 0
      ? 30
      : 29;
  }

  /**
   * Get the day of the year corresponding to this HijriDate object.
   * @returns The day of the year.
   */
  dayOfYear(): number {
    return this.month === 0
      ? this.day
      : CONSTANTS.DAYS_IN_YEAR[this.month - 1] + this.day;
  }

  /**
   * Get a Hijri date associated with the specified Astronomical Julian Date.
   * @param ajd - An Astronomical Julian Date.
   * @returns The Hijri date.
   */
  static fromAJD(ajd: number): HijriDate {
    let i = 0;
    let left = Math.floor(ajd - 1948083.5);

    const y30 = Math.floor(left / 10631.0);

    left -= y30 * 10631;
    while (left > CONSTANTS.DAYS_IN_30_YEARS[i]) {
      i += 1;
    }

    const year = Math.round(y30 * 30.0 + i);
    if (i > 0) {
      left -= CONSTANTS.DAYS_IN_30_YEARS[i - 1];
    }
    i = 0;
    while (left > CONSTANTS.DAYS_IN_YEAR[i]) {
      i += 1;
    }
    const month = Math.round(i) + 1;
    const date =
      i > 0
        ? Math.round(left - CONSTANTS.DAYS_IN_YEAR[i - 1])
        : Math.round(left);

    return new HijriDate(year, month, date);
  }

  /**
   * Get the Astronomical Julian Date associated with this HijriDate object.
   * @returns The Astronomical Julian Date.
   */
  toAJD(): number {
    const y30 = Math.floor(this.year / 30.0);

    let ajd = 1948083.5 + y30 * 10631 + this.dayOfYear();
    if (this.year % 30 !== 0) {
      ajd += CONSTANTS.DAYS_IN_30_YEARS[this.year - y30 * 30 - 1];
    }

    return ajd;
  }

  /**
   * Get the Hijri date corresponding to the specified Gregorian date.
   * @param date - A Gregorian date.
   * @returns The Hijri date.
   */
  static fromGregorian(date: Date): HijriDate {
    return HijriDate.fromAJD(HijriDate.gregorianToAJD(date));
  }

  /**
   * Get the Gregorian date corresponding to this HijriDate object.
   * @returns The Gregorian date.
   */
  toGregorian(): Date {
    return HijriDate.ajdToGregorian(this.toAJD());
  }
}

export default HijriDate;
