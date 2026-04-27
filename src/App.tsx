import React, { useState } from 'react'
import Barra from './components/Barra'
import Formulario from './components/Formulario'
import DocumentoPDF from './components/documents/DocumentoPDF'
import DocumentoWord from './components/documents/DocumentoWord'
import AcercaDe from './components/AcercaDe'
import type { PersonalInfo } from './types/tipos'
import { defaultPersonalInfo } from './types/tipos'

type Tab = 'form' | 'pdf' | 'doc' | 'about'

const App: React.FC = () => {
  const [tab, setTab] = useState<Tab>('form')
  const [info, setInfo] = useState<PersonalInfo>(defaultPersonalInfo)
  const [formCompleted, setFormCompleted] = useState(false)

  const handleGenerate = () => {
    setFormCompleted(true)
    setTab('pdf')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#ffffff',
      color: '#1a1a1a',
      fontFamily: 'Arial, sans-serif',
    }}>
      <Barra activeTab={tab} onTabChange={t => setTab(t as Tab)} formCompleted={formCompleted} />

      <main>
        {tab === 'form' && (
          <Formulario info={info} onChange={setInfo} onGenerate={handleGenerate} />
        )}
        {tab === 'pdf' && formCompleted && (
          <DocumentoPDF info={info} />
        )}
        {tab === 'doc' && formCompleted && (
          <DocumentoWord info={info} />
        )}
        {tab === 'about' && (
          <AcercaDe />
        )}
      </main>
    </div>
  )
}

export default App
