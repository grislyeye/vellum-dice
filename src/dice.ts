export interface Roll {
  result: number
  rolls: string
}

const EMPTY_STR_TO_UNDEFINED = (str: string) => (str === '' ? undefined : str)

function rollDice(sides: number) {
  return Math.floor(Math.random() * sides + 1)
}

export abstract class Die {
  abstract roll(): Roll
  abstract get max(): number

  static from(notation: string): Die {
    switch (notation) {
      case 'd66':
        return D66
      default:
        return new StandardDie(notation)
    }
  }
}

const D66 = new (class extends Die {
  override get max() {
    return 66
  }

  override roll(): Roll {
    const rolls = [rollDice(6), rollDice(6)]
    return {
      result: parseInt(`${rolls[0]}${rolls[1]}`),
      rolls: `${rolls[0]} + ${rolls[1]}`,
    }
  }
})()

class StandardDie extends Die {
  private number: number
  private sides: number
  private modifier: number

  constructor(notation: string) {
    super()

    const diceNotation: RegExp = /^(\d*)d(\d+)(\s*(\+|-)\s*(\d+))?$/g

    const [, number = '1', sides = '1', , plusMinus = '+', modifier = '0'] =
      diceNotation.exec(notation)!.map(EMPTY_STR_TO_UNDEFINED)

    this.number = parseInt(number)
    this.sides = parseInt(sides)
    this.modifier = parseInt(plusMinus + modifier)
  }

  override get max(): number {
    return this.number * this.sides + this.modifier
  }

  override roll(): Roll {
    const rolls = Array.from({ length: this.number }, () =>
      rollDice(this.sides),
    )

    const result = rolls.reduce((a, b) => a + b, 0) + this.modifier
    const rollsWithModifier =
      this.modifier !== 0 ? [...rolls, this.modifier] : rolls

    const roll: Roll = {
      result,
      rolls: rollsWithModifier.join(' + '),
    }

    return roll
  }
}
