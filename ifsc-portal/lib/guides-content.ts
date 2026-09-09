export interface GuideTable {
  headers: string[];
  rows: string[][];
  note?: string;
}

export interface GuideSubsection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: GuideTable;
  subsections?: GuideSubsection[];
}

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface GuideContent {
  intro: string;
  keyHighlights?: GuideTable;
  sections: GuideSection[];
  faqs: GuideFaq[];
}

export const GUIDE_CONTENT: Record<string, GuideContent> = {
  'capital-gains-income': {
    intro:
      'Capital gains tax is charged on the profit you make when you sell a capital asset — such as property, shares, mutual funds, or gold — for more than what you paid for it. Understanding how it works helps you plan the timing and structure of a sale.',
    sections: [
      {
        heading: 'What counts as a capital asset',
        paragraphs: [
          'A capital asset broadly includes property of any kind held by you, whether or not connected with your business — land, buildings, shares, mutual fund units, jewellery, and vehicles all qualify. Certain items, like stock-in-trade of a business and personal effects such as clothing and furniture, are specifically excluded.',
        ],
      },
      {
        heading: 'Short-term vs long-term gains',
        paragraphs: [
          'Whether a gain is short-term or long-term depends on how long you held the asset before selling it. The threshold differs by asset type: 12 months for listed shares and equity mutual funds, and 24 months for most other assets like property, gold, and unlisted shares.',
        ],
      },
      {
        heading: 'How a capital gain is calculated',
        paragraphs: [
          'In simple terms, capital gain = full value of consideration received on sale, minus the cost of acquisition, cost of any improvements, and expenses directly related to the transfer (like brokerage). For long-term gains on certain assets, indexation may adjust the cost of acquisition for inflation, though this benefit was removed for most non-equity assets from 23 July 2024 onward.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I have to pay capital gains tax on every sale?',
        answer:
          'Only if there is a gain. If you sell an asset for less than its cost, you make a capital loss instead, which can often be set off against other capital gains or carried forward.',
      },
      {
        question: 'Does capital gains tax apply to inherited property?',
        answer:
          'Inheritance itself is not taxed, but when you eventually sell the inherited asset, capital gains tax applies based on the original owner\u2019s holding period and cost of acquisition.',
      },
      {
        question: 'Is there a separate capital gains tax return?',
        answer:
          'No separate return is needed — capital gains are reported under the "Capital Gains" schedule of your regular income tax return (ITR) for the relevant financial year.',
      },
    ],
  },

  'long-term-capital-gains-ltcg-tax': {
    intro:
      'Long-term capital gains (LTCG) arise when you sell a capital asset — such as listed shares, mutual funds, property, or gold — after holding it beyond a minimum specified period. Under Sections 112 and 112A of the Income Tax Act, most long-term gains are taxed at a flat 12.5%, with an annual exemption of ₹1,25,000 available specifically for listed equity shares, equity mutual funds, and units of a business trust. This guide walks through the holding-period rules, tax rates by asset type, how to actually compute the taxable gain, the grandfathering rule for older equity holdings, and the main exemptions you can use to bring the tax down.',
    keyHighlights: {
      headers: ['Particulars', 'Details'],
      rows: [
        ['LTCG tax rate', '12.5% (flat, in most cases)'],
        ['Exemption for equity (Sec 112A)', '₹1,25,000 per financial year'],
        ['Holding period — listed shares/equity funds', 'More than 12 months'],
        ['Holding period — property, gold, other assets', 'More than 24 months'],
        ['Indexation available?', 'Only for property bought before 23 July 2024 (optional)'],
        ['Common exemptions', 'Sections 54, 54EC, 54F'],
      ],
    },
    sections: [
      {
        heading: 'What is a long-term capital gain',
        paragraphs: [
          'A capital gain is simply the profit made on selling a capital asset. It is classified as "long-term" once the asset has been held beyond a minimum period set by law — after that point, it usually attracts a lower, more predictable tax rate than a short-term sale would.',
        ],
        bullets: [
          'Most capital assets — property, gold, unlisted shares, debentures — need to be held for more than 24 months to count as long-term.',
          'Listed equity shares, units of equity-oriented mutual funds, and units of a business trust only need to be held for more than 12 months to qualify.',
          'If an asset is sold on or before completing the relevant threshold, the resulting gain is treated as short-term instead, and taxed differently.',
        ],
      },
      {
        heading: 'LTCG tax rates by asset type',
        paragraphs: [
          'The table below summarises the holding period and applicable tax rate for the most common categories of assets.',
        ],
        table: {
          headers: ['Asset type', 'Holding period (to qualify as long-term)', 'Tax rate'],
          rows: [
            ['Listed equity shares', 'More than 12 months', '12.5%*'],
            ['Equity-oriented mutual funds', 'More than 12 months', '12.5%*'],
            ['Property (land/building)', 'More than 24 months', '12.5%**'],
            ['Gold / Gold ETFs', 'More than 24 months', '12.5%'],
            ['Debt mutual funds (bought on/after 1 Apr 2023)', 'Any period', 'Taxed at slab rate, no LTCG benefit'],
          ],
          note:
            '* A ₹1,25,000 annual exemption applies to gains covered under Section 112A (listed equity, equity funds, business trust units); only the excess is taxed. ** Resident individuals and HUFs who acquired the property on or before 22 July 2024 can instead opt for 20% with indexation if that works out cheaper — see the worked examples below.',
        },
      },
      {
        heading: 'How LTCG is calculated, step by step',
        paragraphs: [
          'Arriving at the taxable long-term capital gain involves a few sequential steps:',
        ],
        bullets: [
          'Start with the full value of consideration — the amount you actually received on sale, or the fair market value where specifically applicable.',
          'Deduct expenses incurred wholly for the transfer (brokerage, legal fees, etc.) to arrive at the net sale consideration.',
          'Subtract the cost of acquisition and cost of improvement. For eligible property held before 23 July 2024, the cost of acquisition can optionally be indexed using: Indexed cost = Cost of acquisition × (CII of year of sale ÷ CII of year of purchase).',
          'Deduct any exemption claimed under Sections 54, 54B, 54D, 54EC, or 54F, where the conditions are met.',
          'What remains is the LTCG chargeable to tax, on which the applicable rate (12.5%, or 20% if indexation is chosen for eligible property) is applied.',
        ],
      },
      {
        heading: 'Worked example — property eligible for indexation',
        paragraphs: [
          'Priya bought a flat in FY 2005-06 for ₹20,00,000 and sold it in August 2025 for ₹65,00,000. Because she acquired the property before 23 July 2024, she can compare her tax liability under both available options. Assume the Cost Inflation Index (CII) was 117 for FY 2005-06 and 376 for FY 2025-26.',
        ],
        table: {
          headers: ['Particulars', 'Amount (₹)'],
          rows: [
            ['Full value of consideration', '65,00,000'],
            ['Less: Transfer expenses', 'Nil'],
            ['Net sale consideration', '65,00,000'],
            ['Less: Indexed cost of acquisition (20,00,000 × 376 ÷ 117)', '64,27,350'],
            ['Long-term capital gain', '72,650'],
            ['Tax @ 20% (with indexation)', '14,530'],
          ],
        },
      },
      {
        heading: 'Worked example — same sale, without indexation',
        paragraphs: [
          'Using the same figures but without applying indexation, the computation looks quite different:',
          'Comparing the two, Priya\u2019s tax works out to just ₹14,530 with indexation versus ₹5,62,500 without it — so for property held a long time with significant appreciation, the indexed 20% option is usually far more beneficial. This is exactly why the government retained indexation as an option for this specific category rather than removing it altogether.',
        ],
        table: {
          headers: ['Particulars', 'Amount (₹)'],
          rows: [
            ['Full value of consideration', '65,00,000'],
            ['Less: Transfer expenses', 'Nil'],
            ['Net sale consideration', '65,00,000'],
            ['Less: Cost of acquisition (unindexed)', '20,00,000'],
            ['Long-term capital gain', '45,00,000'],
            ['Tax @ 12.5% (without indexation)', '5,62,500'],
          ],
        },
      },
      {
        heading: 'Grandfathering provision for equity shares',
        paragraphs: [
          'When LTCG tax on equity was reintroduced with effect from 1 April 2018, a grandfathering rule was built in to protect gains that had already accrued. For listed shares and equity-oriented mutual fund units acquired on or before 31 January 2018, the cost of acquisition is deemed to be the higher of the actual purchase price or the fair market value as on 31 January 2018 — subject to the actual sale price acting as an upper ceiling. In effect, only the appreciation after that date gets taxed.',
        ],
      },
      {
        heading: 'Popular LTCG exemptions',
        paragraphs: [
          'Several sections of the Act let you reduce or eliminate LTCG tax if you reinvest the proceeds in a prescribed manner within the specified time limits.',
        ],
        table: {
          headers: ['Section', 'Asset sold', 'Must reinvest in', 'Maximum exemption'],
          rows: [
            ['Section 54', 'Residential property', 'Another residential property', 'Up to ₹10 crore'],
            ['Section 112A (built-in)', 'Listed shares / equity funds / business trust units', 'Not applicable', '₹1,25,000 per year'],
            ['Section 54EC', 'Land or building', 'Specified bonds (NHAI, REC, PFC, IRFC)', 'Up to ₹50 lakh'],
            ['Section 54F', 'Any long-term asset other than a house', 'Residential property', 'Proportionate to the amount reinvested'],
          ],
        },
        bullets: [
          'Section 54 requires the new house to be bought within 1 year before or 2 years after the sale, or constructed within 3 years.',
          'Section 54EC bonds must be purchased within 6 months of the sale and come with a mandatory lock-in (currently 5 years).',
          'If you can\u2019t complete the reinvestment before your return filing due date, the unutilised gain can be parked in a Capital Gains Account Scheme (CGAS) with a bank to keep the exemption alive.',
        ],
      },
      {
        heading: 'LTCG vs STCG at a glance',
        table: {
          headers: ['Basis', 'Long-term capital gains', 'Short-term capital gains'],
          rows: [
            ['Holding period', '> 12 months (equity) / > 24 months (other assets)', '\u2264 12 months (equity) / \u2264 24 months (other assets)'],
            ['Indexation', 'Only for pre-23 Jul 2024 property (resident individuals/HUF)', 'Not available'],
            ['Grandfathering', 'Applies to equity acquired on/before 31 Jan 2018', 'Not applicable'],
            ['Tax rate', '12.5% generally', '20% for Section 111A equity; slab rate for other assets'],
            ['Exemptions', 'Sections 54/54EC/54F, plus ₹1,25,000 equity exemption', 'Very limited'],
          ],
        },
      },
      {
        heading: 'Reporting LTCG in your income tax return',
        paragraphs: [
          'Long-term capital gains are reported under the Capital Gains schedule of ITR-2 (or ITR-3 if you also have business or professional income). Gains covered under Section 112A must be reported scrip-wise in Schedule 112A, using the consolidated capital gains statement most brokers and depositories provide.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is the basic exemption limit available against LTCG?',
        answer:
          'For resident individuals and HUFs, yes — if your other income is below the basic exemption limit, the shortfall can be adjusted against your LTCG before the tax rate is applied. This benefit is generally not available to non-residents.',
      },
      {
        question: 'Is there a surcharge on long-term capital gains?',
        answer:
          'Surcharge can apply on the tax on LTCG once your total income crosses the relevant thresholds, but for gains taxed under Section 112A, the surcharge is capped at a maximum of 15%, regardless of how high your total income is.',
      },
      {
        question: 'How much LTCG on shares is exempt from tax?',
        answer:
          'Up to ₹1,25,000 of long-term capital gains from listed equity shares and equity-oriented mutual funds in a financial year is exempt under Section 112A — only the amount above this threshold is taxed at 12.5%.',
      },
      {
        question: 'How is LTCG on real estate taxed in India?',
        answer:
          'Real estate LTCG is taxed at 12.5% without indexation. However, if a resident individual or HUF acquired the property on or before 22 July 2024, they may instead choose to pay 20% with indexation if that works out to a lower tax amount.',
      },
      {
        question: 'Has the LTCG tax rate really changed to 12.5%?',
        answer:
          'Yes. Budget 2024 standardised the LTCG rate at 12.5% across most asset classes for transfers made on or after 23 July 2024, replacing the earlier mix of 10% and 20% rates that applied to different assets.',
      },
      {
        question: 'Is there any legitimate way to reduce LTCG tax?',
        answer:
          'You cannot avoid LTCG tax outright, but you can legitimately reduce it by using the exemptions under Sections 54, 54EC, or 54F where you qualify, by making full use of the ₹1,25,000 equity exemption each financial year, or by timing sales across financial years to spread out gains.',
      },
      {
        question: 'Is the Section 112A exemption available under the new tax regime?',
        answer:
          'Yes. The ₹1,25,000 LTCG exemption on equity under Section 112A is a standalone provision within the capital gains computation itself — it is not one of the Chapter VI-A deductions that the new regime restricts, so it remains available regardless of which regime you choose.',
      },
      {
        question: 'Is the Section 112A exemption available to non-residents?',
        answer:
          'Yes, the ₹1,25,000 threshold under Section 112A applies to any taxpayer — resident or non-resident — who holds the specified securities. What non-residents typically cannot do is adjust their basic exemption limit shortfall against LTCG, which is a separate benefit available only to residents.',
      },
    ],
  },

  'short-term-capital-gains-stcg-tax': {
    intro:
      'Short-term capital gains (STCG) tax applies when you sell a capital asset before it completes the minimum holding period required to qualify as long-term. STCG is generally taxed at a higher rate than LTCG.',
    sections: [
      {
        heading: 'What qualifies as short-term',
        paragraphs: [
          'An asset is treated as short-term if sold within 12 months of purchase for listed equity shares and equity mutual funds, or within 24 months for most other assets like property, gold, and unlisted shares.',
        ],
      },
      {
        heading: 'STCG tax rates',
        paragraphs: [
          'Short-term gains on listed equity shares and equity-oriented mutual funds (where securities transaction tax has been paid) are taxed at a flat 20% under Section 111A. Short-term gains on other assets — such as property, gold, and unlisted shares — are added to your total income and taxed at your applicable income tax slab rate.',
        ],
      },
      {
        heading: 'No fixed exemption limit on STCG',
        paragraphs: [
          'Unlike LTCG on equity, there is no separate annual exemption threshold for STCG. However, resident individuals whose total income (including STCG) falls below the basic exemption limit can adjust the shortfall against the STCG amount before tax is calculated.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I set off short-term capital losses?',
        answer:
          'Yes. Short-term capital losses can be set off against both short-term and long-term capital gains in the same year, and unabsorbed losses can be carried forward for up to 8 assessment years.',
      },
      {
        question: 'Why is STCG on equity taxed at a flat rate?',
        answer:
          'Section 111A specifically taxes STCG on STT-paid listed equity shares and equity funds at a flat rate, separate from the regular slab system, to keep the tax treatment simple and consistent for market-linked short-term trades.',
      },
      {
        question: 'Does STCG apply to intraday trading?',
        answer:
          'No. Profits from intraday equity trading are treated as speculative business income, not capital gains, and are taxed differently under the "profits and gains from business or profession" head.',
      },
    ],
  },

  'section-54-capital-gains-exemption': {
    intro:
      'The Income Tax Act offers several exemptions that let you avoid or reduce capital gains tax on property and other long-term assets, provided you reinvest the proceeds in specified ways within set timelines.',
    sections: [
      {
        heading: 'Section 54 — sale of residential property',
        paragraphs: [
          'If you sell a long-term residential house property and reinvest the capital gain in another residential house in India, within 1 year before or 2 years after the sale (or 3 years if constructing a new house), the gain is exempt up to the amount reinvested. From certain thresholds, this exemption is generally available for investment in one residential house, with an option for two houses available once in a lifetime if the gain does not exceed ₹2 crore.',
        ],
      },
      {
        heading: 'Section 54F — sale of any other long-term asset',
        paragraphs: [
          'If you sell a long-term capital asset other than a residential house (like shares, gold, or land) and invest the entire net sale consideration in a new residential house within the specified timelines, the gain is proportionately exempt. You should not own more than one other residential house on the date of sale to claim this exemption fully.',
        ],
      },
      {
        heading: 'Section 54EC — investment in specified bonds',
        paragraphs: [
          'Instead of buying property, you can invest long-term capital gains from land or building into specified bonds (such as those issued by NHAI or REC) within 6 months of the sale, up to a maximum of ₹50 lakh in a financial year. These bonds come with a mandatory lock-in period, currently 5 years, during which they cannot be sold or transferred.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What happens if I sell the new property early?',
        answer:
          'If you sell the new residential property acquired under Section 54 or 54F within 3 years of its purchase or construction, the exemption you claimed earlier is reversed and added back to your taxable capital gains in the year of the subsequent sale.',
      },
      {
        question: 'Can I claim more than one exemption on the same capital gain?',
        answer:
          'Generally no — each exemption section applies to specific reinvestment routes, and you claim the one that matches how you actually reinvested the proceeds, up to the eligible amount.',
      },
      {
        question: 'What if I cannot reinvest before filing my tax return?',
        answer:
          'You can deposit the unutilised gain in a Capital Gains Account Scheme (CGAS) with a bank before the tax return due date, and use it later for the qualifying investment within the overall time limit.',
      },
    ],
  },

  'cost-inflation-index': {
    intro:
      'The Cost Inflation Index (CII) is a figure published annually by the Income Tax Department to account for inflation when calculating long-term capital gains on certain assets.',
    sections: [
      {
        heading: 'What CII does',
        paragraphs: [
          'When indexation applies, the CII is used to inflate the original cost of acquisition (and cost of improvement) of an asset to a value comparable to prices in the year of sale, using the formula: Indexed cost = Original cost × (CII of year of sale ÷ CII of year of purchase). This reduces the taxable gain by accounting for the eroding value of money over time.',
        ],
      },
      {
        heading: 'Where CII still applies after Budget 2024',
        paragraphs: [
          'From 23 July 2024, indexation was removed for long-term capital gains on most assets, which are now taxed at a flat 12.5% without indexation. An exception exists for resident individuals and HUFs selling immovable property (land or building) acquired before 23 July 2024 — they can choose between paying 12.5% without indexation or 20% with indexation, whichever works out cheaper.',
        ],
      },
      {
        heading: 'Why it still matters for older property',
        paragraphs: [
          'For property bought many years ago, indexation could substantially reduce the taxable gain because the CII figures rise meaningfully year over year. This is why the government retained the indexation option specifically for this category, rather than removing it universally.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Where can I find the CII values for past years?',
        answer:
          'The Central Board of Direct Taxes (CBDT) notifies the CII for each financial year through an official notification, which is publicly available on the Income Tax Department\u2019s website.',
      },
      {
        question: 'Does CII apply to short-term capital gains?',
        answer:
          'No. Indexation, and therefore CII, is only relevant for long-term capital gains where indexation is permitted — it has no application to short-term gains.',
      },
      {
        question: 'Does indexation apply to equity shares and mutual funds?',
        answer:
          'No. Long-term capital gains on listed equity shares and equity-oriented mutual funds under Section 112A have never been eligible for indexation; they are taxed on the actual (non-indexed) gain.',
      },
    ],
  },

  'short-term-capital-gain-on-shares': {
    intro:
      'Selling listed shares or equity mutual fund units within 12 months of purchase results in a short-term capital gain, which has its own specific tax treatment separate from other short-term assets.',
    sections: [
      {
        heading: 'Tax rate on STCG from shares',
        paragraphs: [
          'Under Section 111A, short-term capital gains on the sale of listed equity shares and equity-oriented mutual funds, where securities transaction tax (STT) has been paid on the transaction, are taxed at a flat 20%. This applies regardless of your income tax slab.',
        ],
      },
      {
        heading: 'Unlisted shares are treated differently',
        paragraphs: [
          'STCG on unlisted shares (where STT is not applicable) does not get the flat Section 111A rate. Instead, such gains are added to your total income and taxed at your regular slab rate.',
        ],
      },
      {
        heading: 'Set-off and carry forward of losses',
        paragraphs: [
          'A short-term capital loss on shares can be set off against both short-term and long-term capital gains in the same financial year. Any loss that remains can be carried forward for up to 8 assessment years, but can only be set off against capital gains in those future years, and only if the loss return is filed on time.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is STCG on shares eligible for any exemption?',
        answer:
          'There is no specific annual exemption for STCG on shares like there is for equity LTCG. However, resident individuals can adjust any shortfall in the basic exemption limit against STCG before tax is computed.',
      },
      {
        question: 'What is the holding period cutoff for shares to be short-term?',
        answer:
          'Listed shares and equity mutual fund units held for 12 months or less are classified as short-term; holding for more than 12 months qualifies for long-term treatment instead.',
      },
      {
        question: 'Does STT apply to all share transactions?',
        answer:
          'STT applies to transactions on recognised stock exchanges in India. If STT is not paid — for instance, off-market transfers — the flat 20% rate under Section 111A does not apply, and slab rates apply instead.',
      },
    ],
  },

  'long-term-capital-gains-on-shares': {
    intro:
      'Gains from listed shares and equity mutual funds held for more than 12 months are treated as long-term capital gains, taxed under a dedicated provision with its own exemption and grandfathering rules.',
    sections: [
      {
        heading: 'Tax rate and exemption limit',
        paragraphs: [
          'Under Section 112A, long-term capital gains on listed equity shares and equity-oriented mutual funds are taxed at 12.5% on the amount exceeding ₹1,25,000 in a financial year. Gains up to this threshold in a year are fully exempt, and no indexation benefit is available on the taxable portion.',
        ],
      },
      {
        heading: 'The grandfathering clause',
        paragraphs: [
          'When LTCG tax on equity was reintroduced from 1 April 2018, a grandfathering provision was included: for shares purchased before 1 February 2018, the cost of acquisition is deemed to be the higher of the actual cost or the fair market value as on 31 January 2018 (subject to the actual sale price as a ceiling). This ensures gains accrued before that date are not retrospectively taxed.',
        ],
      },
      {
        heading: 'Reporting LTCG on shares',
        paragraphs: [
          'LTCG from listed shares must be reported scrip-wise in Schedule 112A of your income tax return, using details typically available in the capital gains statement provided by your broker or depository.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does the ₹1,25,000 exemption apply per share or in total?',
        answer:
          'It applies to your total long-term capital gains from all eligible listed equity shares and equity mutual funds put together in a financial year, not separately for each holding.',
      },
      {
        question: 'What if I have both LTCG and STCG from shares in the same year?',
        answer:
          'They are computed and taxed separately — LTCG under Section 112A at 12.5% above the exemption, and STCG under Section 111A at a flat 20% — and both are reported in their respective schedules of your return.',
      },
      {
        question: 'Does the grandfathering rule apply to mutual funds too?',
        answer:
          'Yes, the same 31 January 2018 fair market value grandfathering principle applies to equity-oriented mutual fund units acquired before that date.',
      },
    ],
  },

  'other-income-sources': {
    intro:
      '"Income from Other Sources" is the residual head of income under the Income Tax Act — it captures any taxable income that does not fall under salary, house property, business/profession, or capital gains.',
    sections: [
      {
        heading: 'Common examples',
        paragraphs: [
          'This head typically includes interest earned on savings accounts and fixed deposits, dividends from shares and mutual funds, family pension received by a deceased employee\u2019s dependents, winnings from lotteries, game shows, or betting, and any gifts that are taxable under the gift tax provisions.',
        ],
      },
      {
        heading: 'Special tax treatment for certain items',
        paragraphs: [
          'Winnings from lotteries, crossword puzzles, card games, and similar activities are taxed at a flat 30% under Section 115BB, without any basic exemption or deduction being allowed against this income. Family pension, on the other hand, is eligible for a standard deduction (the lower of ₹15,000 or one-third of the pension amount under the old regime, or ₹25,000 under the new regime).',
        ],
      },
      {
        heading: 'Deductions available',
        paragraphs: [
          'While most income under this head is taxed on the amount received, specific deductions are allowed in limited cases — such as the family pension deduction mentioned above, or expenses incurred wholly for earning the income (for example, collection charges on interest income), where applicable.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is interest from a savings account fully taxable?',
        answer:
          'Yes, it is taxable under this head, though Section 80TTA allows a deduction of up to ₹10,000 on savings account interest for individuals below 60 (₹50,000 under Section 80TTB for senior citizens) — but only under the old tax regime.',
      },
      {
        question: 'Do I need to report exempt income like PPF interest here?',
        answer:
          'Exempt income is generally reported separately in the "Exempt Income" schedule of your return for disclosure purposes, even though it does not add to your taxable income.',
      },
      {
        question: 'How are dividends from shares taxed?',
        answer:
          'Dividends are fully taxable in the hands of the recipient at their applicable slab rate, and companies deduct TDS at 10% if the dividend paid exceeds ₹5,000 in a financial year.',
      },
    ],
  },

  'salary-income': {
    intro:
      'Income from salary covers any payment received from an employer under an employer-employee relationship, and is one of the most common heads of income for taxpayers.',
    sections: [
      {
        heading: 'What makes up salary income',
        paragraphs: [
          'Salary typically includes basic pay, dearness allowance, various other allowances (like HRA and LTA), bonuses, commission, and the value of certain perquisites (such as rent-free accommodation or a company car) provided by the employer.',
        ],
      },
      {
        heading: 'Standard deduction and exemptions',
        paragraphs: [
          'Every salaried individual can claim a standard deduction against salary income — ₹75,000 under the new tax regime and ₹50,000 under the old regime for FY 2024-25 — without needing to submit any bills or proof. Certain allowances, like House Rent Allowance and Leave Travel Allowance, may also be partly or fully exempt, but only under the old tax regime and subject to specific conditions.',
        ],
      },
      {
        heading: 'Taxable vs exempt components',
        paragraphs: [
          'Not every rupee shown on your payslip is taxable. Reimbursements of actual expenses (like a documented medical bill under certain limits), and allowances that qualify for exemption under sections like 10(13A) for HRA, reduce your taxable salary — but only to the extent permitted, and generally only if you opt for the old regime.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is the standard deduction available under both tax regimes?',
        answer:
          'Yes, but at different amounts — ₹75,000 under the new regime and ₹50,000 under the old regime for FY 2024-25 — and it applies automatically without requiring any investment or expense proof.',
      },
      {
        question: 'Can I claim HRA exemption under the new tax regime?',
        answer:
          'No. HRA exemption is only available under the old tax regime; the new regime does not permit this or most other salary-related exemptions.',
      },
      {
        question: 'How is a joining bonus or notice pay taxed?',
        answer:
          'A joining bonus is taxed as part of salary income in the year received. If you later have to repay it (for example, on leaving early), you may be able to claim relief, though the exact tax treatment can be nuanced and depends on your specific facts.',
      },
    ],
  },
  'how-to-save-tax-in-new-tax-regime': {
    intro:
      'The new tax regime offers lower slab rates in exchange for giving up most exemptions and deductions. Even so, there are a handful of legitimate ways to reduce your tax liability within it.',
    sections: [
      {
        heading: 'Deductions still allowed under the new regime',
        paragraphs: [
          'While most Chapter VI-A deductions (like 80C and 80D) are not available, a few remain: the standard deduction of ₹75,000 on salary income, employer\u2019s contribution to NPS under Section 80CCD(2) (up to 14% of salary for government employees, 10% for others), the family pension deduction, and the deduction for contributions to the Agniveer Corpus Fund under Section 80CCH.',
        ],
      },
      {
        heading: 'Use the Section 87A rebate fully',
        paragraphs: [
          'If your taxable income is ₹7,00,000 or less under the new regime, the Section 87A rebate brings your tax liability down to zero. If your income is just above this threshold, marginal relief provisions can reduce the tax further so it does not exceed the amount by which your income crosses ₹7,00,000.',
        ],
      },
      {
        heading: 'Ask your employer to structure salary efficiently',
        paragraphs: [
          'Since most exemptions on allowances (like HRA) are not available in the new regime, focus instead on components that remain tax-efficient, such as employer NPS contributions, which reduce your taxable salary even under the new regime.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I claim 80C deductions under the new regime?',
        answer:
          'No. Section 80C deductions (for PPF, ELSS, life insurance premiums, and similar investments) are not available if you opt for the new tax regime.',
      },
      {
        question: 'Is switching between regimes allowed every year?',
        answer:
          'Salaried individuals without business income can choose between the old and new regime every financial year when filing their return. Those with business income have more restricted switching options.',
      },
      {
        question: 'Which regime is better for me?',
        answer:
          'It depends on how much you can claim in deductions under the old regime. If your eligible deductions and exemptions are relatively small, the new regime\u2019s lower slab rates often work out better; if they are large (e.g., high HRA, home loan interest, 80C investments), the old regime may still save more tax.',
      },
    ],
  },

  'income-tax-savings': {
    intro:
      'The old tax regime allows a wide range of deductions and exemptions that can significantly lower your taxable income, provided you make the qualifying investments or incur the relevant expenses.',
    sections: [
      {
        heading: 'Section 80C and related investments',
        paragraphs: [
          'Section 80C allows a deduction of up to ₹1,50,000 for investments and payments such as PPF, EPF, ELSS mutual funds, life insurance premiums, principal repayment of a home loan, five-year tax-saving fixed deposits, and children\u2019s tuition fees.',
        ],
      },
      {
        heading: 'Health insurance and other targeted deductions',
        paragraphs: [
          'Section 80D allows a deduction of up to ₹25,000 for health insurance premiums for yourself and family (₹50,000 if you or your spouse is a senior citizen), with an additional deduction for parents\u2019 premiums. Section 80CCD(1B) allows an extra ₹50,000 deduction for NPS contributions, over and above the 80C limit. Section 80TTA/80TTB cover savings account and deposit interest for non-seniors and seniors respectively.',
        ],
      },
      {
        heading: 'HRA and home loan interest',
        paragraphs: [
          'If you live in rented accommodation, HRA exemption under Section 10(13A) can reduce your taxable salary substantially, especially in metro cities. If you have a home loan, interest paid on a self-occupied property is deductible up to ₹2,00,000 per year under Section 24(b).',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need to submit proof for these deductions?',
        answer:
          'Yes, typically you need to submit investment proofs, rent receipts, or premium payment receipts to your employer during the financial year, or retain them to support your claim if the return is scrutinised.',
      },
      {
        question: 'Can I claim both 80C and 80CCD(1B) for NPS?',
        answer:
          'Yes — your own NPS contribution can be claimed up to ₹1,50,000 within the overall 80C limit, and an additional ₹50,000 is available exclusively for NPS under Section 80CCD(1B), over and above 80C.',
      },
      {
        question: 'Is the old regime still available for FY 2024-25?',
        answer:
          'Yes, taxpayers can still choose the old regime for FY 2024-25, though the new regime is now the default option unless you actively opt for the old one while filing.',
      },
    ],
  },

  'income-tax-for-nri': {
    intro:
      'Non-Resident Indians (NRIs) are taxed differently from resident Indians — their Indian tax liability depends heavily on their residential status and where their income is earned or received.',
    sections: [
      {
        heading: 'Determining residential status',
        paragraphs: [
          'You are generally treated as a resident of India for tax purposes if you stay in India for 182 days or more in a financial year, or 60 days or more in the year combined with 365 days or more over the preceding 4 years (with some relaxations for Indian citizens/PIOs visiting India, and special provisions for those with very high Indian income who might otherwise not qualify as resident anywhere).',
        ],
      },
      {
        heading: 'What income is taxable for an NRI',
        paragraphs: [
          'An NRI is taxed in India only on income that is earned or accrues in India, or is received in India. This typically includes rental income from Indian property, capital gains on Indian assets, interest on NRO accounts, and salary for services rendered in India. Income earned and received entirely outside India is not taxable in India for an NRI.',
        ],
      },
      {
        heading: 'TDS and DTAA relief',
        paragraphs: [
          'Payments to NRIs, such as rent or interest, usually attract a higher rate of TDS deduction at source compared to residents. Where India has a Double Taxation Avoidance Agreement (DTAA) with the NRI\u2019s country of residence, they may be able to claim a lower TDS rate or credit for taxes paid, to avoid being taxed twice on the same income.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do NRIs need to file an income tax return in India?',
        answer:
          'An NRI must file a return in India if their taxable Indian income exceeds the basic exemption limit, or in certain other specified circumstances, such as claiming a refund of excess TDS deducted.',
      },
      {
        question: 'Are NRE account interest and FCNR deposits taxable in India?',
        answer:
          'No, interest earned on NRE (Non-Resident External) savings and fixed deposit accounts, and on FCNR deposits, is exempt from Indian income tax as long as the account holder maintains NRI status.',
      },
      {
        question: 'Can an NRI claim deductions like 80C?',
        answer:
          'Yes, most Section 80C and other Chapter VI-A deductions remain available to NRIs on the same basis as residents, for investments and payments made in India that qualify.',
      },
    ],
  },

  'how-are-gifts-taxed': {
    intro:
      'Gifts of money or property are generally taxable in the hands of the recipient in India, unless they fall under one of the specific exemptions carved out by the Income Tax Act.',
    sections: [
      {
        heading: 'When gifts become taxable',
        paragraphs: [
          'If the aggregate value of monetary gifts received by an individual from non-relatives in a financial year exceeds ₹50,000, the entire amount becomes taxable as "Income from Other Sources" — not just the excess over ₹50,000. Similar rules apply to gifts of immovable property received for no consideration or for consideration below the stamp duty value, and to gifts of other movable property (like shares, jewellery, or artwork) above the ₹50,000 threshold.',
        ],
      },
      {
        heading: 'Exempt categories of gifts',
        paragraphs: [
          'Gifts are fully exempt from tax when received from a "relative" as defined under the Act (which includes spouse, siblings, parents, and certain other specified relations), on the occasion of marriage, under a will or by way of inheritance, or from a local authority, registered trust, or certain specified institutions.',
        ],
      },
      {
        heading: 'Gifts between family members',
        paragraphs: [
          'Because gifts from defined relatives are exempt, transfers of money or property between spouses, parents and children, or siblings, for example, do not attract gift tax — though income earned later from gifted assets may still be clubbed with the giver\u2019s income in certain cases under clubbing provisions.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is a gift from my spouse taxable?',
        answer:
          'No, a gift received from your spouse is exempt since a spouse is included in the definition of "relative" — however, income generated from that gifted amount may be clubbed back into the giver\u2019s taxable income under clubbing rules.',
      },
      {
        question: 'Are wedding gifts always exempt?',
        answer:
          'Gifts received by the bride or groom on the occasion of their own marriage are exempt, regardless of who gives them — relative or not. This exemption does not extend to gifts given at other family members\u2019 weddings.',
      },
      {
        question: 'What about gifts received from friends?',
        answer:
          'Gifts from friends are treated as gifts from a non-relative, so they are only exempt if the total value from all non-relatives in the year stays at or below ₹50,000; beyond that, the full amount is taxable.',
      },
    ],
  },

  'pan-card': {
    intro:
      'A Permanent Account Number (PAN) is a unique 10-character alphanumeric identifier issued by the Income Tax Department to track financial transactions and tax compliance in India.',
    sections: [
      {
        heading: 'Why PAN is important',
        paragraphs: [
          'PAN is mandatory for filing income tax returns, and is required for a wide range of financial transactions, including opening a bank account, making high-value cash deposits or investments, buying or selling property above specified thresholds, and receiving payments where TDS applies. Without PAN, TDS is deducted at a higher rate.',
        ],
      },
      {
        heading: 'How to apply for a PAN card',
        paragraphs: [
          'You can apply for a new PAN online through the NSDL (Protean) or UTIITSL portals, or the Income Tax Department\u2019s e-filing website. The process requires basic identity, address, and date of birth proof, along with a passport-size photograph, and can typically be completed entirely online using Aadhaar-based e-KYC.',
        ],
      },
      {
        heading: 'Linking PAN with Aadhaar',
        paragraphs: [
          'It is mandatory for most PAN holders to link their PAN with Aadhaar. A PAN that is not linked to Aadhaar becomes inoperative, which can lead to higher TDS/TCS deduction and difficulty carrying out financial transactions until it is linked.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I hold more than one PAN card?',
        answer:
          'No, holding more than one PAN is illegal and attracts a penalty. If you have been issued duplicate PANs by mistake, you should surrender the extra one to the Income Tax Department.',
      },
      {
        question: 'Is PAN mandatory for minors?',
        answer:
          'A minor can obtain a PAN, typically applied for by a parent or guardian, especially if the minor holds investments or is a nominee/co-owner in transactions that require PAN.',
      },
      {
        question: 'How long does it take to get a PAN card?',
        answer:
          'A physical PAN card is usually issued within about 15 days of a correctly submitted application, while an e-PAN (a digital version) can often be generated within 24-48 hours for e-KYC-based applications.',
      },
    ],
  },

  'aadhaar-card': {
    intro:
      'Aadhaar is a 12-digit unique identification number issued by the Unique Identification Authority of India (UIDAI) to residents of India, based on their biometric and demographic data.',
    sections: [
      {
        heading: 'What Aadhaar is used for',
        paragraphs: [
          'Aadhaar serves as a widely accepted proof of identity and address for opening bank accounts, obtaining a SIM card, applying for a PAN card, receiving government subsidies and benefits through Direct Benefit Transfer (DBT), and completing KYC for various financial services.',
        ],
      },
      {
        heading: 'How Aadhaar is generated',
        paragraphs: [
          'To enrol for Aadhaar, a resident visits an Aadhaar enrolment centre with basic identity and address proof, where their photograph, fingerprints, and iris scan are captured along with demographic details. UIDAI then verifies and issues the unique Aadhaar number.',
        ],
      },
      {
        heading: 'Updating and downloading Aadhaar',
        paragraphs: [
          'You can update your address, mobile number, or other demographic details through an Aadhaar Seva Kendra or online via the myAadhaar portal for certain fields. Your Aadhaar letter can also be downloaded as an e-Aadhaar PDF, or accessed via the mAadhaar mobile app.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is Aadhaar mandatory for everyone in India?',
        answer:
          'While Aadhaar is not universally mandatory by law for every purpose, it has become a practical necessity for most financial and government services, as it is widely required or strongly preferred for KYC and benefit disbursal.',
      },
      {
        question: 'Can I have more than one Aadhaar number?',
        answer:
          'No, each resident is entitled to only one Aadhaar number. Attempting to obtain multiple Aadhaar numbers is not permitted and can result in the duplicate being deactivated.',
      },
      {
        question: 'Is my Aadhaar information secure?',
        answer:
          'UIDAI maintains Aadhaar data under strict security protocols, and offers features like Aadhaar locking and virtual ID (VID) generation, which let you share a temporary reference number instead of your actual Aadhaar number for added privacy.',
      },
    ],
  },

  'ration-card': {
    intro:
      'A ration card is an official document issued by state governments that entitles eligible households to purchase subsidised food grains and other essential commodities through the Public Distribution System (PDS).',
    sections: [
      {
        heading: 'Types of ration cards',
        paragraphs: [
          'Common categories include Above Poverty Line (APL) cards for relatively better-off households, Below Poverty Line (BPL) cards for economically weaker households eligible for higher subsidies, and Antyodaya Anna Yojana (AAY) cards for the poorest of the poor families, who receive food grains at the most subsidised rates. Exact categories and names can vary somewhat by state.',
        ],
      },
      {
        heading: 'Uses beyond subsidised food',
        paragraphs: [
          'Besides accessing PDS shops, a ration card is commonly accepted as a proof of identity and address for various government schemes, school admissions, and, in some states, as supporting documentation for other benefit programs.',
        ],
      },
      {
        heading: 'One Nation One Ration Card',
        paragraphs: [
          'Under the "One Nation, One Ration Card" scheme, ration card holders can access their entitled food grains from any Fair Price Shop across India, not just in their home state — a significant benefit for migrant workers and families who relocate for work.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How do I apply for a ration card?',
        answer:
          'You typically apply through your state\u2019s food and civil supplies department, either online via the state portal or offline at the local ration office, submitting identity, address, and income proof along with the application form.',
      },
      {
        question: 'Is Aadhaar linking mandatory for ration cards?',
        answer:
          'Most states require Aadhaar linking for ration cards to prevent duplication and ensure benefits reach the intended beneficiary, and it is also required to avail the One Nation One Ration Card portability feature.',
      },
      {
        question: 'What if my ration card details need to be updated?',
        answer:
          'You can apply for corrections or updates (such as adding a new family member or updating an address) through the same state food department portal or office where you originally applied.',
      },
    ],
  },

  'upi-unified-payments-interface': {
    intro:
      'UPI (Unified Payments Interface) is a real-time payment system developed by the National Payments Corporation of India (NPCI) that allows instant money transfers between bank accounts using a mobile phone.',
    sections: [
      {
        heading: 'How UPI works',
        paragraphs: [
          'UPI links your bank account to a UPI ID (also called a Virtual Payment Address, like yourname@bank) through a UPI app. Payments are authorised using a UPI PIN, and transfers happen instantly, 24 hours a day, 7 days a week, including bank holidays.',
        ],
      },
      {
        heading: 'Key features',
        paragraphs: [
          'UPI supports peer-to-peer transfers, QR-code based merchant payments, bill payments, and even recurring payments via UPI Autopay. Because it works off a UPI ID rather than requiring account and IFSC details, it has become the preferred method for everyday digital payments in India.',
        ],
      },
      {
        heading: 'Transaction limits',
        paragraphs: [
          'Most banks set a default UPI transaction limit of ₹1,00,000 per transaction for regular person-to-person and merchant payments, though this can vary by bank. Certain categories, such as payments for capital markets, insurance, and some tax payments, are permitted at higher limits under specific NPCI guidelines. Always check your bank\u2019s app for the exact limit that applies to your account.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is UPI different from NEFT and IMPS?',
        answer:
          'Yes. UPI is an app-based system built on top of bank accounts, designed for quick, everyday payments using a UPI ID or QR code, whereas NEFT and IMPS are underlying interbank transfer mechanisms usually initiated using account number and IFSC through net banking or a banking app.',
      },
      {
        question: 'What happens if a UPI payment fails but money is deducted?',
        answer:
          'In most cases, failed UPI transactions are automatically reversed to your account within a few hours to a few working days. If not, you can raise a complaint through your UPI app or bank\u2019s customer support.',
      },
      {
        question: 'Can I use UPI without a smartphone?',
        answer:
          'Yes, UPI 123Pay allows feature phone users to make UPI payments using IVR calls, missed calls, or an app for feature phones, without needing a smartphone or internet connection.',
      },
    ],
  },

  'neft-national-electronic-funds-transfer': {
    intro:
      'NEFT (National Electronic Funds Transfer) is an electronic payment system regulated by the Reserve Bank of India that allows funds transfer between bank accounts across India.',
    sections: [
      {
        heading: 'How NEFT settlement works',
        paragraphs: [
          'Since December 2019, NEFT operates on a 24x7x365 basis, settling transactions in half-hourly batches throughout the day and night, including weekends and holidays. This means a NEFT transfer, while not instantaneous like IMPS or UPI, is usually completed within 30 minutes to a couple of hours.',
        ],
      },
      {
        heading: 'Transaction limits and requirements',
        paragraphs: [
          'The Reserve Bank of India does not prescribe a minimum or maximum amount for NEFT transactions, though individual banks may set their own limits, particularly for transactions initiated through internet or mobile banking. To make an NEFT transfer, you need the beneficiary\u2019s account number, name, bank, and the branch\u2019s IFSC code.',
        ],
      },
      {
        heading: 'When NEFT is a good choice',
        paragraphs: [
          'NEFT is commonly used for both retail transfers and bulk or business payments where instant settlement is not critical, since it typically does not carry the per-transaction charges that some IMPS transfers do, and most banks do not charge for NEFT done via net banking.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is NEFT available on bank holidays?',
        answer:
          'Yes, since the move to 24x7 processing in December 2019, NEFT is available every day of the year, including Sundays and bank holidays.',
      },
      {
        question: 'How long does an NEFT transfer take to reflect in the beneficiary account?',
        answer:
          'Since transactions are processed in half-hourly batches, an NEFT transfer typically reflects in the beneficiary\u2019s account within 30 minutes to 2 hours, depending on when it was initiated relative to the batch cycle.',
      },
      {
        question: 'Can I use NEFT for international transfers?',
        answer:
          'No, NEFT is designed only for domestic fund transfers within India between banks that are part of the NEFT network.',
      },
    ],
  },

  'imps-immediate-payment-service': {
    intro:
      'IMPS (Immediate Payment Service) is an instant interbank electronic fund transfer service developed by NPCI, allowing money transfers 24x7, including on weekends and holidays.',
    sections: [
      {
        heading: 'How IMPS works',
        paragraphs: [
          'IMPS transfers can be initiated using the beneficiary\u2019s account number and IFSC code, similar to NEFT, or in some cases using a Mobile Money Identifier (MMID) along with the recipient\u2019s mobile number. Unlike NEFT, IMPS settles the transaction almost instantly, making it useful for urgent transfers.',
        ],
      },
      {
        heading: 'Transaction limits',
        paragraphs: [
          'Most banks cap IMPS transfers at ₹2,00,000 to ₹5,00,000 per transaction, though the exact limit can vary by bank and by the channel used (mobile banking, net banking, or ATM). This is generally lower than the limits some banks allow for RTGS.',
        ],
      },
      {
        heading: 'IMPS vs NEFT vs RTGS',
        paragraphs: [
          'IMPS is best suited for smaller, urgent transfers that need to reach the recipient immediately. NEFT works well for non-urgent transfers of any size processed in batches. RTGS is meant for high-value transfers (minimum ₹2,00,000) that need real-time, individual settlement rather than batch processing.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does IMPS work on Sundays and holidays?',
        answer:
          'Yes, IMPS is available 24 hours a day, 7 days a week, including Sundays, and all bank and public holidays, since it was designed from the outset for round-the-clock instant transfers.',
      },
      {
        question: 'Is there a charge for IMPS transfers?',
        answer:
          'Many banks charge a small fee for IMPS transactions, especially for higher amounts, though this varies by bank and by the channel (mobile app, net banking, or ATM) used to initiate the transfer.',
      },
      {
        question: 'What if I enter the wrong IFSC code for an IMPS transfer?',
        answer:
          'An incorrect IFSC code will typically cause the transaction to fail or be routed to the wrong bank, so it is important to double-check the beneficiary\u2019s IFSC code and account number before confirming an IMPS transfer.',
      },
    ],
  },
  'what-is-grey-market-premium-gmp-ipo': {
    intro:
      'Grey Market Premium, usually shortened to GMP, is the extra price that traders in an unofficial, unregulated market are willing to pay for IPO shares before they are officially listed on the stock exchange. It is watched closely by retail investors as an informal signal of how strong the demand for an upcoming IPO might be, though it is not published, tracked, or regulated by SEBI or the stock exchanges in any way.',
    keyHighlights: {
      headers: ['Particulars', 'Details'],
      rows: [
        ['What it measures', 'Premium buyers are willing to pay over the IPO issue price, before listing'],
        ['Regulated by SEBI?', 'No — it is an unofficial, informal market'],
        ['Where it is quoted', 'Grey market dealer networks and IPO tracking websites/forums'],
        ['Reliability', 'Indicative only; can swing sharply and is not a guarantee of listing gains'],
      ],
    },
    sections: [
      {
        heading: 'What is the grey market for IPOs',
        paragraphs: [
          'The "grey market" is an informal, off-market space where IPO shares and IPO application forms change hands before the shares are officially allotted and listed on the NSE or BSE. It operates outside the regulatory framework that governs the formal stock exchanges, running mainly on trust between a small network of dealers.',
          'Because it is unregulated, there is no central exchange, no official record of trades, and no legal recourse if a grey market deal is not honoured. It exists primarily as a way for market participants to gauge and trade on expected listing-day demand ahead of time.',
        ],
        bullets: [
          'Trades happen informally between dealers, usually over phone or messaging apps, not on any exchange platform.',
          'Prices quoted are not binding contracts in the way exchange trades are, and settlement relies on the reputation of the dealers involved.',
          'The grey market is most active in the days between the IPO subscription closing and the shares getting listed.',
        ],
      },
      {
        heading: 'How Grey Market Premium (GMP) works',
        paragraphs: [
          'GMP is simply the amount above the IPO issue price that someone in the grey market is willing to pay to buy the shares (or the IPO application itself) before listing. If an IPO is priced at ₹500 per share and the GMP is quoted at ₹80, it implies the grey market expects the stock to list somewhere around ₹580, i.e., roughly a 16% listing gain.',
          'GMP figures change frequently — sometimes multiple times a day — as subscription numbers come in, market sentiment shifts, and the listing date approaches. A GMP can also turn negative, signalling that the grey market expects the stock to list below its issue price.',
        ],
        table: {
          headers: ['Term', 'What it means'],
          rows: [
            ['IPO GMP', 'Premium over issue price for the shares themselves'],
            ['Kostak rate', 'Flat amount paid to buy/sell an entire IPO application, regardless of allotment'],
            ['Subject to sauda / Subject to sail', 'A deal on the application that is only valid if the applicant actually receives an allotment'],
          ],
        },
      },
      {
        heading: 'Is GMP a reliable predictor of listing price',
        paragraphs: [
          'GMP is a sentiment indicator, not a guaranteed outcome. It reflects what a small, unregulated set of grey market participants are willing to pay at a given moment, and several IPOs with a strongly positive GMP have gone on to list flat or below their issue price once real market forces, subscription data, and broader market conditions come into play on listing day.',
        ],
        bullets: [
          'GMP figures are not published or verified by SEBI, the exchanges, or the company issuing the IPO.',
          'Overall market conditions on the actual day of listing can override whatever the grey market predicted in the preceding days.',
          'Investors relying purely on GMP without looking at the company\u2019s fundamentals, subscription figures, and broader market mood take on additional risk.',
        ],
      },
      {
        heading: 'Is trading in the grey market legal in India',
        paragraphs: [
          'The grey market for IPOs operates in a legal grey zone: it is not explicitly recognised or regulated by SEBI, but it is also not a criminal offence in the way insider trading is. Because it falls outside SEBI\u2019s regulatory oversight, participants have no formal protection, dispute resolution mechanism, or guarantee that a deal will be honoured, which is why most retail investors only use GMP as a reference number rather than actually trading in the grey market themselves.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does a high GMP guarantee listing gains?',
        answer:
          'No. GMP only reflects informal grey market sentiment at a point in time and can change quickly; it is not a guarantee of how the stock will actually perform on listing day.',
      },
      {
        question: 'Where can I check an IPO\u2019s GMP?',
        answer:
          'GMP figures are shared informally by grey market dealer networks and are aggregated by several IPO tracking websites, but none of these sources are officially sanctioned by SEBI or the stock exchanges.',
      },
      {
        question: 'Can GMP be negative?',
        answer:
          'Yes. A negative GMP means the grey market expects the stock to list below its issue price, which can happen when an IPO is seen as expensively priced or market sentiment turns weak.',
      },
      {
        question: 'Is it safe to buy or sell IPO applications in the grey market?',
        answer:
          'It carries risk, since grey market deals are informal, unregulated, and not legally enforceable in the way exchange-traded transactions are — settlement depends entirely on trust between the parties involved.',
      },
    ],
  },
  'types-of-ipo': {
    intro:
      'An Initial Public Offering (IPO) is the process by which a private company offers its shares to the public for the first time to raise capital and get listed on a stock exchange. Not all IPOs are structured the same way — they can differ in how the price is decided and in which categories of investors are allowed to apply. This guide covers the main ways IPOs are classified in India.',
    keyHighlights: {
      headers: ['Particulars', 'Details'],
      rows: [
        ['By pricing method', 'Fixed price issue or book-built issue'],
        ['By investor category', 'Retail, NII/HNI, and QIB (Qualified Institutional Buyer)'],
        ['Regulator', 'Securities and Exchange Board of India (SEBI)'],
        ['Where listed', 'NSE and/or BSE'],
      ],
    },
    sections: [
      {
        heading: 'Classification by pricing method',
        paragraphs: [
          'The most common way to classify an IPO is by how the final share price is determined — either the company fixes the price upfront, or the price is discovered through investor bidding.',
        ],
        table: {
          headers: ['Type', 'How the price is set', 'Key feature'],
          rows: [
            ['Fixed Price Issue', 'Company and merchant bankers decide a single, fixed price in advance', 'Investors know the exact price before applying; demand is revealed only after the issue closes'],
            ['Book Built Issue', 'Company announces a price band (e.g., ₹95\u2013₹100); final price is discovered via bidding', 'Investors bid within the band; the final "cut-off price" is set based on demand across the book'],
          ],
        },
      },
      {
        heading: 'Fixed price issue in detail',
        paragraphs: [
          'In a fixed price issue, the issuing company, along with its merchant bankers, sets a single price at which all shares will be sold, and this price is stated clearly in the prospectus before the issue opens. Investors know exactly what they will pay if they receive allotment.',
        ],
        bullets: [
          'At least 50% of the shares in a fixed price issue are typically reserved for applications below a specified investment value (small/retail investors).',
          'Because the price is not discovered through bidding, demand for the issue only becomes clear once the subscription window closes.',
          'Fixed price issues are less common today than book-built issues, especially among larger companies.',
        ],
      },
      {
        heading: 'Book built issue in detail',
        paragraphs: [
          'A book-built issue is the more common route used by companies going public in India today. Instead of one fixed price, the company announces a price band with a floor price (lower end) and a cap price (upper end), and investors bid for shares at any price within that band, or choose the "cut-off price" option to accept whatever final price is discovered.',
          'Once bidding closes, the final issue price is set based on the demand received at each price point within the band — this is why book building is described as a price discovery mechanism.',
        ],
        bullets: [
          'The order book showing bids at different price points is publicly visible while the issue is open.',
          'Retail investors usually bid at the "cut-off price" so their application remains valid regardless of where the final price is fixed within the band.',
          'Most large IPOs on the NSE and BSE, including nearly all recent mainboard listings, use the book-building method.',
        ],
      },
      {
        heading: 'Classification by investor category',
        paragraphs: [
          'Within any IPO, the total shares on offer are further divided into reserved quotas for different types of investors, each with its own bidding and allotment rules.',
        ],
        table: {
          headers: ['Investor category', 'Typical reservation', 'Who it covers'],
          rows: [
            ['Retail Individual Investor (RII)', 'At least 35% in most book-built issues', 'Individuals applying for shares worth up to ₹2 lakh'],
            ['Non-Institutional Investor (NII / HNI)', 'At least 15%', 'Individuals and entities applying for more than ₹2 lakh'],
            ['Qualified Institutional Buyer (QIB)', 'Up to 50%', 'Mutual funds, banks, FIIs, insurance companies and other large institutions'],
          ],
        },
      },
      {
        heading: 'Mainboard IPO vs SME IPO',
        paragraphs: [
          'Another practical distinction is between a mainboard IPO, where the company lists on the main platform of the NSE or BSE and must meet the exchange\u2019s full listing requirements, and an SME IPO, meant for smaller companies that list on the dedicated NSE Emerging or BSE SME platforms under relatively lighter eligibility norms.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the main difference between a fixed price issue and a book-built issue?',
        answer:
          'In a fixed price issue the company sets one price upfront, while in a book-built issue investors bid within an announced price band and the final price is discovered based on demand.',
      },
      {
        question: 'Can a retail investor apply in the QIB category?',
        answer:
          'No. The QIB category is reserved for institutional investors such as mutual funds, banks, and insurance companies; individual retail investors apply under the RII or NII category depending on their application size.',
      },
      {
        question: 'What is the retail investor investment limit in an IPO?',
        answer:
          'An application is classified as a Retail Individual Investor (RII) application as long as its value does not exceed ₹2 lakh; anything above that falls under the NII/HNI category.',
      },
      {
        question: 'What is an SME IPO?',
        answer:
          'An SME IPO is an IPO by a smaller company that lists on the dedicated SME platform of the NSE or BSE, which has different (generally lighter) eligibility and disclosure norms compared to a mainboard listing.',
      },
    ],
  },
  'how-to-check-ipo-allotment-status': {
    intro:
      'After an IPO\u2019s subscription window closes, shares are allotted to applicants through a process overseen by the IPO\u2019s registrar, typically within a few working days. Since most IPOs are oversubscribed, not every applicant receives shares, and allotment for retail investors is usually done through a computerised lottery system. This guide covers the different ways you can check whether you received an allotment.',
    keyHighlights: {
      headers: ['Particulars', 'Details'],
      rows: [
        ['Who conducts allotment', 'The IPO\u2019s appointed Registrar (e.g., Link Intime, KFin Technologies)'],
        ['Typical timeline', 'Usually within 3\u20134 working days after the issue closes'],
        ['Where to check', 'Registrar\u2019s website, NSE/BSE website, or your broker\u2019s app'],
        ['What you need', 'PAN, application/DP-Client ID, or IPO application number'],
      ],
    },
    sections: [
      {
        heading: 'Why not everyone gets allotment',
        paragraphs: [
          'When an IPO receives far more applications than the number of shares on offer, it is said to be oversubscribed. In such cases, especially in the retail category, SEBI rules require allotment to be done through a computerised, proportionate lottery system rather than allotting a few shares to every applicant, which is why many applicants in a heavily oversubscribed IPO end up with no allotment at all.',
        ],
      },
      {
        heading: 'Checking allotment status via the registrar\u2019s website',
        paragraphs: [
          'Every IPO has a designated registrar (commonly Link Intime India or KFin Technologies) responsible for processing applications and finalising the allotment list. This is usually the most direct way to check your status.',
        ],
        bullets: [
          'Go to the registrar\u2019s official IPO allotment status page and select the relevant company/IPO from the list.',
          'Enter your PAN number, or alternatively your application number or DP/Client ID, as requested on the page.',
          'Submit the form to view whether shares were allotted to you and, if so, how many.',
        ],
      },
      {
        heading: 'Checking allotment status via NSE or BSE',
        paragraphs: [
          'Both the NSE and BSE also let investors check IPO allotment status directly on their own websites, which can be useful if you are unsure which registrar handled a particular issue.',
        ],
        bullets: [
          'Visit the IPO allotment status section on the NSE or BSE website.',
          'Select the company name from the dropdown list of recent issues.',
          'Enter your PAN or application number to view the result.',
        ],
      },
      {
        heading: 'Checking allotment status through your broker',
        paragraphs: [
          'Most stockbroking apps and platforms that let you apply for IPOs also show your allotment status directly within the app, usually under an "IPO" or "Orders" section, once the registrar finalises the results. This can be a quicker way to check if you applied through a broker\u2019s UPI-based ASBA flow.',
        ],
      },
      {
        heading: 'What happens after allotment is finalised',
        paragraphs: [
          'If you are allotted shares, they are credited to your demat account before the listing date, and any blocked amount for shares you were not allotted is released back to your bank account. If you receive no allotment at all, the entire blocked amount is unblocked and made available in your account again.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How soon after the IPO closes can I check my allotment status?',
        answer:
          'Allotment is typically finalised and made available to check within about 3 to 4 working days after the IPO subscription window closes, though the exact timeline is announced in the IPO\u2019s official schedule.',
      },
      {
        question: 'What details do I need to check IPO allotment status?',
        answer:
          'You generally need your PAN number, and depending on the platform, either your IPO application number or your DP/Client ID.',
      },
      {
        question: 'What happens to my money if I don\u2019t get an allotment?',
        answer:
          'Since IPO applications are made through ASBA, your money is only blocked, not debited; if you receive no allotment, the blocked amount is released back to your bank account automatically.',
      },
      {
        question: 'Can I check allotment status without knowing the registrar\u2019s name?',
        answer:
          'Yes. You can check directly on the NSE or BSE website by selecting the company name, without needing to know which registrar handled that particular IPO.',
      },
    ],
  },
};
