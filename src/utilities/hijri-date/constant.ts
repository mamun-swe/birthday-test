export const CONSTANTS = {
  // Hijri year remainders for determining Kabisa years
  KABISA_YEAR_REMAINDERS: [2, 5, 8, 10, 13, 16, 19, 21, 24, 27, 29] as number[],

  // Number of days in a Hijri year per month
  DAYS_IN_YEAR: [
    30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325,
  ] as number[],

  // Number of days in 30-years per Hijri year
  /* eslint-disable indent, no-multi-spaces */
  DAYS_IN_30_YEARS: [
    354, 708, 1063, 1417, 1771, 2126, 2480, 2834, 3189, 3543, 3898, 4252, 4606,
    4961, 5315, 5669, 6024, 6378, 6732, 7087, 7441, 7796, 8150, 8504, 8859,
    9213, 9567, 9922, 10276, 10631,
  ] as number[],
  /* eslint-enable */

  // Month names
  MONTH_NAMES: {
    long: {
      en: [
        'Moharram al-Haraam',
        'Safar al-Muzaffar',
        'Rabi al-Awwal',
        'Rabi al-Aakhar',
        'Jumada al-Ula',
        'Jumada al-Ukhra',
        'Rajab al-Asab',
        'Shabaan al-Karim',
        'Ramadaan al-Moazzam',
        'Shawwal al-Mukarram',
        'Zilqadah al-Haraam',
        'Zilhaj al-Haraam',
      ] as string[],
    },
    short: {
      en: [
        'Moharram',
        'Safar',
        'Rabi I',
        'Rabi II',
        'Jumada I',
        'Jumada II',
        'Rajab',
        'Shabaan',
        'Ramadaan',
        'Shawwal',
        'Zilqadah',
        'Zilhaj',
      ] as string[],
    },
  },
} as const;
