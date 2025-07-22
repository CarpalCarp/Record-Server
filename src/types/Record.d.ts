export interface RecordDetails {
  email: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    zip: number
  }
}

export interface Record {
  id: number
  firstName: string
  lastName: string
  age: number
  description: string
  dateOfBirth: string
  details: RecordDetails
}
