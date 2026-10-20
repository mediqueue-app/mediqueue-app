# KASIM M1 — AWS Local Zone Raw USD Infrastructure Cost Research

Scope: **infrastructure host cost research only**. These are raw AWS On-Demand
USD list prices for the `api` + `db` + `ai` stack (the root `docker-compose.yml`
scope for this milestone). This is **not** product pricing, not a company
budget, and not converted to TRY. No Spot pricing is used.

Target Local Zone: **`eu-central-1-ist-1a`** (Istanbul, Türkiye)
Parent region: **`eu-central-1`** (EU — Frankfurt)

## Source and method

Primary source: the **official AWS Price List (Bulk) API** — no third-party
reseller or estimator was used for the final figures below.

- Region index: `https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonEC2/current/region_index.json`
  → resolves a dedicated Local Zone entry, `regionCode: eu-central-1-ist-1`.
- EC2 + EBS offer file for the Local Zone:
  `https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonEC2/20260910195514/eu-central-1-ist-1/index.json`
  (`version 20260910195514`, `publicationDate: 2026-09-10T19:55:14Z`)
- ELB (ALB) offer file for the Local Zone:
  `https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AWSELB/20260911124544/eu-central-1-ist-1/index.json`
  (`version 20260911124544`, `publicationDate: 2026-09-11T12:45:44Z`)
- Parent-region (Frankfurt) ELB offer file used only for the explicit
  side-by-side comparison: `.../AWSELB/20260911124544/eu-central-1/index.json`

**Retrieval date: 2026-09-17.**

Every figure below is quoted with its AWS `sku` / `rateCode` / `effectiveDate`
so another engineer can re-fetch the same offer files and reproduce it
exactly. AWS price lists change over time — re-verify before committing spend
(see "Reproduction" section at the end).

Cross-check: the independent third-party aggregator `aws-pricing.com`
(`https://aws-pricing.com/eu-central-1-ist-1.html`, checked 2026-09-17) reports
the same EC2 figures (m7i.large $0.1268/hr, m7i.xlarge $0.2536/hr, c7i.large
$0.1069/hr, rounded to 4 dp), which corroborates the Price List API pull below.

---

## 1. EC2 On-Demand — `eu-central-1-ist-1` (Istanbul Local Zone)

Linux, shared tenancy, no pre-installed software, `capacitystatus: Used`.
Monthly = hourly × **730 hours** (fixed assumption, not a real-usage forecast).

| Instance | On-Demand USD/hr | Monthly USD (× 730h) | SKU | effectiveDate |
|---|---|---|---|---|
| `m7i.large` | $0.12679 | $92.56 | `HPK3JAE6UT3K8UDV` | 2026-09-01 |
| `m7i.xlarge` | $0.25358 | $185.11 | `CYTPVZ4M27FNGC9K` | 2026-09-01 |
| `c7i.large` | $0.10694 | $78.07 | `H39FHJ8GUVMP92GR` | 2026-09-01 |

Formula: `monthly = hourly_rate × 730`. Example: `0.12679 × 730 = 92.5567 → $92.56`.

Note: `m7i.xlarge` ($0.25358/hr) is exactly `2 × m7i.large` ($0.12679/hr ×
2 = $0.25358/hr) — pricing scales linearly with instance size in this family
at this location, which matters for the scenario comparison below.

A parent-region (Frankfurt) EC2 comparison was **not** independently pulled
from the same official Price List API in this session (the parent-region
`AmazonEC2` offer file is ~430 MB and was not fully parsed for this table —
see ALB below for a case where the parent-region comparison *was* verified).
Non-authoritative web listings suggested Frankfurt on-demand rates below the
Istanbul figures above, consistent with AWS's general statement that Local
Zone pricing differs from the parent region, but that comparison is
explicitly **not** asserted as fact here since it was not confirmed against
the official bulk API. Treat the Istanbul figures above as the only
authoritative numbers in this section.

## 2. EBS Storage — `eu-central-1-ist-1` (Istanbul Local Zone)

| Volume type | USD/GB-month | SKU | effectiveDate | Notes |
|---|---|---|---|---|
| `gp3` | $0.1380 | `TRQWNPFXE6NMDJFW` | 2026-09-01 | Includes 3,000 IOPS / 125 MiB/s baseline free; extra IOPS $0.0087/IOPS-mo (`C9WNW9PVXY8X63US`), extra throughput $0.0696/MiBps-mo (`N9VE9BTS5YYP339V`) |
| `io1` (**reference only**) | $0.2161 | `SP3KV6BGP7XF5R63` | 2026-09-01 | Provisioned IOPS billed **separately** at $0.1131/IOPS-mo (`VNRGR5XZ8NYFQ2V8`) — there is no free IOPS baseline like gp3 |

**100 GB gp3 calculation:** `100 GB × $0.1380/GB-mo = $13.80/month` (no extra
IOPS/throughput charges assuming default 3,000 IOPS / 125 MiB/s is sufficient).

**io1 reference-only illustration** (why io1 is not the staging
recommendation): 100 GB storage = `100 × $0.2161 = $21.61/month`, but matching
gp3's default 3,000 IOPS on io1 costs `3,000 × $0.1131 = $339.30/month` in
IOPS charges *alone* — over 24× the entire gp3 100 GB bill. **Staging
recommendation remains gp3.** io1 is documented here strictly as the
requested reference point, not a recommendation.

(EBS snapshot storage, if used: $0.0783/GB-month, S3-backed, SKU
`ASGRQSX67WM7Y22V` — see the Frankfurt data-path note for where that data
physically lives.)

## 3. Application Load Balancer (ALB)

Unlike some Local Zone services, AWS **does** publish an explicit Istanbul
Local-Zone ALB price in the official Price List API — this was directly
confirmed, not inferred:

| Location | ALB base USD/hr | LCU USD/hour | SKU (base / LCU) | effectiveDate |
|---|---|---|---|---|
| `eu-central-1-ist-1` (Istanbul LZ) | $0.081 | $0.0125 | `7NVCU4NVRQZYMUZ6` / `AAP6ZQNX4RZSE924` | 2026-08-01 |
| `eu-central-1` (Frankfurt, parent region) | $0.027 | $0.008 | (parent-region file, same offer version) | 2026-08-01 |

Istanbul's ALB base price is **3× the Frankfurt parent-region price**, and its
LCU price is **~1.56× Frankfurt's**. This is the Local Zone premium the task
spec warned might apply — it does, and it is now quantified from the source
rather than invented.

Monthly ALB **base** cost (LCU usage is additional and workload-dependent —
no traffic volume is assumed or invented here):

- Istanbul: `$0.081 × 730h = $59.13/month` (base only, excludes LCU-hours)
- Frankfurt (reference): `$0.027 × 730h = $19.71/month` (base only)

## 4. Workload scenarios (USD/month, On-Demand, Istanbul Local Zone)

Both scenarios: 100 GB gp3, 1 ALB, workload = `api` + `db` + `ai` only (no
web-* portals, per the M1 compose scope).

**Scenario A — 1 × `m7i.xlarge`:**

| Line item | Monthly USD |
|---|---|
| 1 × m7i.xlarge | $185.11 |
| 100 GB gp3 | $13.80 |
| 1 × ALB (base only) | $59.13 |
| **Total (excl. ALB LCU-hours, data transfer, snapshots)** | **$258.04** |

**Scenario B — 2 × `m7i.large`:**

| Line item | Monthly USD |
|---|---|
| 2 × m7i.large | $185.11 |
| 100 GB gp3 | $13.80 |
| 1 × ALB (base only) | $59.13 |
| **Total (excl. ALB LCU-hours, data transfer, snapshots)** | **$258.04** |

**Finding:** Scenario A and Scenario B have **identical** raw compute+storage
cost, because `m7i.xlarge` is priced at exactly 2× `m7i.large` at this
location. The two scenarios are a redundancy/architecture decision (one
larger box vs. two smaller boxes for HA), **not** a cost decision — the
Local Zone On-Demand price list does not favor either shape.

Neither total includes: ALB LCU-hours (traffic-dependent, no volume assumed),
data transfer/egress, EBS snapshot storage, CloudWatch/Secrets
Manager/ECR/ACM usage in the parent region (see
`kasim-frankfurt-data-path.md`), or any Savings Plans/Reserved discount.

---

## Reproduction

To re-verify or refresh these numbers:

```bash
curl -s https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonEC2/current/region_index.json \
  | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['regions']['eu-central-1-ist-1'])"
# then fetch the currentVersionUrl it prints, and filter products[*].attributes.location == "Turkey (Istanbul)"
# with the matching entry in terms.OnDemand[<sku>] for the price.
```

The same pattern applies to the `AWSELB` offer (`region_index.json` under
`.../AWSELB/current/region_index.json`) for ALB pricing.
