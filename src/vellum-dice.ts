import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { asyncReplace } from 'lit-html/directives/async-replace.js'
import { Die } from './dice'

async function* rollAnimation(die: Die, count: number) {
  while (count > 0) {
    yield die.roll().result
    count--
    await new Promise((r) => setTimeout(r, 50))
  }
}

@customElement('vellum-dice')
export class VellumDice extends LitElement {
  static styles = css`
    :host {
      display: inline;
      cursor: pointer;
      text-decoration: underline;
      font-weight: bold;
    }
  `

  @property({ type: Boolean })
  animation: boolean = false

  @property({ type: Number })
  min: number | undefined

  get die(): Die | undefined {
    return this.textContent ? Die.from(this.textContent.trim()) : undefined
  }

  private reroll() {
    this.requestUpdate()
  }

  private roll() {
    if (this.die) {
      return this.animation
        ? asyncReplace(rollAnimation(this.die, 6))
        : this.die.roll().result
    }
    return
  }

  render() {
    const roll = this.roll()

    return html`
      <span @click="${this.reroll}" class="${this.min && roll >= this.min ? 'success' : 'faulure'}">
        ${roll} (<slot></slot>&#9860;)
      </span>
    `
  }
}
