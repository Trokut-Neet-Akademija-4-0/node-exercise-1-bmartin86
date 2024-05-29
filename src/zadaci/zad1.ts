class Osoba {
  constructor(
    private ime: string,
    private dob: number,
  ) {}

  public setIme(ime: string): void {
    this.ime = ime
  }

  public getIme(): string {
    return this.ime
  }

  public setDob(dob: number): void {
    this.dob = dob
  }

  public getDob(): number {
    return this.dob
  }

  public get imeIDob() {
    return `${this.ime} ${this.dob}`
  }

  public predstaviSe() {
    return `Moje ime je ${this.ime} i imam ${this.dob} jahre alt!`
  }
}

const osoba = new Osoba('toto', 77)
console.log(osoba.imeIDob)
console.log(osoba.predstaviSe())
export default Osoba
