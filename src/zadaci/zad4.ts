abstract class KucniLjubimac {
  public ime: string | undefined
  // public ime!: string
  abstract glasajSe(): string
}

class Pas extends KucniLjubimac {
  private zvuk: string

  constructor() {
    super()
    this.ime = 'Pas'
    this.zvuk = 'VauVau'
  }
  glasajSe(): string {
    return this.zvuk
  }
}

class Macka extends KucniLjubimac {
  private zvuk: string

  constructor() {
    super()
    this.ime = 'Macka'
    this.zvuk = 'Mijau'
  }
  glasajSe(): string {
    return this.zvuk
  }

  static DohvatiIme() {
    return 'Mackaaa'
  }
}

const pas = new Pas()
const macka = new Macka()
console.log(pas instanceof Pas)
console.log(pas.glasajSe())
console.log(macka instanceof Macka)
console.log(macka.glasajSe())
console.log(Macka.DohvatiIme())
