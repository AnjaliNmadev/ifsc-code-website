export interface GuideTable {
  headers: string[];
  rows: string[][];
  note?: string;
}

export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  table?: GuideTable;
  bullets?: string[];
}

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface GuideContent {
  intro: string;
  keyHighlights?: { rows: [string, string][] };
  sections: GuideSection[];
  faqs: GuideFaq[];
}

export const GUIDE_CONTENT: Record<string, GuideContent> = {
  'long-term-capital-gains-tax': {
    intro:
      'Long-Term Capital Gains (LTCG) tax applies when you sell a capital asset — such as shares, mutual fund units, or property — that you have held beyond a minimum period, at a profit. Following changes announced in the July 2024 Union Budget, the rules and rates differ from what applied in earlier years.',
    keyHighlights: {
      rows: [
        ['Equity shares & equity mutual funds', '12.5% above ₹1.25 lakh/year, no indexation'],
        ['Holding period for listed equity', 'More than 12 months'],
        ['Other assets (property, unlisted shares, gold)', '12.5% without indexation'],
        ['Holding period for immovable property', 'More than 24 months'],
      ],
    },
    sections: [
      {
        heading: 'What counts as a long-term capital gain',
        paragraphs: [
          'Whether a gain is "long-term" depends entirely on how long you held the asset before selling it — not on the amount of profit. For listed equity shares and equity-oriented mutual fund units, holding the asset for more than 12 months qualifies the gain as long-term. For most other assets, including immovable property, unlisted shares, and gold, the holding period threshold is 24 months.',
        ],
      },
      {
        heading: 'Current LTCG tax rates',
        paragraphs: [
          'Effective from 23 July 2024, long-term capital gains on listed equity shares and equity-oriented mutual funds are taxed at a flat 12.5%, but only on the portion of gains that exceeds ₹1.25 lakh in a financial year. This annual exemption applies once across all your qualifying equity gains put together, not separately for each investment.',
          'For most other long-term capital assets — such as real estate, gold, and unlisted shares — the rate is also 12.5%, but without the benefit of indexation (adjusting the purchase price for inflation), which used to reduce the taxable gain under the older rules.',
        ],
        table: {
          headers: ['Asset type', 'Holding period for LTCG', 'Tax rate'],
          rows: [
            ['Listed equity shares', 'More than 12 months', '12.5% above ₹1.25 lakh/year'],
            ['Equity mutual funds', 'More than 12 months', '12.5% above ₹1.25 lakh/year'],
            ['Immovable property', 'More than 24 months', '12.5%, no indexation'],
            ['Gold, unlisted shares', 'More than 24 months', '12.5%, no indexation'],
          ],
          note: 'Rates exclude applicable surcharge and 4% health & education cess.',
        },
      },
      {
        heading: 'A worked example',
        paragraphs: [
          'Say you bought equity mutual fund units for ₹4,00,000 and sold them after 14 months for ₹6,00,000, with no other qualifying long-term gains that year. Your gain is ₹2,00,000. After applying the ₹1.25 lakh annual exemption, only ₹75,000 is taxable, at 12.5% — working out to roughly ₹9,375 in tax, before cess.',
        ],
      },
      {
        heading: 'Special rule for property bought before July 2024',
        paragraphs: [
          'If you acquired land or a building before 23 July 2024, and you are a resident individual or HUF, you can choose whichever is lower: 12.5% without indexation, or 20% with indexation on the old cost-inflation-adjusted basis. This grandfathering provision protects taxpayers who may otherwise have paid more tax under the new flat rate.',
        ],
      },
      {
        heading: 'How to calculate LTCG step by step',
        bullets: [
          'Start with the full value of consideration — the total sale price you received for the asset.',
          'Deduct expenses incurred wholly for the transfer, such as brokerage or commission, to arrive at net consideration.',
          'Deduct the cost of acquisition (and cost of improvement, if any). For land and building bought before 23 July 2024 by a resident individual or HUF, this cost can optionally be indexed using the Cost Inflation Index.',
          'Deduct any exemption you are claiming under sections such as 54, 54B, 54EC, or 54F.',
          'What remains is the LTCG chargeable to tax, on which the applicable rate (12.5%, or 20% with indexation for the grandfathered property case) is applied.',
        ],
      },
      {
        heading: 'Common exemptions that reduce LTCG',
        table: {
          headers: ['Section', 'Asset sold', 'Reinvest in', 'Typical cap'],
          rows: [
            ['Section 54', 'Residential house property', 'Another residential house', 'Up to ₹10 crore'],
            ['Section 54EC', 'Land or building', 'Specified bonds (NHAI, REC, PFC, IRFC)', 'Up to ₹50 lakh'],
            ['Section 54F', 'Any asset other than a house', 'A residential house', 'Proportionate to net consideration reinvested'],
          ],
          note: 'Each section has its own conditions on timelines and lock-in periods; consult a tax professional before relying on an exemption.',
        },
      },
      {
        heading: 'Capital Gains Account Scheme',
        paragraphs: [
          'If you plan to claim an exemption but cannot complete the reinvestment before your income tax return is due, you can deposit the gain in a Capital Gains Account Scheme (CGAS) account with an authorised bank before the return filing deadline. The exemption can then still be claimed, provided the amount is later utilised for the specified reinvestment within the allowed time.',
        ],
      },
      {
        heading: 'LTCG vs STCG at a glance',
        table: {
          headers: ['Aspect', 'Long-term (LTCG)', 'Short-term (STCG)'],
          rows: [
            ['Listed equity holding period', 'More than 12 months', '12 months or less'],
            ['Other assets holding period', 'More than 24 months', '24 months or less'],
            ['Tax rate (equity)', '12.5% above ₹1.25 lakh/year', '20% flat, no exemption'],
            ['Indexation', 'Only for grandfathered property', 'Not available'],
          ],
        },
      },
    ],
    faqs: [
      {
        question: 'Did the LTCG tax rate change recently?',
        answer:
          'Yes. The July 2024 Union Budget raised the LTCG rate on most assets from 10% (for equity) or 20% with indexation (for other assets) to a uniform 12.5%, and raised the annual exemption on equity LTCG from ₹1 lakh to ₹1.25 lakh.',
      },
      {
        question: 'Is there an exemption limit for LTCG on property?',
        answer:
          'There is no separate ₹1.25 lakh-style exemption for property LTCG the way there is for equity. However, you may be able to reduce or defer the tax by reinvesting the gains under sections such as 54, 54F, or 54EC, subject to conditions.',
      },
      {
        question: 'Does indexation still apply to any asset?',
        answer:
          'Indexation was removed for most long-term capital assets from 23 July 2024 onward. The main exception is the grandfathering option for land and buildings acquired before that date, where indexation-based calculation can still be used if it results in lower tax.',
      },
      {
        question: 'Which ITR form is used to report LTCG?',
        answer:
          'Capital gains, including LTCG, are reported in Schedule CG of ITR-2 (or ITR-3 if you also have business/professional income). The total then flows into the total income computation of the form.',
      },
      {
        question: 'Can I set off a long-term capital loss against LTCG?',
        answer:
          'Yes. Long-term capital losses can be set off only against long-term capital gains (not short-term gains) in the same year, and any unabsorbed loss can be carried forward for up to 8 assessment years if the return is filed on time.',
      },
    ],
  },

  'short-term-capital-gains-tax': {
    intro:
      'Short-Term Capital Gains (STCG) tax applies when you sell a capital asset within a short holding period, defined differently depending on the asset type. Since July 2024, STCG on listed equity is taxed at a higher flat rate than before.',
    keyHighlights: {
      rows: [
        ['Equity shares & equity mutual funds', '20% flat, no exemption threshold'],
        ['Holding period for listed equity', '12 months or less'],
        ['Other assets', 'Taxed at your income slab rate'],
      ],
    },
    sections: [
      {
        heading: 'What counts as a short-term capital gain',
        paragraphs: [
          'For listed equity shares and equity-oriented mutual fund units, a gain is short-term if you held the asset for 12 months or less before selling. For most other assets — including debt mutual funds, unlisted shares, and property — the short-term threshold is 24 months for property and effectively immediate (no LTCG concept) for debt funds under current rules.',
        ],
      },
      {
        heading: 'Current STCG tax rates',
        paragraphs: [
          'From 23 July 2024, short-term capital gains on listed equity shares and equity-oriented mutual funds are taxed at a flat 20%, up from 15% previously. Unlike LTCG, there is no annual exemption threshold for STCG — the entire gain is taxable from the first rupee, regardless of your income tax slab.',
          'Short-term gains on most other assets (such as property sold within 24 months, or debt mutual fund gains) are added to your total income and taxed at your applicable income tax slab rate, not at a special flat rate.',
        ],
        table: {
          headers: ['Asset type', 'Holding period for STCG', 'Tax rate'],
          rows: [
            ['Listed equity shares', '12 months or less', '20% flat'],
            ['Equity mutual funds', '12 months or less', '20% flat'],
            ['Immovable property', '24 months or less', 'Your income tax slab rate'],
            ['Debt mutual funds', 'Any holding period', 'Your income tax slab rate'],
          ],
          note: 'Rates exclude applicable surcharge and 4% health & education cess.',
        },
      },
      {
        heading: 'A worked example',
        paragraphs: [
          'If you invest ₹5,00,000 in an equity mutual fund and redeem it after 10 months for ₹6,50,000, your gain of ₹1,50,000 is short-term. Since there is no exemption for STCG, the entire amount is taxed at 20%, working out to ₹30,000 before cess — noticeably more than if you had waited past the 12-month mark for long-term treatment.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Why does holding period matter so much?',
        answer:
          'Because it decides whether your gain is taxed at the flat, often-lower LTCG rate with an annual exemption, or the flat, higher STCG rate with no exemption at all. For equity, waiting past the 12-month mark can meaningfully reduce your tax.',
      },
      {
        question: 'Is STCG the same for every investor regardless of income?',
        answer:
          'For listed equity, yes — the 20% STCG rate is flat and does not depend on which income tax slab you fall into. For other assets taxed at slab rates, your personal tax bracket does determine the rate.',
      },
      {
        question: 'Can I set off short-term capital losses against gains?',
        answer:
          'Yes, short-term capital losses can generally be set off against both short-term and long-term capital gains in the same year, and unused losses can be carried forward for up to 8 assessment years, subject to timely filing of your return.',
      },
    ],
  },

  'other-income-sources': {
    intro:
      'Under the Income Tax Act, any income that does not fit into the four other heads — salary, house property, business/profession, or capital gains — is taxed under "Income from Other Sources." It is a broad, catch-all category that covers everything from bank interest to lottery winnings.',
    sections: [
      {
        heading: 'What typically falls under this head',
        bullets: [
          'Interest earned on savings accounts, fixed deposits, and recurring deposits',
          'Interest on bonds and government securities',
          'Dividends received from shares and mutual funds',
          'Family pension received by a legal heir',
          'Winnings from lotteries, game shows, crossword puzzles, and gambling',
          'Gifts received in cash or kind above specified thresholds, from persons other than close relatives',
          'Interest on income tax refunds',
        ],
      },
      {
        heading: 'How this income is taxed',
        paragraphs: [
          'Most income under this head is added to your total income and taxed at your applicable income tax slab rate. There are important exceptions: lottery winnings, game show prizes, and similar windfall income are taxed at a flat 30% (plus surcharge and cess), regardless of your slab, and no deductions or exemptions are allowed against this specific income.',
        ],
      },
      {
        heading: 'Deduction available on family pension',
        paragraphs: [
          'If you receive a family pension after the death of a family member who was a government or other employee, you can claim a standard deduction — the lower of ₹15,000 or one-third of the pension received — before the balance is taxed.',
        ],
      },
      {
        heading: 'Interest income and TDS',
        paragraphs: [
          'Banks deduct TDS (Tax Deducted at Source) on interest income once it crosses a specified annual threshold, which is higher for senior citizens than for other taxpayers. Even if TDS is deducted, you must still report the full interest income in your return — TDS is only an advance payment of your total tax liability, not the final tax.',
        ],
      },
      {
        heading: 'Deduction on savings account interest — Section 80TTA/80TTB',
        paragraphs: [
          'Under the old tax regime, individuals below 60 can claim a deduction of up to ₹10,000 on savings account interest under Section 80TTA. Senior citizens can instead claim a larger deduction of up to ₹50,000 on interest from savings accounts, fixed deposits, and recurring deposits under Section 80TTB. Neither deduction is available if you opt for the new tax regime.',
        ],
      },
      {
        heading: 'Unexplained income and cash credits',
        paragraphs: [
          'Sections 68 to 69C of the Income Tax Act deal with unexplained cash credits, investments, money, or expenditure that a taxpayer cannot satisfactorily explain the source of. Such amounts can be taxed at a steep flat rate under Section 115BBE, with no deduction, exemption, or set-off against other losses allowed — one reason it is important to be able to substantiate large, unusual credits in your bank account.',
        ],
      },
      {
        heading: 'How to report this income in your ITR',
        paragraphs: [
          'Income from other sources is reported in Schedule OS of your income tax return (ITR-1 for simple cases, or ITR-2/ITR-3 depending on your other income). Interest, dividends, family pension, and other items are entered under their respective heads within this schedule, and any TDS already deducted (as shown in your Form 26AS/AIS) is claimed as a credit against your total tax liability.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need to report bank interest even if it is below the TDS threshold?',
        answer:
          'Yes. TDS thresholds only determine when the bank must deduct tax at source — they do not exempt the income itself. All interest income must be reported in your return, regardless of whether TDS was deducted.',
      },
      {
        question: 'Are gifts from relatives taxable under this head?',
        answer:
          'Generally no. Gifts received from specified close relatives (such as parents, spouse, siblings) are exempt regardless of amount. Gifts from non-relatives are taxable under this head if their aggregate value exceeds ₹50,000 in a financial year.',
      },
      {
        question: 'Can I claim any deductions against lottery or game show winnings?',
        answer:
          'No. Winnings from lotteries, game shows, and similar sources are taxed at a flat 30% on the gross amount, and no deductions, exemptions, or set-offs against this specific income are permitted.',
      },
      {
        question: 'Can I claim 80TTA and 80TTB together?',
        answer:
          'No. Section 80TTB is meant for senior citizens and, where it applies, replaces 80TTA for that taxpayer rather than adding to it. A senior citizen claims the higher 80TTB limit instead of 80TTA, not both together.',
      },
      {
        question: 'Is interest on an income tax refund taxable?',
        answer:
          'Yes. Any interest paid to you by the Income Tax Department on a refund is taxable under income from other sources in the year you receive it, even though the underlying refund itself is not taxable.',
      },
    ],
  },

  'pan-card': {
    intro:
      'PAN (Permanent Account Number) is a 10-character alphanumeric identifier issued by the Income Tax Department to every taxpayer and many other individuals and entities in India. It is central to almost every meaningful financial transaction, from opening a bank account to filing your income tax return.',
    sections: [
      {
        heading: 'Why PAN matters for banking',
        bullets: [
          'Required to open a savings, current, or fixed deposit account at most banks',
          'Mandatory for cash deposits or withdrawals above specified limits',
          'Needed for transactions in shares, mutual funds, and other securities above certain thresholds',
          'Required for high-value purchases such as property and vehicles',
          'Used by banks to report interest income to the Income Tax Department',
        ],
      },
      {
        heading: 'Structure of a PAN number',
        paragraphs: [
          'A PAN follows the format AAAAA9999A — five letters, followed by four digits, followed by one letter. The fourth letter indicates the holder\u2019s status (for example, "P" for an individual, "C" for a company), and the fifth letter is typically derived from the holder\u2019s name.',
        ],
      },
      {
        heading: 'How to apply for a PAN card',
        bullets: [
          'Apply online through the official NSDL (Protean) or UTIITSL portals',
          'Fill in Form 49A (for Indian citizens) or Form 49AA (for foreign citizens)',
          'Upload proof of identity, proof of address, and a passport-size photograph',
          'Pay the applicable fee and submit the application',
          'Track your application status using the acknowledgment number provided',
        ],
      },
      {
        heading: 'Linking PAN with Aadhaar',
        paragraphs: [
          'The Income Tax Department requires most PAN holders to link their PAN with their Aadhaar number. An unlinked PAN can become inoperative, which can block banking transactions, TDS credit, and filing of income tax returns until the linking is completed.',
        ],
      },
      {
        heading: 'Types of PAN card and who needs one',
        bullets: [
          'Individuals (resident and non-resident) — the most common category, used for personal banking and tax filing',
          'Hindu Undivided Families (HUF) — a separate PAN in the name of the HUF, distinct from the karta\u2019s personal PAN',
          'Companies, LLPs, firms, and trusts — a separate PAN is mandatory for every registered entity',
          'Minors — a PAN can be applied for on behalf of a minor, typically used by a parent/guardian for investments made in the minor\u2019s name',
          'Foreign nationals and NRIs — apply using Form 49AA, with proof of foreign address and identity',
        ],
      },
      {
        heading: 'e-PAN and instant PAN',
        paragraphs: [
          'The Income Tax Department offers an instant e-PAN facility for individuals who already have a valid Aadhaar with an up-to-date mobile number. The e-PAN is generated within minutes as a digitally signed PDF and is legally valid, though a physical PAN card can still be requested separately if needed.',
        ],
      },
      {
        heading: 'Correcting or updating PAN details',
        bullets: [
          'Use the "Changes or Correction in PAN Data" request form on the NSDL/UTIITSL portal for changes to name, date of birth, address, or photo',
          'Attach supporting documents proving the corrected detail (such as a marriage certificate for a name change)',
          'Pay the applicable correction fee, which differs for communication addresses within and outside India',
          'A reprinted PAN card is issued with the same PAN number — the PAN number itself never changes once allotted',
        ],
      },
      {
        heading: 'Lost or damaged PAN card',
        paragraphs: [
          'If your physical PAN card is lost, stolen, or damaged, you do not need a new PAN — you can request a reprint of a duplicate card carrying your existing PAN number through the NSDL/UTIITSL "reprint PAN card" service, after verifying your identity.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is PAN mandatory to open a bank account?',
        answer:
          'For most account types, yes. Banks are required to collect PAN (or Form 60, in limited cases where PAN is not yet available) as part of their KYC process before opening an account.',
      },
      {
        question: 'What happens if my PAN is not linked to Aadhaar?',
        answer:
          'An unlinked PAN can be treated as inoperative, which may result in higher TDS deduction, inability to file income tax returns, and disruptions to banking and investment transactions until you complete the linking (usually with a late fee).',
      },
      {
        question: 'Can I have more than one PAN?',
        answer:
          'No. Holding more than one PAN is against the law and can attract a penalty. If you have been issued a duplicate PAN by mistake, you should surrender the extra one through the official portal.',
      },
      {
        question: 'Can I get a PAN card for my child?',
        answer:
          'Yes. A PAN can be issued to a minor, applied for by a parent or guardian on the minor\u2019s behalf, typically to hold investments or bank deposits made in the minor\u2019s name.',
      },
      {
        question: 'How long does it take to get a PAN card?',
        answer:
          'An instant e-PAN linked to Aadhaar can be issued within minutes online. A regular PAN application processed through NSDL/UTIITSL typically takes about one to two weeks for the physical card to be dispatched, depending on document verification.',
      },
    ],
  },

  'aadhaar-card': {
    intro:
      'Aadhaar is a 12-digit unique identity number issued by the Unique Identification Authority of India (UIDAI) to residents of India, based on their biometric and demographic data. It has become one of the most widely used identity documents for banking and government services.',
    sections: [
      {
        heading: 'Why Aadhaar matters for banking',
        bullets: [
          'Commonly used as both proof of identity and proof of address when opening a bank account',
          'Required for linking with PAN for most taxpayers',
          'Used for Aadhaar-enabled payment systems (AePS) at banking correspondents and micro-ATMs',
          'Needed to receive direct benefit transfers (DBT) and government subsidies into your account',
          'Used for e-KYC, allowing some accounts to be opened or verified remotely',
        ],
      },
      {
        heading: 'Updating your Aadhaar details',
        paragraphs: [
          'You can update your name, address, date of birth, mobile number, and other demographic details through UIDAI\u2019s official portal or at an Aadhaar Seva Kendra. Keeping your mobile number and address current is important, since many banking and government services rely on OTP verification tied to your registered Aadhaar mobile number.',
        ],
      },
      {
        heading: 'Aadhaar and privacy',
        paragraphs: [
          'UIDAI provides a masked Aadhaar option, which displays only the last four digits of your Aadhaar number on downloaded copies, and a Virtual ID (VID) that can be used instead of sharing your full Aadhaar number for certain verifications.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is Aadhaar mandatory to open a bank account?',
        answer:
          'While Aadhaar is widely accepted and commonly used, banks are generally required to accept any valid officially recognized identity document for KYC. That said, Aadhaar is by far the most commonly used document in practice, especially for e-KYC.',
      },
      {
        question: 'What should I do if my Aadhaar has incorrect details?',
        answer:
          'You can raise an update request online through UIDAI\u2019s self-service portal for minor corrections, or visit an Aadhaar Seva Kendra with supporting documents for changes like date of birth or biometric updates.',
      },
      {
        question: 'Is it safe to share my Aadhaar number?',
        answer:
          'Share your Aadhaar only with legitimate, verified institutions when required for KYC. Where possible, use a masked Aadhaar copy or Virtual ID instead of your full Aadhaar number to reduce exposure.',
      },
    ],
  },

  'upi-payments-guide': {
    intro:
      'UPI (Unified Payments Interface) is a real-time payment system developed by NPCI that lets you instantly transfer money between bank accounts using just a mobile number, UPI ID, or QR code — without needing to know the recipient\u2019s IFSC code or account number.',
    sections: [
      {
        heading: 'How UPI works',
        paragraphs: [
          'UPI links your bank account to a UPI ID (like yourname@bank) through a UPI app. When you pay someone, the app routes the request through NPCI\u2019s UPI switch, which instructs your bank to debit your account and the recipient\u2019s bank to credit theirs — usually within seconds.',
        ],
      },
      {
        heading: 'UPI vs NEFT vs IMPS',
        table: {
          headers: ['Feature', 'UPI', 'NEFT', 'IMPS'],
          rows: [
            ['Speed', 'Instant', 'Batch-processed, minutes to hours', 'Instant, 24×7'],
            ['Details needed', 'UPI ID / QR / mobile number', 'Account number + IFSC', 'Account number + IFSC, or UPI ID'],
            ['Typical use', 'Everyday small payments', 'Salary, bulk payments', 'Urgent transfers, any amount'],
            ['Availability', '24×7, including holidays', '24×7 (as of current RBI rules)', '24×7, including holidays'],
          ],
        },
      },
      {
        heading: 'UPI transaction limits',
        paragraphs: [
          'Per-transaction and daily limits on UPI vary by bank and by the specific use case (such as person-to-person payments versus certain categories like capital markets or insurance, which may have higher caps). Most banks set a default limit for regular UPI transfers, and you can usually check your specific limit inside your UPI app.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need the receiver\u2019s IFSC code to pay via UPI?',
        answer:
          'No. UPI only needs the receiver\u2019s UPI ID, registered mobile number, or a QR code — the underlying bank account and IFSC mapping is handled behind the scenes.',
      },
      {
        question: 'Is UPI available on bank holidays?',
        answer:
          'Yes, UPI operates 24 hours a day, 7 days a week, including weekends and bank holidays, unlike some older transfer methods that used to be limited to banking hours.',
      },
      {
        question: 'What should I do if a UPI payment fails but money is deducted?',
        answer:
          'In most cases, failed UPI payments are automatically reversed to your account within a few hours to a few working days. If it isn\u2019t reversed, you can raise a complaint through your UPI app, your bank, or the NPCI dispute redressal portal.',
      },
    ],
  },

  'neft-vs-rtgs-vs-imps': {
    intro:
      'NEFT, RTGS, and IMPS are the three main electronic fund transfer systems in India, each suited to slightly different needs based on amount, urgency, and processing time.',
    sections: [
      {
        heading: 'Key differences at a glance',
        table: {
          headers: ['Feature', 'NEFT', 'RTGS', 'IMPS'],
          rows: [
            ['Minimum amount', 'No minimum', '₹2 lakh', 'No minimum'],
            ['Maximum amount', 'No cap (bank-dependent)', 'No cap', 'Bank-defined cap, typically high'],
            ['Processing', 'Batch settlement, half-hourly', 'Real-time, one-to-one', 'Real-time, instant'],
            ['Availability', '24×7 (as of current RBI rules)', '24×7 (as of current RBI rules)', '24×7, including holidays'],
            ['Best for', 'Regular transfers, salary', 'Large, urgent transfers', 'Urgent transfers of any size'],
          ],
        },
      },
      {
        heading: 'When to use which',
        bullets: [
          'Use NEFT for routine transfers where a short delay is acceptable',
          'Use RTGS for large-value, time-critical transfers of ₹2 lakh or more',
          'Use IMPS when you need the money to reach the recipient instantly, at any time, regardless of amount',
        ],
      },
      {
        heading: 'Charges',
        paragraphs: [
          'Most banks now offer NEFT and RTGS free of charge for online (net banking/mobile banking) transactions, following an RBI directive. IMPS charges vary by bank and are usually a small flat fee or slab-based charge depending on the transfer amount.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Which is faster, NEFT or IMPS?',
        answer:
          'IMPS is faster — it settles in real time, any time of day. NEFT is processed in batches at half-hourly intervals, so there can be a short delay even though it now also operates 24×7.',
      },
      {
        question: 'Is there a minimum amount for RTGS?',
        answer:
          'Yes, RTGS is meant for high-value transfers and has a minimum transaction amount of ₹2 lakh. For anything below that, NEFT or IMPS is used instead.',
      },
      {
        question: 'Do I need the IFSC code for all three?',
        answer:
          'Yes, NEFT, RTGS, and IMPS (when done via account number, rather than UPI ID) all require the correct IFSC code of the receiving branch to route the transfer correctly.',
      },
    ],
  },
  'gold-rate-bangalore': {
    intro:
      'The gold rate in Bangalore changes daily based on international bullion prices, the rupee-dollar exchange rate, import duty, and local demand. This guide explains how the Bangalore gold rate is arrived at, the difference between 22K and 24K pricing, and what to check before you buy.',
    sections: [
      {
        heading: 'What determines the gold rate in Bangalore',
        paragraphs: [
          'Karnataka’s jewellery market, centred around areas like Jayanagar and Commercial Street, sets its own local rate based on the national bullion benchmark.',
          'Like every Indian city, Bangalore\u2019s gold price tracks the international spot price of gold (usually quoted in US dollars per ounce), converted to rupees, plus import duty, GST, and a local premium that reflects transport and dealer margins. Because gold is priced continuously in international markets, the rate can change more than once within a single trading day.',
        ],
      },
      {
        heading: '22K vs 24K gold: what is the difference',
        table: {
          headers: ['Purity', 'Gold content', 'Common use'],
          rows: [
            ['24 Karat (24K)', '99.9% pure gold', 'Coins, bars, investment gold'],
            ['22 Karat (22K)', 'About 91.6% pure gold, alloyed with metals like copper/silver', 'Most gold jewellery'],
            ['18 Karat (18K)', 'About 75% pure gold', 'Lightweight or diamond-studded jewellery'],
          ],
          note: '24K gold is the softest and rarely used for jewellery on its own, since it does not hold intricate designs well.',
        },
      },
      {
        heading: 'Making charges, GST, and your final bill',
        paragraphs: [
          'The rate you see quoted for gold is only the metal price. When you buy jewellery, the jeweller adds making charges (a percentage of the value, or a flat per-gram charge, depending on the design and the store) and 3% GST is applied on the total of the gold value plus making charges. Wastage charges may also apply for handcrafted designs.',
          'When comparing jewellers in Bangalore, ask for a bill breakup showing the gold rate used, the making charge percentage, and GST separately — this makes it much easier to compare two quotes fairly.',
        ],
      },
      {
        heading: 'Checking gold purity — hallmarking',
        paragraphs: [
          'BIS hallmarking is the official purity certification system in India. A hallmarked piece carries the BIS mark, a purity grade (such as 916 for 22K), an assaying centre\u2019s mark, and a unique HUID (Hallmark Unique Identification) number that can be verified online through the BIS CARE app. Buying hallmarked gold in Bangalore protects you from being sold under-carated jewellery at a higher-karat price.',
        ],
      },
      {
        heading: 'Tips before buying gold in Bangalore',
        bullets: [
          'Check the live rate for 22K and 24K separately before negotiating — jewellers sometimes quote only one to make comparison harder',
          'Ask for the BIS hallmark and verify the HUID number if the purchase is significant',
          'Get making charges and GST itemised separately on the bill, not bundled into a single figure',
          'Keep the original bill safely — it is needed for resale, exchange, insurance claims, and as proof for high-value purchases',
        ],
      },
    ],
    faqs: [
      {
        question: 'Why does the gold rate in Bangalore change during the day?',
        answer:
          'Gold is traded continuously on international markets, so its rupee-converted price can shift multiple times a day as the international spot price and the rupee-dollar exchange rate move. Local jewellers typically update their quoted rate once or twice a day based on this.',
      },
      {
        question: 'Is the 24K gold rate the price I would pay for jewellery?',
        answer:
          'No. Most jewellery is made in 22K or lower purity, and the price also includes making charges and GST on top of the metal value. The 24K rate is mainly relevant for coins, bars, and as a reference price.',
      },
      {
        question: 'Does the gold rate differ between cities in India?',
        answer:
          'Yes, slightly. While all cities track the same international gold price, local associations add their own margin reflecting local transport, demand, and dealer costs, so quoted rates can vary a little between cities like Bangalore and others on the same day.',
      },
    ],
  },

  'gold-rate-chennai': {
    intro:
      'The gold rate in Chennai changes daily based on international bullion prices, the rupee-dollar exchange rate, import duty, and local demand. This guide explains how the Chennai gold rate is arrived at, the difference between 22K and 24K pricing, and what to check before you buy.',
    sections: [
      {
        heading: 'What determines the gold rate in Chennai',
        paragraphs: [
          'Tamil Nadu has one of India’s largest gold and silver consumer markets, and Chennai’s jewellers’ association typically publishes its own daily rate.',
          'Like every Indian city, Chennai\u2019s gold price tracks the international spot price of gold (usually quoted in US dollars per ounce), converted to rupees, plus import duty, GST, and a local premium that reflects transport and dealer margins. Because gold is priced continuously in international markets, the rate can change more than once within a single trading day.',
        ],
      },
      {
        heading: '22K vs 24K gold: what is the difference',
        table: {
          headers: ['Purity', 'Gold content', 'Common use'],
          rows: [
            ['24 Karat (24K)', '99.9% pure gold', 'Coins, bars, investment gold'],
            ['22 Karat (22K)', 'About 91.6% pure gold, alloyed with metals like copper/silver', 'Most gold jewellery'],
            ['18 Karat (18K)', 'About 75% pure gold', 'Lightweight or diamond-studded jewellery'],
          ],
          note: '24K gold is the softest and rarely used for jewellery on its own, since it does not hold intricate designs well.',
        },
      },
      {
        heading: 'Making charges, GST, and your final bill',
        paragraphs: [
          'The rate you see quoted for gold is only the metal price. When you buy jewellery, the jeweller adds making charges (a percentage of the value, or a flat per-gram charge, depending on the design and the store) and 3% GST is applied on the total of the gold value plus making charges. Wastage charges may also apply for handcrafted designs.',
          'When comparing jewellers in Chennai, ask for a bill breakup showing the gold rate used, the making charge percentage, and GST separately — this makes it much easier to compare two quotes fairly.',
        ],
      },
      {
        heading: 'Checking gold purity — hallmarking',
        paragraphs: [
          'BIS hallmarking is the official purity certification system in India. A hallmarked piece carries the BIS mark, a purity grade (such as 916 for 22K), an assaying centre\u2019s mark, and a unique HUID (Hallmark Unique Identification) number that can be verified online through the BIS CARE app. Buying hallmarked gold in Chennai protects you from being sold under-carated jewellery at a higher-karat price.',
        ],
      },
      {
        heading: 'Tips before buying gold in Chennai',
        bullets: [
          'Check the live rate for 22K and 24K separately before negotiating — jewellers sometimes quote only one to make comparison harder',
          'Ask for the BIS hallmark and verify the HUID number if the purchase is significant',
          'Get making charges and GST itemised separately on the bill, not bundled into a single figure',
          'Keep the original bill safely — it is needed for resale, exchange, insurance claims, and as proof for high-value purchases',
        ],
      },
    ],
    faqs: [
      {
        question: 'Why does the gold rate in Chennai change during the day?',
        answer:
          'Gold is traded continuously on international markets, so its rupee-converted price can shift multiple times a day as the international spot price and the rupee-dollar exchange rate move. Local jewellers typically update their quoted rate once or twice a day based on this.',
      },
      {
        question: 'Is the 24K gold rate the price I would pay for jewellery?',
        answer:
          'No. Most jewellery is made in 22K or lower purity, and the price also includes making charges and GST on top of the metal value. The 24K rate is mainly relevant for coins, bars, and as a reference price.',
      },
      {
        question: 'Does the gold rate differ between cities in India?',
        answer:
          'Yes, slightly. While all cities track the same international gold price, local associations add their own margin reflecting local transport, demand, and dealer costs, so quoted rates can vary a little between cities like Chennai and others on the same day.',
      },
    ],
  },

  'gold-rate-delhi': {
    intro:
      'The gold rate in Delhi changes daily based on international bullion prices, the rupee-dollar exchange rate, import duty, and local demand. This guide explains how the Delhi gold rate is arrived at, the difference between 22K and 24K pricing, and what to check before you buy.',
    sections: [
      {
        heading: 'What determines the gold rate in Delhi',
        paragraphs: [
          'Delhi’s bullion market, one of the oldest in North India, is closely tracked because its rate often moves in step with the wholesale rate set by the Delhi Sarafa/Bullion associations.',
          'Like every Indian city, Delhi\u2019s gold price tracks the international spot price of gold (usually quoted in US dollars per ounce), converted to rupees, plus import duty, GST, and a local premium that reflects transport and dealer margins. Because gold is priced continuously in international markets, the rate can change more than once within a single trading day.',
        ],
      },
      {
        heading: '22K vs 24K gold: what is the difference',
        table: {
          headers: ['Purity', 'Gold content', 'Common use'],
          rows: [
            ['24 Karat (24K)', '99.9% pure gold', 'Coins, bars, investment gold'],
            ['22 Karat (22K)', 'About 91.6% pure gold, alloyed with metals like copper/silver', 'Most gold jewellery'],
            ['18 Karat (18K)', 'About 75% pure gold', 'Lightweight or diamond-studded jewellery'],
          ],
          note: '24K gold is the softest and rarely used for jewellery on its own, since it does not hold intricate designs well.',
        },
      },
      {
        heading: 'Making charges, GST, and your final bill',
        paragraphs: [
          'The rate you see quoted for gold is only the metal price. When you buy jewellery, the jeweller adds making charges (a percentage of the value, or a flat per-gram charge, depending on the design and the store) and 3% GST is applied on the total of the gold value plus making charges. Wastage charges may also apply for handcrafted designs.',
          'When comparing jewellers in Delhi, ask for a bill breakup showing the gold rate used, the making charge percentage, and GST separately — this makes it much easier to compare two quotes fairly.',
        ],
      },
      {
        heading: 'Checking gold purity — hallmarking',
        paragraphs: [
          'BIS hallmarking is the official purity certification system in India. A hallmarked piece carries the BIS mark, a purity grade (such as 916 for 22K), an assaying centre\u2019s mark, and a unique HUID (Hallmark Unique Identification) number that can be verified online through the BIS CARE app. Buying hallmarked gold in Delhi protects you from being sold under-carated jewellery at a higher-karat price.',
        ],
      },
      {
        heading: 'Tips before buying gold in Delhi',
        bullets: [
          'Check the live rate for 22K and 24K separately before negotiating — jewellers sometimes quote only one to make comparison harder',
          'Ask for the BIS hallmark and verify the HUID number if the purchase is significant',
          'Get making charges and GST itemised separately on the bill, not bundled into a single figure',
          'Keep the original bill safely — it is needed for resale, exchange, insurance claims, and as proof for high-value purchases',
        ],
      },
    ],
    faqs: [
      {
        question: 'Why does the gold rate in Delhi change during the day?',
        answer:
          'Gold is traded continuously on international markets, so its rupee-converted price can shift multiple times a day as the international spot price and the rupee-dollar exchange rate move. Local jewellers typically update their quoted rate once or twice a day based on this.',
      },
      {
        question: 'Is the 24K gold rate the price I would pay for jewellery?',
        answer:
          'No. Most jewellery is made in 22K or lower purity, and the price also includes making charges and GST on top of the metal value. The 24K rate is mainly relevant for coins, bars, and as a reference price.',
      },
      {
        question: 'Does the gold rate differ between cities in India?',
        answer:
          'Yes, slightly. While all cities track the same international gold price, local associations add their own margin reflecting local transport, demand, and dealer costs, so quoted rates can vary a little between cities like Delhi and others on the same day.',
      },
    ],
  },

  'gold-rate-hyderabad': {
    intro:
      'The gold rate in Hyderabad changes daily based on international bullion prices, the rupee-dollar exchange rate, import duty, and local demand. This guide explains how the Hyderabad gold rate is arrived at, the difference between 22K and 24K pricing, and what to check before you buy.',
    sections: [
      {
        heading: 'What determines the gold rate in Hyderabad',
        paragraphs: [
          'Hyderabad has a long-standing tradition of gold and pearl jewellery, and local rates are influenced by both national trends and strong festive/wedding-season demand.',
          'Like every Indian city, Hyderabad\u2019s gold price tracks the international spot price of gold (usually quoted in US dollars per ounce), converted to rupees, plus import duty, GST, and a local premium that reflects transport and dealer margins. Because gold is priced continuously in international markets, the rate can change more than once within a single trading day.',
        ],
      },
      {
        heading: '22K vs 24K gold: what is the difference',
        table: {
          headers: ['Purity', 'Gold content', 'Common use'],
          rows: [
            ['24 Karat (24K)', '99.9% pure gold', 'Coins, bars, investment gold'],
            ['22 Karat (22K)', 'About 91.6% pure gold, alloyed with metals like copper/silver', 'Most gold jewellery'],
            ['18 Karat (18K)', 'About 75% pure gold', 'Lightweight or diamond-studded jewellery'],
          ],
          note: '24K gold is the softest and rarely used for jewellery on its own, since it does not hold intricate designs well.',
        },
      },
      {
        heading: 'Making charges, GST, and your final bill',
        paragraphs: [
          'The rate you see quoted for gold is only the metal price. When you buy jewellery, the jeweller adds making charges (a percentage of the value, or a flat per-gram charge, depending on the design and the store) and 3% GST is applied on the total of the gold value plus making charges. Wastage charges may also apply for handcrafted designs.',
          'When comparing jewellers in Hyderabad, ask for a bill breakup showing the gold rate used, the making charge percentage, and GST separately — this makes it much easier to compare two quotes fairly.',
        ],
      },
      {
        heading: 'Checking gold purity — hallmarking',
        paragraphs: [
          'BIS hallmarking is the official purity certification system in India. A hallmarked piece carries the BIS mark, a purity grade (such as 916 for 22K), an assaying centre\u2019s mark, and a unique HUID (Hallmark Unique Identification) number that can be verified online through the BIS CARE app. Buying hallmarked gold in Hyderabad protects you from being sold under-carated jewellery at a higher-karat price.',
        ],
      },
      {
        heading: 'Tips before buying gold in Hyderabad',
        bullets: [
          'Check the live rate for 22K and 24K separately before negotiating — jewellers sometimes quote only one to make comparison harder',
          'Ask for the BIS hallmark and verify the HUID number if the purchase is significant',
          'Get making charges and GST itemised separately on the bill, not bundled into a single figure',
          'Keep the original bill safely — it is needed for resale, exchange, insurance claims, and as proof for high-value purchases',
        ],
      },
    ],
    faqs: [
      {
        question: 'Why does the gold rate in Hyderabad change during the day?',
        answer:
          'Gold is traded continuously on international markets, so its rupee-converted price can shift multiple times a day as the international spot price and the rupee-dollar exchange rate move. Local jewellers typically update their quoted rate once or twice a day based on this.',
      },
      {
        question: 'Is the 24K gold rate the price I would pay for jewellery?',
        answer:
          'No. Most jewellery is made in 22K or lower purity, and the price also includes making charges and GST on top of the metal value. The 24K rate is mainly relevant for coins, bars, and as a reference price.',
      },
      {
        question: 'Does the gold rate differ between cities in India?',
        answer:
          'Yes, slightly. While all cities track the same international gold price, local associations add their own margin reflecting local transport, demand, and dealer costs, so quoted rates can vary a little between cities like Hyderabad and others on the same day.',
      },
    ],
  },

  'gold-rate-kolkata': {
    intro:
      'The gold rate in Kolkata changes daily based on international bullion prices, the rupee-dollar exchange rate, import duty, and local demand. This guide explains how the Kolkata gold rate is arrived at, the difference between 22K and 24K pricing, and what to check before you buy.',
    sections: [
      {
        heading: 'What determines the gold rate in Kolkata',
        paragraphs: [
          'Kolkata’s bullion traders, represented by local associations, publish a daily rate that reflects both the national trend and regional demand in West Bengal.',
          'Like every Indian city, Kolkata\u2019s gold price tracks the international spot price of gold (usually quoted in US dollars per ounce), converted to rupees, plus import duty, GST, and a local premium that reflects transport and dealer margins. Because gold is priced continuously in international markets, the rate can change more than once within a single trading day.',
        ],
      },
      {
        heading: '22K vs 24K gold: what is the difference',
        table: {
          headers: ['Purity', 'Gold content', 'Common use'],
          rows: [
            ['24 Karat (24K)', '99.9% pure gold', 'Coins, bars, investment gold'],
            ['22 Karat (22K)', 'About 91.6% pure gold, alloyed with metals like copper/silver', 'Most gold jewellery'],
            ['18 Karat (18K)', 'About 75% pure gold', 'Lightweight or diamond-studded jewellery'],
          ],
          note: '24K gold is the softest and rarely used for jewellery on its own, since it does not hold intricate designs well.',
        },
      },
      {
        heading: 'Making charges, GST, and your final bill',
        paragraphs: [
          'The rate you see quoted for gold is only the metal price. When you buy jewellery, the jeweller adds making charges (a percentage of the value, or a flat per-gram charge, depending on the design and the store) and 3% GST is applied on the total of the gold value plus making charges. Wastage charges may also apply for handcrafted designs.',
          'When comparing jewellers in Kolkata, ask for a bill breakup showing the gold rate used, the making charge percentage, and GST separately — this makes it much easier to compare two quotes fairly.',
        ],
      },
      {
        heading: 'Checking gold purity — hallmarking',
        paragraphs: [
          'BIS hallmarking is the official purity certification system in India. A hallmarked piece carries the BIS mark, a purity grade (such as 916 for 22K), an assaying centre\u2019s mark, and a unique HUID (Hallmark Unique Identification) number that can be verified online through the BIS CARE app. Buying hallmarked gold in Kolkata protects you from being sold under-carated jewellery at a higher-karat price.',
        ],
      },
      {
        heading: 'Tips before buying gold in Kolkata',
        bullets: [
          'Check the live rate for 22K and 24K separately before negotiating — jewellers sometimes quote only one to make comparison harder',
          'Ask for the BIS hallmark and verify the HUID number if the purchase is significant',
          'Get making charges and GST itemised separately on the bill, not bundled into a single figure',
          'Keep the original bill safely — it is needed for resale, exchange, insurance claims, and as proof for high-value purchases',
        ],
      },
    ],
    faqs: [
      {
        question: 'Why does the gold rate in Kolkata change during the day?',
        answer:
          'Gold is traded continuously on international markets, so its rupee-converted price can shift multiple times a day as the international spot price and the rupee-dollar exchange rate move. Local jewellers typically update their quoted rate once or twice a day based on this.',
      },
      {
        question: 'Is the 24K gold rate the price I would pay for jewellery?',
        answer:
          'No. Most jewellery is made in 22K or lower purity, and the price also includes making charges and GST on top of the metal value. The 24K rate is mainly relevant for coins, bars, and as a reference price.',
      },
      {
        question: 'Does the gold rate differ between cities in India?',
        answer:
          'Yes, slightly. While all cities track the same international gold price, local associations add their own margin reflecting local transport, demand, and dealer costs, so quoted rates can vary a little between cities like Kolkata and others on the same day.',
      },
    ],
  },

  'gold-rate-mumbai': {
    intro:
      'The gold rate in Mumbai changes daily based on international bullion prices, the rupee-dollar exchange rate, import duty, and local demand. This guide explains how the Mumbai gold rate is arrived at, the difference between 22K and 24K pricing, and what to check before you buy.',
    sections: [
      {
        heading: 'What determines the gold rate in Mumbai',
        paragraphs: [
          'Mumbai is home to India’s bullion trading hub, and rates published by the Mumbai Bullion Association are often used as a broader national reference point.',
          'Like every Indian city, Mumbai\u2019s gold price tracks the international spot price of gold (usually quoted in US dollars per ounce), converted to rupees, plus import duty, GST, and a local premium that reflects transport and dealer margins. Because gold is priced continuously in international markets, the rate can change more than once within a single trading day.',
        ],
      },
      {
        heading: '22K vs 24K gold: what is the difference',
        table: {
          headers: ['Purity', 'Gold content', 'Common use'],
          rows: [
            ['24 Karat (24K)', '99.9% pure gold', 'Coins, bars, investment gold'],
            ['22 Karat (22K)', 'About 91.6% pure gold, alloyed with metals like copper/silver', 'Most gold jewellery'],
            ['18 Karat (18K)', 'About 75% pure gold', 'Lightweight or diamond-studded jewellery'],
          ],
          note: '24K gold is the softest and rarely used for jewellery on its own, since it does not hold intricate designs well.',
        },
      },
      {
        heading: 'Making charges, GST, and your final bill',
        paragraphs: [
          'The rate you see quoted for gold is only the metal price. When you buy jewellery, the jeweller adds making charges (a percentage of the value, or a flat per-gram charge, depending on the design and the store) and 3% GST is applied on the total of the gold value plus making charges. Wastage charges may also apply for handcrafted designs.',
          'When comparing jewellers in Mumbai, ask for a bill breakup showing the gold rate used, the making charge percentage, and GST separately — this makes it much easier to compare two quotes fairly.',
        ],
      },
      {
        heading: 'Checking gold purity — hallmarking',
        paragraphs: [
          'BIS hallmarking is the official purity certification system in India. A hallmarked piece carries the BIS mark, a purity grade (such as 916 for 22K), an assaying centre\u2019s mark, and a unique HUID (Hallmark Unique Identification) number that can be verified online through the BIS CARE app. Buying hallmarked gold in Mumbai protects you from being sold under-carated jewellery at a higher-karat price.',
        ],
      },
      {
        heading: 'Tips before buying gold in Mumbai',
        bullets: [
          'Check the live rate for 22K and 24K separately before negotiating — jewellers sometimes quote only one to make comparison harder',
          'Ask for the BIS hallmark and verify the HUID number if the purchase is significant',
          'Get making charges and GST itemised separately on the bill, not bundled into a single figure',
          'Keep the original bill safely — it is needed for resale, exchange, insurance claims, and as proof for high-value purchases',
        ],
      },
    ],
    faqs: [
      {
        question: 'Why does the gold rate in Mumbai change during the day?',
        answer:
          'Gold is traded continuously on international markets, so its rupee-converted price can shift multiple times a day as the international spot price and the rupee-dollar exchange rate move. Local jewellers typically update their quoted rate once or twice a day based on this.',
      },
      {
        question: 'Is the 24K gold rate the price I would pay for jewellery?',
        answer:
          'No. Most jewellery is made in 22K or lower purity, and the price also includes making charges and GST on top of the metal value. The 24K rate is mainly relevant for coins, bars, and as a reference price.',
      },
      {
        question: 'Does the gold rate differ between cities in India?',
        answer:
          'Yes, slightly. While all cities track the same international gold price, local associations add their own margin reflecting local transport, demand, and dealer costs, so quoted rates can vary a little between cities like Mumbai and others on the same day.',
      },
    ],
  },

  'silver-rate-bangalore': {
    intro:
      'The silver rate in Bangalore is driven by international silver prices, industrial demand, the rupee-dollar exchange rate, and local jewellers\u2019 margins. This guide covers how silver is priced in Bangalore, the difference between silver bars, coins, and jewellery, and what to verify before buying.',
    sections: [
      {
        heading: 'What determines the silver rate in Bangalore',
        paragraphs: [
          'Silver is more volatile than gold because a large share of global demand comes from industrial use (electronics, solar panels, and other manufacturing), in addition to jewellery and investment demand. This means the silver rate in Bangalore can move by a larger percentage on a given day than gold typically does.',
          'As with gold, the local price is derived from the international spot rate, converted to rupees, with import duty, GST, and a local dealer margin added on top.',
        ],
      },
      {
        heading: 'Silver bars and coins vs silver jewellery pricing',
        table: {
          headers: ['Form', 'Typical purity', 'How it is priced'],
          rows: [
            ['Silver bars/coins', '99.9% (fine silver)', 'Close to the day\u2019s bullion rate, plus a small making/minting charge'],
            ['Silver jewellery', 'Usually 92.5% (sterling) or lower', 'Metal value plus making charges, which can be a larger share of the price than for bars'],
            ['Silver utensils/articles', 'Varies, often 80\u201392%', 'Priced by weight, with design-based making charges'],
          ],
        },
      },
      {
        heading: 'GST and making charges on silver',
        paragraphs: [
          'GST of 3% applies on silver purchases in Bangalore, calculated on the value of silver plus any making charges, similar to gold. Making charges on silver jewellery and articles are often a higher percentage of the metal value than on gold, since the per-gram value of silver is much lower.',
        ],
      },
      {
        heading: 'How silver purity is verified',
        paragraphs: [
          'BIS hallmarking also covers silver, with common purity grades such as 999 (fine silver) and 925 (sterling silver) stamped on the item along with the BIS mark and the assaying centre\u2019s identification. Asking for hallmarked silver in Bangalore is the simplest way to confirm you are paying for the purity you are told you are buying.',
        ],
      },
      {
        heading: 'Tips before buying silver in Bangalore',
        bullets: [
          'Compare the day\u2019s silver rate at two or three sources, since silver prices can vary more than gold between sellers',
          'Ask whether the quoted rate is for fine silver (999) or an alloyed purity, since this changes the effective price per gram',
          'Factor in making charges separately, especially for utensils and idols, which can carry high making charges relative to metal value',
          'Preserve purchase bills, particularly for larger quantities, for resale and insurance purposes',
        ],
      },
    ],
    faqs: [
      {
        question: 'Why is the silver rate more volatile than gold?',
        answer:
          'A significant portion of global silver demand comes from industrial applications, which makes silver prices more sensitive to changes in industrial activity and manufacturing demand, in addition to the investment and jewellery demand that primarily drives gold.',
      },
      {
        question: 'What purity should I look for when buying silver in Bangalore?',
        answer:
          'For bars and coins, look for 999 (fine silver) hallmarking. For jewellery and utensils, 925 (sterling silver) is a common and reasonable standard; always check the BIS hallmark stamped on the item.',
      },
      {
        question: 'Is GST charged on silver the same way as gold?',
        answer:
          'Yes, silver purchases attract 3% GST on the value of silver plus making charges, the same structure used for gold.',
      },
    ],
  },

  'silver-rate-chennai': {
    intro:
      'The silver rate in Chennai is driven by international silver prices, industrial demand, the rupee-dollar exchange rate, and local jewellers\u2019 margins. This guide covers how silver is priced in Chennai, the difference between silver bars, coins, and jewellery, and what to verify before buying.',
    sections: [
      {
        heading: 'What determines the silver rate in Chennai',
        paragraphs: [
          'Silver is more volatile than gold because a large share of global demand comes from industrial use (electronics, solar panels, and other manufacturing), in addition to jewellery and investment demand. This means the silver rate in Chennai can move by a larger percentage on a given day than gold typically does.',
          'As with gold, the local price is derived from the international spot rate, converted to rupees, with import duty, GST, and a local dealer margin added on top.',
        ],
      },
      {
        heading: 'Silver bars and coins vs silver jewellery pricing',
        table: {
          headers: ['Form', 'Typical purity', 'How it is priced'],
          rows: [
            ['Silver bars/coins', '99.9% (fine silver)', 'Close to the day\u2019s bullion rate, plus a small making/minting charge'],
            ['Silver jewellery', 'Usually 92.5% (sterling) or lower', 'Metal value plus making charges, which can be a larger share of the price than for bars'],
            ['Silver utensils/articles', 'Varies, often 80\u201392%', 'Priced by weight, with design-based making charges'],
          ],
        },
      },
      {
        heading: 'GST and making charges on silver',
        paragraphs: [
          'GST of 3% applies on silver purchases in Chennai, calculated on the value of silver plus any making charges, similar to gold. Making charges on silver jewellery and articles are often a higher percentage of the metal value than on gold, since the per-gram value of silver is much lower.',
        ],
      },
      {
        heading: 'How silver purity is verified',
        paragraphs: [
          'BIS hallmarking also covers silver, with common purity grades such as 999 (fine silver) and 925 (sterling silver) stamped on the item along with the BIS mark and the assaying centre\u2019s identification. Asking for hallmarked silver in Chennai is the simplest way to confirm you are paying for the purity you are told you are buying.',
        ],
      },
      {
        heading: 'Tips before buying silver in Chennai',
        bullets: [
          'Compare the day\u2019s silver rate at two or three sources, since silver prices can vary more than gold between sellers',
          'Ask whether the quoted rate is for fine silver (999) or an alloyed purity, since this changes the effective price per gram',
          'Factor in making charges separately, especially for utensils and idols, which can carry high making charges relative to metal value',
          'Preserve purchase bills, particularly for larger quantities, for resale and insurance purposes',
        ],
      },
    ],
    faqs: [
      {
        question: 'Why is the silver rate more volatile than gold?',
        answer:
          'A significant portion of global silver demand comes from industrial applications, which makes silver prices more sensitive to changes in industrial activity and manufacturing demand, in addition to the investment and jewellery demand that primarily drives gold.',
      },
      {
        question: 'What purity should I look for when buying silver in Chennai?',
        answer:
          'For bars and coins, look for 999 (fine silver) hallmarking. For jewellery and utensils, 925 (sterling silver) is a common and reasonable standard; always check the BIS hallmark stamped on the item.',
      },
      {
        question: 'Is GST charged on silver the same way as gold?',
        answer:
          'Yes, silver purchases attract 3% GST on the value of silver plus making charges, the same structure used for gold.',
      },
    ],
  },

  'silver-rate-delhi': {
    intro:
      'The silver rate in Delhi is driven by international silver prices, industrial demand, the rupee-dollar exchange rate, and local jewellers\u2019 margins. This guide covers how silver is priced in Delhi, the difference between silver bars, coins, and jewellery, and what to verify before buying.',
    sections: [
      {
        heading: 'What determines the silver rate in Delhi',
        paragraphs: [
          'Silver is more volatile than gold because a large share of global demand comes from industrial use (electronics, solar panels, and other manufacturing), in addition to jewellery and investment demand. This means the silver rate in Delhi can move by a larger percentage on a given day than gold typically does.',
          'As with gold, the local price is derived from the international spot rate, converted to rupees, with import duty, GST, and a local dealer margin added on top.',
        ],
      },
      {
        heading: 'Silver bars and coins vs silver jewellery pricing',
        table: {
          headers: ['Form', 'Typical purity', 'How it is priced'],
          rows: [
            ['Silver bars/coins', '99.9% (fine silver)', 'Close to the day\u2019s bullion rate, plus a small making/minting charge'],
            ['Silver jewellery', 'Usually 92.5% (sterling) or lower', 'Metal value plus making charges, which can be a larger share of the price than for bars'],
            ['Silver utensils/articles', 'Varies, often 80\u201392%', 'Priced by weight, with design-based making charges'],
          ],
        },
      },
      {
        heading: 'GST and making charges on silver',
        paragraphs: [
          'GST of 3% applies on silver purchases in Delhi, calculated on the value of silver plus any making charges, similar to gold. Making charges on silver jewellery and articles are often a higher percentage of the metal value than on gold, since the per-gram value of silver is much lower.',
        ],
      },
      {
        heading: 'How silver purity is verified',
        paragraphs: [
          'BIS hallmarking also covers silver, with common purity grades such as 999 (fine silver) and 925 (sterling silver) stamped on the item along with the BIS mark and the assaying centre\u2019s identification. Asking for hallmarked silver in Delhi is the simplest way to confirm you are paying for the purity you are told you are buying.',
        ],
      },
      {
        heading: 'Tips before buying silver in Delhi',
        bullets: [
          'Compare the day\u2019s silver rate at two or three sources, since silver prices can vary more than gold between sellers',
          'Ask whether the quoted rate is for fine silver (999) or an alloyed purity, since this changes the effective price per gram',
          'Factor in making charges separately, especially for utensils and idols, which can carry high making charges relative to metal value',
          'Preserve purchase bills, particularly for larger quantities, for resale and insurance purposes',
        ],
      },
    ],
    faqs: [
      {
        question: 'Why is the silver rate more volatile than gold?',
        answer:
          'A significant portion of global silver demand comes from industrial applications, which makes silver prices more sensitive to changes in industrial activity and manufacturing demand, in addition to the investment and jewellery demand that primarily drives gold.',
      },
      {
        question: 'What purity should I look for when buying silver in Delhi?',
        answer:
          'For bars and coins, look for 999 (fine silver) hallmarking. For jewellery and utensils, 925 (sterling silver) is a common and reasonable standard; always check the BIS hallmark stamped on the item.',
      },
      {
        question: 'Is GST charged on silver the same way as gold?',
        answer:
          'Yes, silver purchases attract 3% GST on the value of silver plus making charges, the same structure used for gold.',
      },
    ],
  },

  'silver-rate-hyderabad': {
    intro:
      'The silver rate in Hyderabad is driven by international silver prices, industrial demand, the rupee-dollar exchange rate, and local jewellers\u2019 margins. This guide covers how silver is priced in Hyderabad, the difference between silver bars, coins, and jewellery, and what to verify before buying.',
    sections: [
      {
        heading: 'What determines the silver rate in Hyderabad',
        paragraphs: [
          'Silver is more volatile than gold because a large share of global demand comes from industrial use (electronics, solar panels, and other manufacturing), in addition to jewellery and investment demand. This means the silver rate in Hyderabad can move by a larger percentage on a given day than gold typically does.',
          'As with gold, the local price is derived from the international spot rate, converted to rupees, with import duty, GST, and a local dealer margin added on top.',
        ],
      },
      {
        heading: 'Silver bars and coins vs silver jewellery pricing',
        table: {
          headers: ['Form', 'Typical purity', 'How it is priced'],
          rows: [
            ['Silver bars/coins', '99.9% (fine silver)', 'Close to the day\u2019s bullion rate, plus a small making/minting charge'],
            ['Silver jewellery', 'Usually 92.5% (sterling) or lower', 'Metal value plus making charges, which can be a larger share of the price than for bars'],
            ['Silver utensils/articles', 'Varies, often 80\u201392%', 'Priced by weight, with design-based making charges'],
          ],
        },
      },
      {
        heading: 'GST and making charges on silver',
        paragraphs: [
          'GST of 3% applies on silver purchases in Hyderabad, calculated on the value of silver plus any making charges, similar to gold. Making charges on silver jewellery and articles are often a higher percentage of the metal value than on gold, since the per-gram value of silver is much lower.',
        ],
      },
      {
        heading: 'How silver purity is verified',
        paragraphs: [
          'BIS hallmarking also covers silver, with common purity grades such as 999 (fine silver) and 925 (sterling silver) stamped on the item along with the BIS mark and the assaying centre\u2019s identification. Asking for hallmarked silver in Hyderabad is the simplest way to confirm you are paying for the purity you are told you are buying.',
        ],
      },
      {
        heading: 'Tips before buying silver in Hyderabad',
        bullets: [
          'Compare the day\u2019s silver rate at two or three sources, since silver prices can vary more than gold between sellers',
          'Ask whether the quoted rate is for fine silver (999) or an alloyed purity, since this changes the effective price per gram',
          'Factor in making charges separately, especially for utensils and idols, which can carry high making charges relative to metal value',
          'Preserve purchase bills, particularly for larger quantities, for resale and insurance purposes',
        ],
      },
    ],
    faqs: [
      {
        question: 'Why is the silver rate more volatile than gold?',
        answer:
          'A significant portion of global silver demand comes from industrial applications, which makes silver prices more sensitive to changes in industrial activity and manufacturing demand, in addition to the investment and jewellery demand that primarily drives gold.',
      },
      {
        question: 'What purity should I look for when buying silver in Hyderabad?',
        answer:
          'For bars and coins, look for 999 (fine silver) hallmarking. For jewellery and utensils, 925 (sterling silver) is a common and reasonable standard; always check the BIS hallmark stamped on the item.',
      },
      {
        question: 'Is GST charged on silver the same way as gold?',
        answer:
          'Yes, silver purchases attract 3% GST on the value of silver plus making charges, the same structure used for gold.',
      },
    ],
  },

  'silver-rate-kolkata': {
    intro:
      'The silver rate in Kolkata is driven by international silver prices, industrial demand, the rupee-dollar exchange rate, and local jewellers\u2019 margins. This guide covers how silver is priced in Kolkata, the difference between silver bars, coins, and jewellery, and what to verify before buying.',
    sections: [
      {
        heading: 'What determines the silver rate in Kolkata',
        paragraphs: [
          'Silver is more volatile than gold because a large share of global demand comes from industrial use (electronics, solar panels, and other manufacturing), in addition to jewellery and investment demand. This means the silver rate in Kolkata can move by a larger percentage on a given day than gold typically does.',
          'As with gold, the local price is derived from the international spot rate, converted to rupees, with import duty, GST, and a local dealer margin added on top.',
        ],
      },
      {
        heading: 'Silver bars and coins vs silver jewellery pricing',
        table: {
          headers: ['Form', 'Typical purity', 'How it is priced'],
          rows: [
            ['Silver bars/coins', '99.9% (fine silver)', 'Close to the day\u2019s bullion rate, plus a small making/minting charge'],
            ['Silver jewellery', 'Usually 92.5% (sterling) or lower', 'Metal value plus making charges, which can be a larger share of the price than for bars'],
            ['Silver utensils/articles', 'Varies, often 80\u201392%', 'Priced by weight, with design-based making charges'],
          ],
        },
      },
      {
        heading: 'GST and making charges on silver',
        paragraphs: [
          'GST of 3% applies on silver purchases in Kolkata, calculated on the value of silver plus any making charges, similar to gold. Making charges on silver jewellery and articles are often a higher percentage of the metal value than on gold, since the per-gram value of silver is much lower.',
        ],
      },
      {
        heading: 'How silver purity is verified',
        paragraphs: [
          'BIS hallmarking also covers silver, with common purity grades such as 999 (fine silver) and 925 (sterling silver) stamped on the item along with the BIS mark and the assaying centre\u2019s identification. Asking for hallmarked silver in Kolkata is the simplest way to confirm you are paying for the purity you are told you are buying.',
        ],
      },
      {
        heading: 'Tips before buying silver in Kolkata',
        bullets: [
          'Compare the day\u2019s silver rate at two or three sources, since silver prices can vary more than gold between sellers',
          'Ask whether the quoted rate is for fine silver (999) or an alloyed purity, since this changes the effective price per gram',
          'Factor in making charges separately, especially for utensils and idols, which can carry high making charges relative to metal value',
          'Preserve purchase bills, particularly for larger quantities, for resale and insurance purposes',
        ],
      },
    ],
    faqs: [
      {
        question: 'Why is the silver rate more volatile than gold?',
        answer:
          'A significant portion of global silver demand comes from industrial applications, which makes silver prices more sensitive to changes in industrial activity and manufacturing demand, in addition to the investment and jewellery demand that primarily drives gold.',
      },
      {
        question: 'What purity should I look for when buying silver in Kolkata?',
        answer:
          'For bars and coins, look for 999 (fine silver) hallmarking. For jewellery and utensils, 925 (sterling silver) is a common and reasonable standard; always check the BIS hallmark stamped on the item.',
      },
      {
        question: 'Is GST charged on silver the same way as gold?',
        answer:
          'Yes, silver purchases attract 3% GST on the value of silver plus making charges, the same structure used for gold.',
      },
    ],
  },

  'silver-rate-mumbai': {
    intro:
      'The silver rate in Mumbai is driven by international silver prices, industrial demand, the rupee-dollar exchange rate, and local jewellers\u2019 margins. This guide covers how silver is priced in Mumbai, the difference between silver bars, coins, and jewellery, and what to verify before buying.',
    sections: [
      {
        heading: 'What determines the silver rate in Mumbai',
        paragraphs: [
          'Silver is more volatile than gold because a large share of global demand comes from industrial use (electronics, solar panels, and other manufacturing), in addition to jewellery and investment demand. This means the silver rate in Mumbai can move by a larger percentage on a given day than gold typically does.',
          'As with gold, the local price is derived from the international spot rate, converted to rupees, with import duty, GST, and a local dealer margin added on top.',
        ],
      },
      {
        heading: 'Silver bars and coins vs silver jewellery pricing',
        table: {
          headers: ['Form', 'Typical purity', 'How it is priced'],
          rows: [
            ['Silver bars/coins', '99.9% (fine silver)', 'Close to the day\u2019s bullion rate, plus a small making/minting charge'],
            ['Silver jewellery', 'Usually 92.5% (sterling) or lower', 'Metal value plus making charges, which can be a larger share of the price than for bars'],
            ['Silver utensils/articles', 'Varies, often 80\u201392%', 'Priced by weight, with design-based making charges'],
          ],
        },
      },
      {
        heading: 'GST and making charges on silver',
        paragraphs: [
          'GST of 3% applies on silver purchases in Mumbai, calculated on the value of silver plus any making charges, similar to gold. Making charges on silver jewellery and articles are often a higher percentage of the metal value than on gold, since the per-gram value of silver is much lower.',
        ],
      },
      {
        heading: 'How silver purity is verified',
        paragraphs: [
          'BIS hallmarking also covers silver, with common purity grades such as 999 (fine silver) and 925 (sterling silver) stamped on the item along with the BIS mark and the assaying centre\u2019s identification. Asking for hallmarked silver in Mumbai is the simplest way to confirm you are paying for the purity you are told you are buying.',
        ],
      },
      {
        heading: 'Tips before buying silver in Mumbai',
        bullets: [
          'Compare the day\u2019s silver rate at two or three sources, since silver prices can vary more than gold between sellers',
          'Ask whether the quoted rate is for fine silver (999) or an alloyed purity, since this changes the effective price per gram',
          'Factor in making charges separately, especially for utensils and idols, which can carry high making charges relative to metal value',
          'Preserve purchase bills, particularly for larger quantities, for resale and insurance purposes',
        ],
      },
    ],
    faqs: [
      {
        question: 'Why is the silver rate more volatile than gold?',
        answer:
          'A significant portion of global silver demand comes from industrial applications, which makes silver prices more sensitive to changes in industrial activity and manufacturing demand, in addition to the investment and jewellery demand that primarily drives gold.',
      },
      {
        question: 'What purity should I look for when buying silver in Mumbai?',
        answer:
          'For bars and coins, look for 999 (fine silver) hallmarking. For jewellery and utensils, 925 (sterling silver) is a common and reasonable standard; always check the BIS hallmark stamped on the item.',
      },
      {
        question: 'Is GST charged on silver the same way as gold?',
        answer:
          'Yes, silver purchases attract 3% GST on the value of silver plus making charges, the same structure used for gold.',
      },
    ],
  },

  'what-is-grey-market-premium-gmp-ipo': {
    intro:
      'Grey Market Premium (GMP) is the unofficial, informal premium at which an IPO\u2019s shares trade in the "grey market" — outside any recognised stock exchange — before the shares are actually listed. It is widely watched by retail investors as an early, unofficial signal of listing-day demand, but it is not a regulated or guaranteed indicator.',
    sections: [
      {
        heading: 'How grey market premium works',
        paragraphs: [
          'Once an IPO opens for subscription (and sometimes even before), a small, informal network of dealers begins quoting a price at which they are willing to buy or sell the right to an allotment, ahead of the shares being credited to demat accounts. This price, expressed as a premium over the issue price, is the GMP.',
          'For example, if an IPO is priced at ₹100 and the GMP is quoted at ₹40, market participants are informally estimating the stock could list around ₹140 — but this is sentiment, not a certainty.',
        ],
      },
      {
        heading: 'Why GMP is unofficial and unregulated',
        bullets: [
          'The grey market operates outside SEBI and stock exchange oversight — there is no formal exchange, clearing mechanism, or legal enforceability behind a GMP-based trade',
          'GMP figures are collected informally from a small number of dealers and can vary from source to source on the same day',
          'GMP can swing sharply based on overall market sentiment, subscription numbers, and news, sometimes with little relationship to the company\u2019s fundamentals',
          'There is no guarantee that a high GMP will translate into an equivalent listing-day gain, and GMP can even turn negative before listing',
        ],
      },
      {
        heading: 'How investors typically use GMP',
        paragraphs: [
          'Many retail investors track GMP as one of several inputs when deciding whether to apply for an IPO, alongside the company\u2019s financials, valuation, subscription levels across investor categories, and anchor investor participation. Relying on GMP alone, without looking at the business fundamentals, is generally considered risky.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is trading in the grey market legal in India?',
        answer:
          'Grey market trading operates in a legal grey area — it is not officially recognised or regulated by SEBI or the stock exchanges, and settlements rely purely on the mutual trust between the parties involved, with no formal recourse if a party defaults.',
      },
      {
        question: 'Does a high GMP guarantee listing gains?',
        answer:
          'No. GMP is an informal sentiment indicator, not a guaranteed outcome. Actual listing price is determined by market demand and supply on listing day and can differ significantly from the grey market estimate.',
      },
      {
        question: 'Where can I check an IPO\u2019s GMP?',
        answer:
          'Several financial news and IPO-tracking websites publish daily GMP updates during the subscription period, though figures can differ between sources since there is no single official reporting mechanism.',
      },
    ],
  },

  'types-of-ipo': {
    intro:
      'An Initial Public Offering (IPO) is the process through which a private company offers its shares to the public for the first time. In India, IPOs are primarily classified by how the price is determined (fixed price vs book-built) and by the size and exchange segment of the company (mainboard vs SME).',
    sections: [
      {
        heading: 'Fixed price issue',
        paragraphs: [
          'In a fixed price IPO, the issuing company and its merchant bankers decide a specific price at which shares will be offered, and this price is disclosed in advance in the offer document. Investors know exactly what price they will pay when applying, and demand is only visible once the subscription figures are published after the issue closes.',
        ],
      },
      {
        heading: 'Book-built issue',
        paragraphs: [
          'In a book-built IPO — the far more common route today — the company announces a price band (a lower and upper price) rather than a single fixed price. Investors bid within this band, and the final issue price is discovered based on the demand received at each price point, typically settling at or near the upper end of the band for well-received issues.',
        ],
        bullets: [
          'Price band: a floor price and cap price are announced, usually with the cap not more than 20% above the floor',
          'Bidding: investors submit bids at a specific price (or "cut-off", agreeing to pay whatever final price is discovered) within the band',
          'Price discovery: the final issue price is fixed based on the pattern of bids received across investor categories',
        ],
      },
      {
        heading: 'Mainboard IPO vs SME IPO',
        table: {
          headers: ['Aspect', 'Mainboard IPO', 'SME IPO'],
          rows: [
            ['Company size', 'Larger, established companies', 'Small and medium enterprises'],
            ['Minimum post-issue capital', 'Higher threshold set by SEBI/exchange', 'Lower threshold, tailored for smaller companies'],
            ['Exchange platform', 'Main board of NSE/BSE', 'NSE Emerge / BSE SME platform'],
            ['Minimum application lot value', 'Typically ₹10,000–15,000 range', 'Typically higher, often ₹1 lakh+'],
            ['Liquidity', 'Generally higher trading volumes', 'Can be comparatively lower and more volatile'],
          ],
        },
      },
      {
        heading: 'Other categories worth knowing',
        bullets: [
          'Offer for Sale (OFS) component: existing shareholders (such as promoters or private equity investors) sell part of their holding, with proceeds going to them rather than the company',
          'Fresh issue component: new shares are issued and proceeds go to the company, often for expansion, debt repayment, or working capital',
          'Many IPOs combine both a fresh issue and an offer-for-sale component in a single issue',
        ],
      },
    ],
    faqs: [
      {
        question: 'Which is more common in India today, fixed price or book-built issues?',
        answer:
          'Book-built issues are far more common for mainboard IPOs today, since the price-band and bidding mechanism allows the market to help determine a fair issue price based on actual demand.',
      },
      {
        question: 'Is an SME IPO riskier than a mainboard IPO?',
        answer:
          'SME IPOs generally carry higher risk due to the smaller size and shorter track record of the companies involved, along with typically lower trading liquidity after listing, compared with larger, more established mainboard companies.',
      },
      {
        question: 'What does "Offer for Sale" mean in an IPO?',
        answer:
          'An Offer for Sale (OFS) is where existing shareholders sell some of their already-held shares to the public through the IPO. Unlike a fresh issue, the money raised goes to the selling shareholders, not to the company itself.',
      },
    ],
  },

  'how-to-check-ipo-allotment-status': {
    intro:
      'IPO allotment is the process by which shares applied for are allocated to investors after the subscription period closes, typically through a computerised lottery-style process when an issue is oversubscribed. You can check whether you received an allotment through the registrar\u2019s website, the stock exchange, or your broker.',
    sections: [
      {
        heading: 'Check via the registrar\u2019s website',
        bullets: [
          'Visit the website of the IPO\u2019s official registrar (commonly Link Intime or KFin Technologies for most Indian IPOs)',
          'Select the specific company/IPO from the dropdown list',
          'Enter your PAN, application number, or DP/Client ID as requested',
          'Submit to view your allotment status — allotted, not allotted, or partially allotted',
        ],
      },
      {
        heading: 'Check via the stock exchange (NSE/BSE)',
        bullets: [
          'Go to the "IPO Allotment Status" section on the NSE or BSE website',
          'Select the relevant IPO and exchange (equity)',
          'Enter your PAN and application number',
          'View your allotment result directly from the exchange\u2019s records',
        ],
      },
      {
        heading: 'Check via your broker or UPI app',
        paragraphs: [
          'Most brokers and UPI apps used for applying to IPOs (through the ASBA/UPI mandate process) also show your application and allotment status within the app itself, under an "IPO" or "Orders" section, once the registrar finalises the allotment.',
        ],
      },
      {
        heading: 'What happens after allotment',
        paragraphs: [
          'If shares are allotted, they are credited to your demat account, and the blocked amount for any unallotted shares is released back to your bank account (since IPO applications use the ASBA mechanism, where funds are only blocked, not debited, until allotment). If no shares are allotted, the entire blocked amount is released without any deduction.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How soon after the IPO closes can I check allotment status?',
        answer:
          'Allotment is typically finalised and published within a few working days after the subscription period closes, as specified in the IPO\u2019s official timeline — usually well before the listing date.',
      },
      {
        question: 'Is my money debited immediately when I apply for an IPO?',
        answer:
          'No. Under the ASBA (Applications Supported by Blocked Amount) process, your application amount is only blocked (frozen) in your bank account, not debited. It is debited only if you receive an allotment; otherwise the block is released.',
      },
      {
        question: 'What if I applied through multiple applications with the same PAN?',
        answer:
          'SEBI rules generally prohibit multiple applications from the same person in the same IPO under the same category, and such applications can be rejected. Each investor should apply only once per IPO per eligible category.',
      },
    ],
  },
};
