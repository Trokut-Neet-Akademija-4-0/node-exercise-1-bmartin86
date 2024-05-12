class BankovniRacun {
  private stanje: number

  constructor(pocetnoStanje: number) {
    this.stanje = pocetnoStanje
  }

  public uplata(iznos: number) {
    this.stanje += iznos
  }

  public isplata(iznos: number) {
    if (iznos <= this.stanje) {
      this.stanje -= iznos
      return true
    } else {
      return false
    }
  }

  public dohvatiStanje() {
    return this.stanje
  }
}

const racun = new BankovniRacun(0)

console.log(racun.dohvatiStanje())
console.log(racun.uplata(500))
console.log(racun.dohvatiStanje())
console.log(racun.isplata(200))
console.log(racun.dohvatiStanje())
