class Auto {
  constructor(
    private model: string,
    private year: number,
    private manufacturer: string,
  ) {}
}

class AutoBuilder {
  private model!: string
  private year!: number
  private manufacturer!: string

  setModel(model: string): AutoBuilder {
    this.model = model
    return this
  }

  setYear(year: number): AutoBuilder {
    this.year = year
    return this
  }

  setManufacturer(manufacturer: string): AutoBuilder {
    this.manufacturer = manufacturer
    return this
  }
  build(): Auto {
    return new Auto(this.model, this.year, this.manufacturer)
  }
}

const auto = new AutoBuilder()
  .setManufacturer('VW')
  .setModel('Golf')
  .setYear(2012)
  .build()

console.log(auto)
