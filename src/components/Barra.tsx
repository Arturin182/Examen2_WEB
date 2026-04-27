import React from 'react'

interface BarraProps {
  activeTab: string
  onTabChange: (tab: string) => void
  formCompleted: boolean
}

const tabs = [
  { id: 'form', label: 'Formulario' },
  { id: 'pdf', label: 'Documento PDF' },
  { id: 'doc', label: 'Documento Word' },
  { id: 'about', label: 'Acerca de' },
]

const Barra: React.FC<BarraProps> = ({ activeTab, onTabChange, formCompleted }) => {
  return (
    <nav className="no-print" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: '#ffffff',
      borderBottom: '1px solid #d1d5db',
      padding: '0 24px',
    }}>
      <div style={{
        maxWidth: 1000,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 56,
      }}>
        {/* Logo */}
        <span style={{
          fontFamily: 'Arial, sans-serif',
          fontWeight: 700,
          fontSize: 18,
          color: '#1a1a1a',
        }}>Datos Personales</span>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4 }}>
          {tabs.map(tab => {
            const isDocTab = tab.id === 'pdf' || tab.id === 'doc'
            const disabled = isDocTab && !formCompleted
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                id={`nav-${tab.id}`}
                onClick={() => !disabled && onTabChange(tab.id)}
                disabled={disabled}
                title={disabled ? 'Completa el formulario primero' : ''}
                style={{
                  padding: '8px 16px',
                  borderRadius: 6,
                  border: 'none',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  fontFamily: 'Arial, sans-serif',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: 14,
                  background: isActive ? '#e5e7eb' : 'transparent',
                  color: isActive ? '#1a1a1a' : disabled ? '#9ca3af' : '#4b5563',
                  borderBottom: isActive ? '2px solid #1a1a1a' : '2px solid transparent',
                  opacity: disabled ? 0.5 : 1,
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Barra
