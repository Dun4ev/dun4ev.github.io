# Ostatak: what remains from restaurant delivery

Public-source research and a local prototype. Sources checked on 7 October 2026.

**Conclusion: this niche merits a small paid pilot. Monthly income of $1,000 is arithmetically possible, but demand, retention and support costs remain unverified.**

Ostatak, Serbian for “remainder,” is intended for owners of one or two small restaurants in Belgrade or Novi Sad selling through Wolt and Glovo. It explains deductions, reconciles reported payouts and shows order contribution after food and packaging costs. This is an initial audience hypothesis, not an established market size.

## The problem and supporting evidence

Sales in the app look healthy, but the amount transferred is surprising. The owner must connect sales, commissions, merchant-funded discounts, advertising, refunds and settlement periods. They must then determine whether ordinary expenses explain the difference or whether it warrants a support query. Doing this manually is particularly inconvenient across two platforms.

In a [Berlin restaurateur’s discussion](https://www.reddit.com/r/restaurant/comments/1ujmwul/strange_payouts_from_ut/), the author clarifies that they use Wolt and Uber Eats: initial payouts are lower than expected, and there is no time to review numerous rows weekly. Other participants point to promotions, refunds and mismatched periods as ordinary explanations. This is a strong qualitative signal of the task, but the documents would be needed to confirm a payout error.

In a [Serbian discussion of restaurant economics](https://www.reddit.com/r/serbia/comments/1pppuqx/da_li_su_restorani_u_srbiji_skupi_%C5%A1ta_sve_uti%C4%8De/), a participant describes the combined impact of discounts, commission and advertising. In [another AskSerbia discussion](https://www.reddit.com/r/AskSerbia/comments/1tfz1x1/da_li_kori%C5%A1%C4%87enje_wolta_i_glova_postalo_suludo/), a commenter claiming to have onboarded a venue discusses commission sensitivity. Identities, contracts and percentages have not been verified. These are local signals of margin pressure, not evidence of willingness to pay for this product.

[Wolt’s official Serbia page](https://merchant.wolt.com/en/srb/learning-center/guide-to-merchant-payout-reports) separately explains the Wolt invoice, merchant invoice in applicable models, payout report and sales report. Documents can be downloaded through Merchant Portal → Payout Reports → Download documents. This confirms a potential route to data. The public guide does not establish a specific Serbian CSV schema, order-level detail or a complete financial API.

The [official Glovo Manager Portal guide](https://image.partner.glovoapp.com/lib/fe4511707564057d751573/m/1/abf351ad-b948-4e8f-80db-f3d3b0721755.pdf) describes order history and invoices, with invoice availability qualified by country. [Another guide](https://image.partner.glovoapp.com/lib/fe4511707564057d751573/m/2/dd1ca401-ee0a-4af5-a085-8ee4dad41e02.pdf) explains invoice downloads and discrepancy queries. Both guides are general; a local Glovo document set is still needed for validation.

Practical conclusion: the value should come from clear reconciliation and time saved. The offer should not rely on accusations against platforms, a universal commission percentage or a promise of recurring refunds. A short claim deadline mentioned by a Reddit user has not been adopted as a rule for Serbia.

## Why someone might pay

The buyer is the restaurant owner or a small restaurant group. Accounting firms could become a referral channel after product validation, but no discussions with such firms have taken place.

Proposed value: submit documents for a closed period once, receive an explanation of deductions and a short list of rows with source references. Possible outcomes include confirming a correct payout, disabling an unprofitable promotion, changing a menu price or asking the platform a substantiated question. A discrepancy is not equivalent to proven debt or recoverable money.

Recurring payment makes sense only if promotions, rates and the sales mix change, and processing the next period saves enough time or leads to useful actions. If the first reconciliation resolves the uncertainty and there is no recurring benefit, this is a one-off service rather than a subscription.

## Competitors and the reason for a narrow focus

| Product | Publicly established information | Implication |
| --- | --- | --- |
| [Costrify](https://costrify.com/) | Starter is $49 per location per month; channel economics and payout reconciliation are advertised. The site invites early access; users enter rates. | A direct competitor below the proposed $59. Actual operation with Serbian files and its sales have not been verified. |
| [Otter](https://www.tryotter.com/products/order-management) | The Order Management package is publicly listed at $149 per month. [Reconciliation documentation](https://helpdesk.tryotter.com/hc/en-us/articles/18163188728339-Financials-Reconciliation) describes expected/actual payouts, unpaid rows, filters and export. | A mature product already addresses the task. Standalone reconciliation pricing and integration availability in Serbia have not been established. |
| [Resto Payout Auditor](https://www.restopayoutauditor.com/) | Report uploads, possible discrepancies, source references and export are publicly described. | A closely related product. Pricing, sales and local formats have not been established. |
| [Gart](https://gart.rs/) | Local software starts at €35/month for cafes and €50 for restaurants; it includes eFakture and supplier price alerts. | The first idea considered, purchase-price monitoring, was set aside because a local competitor already provides this exact function. |

Pricing and paid plans establish a commercial category, but do not prove that a particular Serbian owner will buy Ostatak. Claiming that “nobody else does this” would be wrong. A possible advantage is verified local formats, onboarding help, working alongside the existing POS and a checkable result in the owner’s language. These are planned advantages, not implemented ones.

## A path to $1,000 per month

Test price: **$59 per location per month**. Dollars are used to compare against the user’s target; local pricing and payment currency will need to be tested with clients.

| Scenario | Calculation | Result |
| --- | --- | --- |
| Revenue above $1,000 | 18 × $59 | $1,062 MRR before all expenses |
| Illustrative remainder after some expenses | 24 × $59 − $43 payments − $80 infrastructure − $240 support | $1,053 before tax, development, onboarding and acquisition |
| Support takes one hour rather than 20 minutes | 24 × $59 − $43 − $80 − 24 × $30 | $573 before other expenses |

All expenses are assumptions, not measurements. The $43 is approximately 3% of revenue, not a verified payment-provider rate. The $240 support allowance represents eight hours at $30, or 20 minutes per client per month. Initial onboarding could cost substantially more. Sales, CAC, conversion, churn, retention and net income have not been measured. Paying clients: **0**.

Even illustrative monthly churn of 5% would require a 24-client base to replace roughly one client every month. This shows sensitivity; it is not an estimate of actual churn. A profitable recurring business will need standardized document processing and a sustainable sales channel. An attractive interface alone is insufficient.

## What has been created

A local prototype without dependencies or external requests. Uploaded file data stays in browser memory and is cleared on reload. The initial screen contains explicitly synthetic data: 32 orders, 31 payout rows, 30 matches, two orders without payouts and one payout without an order.

Working features:

- Upload two CSV files in the published format, with validation completed before replacing the session.
- Match on platform + order_id; identical IDs from different platforms remain separate.
- Reconcile the order amount, five deductions and reported payout. Calculations use hundredths of a dinar.
- Contribution = payout − food − packaging. Rent, wages and other expenses are excluded; this is not net profit.
- An additional commission check using a user-confirmed final rate and calculation basis. Importing files disables this check.
- Filters, search, individual order breakdowns, filenames and physical source line numbers.
- Manual review marks and CSV export with sources. Review marks do not alter financial calculations.
- A research page, source links and interactive revenue arithmetic.

Payout difference = order amount − deductions from CSV − paid. A negative difference means that paid exceeds the calculation. The review summary sums absolute differences greater than 0.01 RSD, rather than a signed debt balance. Unmatched rows are excluded from financial totals; a missing payout may be explained by the reporting period.

Not yet available: native Wolt/Glovo formats, PDF/OCR, bank reconciliation, contracts with dates and varying rates, adjustments across periods, credit lines, live server integrations, accounts, payment or automated support queries. Shared advertising expenses must first be allocated without double counting. Commission rates are entered inclusive of applicable tax on commission; automatic tax calculation has not been built.

Design: a compact working surface, warm background, dark green finance panel, restrained status colors and calculations beside their sources. The hierarchy and reduced visual noise are consistent with principles described in the [Linear redesign](https://linear.app/now/how-we-redesigned-the-linear-ui). That source dates from 2024; the design is a choice for this task, not proof of a dominant 2026 trend.

## The first testable paid offer

**$59 to reconcile one closed month for one location, without mandatory renewal.** First check an anonymized sample’s suitability for free, then agree on scope. Sales/payout reports from both platforms, invoices, adjustments, applicable contract terms and evidence of corresponding receipts are required. Passwords and customer names are not needed.

Proposed delivery within three working days of receiving the complete set: a deduction breakdown, explained and unexplained differences with sources, reconciliation of accruals, transfers and receipts, and a short review with the owner. The bank portion of the first pilot would be manual; it is not implemented in the current prototype. “Everything matches” is a valid outcome. Do not sell this reconciliation if the document set is insufficient.

Initial validation plan: ten conversations with suitable owners, three complete document sets and three paid pilots. Start with local independent restaurants that actually need to review both platforms; accounting referrals can be tested as a second channel. No messages, applications, publications or visits have been made.

Continue the subscription if at least two of three clients voluntarily pay for the next period, repeat processing takes no more than 20 minutes per client, and there is measurable time saved or verified actions worth at least three monthly fees. These are selected experiment criteria, not research results.

Stop expanding if an ordinary spreadsheet or the existing accountant is sufficient, documents are inadequate for reliable reconciliation, a direct competitor is more convenient and cheaper, or interest disappears after month one. The decisive next input is a real anonymized Serbian Wolt + Glovo document set for a matching period.

This is an English translation of [the original research](RESEARCH.md). Source checks and business assumptions retain the original date and scope.
