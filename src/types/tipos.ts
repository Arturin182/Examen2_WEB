export interface PersonalInfo {
  // Datos personales
  nombre: string
  apellidos: string
  fechaNacimiento: string
  email: string
  telefono: string
  ciudad: string
  direccion: string
  pais: string

  // Académico / Redes
  github: string
  universidad: string

  // Observaciones
  observaciones: string
}

export interface FormErrors {
  nombre?: string
  apellidos?: string
  fechaNacimiento?: string
  email?: string
  telefono?: string
  direccion?: string
  ciudad?: string
}

export const defaultPersonalInfo: PersonalInfo = {
  nombre: '',
  apellidos: '',
  fechaNacimiento: '',
  email: '',
  telefono: '',
  ciudad: '',
  direccion: '',
  pais: 'México',
  github: '',
  universidad: '',
  observaciones: '',
}
