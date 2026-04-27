import React from 'react'
import type { PersonalInfo } from '../../types/tipos'
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, BorderStyle,
} from 'docx'
import { saveAs } from 'file-saver'

interface DocumentoWordProps {
  info: PersonalInfo
}

const hr = () =>
  new Paragraph({
    border: { bottom: { color: '333333', size: 4, style: BorderStyle.SINGLE } },
    spacing: { after: 120 },
  })

const sectionTitle = (text: string) =>
  new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 80 },
  })

const labelValue = (label: string, value: string) =>
  new Paragraph({
    children: [
      new TextRun({ text: `${label}: `, bold: true, size: 22 }),
      new TextRun({ text: value, size: 22 }),
    ],
    spacing: { after: 80 },
  })

const DocumentoWord: React.FC<DocumentoWordProps> = ({ info }) => {

  const generateDoc = async () => {
    const fullName = `${info.nombre} ${info.apellidos}`
    const age = info.fechaNacimiento
      ? Math.floor((Date.now() - new Date(info.fechaNacimiento).getTime()) / (365.25 * 24 * 3600 * 1000))
      : null

    const children: Paragraph[] = []

    // Nombre
    children.push(
      new Paragraph({
        children: [new TextRun({ text: fullName, bold: true, size: 44, font: 'Calibri' })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 },
      }),
    )

    if (age) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: `${info.fechaNacimiento}  (${age} años)`, size: 20, color: '555555' })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 160 },
        }),
      )
    }

    children.push(hr())

    // Datos personales
    children.push(sectionTitle('Datos Personales'))
    if (info.email) children.push(labelValue('Email', info.email))
    if (info.telefono) children.push(labelValue('Teléfono', info.telefono))
    if (info.direccion) children.push(labelValue('Dirección', info.direccion))
    if (info.ciudad) children.push(labelValue('Ciudad', `${info.ciudad}${info.pais ? `, ${info.pais}` : ''}`))
    children.push(hr())

    // Académico / Redes
    if (info.universidad || info.github) {
      children.push(sectionTitle('Universidad y GitHub'))
      if (info.universidad) children.push(labelValue('Universidad', info.universidad))
      if (info.github) children.push(labelValue('GitHub', info.github))
      children.push(hr())
    }

    // Observaciones
    if (info.observaciones) {
      children.push(sectionTitle('Observaciones'))
      children.push(
        new Paragraph({
          children: [new TextRun({ text: info.observaciones, size: 22 })],
          spacing: { after: 160 },
        }),
      )
    }

    // Pie
    children.push(
      new Paragraph({ text: '', spacing: { before: 400 } }),
      new Paragraph({
        children: [
          new TextRun({
            text: `Generado el ${new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}`,
            size: 16, color: '999999', italics: true,
          }),
        ],
        alignment: AlignmentType.CENTER,
      }),
    )

    const doc = new Document({
      creator: 'Datos Personales',
      title: `Datos Personales - ${fullName}`,
      styles: {
        default: { document: { run: { font: 'Calibri', size: 22 } } },
      },
      sections: [{
        properties: {
          page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } },
        },
        children,
      }],
    })

    const blob = await Packer.toBlob(doc)
    saveAs(blob, `DatosPersonales_${info.nombre}_${info.apellidos}.docx`)
  }

  const fullName = `${info.nombre} ${info.apellidos}`
  const age = info.fechaNacimiento
    ? Math.floor((Date.now() - new Date(info.fechaNacimiento).getTime()) / (365.25 * 24 * 3600 * 1000))
    : null

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
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid #e5e7eb',
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#1a1a1a' }}>
            Vista previa — Word (.docx)
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6b7280' }}>
            Revisa los datos y descarga el archivo Word.
          </p>
        </div>
        <button
          id="btn-download-docx"
          onClick={generateDoc}
          style={{
            padding: '9px 22px', background: '#1a1a1a', color: '#fff',
            border: 'none', borderRadius: 6, cursor: 'pointer',
            fontFamily: 'Arial, sans-serif', fontSize: 14, fontWeight: 600,
          }}
        >
          Descargar .docx
        </button>
      </div>

      {/* Previsualización */}
      <div style={{
        border: '1px solid #e5e7eb', borderRadius: 8, padding: '28px 32px',
        background: '#fafafa',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid #e5e7eb' }}>
          <h1 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 700, color: '#1a1a1a' }}>{fullName}</h1>
          {age && <p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>{info.fechaNacimiento} ({age} años)</p>}
        </div>

        <SectionTitle title="Datos Personales" />
        <LabelValue label="Email" value={info.email} />
        <LabelValue label="Teléfono" value={info.telefono} />
        <LabelValue label="Dirección" value={info.direccion} />
        <LabelValue label="Ciudad" value={info.ciudad + (info.pais ? `, ${info.pais}` : '')} />

        {(info.universidad || info.github) && (
          <>
            <SectionTitle title="Universidad y GitHub" />
            <LabelValue label="Universidad" value={info.universidad} />
            <LabelValue label="GitHub" value={info.github} />
          </>
        )}

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

export default DocumentoWord
