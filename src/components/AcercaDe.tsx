import React from 'react'

const FEATURES = [
  {
    icon: '📋',
    title: 'Formulario inteligente',
    desc: 'Captura todos tus datos personales, académicos y de redes con validaciones en tiempo real.',
  },
  {
    icon: '📄',
    title: 'Documento PDF',
    desc: 'Genera un documento profesional listo para descargar directamente desde el navegador.',
  },
  {
    icon: '📝',
    title: 'Documento Word',
    desc: 'Descarga tu información en formato .docx para editar en Microsoft Word o Google Docs.',
  },
  {
    icon: '✅',
    title: 'Validaciones robustas',
    desc: 'Email, teléfono, campos requeridos y límites de caracteres con feedback visual inmediato.',
  },
]

const AcercaDe: React.FC = () => {
  return (
    <div style={{
      maxWidth: 780,
      margin: '0 auto',
      padding: '48px 24px',
      fontFamily: 'Arial, sans-serif',
      color: '#1a1a1a',
    }}>

      {/* Hero */}
      <div style={{
        textAlign: 'center',
        marginBottom: 56,
        padding: '48px 32px',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        borderRadius: 16,
        border: '1px solid #e2e8f0',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 64,
          height: 64,
          background: '#1a1a1a',
          borderRadius: 16,
          marginBottom: 20,
          fontSize: 28,
        }}>
          👤
        </div>
        <h1 style={{
          fontSize: 32,
          fontWeight: 800,
          margin: '0 0 12px',
          color: '#0f172a',
          letterSpacing: '-0.5px',
        }}>
          Datos Personales
        </h1>
        <p style={{
          color: '#64748b',
          fontSize: 16,
          lineHeight: 1.7,
          margin: 0,
          maxWidth: 480,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          Captura tu información personal y genera documentos profesionales en PDF y Word con un solo clic.
        </p>
      </div>

      {/* Características */}
      <h2 style={{
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: '#94a3b8',
        marginBottom: 20,
      }}>
        Características
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 16,
        marginBottom: 52,
      }}>
        {FEATURES.map(f => (
          <div key={f.title} style={{
            padding: '20px 22px',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 12,
            display: 'flex',
            gap: 16,
            alignItems: 'flex-start',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            transition: 'box-shadow 0.2s',
          }}>
            <span style={{
              fontSize: 22,
              lineHeight: 1,
              flexShrink: 0,
              marginTop: 2,
            }}>
              {f.icon}
            </span>
            <div>
              <h3 style={{
                fontSize: 14,
                fontWeight: 700,
                margin: '0 0 6px',
                color: '#0f172a',
              }}>
                {f.title}
              </h3>
              <p style={{
                fontSize: 13,
                color: '#64748b',
                lineHeight: 1.6,
                margin: 0,
              }}>
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        paddingTop: 24,
        borderTop: '1px solid #e2e8f0',
        fontSize: 13,
        color: '#94a3b8',
      }}>
        Datos Personales · {new Date().getFullYear()}
      </div>
    </div>
  )
}

export default AcercaDe
