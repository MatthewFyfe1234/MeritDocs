# Forecasting options for the full MIMIC-IV

What we tried on the 29-admission subset, and what may hold on the full database. Errors are typical (median)
absolute errors, each case forecast from the others, against the median of the others in brackets.

## Consumption and workload, given the step's duration

- Charted observations in the ICU, given hours: 13% (59%). Attributable to the charting caregiver.
- Lab tests in the ICU, given hours: 22% (37%).
- IV and fluid volume in the ICU, given hours: 28% (37%).
- Urine output in the ICU, given hours and weight: 40% (60%).
- Each depends on the step's duration, as the MAP fall depends on the dose.

## Material quantities and responses

- Propofol dose and the fall in MAP within the hour, given age and weight: 22.7 mmHg (25.7). Built, 15 stays.
- Vancomycin dose given weight and creatinine: weight bands visible (r 0.5), 16 cases. May expose inconsistent prescribing.
- Red cells and the rise in haemoglobin, about 1 g/dL a unit: right on average, 3 stays.
- Potassium, magnesium and platelets and the rise in their levels: 5 to 10 stays each.
- Furosemide and urine output: no relation seen (r 0.07), 52 doses.
- Norepinephrine and phenylephrine rate given weight: r 0.6 and 0.4.

## Process timings

- Step durations (ED, pre-op, operation, ventilation, ICU, ward): model 40%, whole-stay baseline 46%, calibrated at r 0.8 and 0.9.
- Lab turnaround by section, priority and time of day: 39% (52%), 1,257 specimens. One step a specimen, no lab staff recorded.
- Order to administration: 55% (59%), 1,079 doses.
- Pharmacy verification: 74% (100%).
- Discharge order to leaving: one per admission, untested.
- ED flow, from arrival to departure: needs the MIMIC-IV-ED module.
- Time to first antibiotic in suspected sepsis: untested.
- Ventilator weaning, from readiness to extubation, with reintubation within 48 hours: untested.

## Categorical outcomes, read as probabilities

- Discharge home or to a care facility: untested.
- ICU or hospital readmission within 30 days, mortality, acute kidney injury: untested, standard benchmarks.
- Forecasts can be checked for calibration but not read as effects of treatment.

## Paper tests

- Step-level against whole-admission forecasts, with exceedance at r against 1 - r: built (Measures).
- Extension, each node added when its first order or event appears: untested.
- Agent as context, with and without who did the work: untested here (BPI 2017 cut task error from 74% to 51%).
- Combined forecasts under independence against shared sources: untested.

## Before building on the full database

- Credentialed access and a data use agreement, results reported in aggregate only.
- Stream or query the tables (chartevents runs to hundreds of millions of rows).
- Repeated events within a stay (doses, tests) give one point per project and step, so each needs its own project or node instance.
