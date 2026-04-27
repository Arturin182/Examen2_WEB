import React from 'react'
import { jsPDF } from 'jspdf'
import type { PersonalInfo } from '../../types/tipos'

interface DocumentoPDFProps {
  info: PersonalInfo
}

const DocumentoPDF: React.FC<DocumentoPDFProps> = ({ info }) => {
  const fullName = `${info.nombre} ${info.apellidos}`
  const age = info.fechaNacimiento
    ? Math.floor((Date.now() - new Date(info.fechaNacimiento).getTime()) / (365.25 * 24 * 3600 * 1000))
    : null

  const handleDownload = () => {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' })

    const marginLeft = 20
    const pageWidth = 210
    const contentWidth = pageWidth - marginLeft * 2
    let y = 20

    // ── Título / Nombre ──
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(20)
    doc.setTextColor(30, 30, 30)
    doc.text(fullName, pageWidth / 2, y, { align: 'center' })
    y += 8

    // Subtítulo fecha / edad
    if (age) {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      doc.text(`${info.fechaNacimiento}  (${age} años)`, pageWidth / 2, y, { align: 'center' })
      y += 6
    }

    // Línea separadora
    doc.setDrawColor(200, 200, 200)
    doc.line(marginLeft, y, pageWidth - marginLeft, y)
    y += 8

    // ── Helper: sección ──
    const sectionHeader = (title: string) => {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
      doc.setTextColor(30, 30, 30)
      doc.text(title.toUpperCase(), marginLeft, y)
      y += 4
      doc.setDrawColor(180, 180, 180)
      doc.line(marginLeft, y, pageWidth - marginLeft, y)
      y += 6
    }

    // ── Helper: fila label / valor ──
    const row = (label: string, value: string) => {
      if (!value) return
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.setTextColor(60, 60, 60)
      doc.text(`${label}:`, marginLeft, y)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(30, 30, 30)
      const lines = doc.splitTextToSize(value, contentWidth - 40)
      doc.text(lines, marginLeft + 42, y)
      y += lines.length * 5 + 2
    }

    // ── Datos personales ──
    sectionHeader('Datos Personales')
    row('Email', info.email)
    row('Teléfono', info.telefono)
    row('Dirección', info.direccion)
    row('Ciudad', info.ciudad + (info.pais ? `, ${info.pais}` : ''))
    y += 4

    // ── Académico / Redes ──
    if (info.universidad || info.github) {
      sectionHeader('Universidad y GitHub')
      row('Universidad', info.universidad)
      row('GitHub', info.github)
      y += 4
    }

    // ── Observaciones ──
    if (info.observaciones) {
      sectionHeader('Observaciones')
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      doc.setTextColor(30, 30, 30)
      const lines = doc.splitTextToSize(info.observaciones, contentWidth)
      doc.text(lines, marginLeft, y)
      y += lines.length * 5 + 4
    }

    // ── Pie de página ──
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(8)
    doc.setTextColor(160, 160, 160)
    doc.text(
      `Generado el ${new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}`,
      pageWidth / 2,
      285,
      { align: 'center' }
    )

    doc.save(`DatosPersonales_${info.nombre}_${info.apellidos}.pdf`)
  }

  // ── Previsualización en pantalla ──
  const LabelValue = ({ label, value }: { label: string; value: string }) => {
    if (!value) return null
    return (
      <div style={{ display: 'flex', gap: 8, fontSize: 14, marginBottom: 8 }}>
        <span style={{ fontWeight: 600, color: '#374151', minWidth: 140 }}>{label}:</span>
        <span style={{ color: '#1a1a1a' }}>{value}</span>
      </div>
    )
  }

  const SectionTitle = ({ title }: { title: string }) => (
    <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: 6, marginBottom: 14, marginTop: 24 }}>
      <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: 1 }}>{title}</h3>
    </div>
  )

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 24px', fontFamily: 'Arial, sans-serif' }}>

      {/* Toolbar */}
      <div className="no-print" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid #e5e7eb',
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#1a1a1a' }}>
            Vista previa — PDF
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6b7280' }}>
            Revisa los datos y descarga el archivo PDF.
          </p>
        </div>
        <button
          id="btn-download-pdf"
          onClick={handleDownload}
          style={{
            padding: '9px 22px', background: '#1a1a1a', color: '#fff',
            border: 'none', borderRadius: 6, cursor: 'pointer',
            fontFamily: 'Arial, sans-serif', fontSize: 14, fontWeight: 600,
          }}
        >
          Descargar PDF
        </button>
      </div>

      {/* Previsualización */}
      <div style={{
        border: '1px solid #e5e7eb', borderRadius: 8, padding: '28px 32px',
        background: '#fafafa',
      }}>
        {/* Nombre */}
        <div style={{ textAlign: 'center', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid #e5e7eb' }}>
          <h1 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 700, color: '#1a1a1a' }}>{fullName}</h1>
          {age && <p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>{info.fechaNacimiento} ({age} años)</p>}
        </div>

        {/* Datos personales */}
        <SectionTitle title="Datos Personales" />
        <LabelValue label="Email" value={info.email} />
        <LabelValue label="Teléfono" value={info.telefono} />
        <LabelValue label="Dirección" value={info.direccion} />
        <LabelValue label="Ciudad" value={info.ciudad + (info.pais ? `, ${info.pais}` : '')} />

        {/* Académico / Redes */}
        {(info.universidad || info.github) && (
          <>
            <SectionTitle title="Universidad y GitHub" />
            <LabelValue label="Universidad" value={info.universidad} />
            <LabelValue label="GitHub" value={info.github} />
          </>
        )}

        {/* Observaciones */}
        {info.observaciones && (
          <>
            <SectionTitle title="Observaciones" />
            <p style={{ fontSize: 14, color: '#1a1a1a', lineHeight: 1.6, margin: 0 }}>{info.observaciones}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default DocumentoPDF
