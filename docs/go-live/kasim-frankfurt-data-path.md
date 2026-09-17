# KASIM M1 — Istanbul Local Zone ↔ Frankfurt Technical Data Path

Scope: **technical service-placement research only.** This document answers
"where does each piece actually run/live" for a stack whose compute sits in
the `eu-central-1-ist-1a` Local Zone (Istanbul) with `eu-central-1` (EU
Frankfurt) as the parent region. It makes **no legal or compliance
conclusions**.

**CLAIM DATA STAYS IN TURKEY: NO**

Classification values used below (fixed vocabulary, per spec):

- `LZ_ONLY` — runs/stored physically in the Istanbul Local Zone.
- `PARENT_REGION_FRANKFURT` — runs/stored physically in eu-central-1 (Frankfurt).
- `MIXED` — some part local, some part parent-region, both confirmed.
- `UNKNOWN` — AWS documentation does not support a confident placement conclusion.

## Service / data-path table

| Service | Istanbul LZ | Parent eu-central-1 (Frankfurt) | Classification | Source / evidence | Notes |
|---|---|---|---|---|---|
| NAT Gateway (managed) | Not offered — Istanbul is absent from the "NAT Gateway" column of the official Local Zones feature matrix | Must be provisioned here if a managed NAT Gateway is required | `PARENT_REGION_FRANKFURT` | [AWS Local Zones features](https://aws.amazon.com/about-aws/global-infrastructure/localzones/features/) (retrieved 2026-09-17): Istanbul row's NAT Gateway cell is empty, unlike EC2/EBS/ALB/ECS/EKS/VPC/Direct Connect which are marked | If a NAT path is required and Istanbul lacks managed NAT Gateway, private-subnet egress must either use a self-managed NAT instance in-zone (see next row) or backhaul to a NAT Gateway in Frankfurt |
| NAT instance (self-managed EC2) | Can run here — EC2, VPC, and a directly attached Internet Gateway are all supported in Istanbul | Not required for this path | `LZ_ONLY` | [How AWS Local Zones work](https://docs.aws.amazon.com/local-zones/latest/ug/how-local-zones-work.html) (retrieved 2026-09-17): "Outbound internet traffic leaves a Local Zone from the Local Zone." | This is a general statement for Local Zones with internet connectivity, not an Istanbul-specific NAT-instance walkthrough — treat as a reasonable but not instance-type-specific inference |
| Public IP outbound (EC2 instance with EIP, direct IGW egress, no NAT) | Runs and egresses here directly | Not involved for this path | `LZ_ONLY` | Same source as above: "Outbound internet traffic leaves a Local Zone from the Local Zone." | Most confidently sourced row in this table — it is a verbatim, Local-Zone-wide documented statement |
| Secrets Manager | Not available — absent from the Istanbul feature list | Control plane, API endpoint, and stored secret material all live here | `PARENT_REGION_FRANKFURT` | [AWS Local Zones FAQs](https://aws.amazon.com/about-aws/global-infrastructure/localzones/faqs/) (retrieved 2026-09-17): "services like Amazon S3 and Amazon Aurora are accessible privately through VPC over AWS private network" (i.e., non-locally-available services are reached from the parent Region); [How AWS Local Zones work](https://docs.aws.amazon.com/local-zones/latest/ug/how-local-zones-work.html): "You cannot create VPC endpoints inside Local Zone subnets." | An EC2 instance in Istanbul calling Secrets Manager reaches `secretsmanager.eu-central-1.amazonaws.com` over the AWS backbone or public internet — it cannot terminate a local interface endpoint in-zone |
| CloudWatch Logs | Not available — absent from the Istanbul feature list | Log groups, storage, and the `logs.eu-central-1.amazonaws.com` API endpoint live here | `PARENT_REGION_FRANKFURT` | Same as above (Local Zones FAQ + "no VPC endpoints in Local Zone subnets"); AWS Local Zones FAQ: "Amazon CloudWatch is leveraged as an AWS tool running in the parent AWS Region" | Container/app logs shipped from Istanbul are stored in Frankfurt, not Istanbul |
| ECR pull | Not available — absent from the Istanbul feature list | Registry API, image manifests, and layer storage (S3-backed) live here | `PARENT_REGION_FRANKFURT` | Same reasoning: ECR is not in the Istanbul supported-services list; no local VPC endpoint possible in a Local Zone subnet | `docker pull` from an Istanbul host retrieves image layers from the Frankfurt-region ECR registry over the backbone/internet path |
| ACM (certificates) | Not available — absent from the Istanbul feature list; certificates are inherently regional | Certificate issuance, private key material, and renewal all live here | `PARENT_REGION_FRANKFURT` | Same reasoning as above; ACM has no per-Local-Zone concept in AWS's architecture | An ALB physically running in Istanbul can still *use* a Frankfurt-issued ACM certificate for TLS — the workload is local, the certificate control plane is not |
| EBS snapshot | **Default**: not stored here | **Default**: snapshot data stored in Amazon S3 in Frankfurt | `MIXED` (default = `PARENT_REGION_FRANKFURT`; local storage is an explicit opt-in, not confirmed enabled for Istanbul) | [Local snapshots in Local Zones](https://docs.aws.amazon.com/ebs/latest/userguide/snapshots-localzones.html) (retrieved 2026-09-17): "By default, snapshots of Amazon EBS volumes in a Local Zone are stored in Amazon S3 in the parent Region. If the Local Zone supports Amazon S3, you can choose to store the snapshots locally in the Local Zone instead." "Local snapshots are currently supported in Local Zones that support Amazon S3." Istanbul's feature-matrix S3 entry is limited to "S3 One Zone-Infrequent Access" — this session found no explicit, named confirmation that Istanbul is enabled for the opt-in "Local snapshots" feature specifically | For the M1 go-live configuration (no explicit opt-in configured), snapshot data should be treated as living in Frankfurt |
| ALB logs (access log delivery to S3) | The ALB itself can run here (Istanbul supports ALB, see price list doc) | The S3 bucket that receives access logs is a regional resource | `MIXED` (compute = `LZ_ONLY`, log data = `PARENT_REGION_FRANKFURT`) | Istanbul feature matrix confirms ALB support locally; general S3-in-Local-Zones limitation (S3 general-purpose buckets are not a Local Zone resource, only the "One Zone-IA" storage class is listed) means the destination bucket for ALB access logs is a standard regional bucket | The load-balancing workload is local; the resulting log *data* is not |
| GitHub Actions runner (this repo's `backend-tests.yml`, `runs-on: ubuntu-latest`) | Not applicable — not AWS infrastructure at all | Not applicable — not AWS infrastructure at all | `UNKNOWN` | [GitHub-hosted runners docs](https://docs.github.com/actions/using-github-hosted-runners/about-github-hosted-runners): runners execute on Microsoft Azure virtual machines; GitHub does not publicly document which Azure region/datacenter serves a given run (retrieved 2026-09-17) | Outside the AWS Local-Zone/parent-region taxonomy entirely — CI currently runs on GitHub's own (Azure) infrastructure, not on any AWS resource, Local Zone or otherwise. CI deploy work itself is explicitly out of scope for M1 (see M2 boundary) |

## Separating workload / control-plane / stored data / network path

Where the table above says `MIXED`, the distinction is:

- **EBS snapshot**: workload (the EC2 instance + its live EBS volume) is
  `LZ_ONLY`; the snapshot *data at rest*, by default, is
  `PARENT_REGION_FRANKFURT`.
- **ALB logs**: the load-balancing workload (accepting/routing connections)
  is `LZ_ONLY`; the access-log *artifact data at rest* is
  `PARENT_REGION_FRANKFURT`.
- **ACM**: certificate *usage* (TLS termination) happens wherever the ALB or
  instance runs (`LZ_ONLY` in this deployment); certificate *issuance,
  private key custody, and control-plane API* are `PARENT_REGION_FRANKFURT`.

## Summary

Of the required rows: **3 are `LZ_ONLY`** (NAT instance, public IP outbound,
and the local half of ALB/ACM usage), **4 are cleanly
`PARENT_REGION_FRANKFURT`** (managed NAT Gateway, Secrets Manager, CloudWatch
Logs, ECR pull, ACM control plane), **2 are `MIXED`** (EBS snapshot, ALB
logs), and **1 is `UNKNOWN`**/not-applicable to the AWS taxonomy at all
(GitHub Actions runner — it is not AWS infrastructure).

No row in this table supports the claim that data stays in Turkey. Multiple
required services (Secrets Manager, CloudWatch Logs, ECR, ACM) have **no**
Istanbul Local Zone presence at all and are confirmed to run from Frankfurt.

**CLAIM DATA STAYS IN TURKEY: NO**
