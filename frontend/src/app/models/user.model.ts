export interface User {
  _id: string,
  email: string,
  name: string,
  avatar: null | File,
  token: string
  role: string
}

export interface RegisterUserData {
  email: string,
  password: string,
  name: string,
  avatar: null | File
}

export interface FieldError {
  message: string
}

export interface RegisterError {
  errors: {
    password: FieldError,
    email: FieldError,
    name: FieldError
  }
}

export interface LoginUserData {
  email: string,
  password: string,
}

export interface LoginError {
  error: string,
}
