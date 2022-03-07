export interface User {
  _id: string,
  email: string,
  displayName: string,
  avatar: string,
  token: string
}

export interface RegisterUserData {
  email: string,
  password: string,
  displayName: string,
  avatar: string
}

export interface FieldError {
  message: string
}

export interface RegisterError {
  errors: {
    password: FieldError,
    email: FieldError
  }
}
