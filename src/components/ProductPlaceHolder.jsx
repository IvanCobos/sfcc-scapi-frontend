// src/components/LoadingPlaceholders.jsx
import React from 'react'

export function PLPPlaceholder() {
  return (
    <div className="container mt-4">
      <h2 className="placeholder-glow mb-4">
        <span className="placeholder col-4"></span>
      </h2>
      <div className="row">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="col-md-4 mb-4">
            <div className="card h-100">
              <div
                className="placeholder w-100"
                style={{ height: '200px' }}
              ></div>
              <div className="card-body">
                <h5 className="placeholder-glow">
                  <span className="placeholder col-6"></span>
                </h5>
                <p className="placeholder-glow">
                  <span className="placeholder col-4"></span>
                </p>
                <span className="btn btn-primary disabled placeholder col-6"></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PDPPlaceholder() {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 placeholder-glow">
          <div className="placeholder w-100" style={{ height: '300px' }}></div>
        </div>
        <div className="col-md-6">
          <h2 className="placeholder-glow">
            <span className="placeholder col-6"></span>
          </h2>
          <p className="placeholder-glow">
            <span className="placeholder col-3"></span>
          </p>
          <p className="placeholder-glow">
            <span className="placeholder col-10 mb-2 d-block"></span>
            <span className="placeholder col-8 mb-2 d-block"></span>
            <span className="placeholder col-6 d-block"></span>
          </p>
          <button
            className="btn btn-primary placeholder col-6 disabled"
            aria-hidden="true"
          ></button>
        </div>
      </div>
    </div>
  )
}

export function StoresPlaceholder() {
  return (
    <div className="container mt-5">
      <h2 className="placeholder-glow mb-4">
        <span className="placeholder col-3"></span>
      </h2>
      <div className="row">
        {[...Array(4)].map((_, i) => (
          <div className="col-md-6 mb-4" key={i}>
            <div className="card p-3 d-flex flex-row align-items-center">
              <div
                className="placeholder rounded me-3"
                style={{ width: '80px', height: '80px' }}
              ></div>
              <div className="w-100">
                <h5 className="placeholder-glow">
                  <span className="placeholder col-6"></span>
                </h5>
                <p className="placeholder-glow mb-1">
                  <span className="placeholder col-4"></span>
                </p>
                <p className="placeholder-glow mb-0">
                  <span className="placeholder col-8"></span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
