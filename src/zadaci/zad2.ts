import Osoba from './zad1'

class Student extends Osoba {
  constructor(
    ime: string,
    dob: number,
    private brojIndexa: number,
  ) {
    super(ime, dob)
  }
}

console.log(new Student('blabla', 55, 123))

export default Student
