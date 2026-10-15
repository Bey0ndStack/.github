<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Bey0ndStack/.github/master/profile/assets/logos/beyondstack-logo-primary-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/Bey0ndStack/.github/master/profile/assets/logos/beyondstack-logo-primary-light.svg">
  <img alt="BeyondStack" src="https://raw.githubusercontent.com/Bey0ndStack/.github/master/profile/assets/logos/beyondstack-logo-primary-light.svg" width="440">
</picture>

<br><br>

### Build. Deploy. Observe. Scale.

**Cloud infrastructure, DevOps, observability and full-stack engineering from one senior team.**<br>
We build your product, ship it to the cloud through automated pipelines and wire in observability from day one,<br>
so you release with confidence, grow without firefighting and always know what production is doing.

<!-- Add a website badge here once the site is live, for example:
<a href="https://YOUR-DOMAIN"><img alt="Website" src="https://img.shields.io/badge/Website-YOUR--DOMAIN-33D6C5?style=for-the-badge&labelColor=0B1020"></a>
-->
<a href="mailto:ya1770620@gmail.com"><img alt="Email" src="https://img.shields.io/badge/Email-Book_a_free_call-33D6C5?style=for-the-badge&labelColor=0B1020"></a>
<a href="https://github.com/Bey0ndStack"><img alt="GitHub" src="https://img.shields.io/badge/GitHub-Bey0ndStack-6C8CFF?style=for-the-badge&logo=github&logoColor=white&labelColor=0B1020"></a>

</div>

---

## About BeyondStack

BeyondStack is an engineering studio for teams who need their software to be **built well, shipped safely and understood in production**.

Most projects fail in the gaps between vendors: one team writes the code, another sets up the servers, and nobody owns the dashboards. We close those gaps. The same engineers who write your application also automate its delivery, run it on the cloud and instrument it, so every layer works together and every signal leads somewhere.

**We are a good fit if:**

- 🚀 you are launching a product and want a solid foundation without over-engineering;
- 🔁 your releases are manual, slow or stressful;
- 🔥 you hear about outages from your customers before your monitoring tells you;
- 💸 your cloud bill keeps growing and nobody is sure why;
- 🧠 only one person really knows how production works.

## What we do

<table align="center">
  <tr>
    <td align="center" width="260"><img src="https://raw.githubusercontent.com/Bey0ndStack/.github/master/profile/assets/services/service-cloud-infrastructure.svg" width="64" alt=""><br><b>Cloud infrastructure</b><br><sub>Secure, reproducible platforms on AWS, Google Cloud or Azure, defined in Terraform and sized for the budget.</sub></td>
    <td align="center" width="260"><img src="https://raw.githubusercontent.com/Bey0ndStack/.github/master/profile/assets/services/service-observability.svg" width="64" alt=""><br><b>Observability</b><br><sub>Metrics, logs and traces with OpenTelemetry, Grafana dashboards, SLOs and alerts that point to the cause.</sub></td>
    <td align="center" width="260"><img src="https://raw.githubusercontent.com/Bey0ndStack/.github/master/profile/assets/services/service-devops-cicd.svg" width="64" alt=""><br><b>DevOps and CI/CD</b><br><sub>Pipelines with tests and security gates, GitOps delivery, canary releases and one-click rollback.</sub></td>
  </tr>
  <tr>
    <td align="center" width="260"><img src="https://raw.githubusercontent.com/Bey0ndStack/.github/master/profile/assets/services/service-fullstack.svg" width="64" alt=""><br><b>Full-stack development</b><br><sub>Fast, accessible websites, portals and SaaS products with React and Next.js.</sub></td>
    <td align="center" width="260"><img src="https://raw.githubusercontent.com/Bey0ndStack/.github/master/profile/assets/services/service-backend-api.svg" width="64" alt=""><br><b>Backend and APIs</b><br><sub>REST and event-driven services, integrations, queues and well-modelled data.</sub></td>
    <td align="center" width="260"><img src="https://raw.githubusercontent.com/Bey0ndStack/.github/master/profile/assets/services/service-performance.svg" width="64" alt=""><br><b>Performance and reliability</b><br><sub>Load testing, autoscaling, high availability and incident reviews that harden the platform.</sub></td>
  </tr>
</table>

## Observability first

If you can't see it, you can't fix it. Every system we ship comes with a complete signal pipeline, not as an upsell:

```mermaid
flowchart LR
    subgraph Sources
        A[Your apps<br/>APIs · web · workers]
        K[Kubernetes<br/>pods · nodes · events]
        C[Cloud services<br/>databases · queues · LBs]
    end
    O((OpenTelemetry<br/>Collector))
    subgraph Storage
        P[Prometheus<br/>metrics]
        J[Jaeger<br/>traces]
        E[Elastic<br/>logs]
    end
    G[Grafana<br/>dashboards · SLOs]
    N[On-call<br/>actionable alerts]
    A --> O
    K --> O
    C --> O
    O --> P
    O --> J
    O --> E
    P --> G
    J --> G
    E --> G
    P --> N
    G --> N
```

| Signal | What you get |
| --- | --- |
| **Metrics** | Latency, traffic, errors and saturation for every service |
| **Logs** | Structured, centralised and searchable in seconds |
| **Traces** | One request followed across every hop and database call |
| **Alerts and SLOs** | Pages based on user impact, each with a runbook |

## Technology stack

We choose tools for your team, budget and compliance needs, not for our résumés. These are the ones we use most in production.

<div align="center">

<b>☁️ Cloud and infrastructure</b><br>
<img src="https://skillicons.dev/icons?i=aws,gcp,azure,cloudflare,linux,nginx&perline=6" alt="AWS, Google Cloud, Azure, Cloudflare, Linux, Nginx">

<b>📦 Containers, orchestration and infrastructure as code</b><br>
<img src="https://skillicons.dev/icons?i=docker,kubernetes,terraform,ansible&perline=4" alt="Docker, Kubernetes, Terraform, Ansible"><br>
<img alt="Helm" src="https://img.shields.io/badge/Helm-0B1020?style=for-the-badge&logo=helm&logoColor=white">
<img alt="Istio" src="https://img.shields.io/badge/Istio-0B1020?style=for-the-badge&logo=istio&logoColor=6B89C0">

<b>🔁 CI/CD, GitOps and security</b><br>
<img src="https://skillicons.dev/icons?i=githubactions,gitlab,jenkins,git&perline=4" alt="GitHub Actions, GitLab CI, Jenkins, Git"><br>
<img alt="Argo CD" src="https://img.shields.io/badge/Argo_CD-0B1020?style=for-the-badge&logo=argo&logoColor=EF7B4D">
<img alt="HashiCorp Vault" src="https://img.shields.io/badge/Vault-0B1020?style=for-the-badge&logo=vault&logoColor=FFEC6E">

<b>🔭 Observability</b><br>
<img src="https://skillicons.dev/icons?i=prometheus,grafana,elasticsearch,sentry&perline=4" alt="Prometheus, Grafana, Elasticsearch, Sentry"><br>
<img alt="OpenTelemetry" src="https://img.shields.io/badge/OpenTelemetry-0B1020?style=for-the-badge&logo=opentelemetry&logoColor=F5A800">
<img alt="Jaeger" src="https://img.shields.io/badge/Jaeger-0B1020?style=for-the-badge&logo=jaeger&logoColor=66CFE3">
<img alt="Datadog" src="https://img.shields.io/badge/Datadog-0B1020?style=for-the-badge&logo=datadog&logoColor=A57BE5">
<img alt="PagerDuty" src="https://img.shields.io/badge/PagerDuty-0B1020?style=for-the-badge&logo=pagerduty&logoColor=06AC38">

<b>🖥️ Frontend</b><br>
<img src="https://skillicons.dev/icons?i=react,nextjs,ts,vercel&perline=4" alt="React, Next.js, TypeScript, Vercel">

<b>⚙️ Backend</b><br>
<img src="https://skillicons.dev/icons?i=nodejs,python,go,fastapi,bash&perline=5" alt="Node.js, Python, Go, FastAPI, Bash">

<b>🗄️ Data and messaging</b><br>
<img src="https://skillicons.dev/icons?i=postgres,redis,mongodb,kafka,rabbitmq&perline=5" alt="PostgreSQL, Redis, MongoDB, Kafka, RabbitMQ">

</div>

## How we work

| Step | What happens | What you get |
| :---: | --- | --- |
| **01 · Discovery** | A free call about your product, goals and what is getting in the way | Honest first advice |
| **02 · Audit and plan** | We review your code, cloud and delivery, then decide what to fix first | Scope, timeline and cost in writing |
| **03 · Build and automate** | Short iterations with working results you can test along the way | Progress updates and demos |
| **04 · Launch and observe** | Safe rollout with dashboards and alerts live from the first day | A system you can see into |
| **05 · Scale and support** | Tune and harden with evidence from production, or hand over | Docs, runbooks and full ownership |

## Ways to work with us

| Engagement | Best for |
| --- | --- |
| **Launch:** build your product from idea to production, with CI/CD and monitoring included | Startups and new products |
| **Platform:** cloud and DevOps setup with infrastructure as code, containers, pipelines and environments | Teams with manual or risky deploys |
| **Observe:** an observability sprint covering instrumentation, dashboards, SLOs and alerting ⭐ | Teams who hear about issues from users |
| **Care:** ongoing reliability with monitoring, patches, cost reviews and steady improvements | Production apps that must stay up |

## What we stand for

- **Everything as code, all yours.** Infrastructure, pipelines and dashboards live in your repositories and accounts. No lock-in.
- **Observability by default.** Logs, metrics, traces and alerts ship with every system.
- **Security from the start.** Least-privilege access, managed secrets and scanning in every pipeline.
- **Clarity.** Systems, code and documentation a new engineer can understand in an afternoon.
- **Documented handover.** Architecture notes and runbooks so your team can run it without us.

## Open source

Public work lives in this organization. New repositories appear in the list below as they are published. ⭐ Star or watch the ones you find useful.

## Get in touch

Have a system to build, or one that keeps you up at night? Tell us what you are working on. **The first call is free.**

<div align="center">

<a href="mailto:ya1770620@gmail.com"><img alt="Email" src="https://img.shields.io/badge/ya1770620@gmail.com-33D6C5?style=for-the-badge&logo=gmail&logoColor=0B1020"></a>

<br><br>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Bey0ndStack/.github/master/profile/assets/icons/beyondstack-symbol-dark.svg">
  <img alt="BeyondStack symbol" src="https://raw.githubusercontent.com/Bey0ndStack/.github/master/profile/assets/icons/beyondstack-symbol-light.svg" width="64">
</picture>

<sub>The signal leaves the stack.</sub>

</div>
