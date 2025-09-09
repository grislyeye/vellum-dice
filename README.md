# `<vellum-dice>` [![Lint](https://github.com/grislyeye/vellum-dice/actions/workflows/lint.yml/badge.svg)](https://github.com/grislyeye/vellum-dice/actions/workflows/lint.yml)

Web component and interactive dice roller. Inspired by [javalent/dice-roller](https://github.com/javalent/dice-roller).

**[Demo](https://grislyeye.github.io/vellum-dice/)**

| Attribute   | Description                               | Default |
| ----------- | ----------------------------------------- | ------- |
| `animation` | Juice the roll with a flash of pre-rolls. | `false` |
| `hidedice`  | Only display roll results.                | `false` |

### Examples

Add the following wherever you need a roll: `<vellum-dice>2d6+3</vellum-dice>`.

Add the `animation` attribute to animate the component: `<vellum-dice animation>2d6+3</vellum-dice>`.

## Installation

You have a few options (choose one of these):

1. Use the script directly via a 3rd party CDN.
2. Install via [npm](https://www.npmjs.com/package/@daviddarnes/mastodon-post): `npm install vellum-dice`.
3. [Download the source manually from GitHub](https://github.com/grislyeye/vellum-dice/tags) into your project.

### Usage

Include the `<script>` in your markup:

```html
<script
  type="module"
  src="https://www.unpkg.com/vellum-dice@0.1.0/vellum-dice.js"
></script>
<p>You have <vellum-dice> 3d6+3 </vellum-dice> Strength.</p>
```

If you host the script as part of your project:

```html
<script type="module" src="vellum-dice.js"></script>
```
