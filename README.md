# BeyondStack

BeyondStack is an engineering studio for cloud infrastructure, DevOps, observability and full-stack development. One senior team builds the product, ships it through automated pipelines and wires in observability from day one.

This repository is the organization's `.github` repository. It holds two things:

1. **The GitHub organization profile** (`profile/README.md`), shown on [github.com/Bey0ndStack](https://github.com/Bey0ndStack).
2. **The BeyondStack website**, a static HTML, CSS and JavaScript site deployed from the repository root.

## Repository structure

```text
.
├── index.html                  Website: main page
├── 404.html                    Website: not-found page
├── site.webmanifest            App name, icons and theme colour
├── vercel.json                 Vercel static output configuration
├── css/
│   └── styles.css              Black theme, layout, responsive rules and motion
├── js/
│   └── main.js                 Neural background, hero orbit, Stack Brain map,
│                               observability flow, contact form, GitHub project cards
├── assets/
│   ├── BRAND-GUIDELINES.md     Logo, colour, type and usage rules
│   ├── brand-tokens.css        Brand colours and fonts as CSS custom properties
│   ├── fonts/                  Instrument Sans and JetBrains Mono (SIL OFL 1.1)
│   ├── icons/                  Favicons, app icons, avatar, symbol variants
│   │   └── services/           Six service line icons
│   ├── logos/                  Primary, stacked, wordmark and mono logos
│   ├── social/                 Open Graph image, social banner, brand cover
│   ├── exports/                Transparent PNG logo exports
│   └── technologies/           Technology logos used on the website (see its README)
└── profile/
    ├── README.md               GitHub organization profile
    └── assets/                 Logos, icons and service icons used by the profile
```

## Website

### Sections

| Section | Purpose |
| --- | --- |
| Hero | Value proposition, primary call to action and the orbit graphic (observability, DevOps and cloud rings) |
| Tech strip | Two scrolling rows of the tools we use |
| Problems | Client pain points and the outcome after working with us |
| Services | Six disciplines with deliverables and tool logos |
| Stack Brain | Interactive network of about 36 tools in four lobes with cross-links. Hover or tap a node for details |
| Observability | How signals flow from apps to OpenTelemetry, storage, Grafana and on-call |
| Process, Engagements, Why us | How we work, packages and differentiators |
| Projects | Public repositories loaded live from the GitHub API |
| FAQ and Contact | Common questions and an enquiry form that opens the visitor's email app |

### Run locally

There is no build step. Serve the folder with any static server, for example:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

### Deploy on Vercel

1. Import this repository into Vercel.
2. Set **Root Directory** to `./` and **Framework Preset** to **Other**.
3. Leave the **Build Command** empty and deploy. `vercel.json` configures the repository root as the static output directory.

Keep `assets/`, `css/` and `js/` at the project root so the relative paths in `index.html` continue to resolve.

### Editing content

- **Stack Brain:** edit the lists inside `#stack` in `index.html`. Each `<li>` takes a `data-icon` (a file name in `assets/technologies/`), a `data-info` description and an optional `data-links` list of the ids it connects to.
- **Technology logos:** add an SVG to `assets/technologies/`. Use a fill colour that is readable on black.
- **Contact address:** change the `mailto:` links and the form's `data-mailto` in `index.html`.

### Before launch

- Set a custom domain in Vercel, then update the canonical and social metadata in `index.html` and add a website badge to `profile/README.md`.
- The Projects section depends on the organization having public repositories and on the visitor's GitHub API rate limit.
- The contact form has no backend. Swap in a form service (Formspree, Basin, a Vercel function) if you want submissions without a mail client.
- Keep the commitments in the copy (free discovery call, written proposal, ownership of code) true for how you actually work.

## GitHub organization profile

`profile/README.md` is rendered on the Bey0ndStack organization page. Its images load from the public `master` branch of this repository, so changes appear after they are pushed. Technology icons come from [skillicons.dev](https://skillicons.dev) and [shields.io](https://shields.io), and the observability diagram is a Mermaid chart rendered by GitHub.

## Licences and trademarks

- Fonts: Instrument Sans and JetBrains Mono, SIL Open Font License 1.1.
- Technology logos: [Simple Icons](https://github.com/simple-icons/simple-icons) (CC0 1.0) and, for Azure, [Devicon](https://github.com/devicons/devicon) (MIT). Product names and marks are trademarks of their respective owners.
