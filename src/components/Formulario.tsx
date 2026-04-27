import React from 'react'
import type { PersonalInfo } from '../types/tipos'
import { useValidacion } from '../hooks/useValidacion'

interface FormularioProps {
  info: PersonalInfo
  onChange: (info: PersonalInfo) => void
  onGenerate: () => void
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  border: '1px solid #d1d5db',
  borderRadius: 6,
  fontSize: 14,
  fontFamily: 'Arial, sans-serif',
  color: '#1a1a1a',
  background: '#fff',
  boxSizing: 'border-box',
  outline: 'none',
}

const inputErrorStyle: React.CSSProperties = { ...inputStyle, border: '1px solid #ef4444' }
const inputValidStyle: React.CSSProperties = { ...inputStyle, border: '1px solid #22c55e' }

const Formulario: React.FC<FormularioProps> = ({ info, onChange, onGenerate }) => {
  const { errors, isValid, touch, touchAll, getFieldState } = useValidacion(info)

  const set = (field: keyof PersonalInfo, value: string) =>
    onChange({ ...info, [field]: value })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    touchAll()
    if (isValid) onGenerate()
  }

  const field = (
    id: keyof PersonalInfo,
    label: string,
    placeholder: string,
    required = true,
    type = 'text'
  ) => {
    const state = required ? getFieldState(id as keyof typeof errors) : ''
    const style = state === 'error' ? inputErrorStyle : state === 'valid' ? inputValidStyle : inputStyle
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label htmlFor={`field-${id}`} style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>
          {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
        </label>
        <input
          id={`field-${id}`}
          type={type}
          placeholder={placeholder}
          style={style}
          value={info[id] as string}
          onChange={e => set(id, e.target.value)}
          onBlur={() => touch(id)}
        />
        {state === 'error' && errors[id as keyof typeof errors] && (
          <span style={{ fontSize: 12, color: '#ef4444' }}>{errors[id as keyof typeof errors]}</span>
        )}
        {state === 'valid' && (
          <span style={{ fontSize: 12, color: '#22c55e' }}>Correcto</span>
        )}
      </div>
    )
  }

  const sectionTitle = (title: string) => (
    <div style={{ marginBottom: 16, marginTop: 28, borderBottom: '1px solid #e5e7eb', paddingBottom: 8 }}>
      <h2 style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: 15, color: '#1a1a1a', margin: 0 }}>{title}</h2>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} noValidate style={{ maxWidth: 760, margin: '0 auto', padding: '32px 24px', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: 22, color: '#1a1a1a', margin: '0 0 4px' }}>
          Datos Personales
        </h1>
        <p style={{ color: '#6b7280', fontSize: 13, margin: 0 }}>
          Completa los campos para generar tu documento.
        </p>
      </div>

      {/* Datos personales */}
      {sectionTitle('Datos personales')}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {field('nombre', 'Nombre(s)', '')}
        {field('apellidos', 'Apellidos', '')}
        {field('fechaNacimiento', 'Fecha de nacimiento', '', true, 'date')}
        {field('email', 'Correo electrónico', '', true, 'email')}
        {field('telefono', 'Teléfono', '')}
        {field('ciudad', 'Ciudad', '')}
        {field('direccion', 'Dirección', '')}
        {field('pais', 'País', '', false)}
      </div>

      {/* GitHub y Universidad */}
      {sectionTitle('Universidad y GitHub')}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {field('github', 'GitHub', '', false)}
        {field('universidad', 'Universidad', '', false)}
      </div>

      {/* Observaciones */}
      {sectionTitle('Observaciones')}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label htmlFor="field-observaciones" style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>
          Observaciones
        </label>
        <textarea
          id="field-observaciones"
          placeholder=""
          style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }}
          value={info.observaciones}
          onChange={e => set('observaciones', e.target.value)}
        />
      </div>

      {/* Submit */}
      <div style={{ marginTop: 36, textAlign: 'center' }}>
        {!isValid && (
          <p style={{ fontSize: 13, color: '#ef4444', marginBottom: 12 }}>
            Completa los campos marcados con * para continuar.
          </p>
        )}
        <button type="submit" style={{
          fontSize: 15, padding: '11px 36px',
          background: '#1a1a1a', color: '#ffffff',
          border: 'none', borderRadius: 8, cursor: 'pointer',
          fontFamily: 'Arial, sans-serif', fontWeight: 600,
        }}>
          Generar documentos
        </button>
      </div>

    </form>
  )
}

export default Formulario
