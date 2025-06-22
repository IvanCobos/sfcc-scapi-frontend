import React from 'react'

export default function Spinner({ message = 'Cargando...' }) {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <div className="spinner-border text-primary" role="status" aria-label={message}>
        <span className="visually-hidden">{message}</span>
      </div>
    </div>
  )
}
