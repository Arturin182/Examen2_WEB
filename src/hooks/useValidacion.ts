import { useState } from 'react'
import type { PersonalInfo, FormErrors } from '../types/tipos'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^\+?[\d\s\-().]{10,}$/

export function useValidacion(info: PersonalInfo) {
  const [touched, setTouched] = useState<Partial<Record<keyof PersonalInfo, boolean>>>({})

  const validate = (): FormErrors => {
    const errors: FormErrors = {}

    if (!info.nombre.trim()) errors.nombre = 'El nombre es requerido'
    if (!info.apellidos.trim()) errors.apellidos = 'Los apellidos son requeridos'
    if (!info.fechaNacimiento) errors.fechaNacimiento = 'La fecha de nacimiento es requerida'

    if (!info.email.trim()) {
      errors.email = 'El email es requerido'
    } else if (!emailRegex.test(info.email)) {
      errors.email = 'Ingresa un email válido (ej: nombre@correo.com)'
    }

    if (!info.telefono.trim()) {
      errors.telefono = 'El teléfono es requerido'
    } else if (!phoneRegex.test(info.telefono)) {
      errors.telefono = 'El teléfono debe tener al menos 10 dígitos'
    }

    if (!info.direccion.trim()) errors.direccion = 'La dirección es requerida'
    if (!info.ciudad.trim()) errors.ciudad = 'La ciudad es requerida'

    return errors
  }

  const touch = (field: keyof PersonalInfo) => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  const touchAll = () => {
    const all: Partial<Record<keyof PersonalInfo, boolean>> = {}
    ;(['nombre', 'apellidos', 'fechaNacimiento', 'email', 'telefono', 'direccion', 'ciudad'] as (keyof PersonalInfo)[])
      .forEach(k => { all[k] = true })
    setTouched(all)
  }

  const errors = validate()
  const isValid = Object.keys(errors).length === 0

  const getFieldState = (field: keyof FormErrors) => {
    if (!touched[field]) return ''
    return errors[field] ? 'error' : 'valid'
  }

  return { errors, isValid, touch, touchAll, touched, getFieldState }
}
