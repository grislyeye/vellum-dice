import { LitElement, css, html } from 'lit'
import { asyncReplace } from 'lit-html/directives/async-replace.js'
import { customElement } from 'lit/decorators.js'
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
      font-weight: bold;

      border-bottom: 1px solid black;
    }

    .result {
      display: inline-block;
      min-width: 2ch;
    }
  `

  get die(): Die | undefined {
    return this.textContent ? Die.from(this.textContent.trim()) : undefined
  }

  private reroll() {
    this.requestUpdate()
  }

  render() {
    return html`
      <span class="roll" @click="${this.reroll}">
        <span class="result">${this.die ? asyncReplace(rollAnimation(this.die, 4)) : ''}</span> (<slot></slot>&#9860;)
      </span>
    `
  }
}
