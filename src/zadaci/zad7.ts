interface Oblik {
  povrsina(): number
  opseg(): number
}

class Krug implements Oblik {
  constructor(public radijus: number) {}

  povrsina(): number {
    return Math.PI * this.radijus * this.radijus
  }

  opseg(): number {
    return 2 * Math.PI * this.radijus
  }
}

const krug = new Krug(1)
console.log(krug.opseg())
console.log(krug.povrsina())

class Pravokutnik implements Oblik {
  constructor(
    public sirina: number,
    public visina: number,
  ) {}

  povrsina(): number {
    return this.sirina * this.visina
  }

  opseg(): number {
    return 2 * (this.sirina + this.visina)
  }
}

const pravokutnik = new Pravokutnik(3, 4)
console.log(pravokutnik.opseg())
console.log(pravokutnik.povrsina())
