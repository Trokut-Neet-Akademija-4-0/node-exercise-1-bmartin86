

class Student  {
  constructor (
    public ime: string,
    public dob: number,
  ) {}

  kloniraj(): Student {
    return new Student(
      this.ime,
      this.dob
    )
  }
}

let student1 = new Student("Marko", 20)
let student2 = student1.kloniraj()

console.log(student2)