class Automobile {
  static instanceNumber: number

  constructor (
    private marka: string,
    private godiste: number,
  ) {
    Automobile.instanceNumber = Automobile.instanceNumber ?? 0
    Automobile.instanceNumber += 1
  }

  static GetCreatedInstances() {
    return Automobile.instanceNumber
  }
}

console.log(Automobile.GetCreatedInstances())
console.log(new Automobile('BMW' , 2023))
console.log(Automobile.GetCreatedInstances())
console.log(new Automobile('VW' , 2023))
console.log(Automobile.GetCreatedInstances())
console.log(new Automobile('Mercedes' , 2023))
console.log(Automobile.GetCreatedInstances())