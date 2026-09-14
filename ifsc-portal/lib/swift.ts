/**
 * SWIFT / BIC code validation and structural decoding.
 *
 * A SWIFT (Business Identifier Code) is either 8 or 11 characters:
 *   AAAA BB CC (DDD)
 *   - AAAA : 4-letter bank/institution code
 *   - BB   : 2-letter ISO 3166-1 country code
 *   - CC   : 2-character location code (letters or digits)
 *   - DDD  : optional 3-character branch code (omitted = head office / "XXX")
 *
 * Unlike an IFSC code, a SWIFT code's structure can be checked and decoded
 * entirely offline — no dataset lookup is required to validate its format
 * or work out which country and branch pattern it points to.
 */

const SWIFT_REGEX = /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/;

export function normalizeSwift(code: string): string {
  return code.trim().toUpperCase();
}

export function isValidSwift(code: string): boolean {
  return SWIFT_REGEX.test(normalizeSwift(code));
}

export interface SwiftBreakdown {
  code: string;
  bankCode: string;
  countryCode: string;
  countryName: string | null;
  locationCode: string;
  branchCode: string | null;
  isHeadOffice: boolean;
  isTestCode: boolean;
  isPassiveParticipant: boolean;
}

/** Decodes a SWIFT/BIC code into its component parts. Returns null if the format is invalid. */
export function decodeSwift(rawCode: string): SwiftBreakdown | null {
  const code = normalizeSwift(rawCode);
  if (!SWIFT_REGEX.test(code)) return null;

  const bankCode = code.slice(0, 4);
  const countryCode = code.slice(4, 6);
  const locationCode = code.slice(6, 8);
  const branchCode = code.length === 11 ? code.slice(8, 11) : null;

  return {
    code,
    bankCode,
    countryCode,
    countryName: COUNTRY_NAMES[countryCode] ?? null,
    locationCode,
    branchCode,
    isHeadOffice: !branchCode || branchCode === 'XXX',
    // By SWIFT convention, a "0" as the second location-code character marks
    // a test/training BIC rather than one used for live transactions.
    isTestCode: locationCode[1] === '0',
    isPassiveParticipant: locationCode[1] === '1',
  };
}

/** ISO 3166-1 alpha-2 country codes used in the SWIFT country-code position. */
export const COUNTRY_NAMES: Record<string, string> = {
  AD: 'Andorra', AE: 'United Arab Emirates', AF: 'Afghanistan', AG: 'Antigua and Barbuda',
  AI: 'Anguilla', AL: 'Albania', AM: 'Armenia', AO: 'Angola', AQ: 'Antarctica',
  AR: 'Argentina', AS: 'American Samoa', AT: 'Austria', AU: 'Australia', AW: 'Aruba',
  AX: 'Åland Islands', AZ: 'Azerbaijan', BA: 'Bosnia and Herzegovina', BB: 'Barbados',
  BD: 'Bangladesh', BE: 'Belgium', BF: 'Burkina Faso', BG: 'Bulgaria', BH: 'Bahrain',
  BI: 'Burundi', BJ: 'Benin', BL: 'Saint Barthélemy', BM: 'Bermuda', BN: 'Brunei',
  BO: 'Bolivia', BQ: 'Bonaire, Sint Eustatius and Saba', BR: 'Brazil', BS: 'Bahamas',
  BT: 'Bhutan', BV: 'Bouvet Island', BW: 'Botswana', BY: 'Belarus', BZ: 'Belize',
  CA: 'Canada', CC: 'Cocos (Keeling) Islands', CD: 'DR Congo',
  CF: 'Central African Republic', CG: 'Congo', CH: 'Switzerland', CI: 'Ivory Coast',
  CK: 'Cook Islands', CL: 'Chile', CM: 'Cameroon', CN: 'China', CO: 'Colombia',
  CR: 'Costa Rica', CU: 'Cuba', CV: 'Cape Verde', CW: 'Curaçao', CX: 'Christmas Island',
  CY: 'Cyprus', CZ: 'Czechia', DE: 'Germany', DJ: 'Djibouti', DK: 'Denmark',
  DM: 'Dominica', DO: 'Dominican Republic', DZ: 'Algeria', EC: 'Ecuador', EE: 'Estonia',
  EG: 'Egypt', EH: 'Western Sahara', ER: 'Eritrea', ES: 'Spain', ET: 'Ethiopia',
  FI: 'Finland', FJ: 'Fiji', FK: 'Falkland Islands', FM: 'Micronesia', FO: 'Faroe Islands',
  FR: 'France', GA: 'Gabon', GB: 'United Kingdom', GD: 'Grenada', GE: 'Georgia',
  GF: 'French Guiana', GG: 'Guernsey', GH: 'Ghana', GI: 'Gibraltar', GL: 'Greenland',
  GM: 'Gambia', GN: 'Guinea', GP: 'Guadeloupe', GQ: 'Equatorial Guinea', GR: 'Greece',
  GS: 'South Georgia and the South Sandwich Islands', GT: 'Guatemala', GU: 'Guam',
  GW: 'Guinea-Bissau', GY: 'Guyana', HK: 'Hong Kong', HM: 'Heard Island and McDonald Islands',
  HN: 'Honduras', HR: 'Croatia', HT: 'Haiti', HU: 'Hungary', ID: 'Indonesia',
  IE: 'Ireland', IL: 'Israel', IM: 'Isle of Man', IN: 'India',
  IO: 'British Indian Ocean Territory', IQ: 'Iraq', IR: 'Iran', IS: 'Iceland',
  IT: 'Italy', JE: 'Jersey', JM: 'Jamaica', JO: 'Jordan', JP: 'Japan', KE: 'Kenya',
  KG: 'Kyrgyzstan', KH: 'Cambodia', KI: 'Kiribati', KM: 'Comoros',
  KN: 'Saint Kitts and Nevis', KP: 'North Korea', KR: 'South Korea', KW: 'Kuwait',
  KY: 'Cayman Islands', KZ: 'Kazakhstan', LA: 'Laos', LB: 'Lebanon', LC: 'Saint Lucia',
  LI: 'Liechtenstein', LK: 'Sri Lanka', LR: 'Liberia', LS: 'Lesotho', LT: 'Lithuania',
  LU: 'Luxembourg', LV: 'Latvia', LY: 'Libya', MA: 'Morocco', MC: 'Monaco',
  MD: 'Moldova', ME: 'Montenegro', MF: 'Saint Martin', MG: 'Madagascar',
  MH: 'Marshall Islands', MK: 'North Macedonia', ML: 'Mali', MM: 'Myanmar',
  MN: 'Mongolia', MO: 'Macau', MP: 'Northern Mariana Islands', MQ: 'Martinique',
  MR: 'Mauritania', MS: 'Montserrat', MT: 'Malta', MU: 'Mauritius', MV: 'Maldives',
  MW: 'Malawi', MX: 'Mexico', MY: 'Malaysia', MZ: 'Mozambique', NA: 'Namibia',
  NC: 'New Caledonia', NE: 'Niger', NF: 'Norfolk Island', NG: 'Nigeria',
  NI: 'Nicaragua', NL: 'Netherlands', NO: 'Norway', NP: 'Nepal', NR: 'Nauru',
  NU: 'Niue', NZ: 'New Zealand', OM: 'Oman', PA: 'Panama', PE: 'Peru',
  PF: 'French Polynesia', PG: 'Papua New Guinea', PH: 'Philippines', PK: 'Pakistan',
  PL: 'Poland', PM: 'Saint Pierre and Miquelon', PN: 'Pitcairn Islands',
  PR: 'Puerto Rico', PS: 'Palestine', PT: 'Portugal', PW: 'Palau', PY: 'Paraguay',
  QA: 'Qatar', RE: 'Réunion', RO: 'Romania', RS: 'Serbia', RU: 'Russia', RW: 'Rwanda',
  SA: 'Saudi Arabia', SB: 'Solomon Islands', SC: 'Seychelles', SD: 'Sudan',
  SE: 'Sweden', SG: 'Singapore', SH: 'Saint Helena', SI: 'Slovenia',
  SJ: 'Svalbard and Jan Mayen', SK: 'Slovakia', SL: 'Sierra Leone', SM: 'San Marino',
  SN: 'Senegal', SO: 'Somalia', SR: 'Suriname', SS: 'South Sudan',
  ST: 'São Tomé and Príncipe', SV: 'El Salvador', SX: 'Sint Maarten', SY: 'Syria',
  SZ: 'Eswatini', TC: 'Turks and Caicos Islands', TD: 'Chad',
  TF: 'French Southern Territories', TG: 'Togo', TH: 'Thailand', TJ: 'Tajikistan',
  TK: 'Tokelau', TL: 'Timor-Leste', TM: 'Turkmenistan', TN: 'Tunisia', TO: 'Tonga',
  TR: 'Turkey', TT: 'Trinidad and Tobago', TV: 'Tuvalu', TW: 'Taiwan',
  TZ: 'Tanzania', UA: 'Ukraine', UG: 'Uganda', UM: 'US Minor Outlying Islands',
  US: 'United States', UY: 'Uruguay', UZ: 'Uzbekistan', VA: 'Vatican City',
  VC: 'Saint Vincent and the Grenadines', VE: 'Venezuela', VG: 'British Virgin Islands',
  VI: 'US Virgin Islands', VN: 'Vietnam', VU: 'Vanuatu', WF: 'Wallis and Futuna',
  WS: 'Samoa', YE: 'Yemen', YT: 'Mayotte', ZA: 'South Africa', ZM: 'Zambia',
  ZW: 'Zimbabwe',
};
