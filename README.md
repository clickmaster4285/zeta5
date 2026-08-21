# Remix of Remix of Remix of Remix of Remix of Cinematic Scroll

ek achi si designing si navbar bannay ha or same yahi option or hero section ma ek telecommunication ka related ek achi si cinnematic si video dalo achi si ho us ka neecha about us ka section or about us ka section jisa he hero section sa ma aga jao tu ma aisa scroll kro tu aisa neecha sa naimate ho ka about us ka section uper ki tragf ay aisa animate ho ka must

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://zeta-techs.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ea321f53-abe4-4f22-ae15-e1168c9cd769).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Depth & motion pass (Clickmasters)

Everything below is progressive enhancement — skipped entirely under
`prefers-reduced-motion`, pointer effects only attach on mouse/trackpad devices,
and no dependency was added. Lovable project structure, Supabase contact form
and the hero → About cinematic scroll are untouched.

| Where | What changed | Files |
|---|---|---|
| Navbar | Mega menus are now state-driven with hover-intent (160 ms grace), keyboard/focus support, `Escape` to close, `aria-expanded`/`aria-controls`; the current section is underlined as you scroll; "Talk To Zeta" targets the contact form; Blogs & Events / Careers point at real sections; a mobile menu (hamburger) was added. | `components/Navbar.tsx` |
| Hero | A 3D node network (canvas 2D, pinhole projection) sits on the video and flies forward with scroll; the copy drifts toward the pointer; two magnetic CTAs and an animated scroll cue. | `components/Hero.tsx`, `components/fx/NetworkCanvas.tsx`, `components/fx/Magnetic.tsx` |
| Sovereign Stack | Three real CSS-3D planes on their own `translateZ` above the isometric render, plus two satellite tiles for the intelligence branches. The layer list (hover/click/focus), the "Explore the stack" button and an ambient cycle drive the lit plane; the scene tilts toward the pointer. | `components/Stack.tsx`, `.stack-*` in `styles.css` |
| Cards (About, Services, Products, Proof, Insights, Infographics) | Pointer tilt with a cursor-following spotlight + 1px border glow; icons/titles float on depth planes; scroll entrances now rise out of the floor (`rotateX`) or swing in (`rotateY`) inside a perspective container. | `components/fx/Tilt.tsx`, `.fx-*` / `.depth-*` in `styles.css` |
| Services & Products | A receding 3D floor grid that travels with the section's scroll progress. | `components/fx/PerspectiveGrid.tsx` |
| Cable Landing Station | The map is a tilt card with specular glare; telemetry chips float above it on separate depth planes. | `components/CableStation.tsx` |
| Global | Smooth anchor scrolling with header offset (`scroll-padding-top`). | `styles.css` |

Tuning knobs: `drift` / `scrollGain` / `density` props on `<NetworkCanvas>`, `max` / `shift` /
`scale` on `<Tilt>`, `strength` on `<Magnetic>`, `--lift` and the `rotateX/rotateZ` values in
`.stack-planes`.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
