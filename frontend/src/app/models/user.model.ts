export interface User {
  _id: string,
  email: string,
  displayname: string,
  avatar: null | File,
  token: string
}

export interface RegisterUserData {
  email: string,
  password: string,
  displayname: string,
  avatar: null | File
}

export interface FieldError {
  message: string
}

export interface RegisterError {
  errors: {
    password: FieldError,
    email: FieldError,
    displayname: FieldError
  }
}
