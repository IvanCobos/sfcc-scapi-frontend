import React, { useEffect, useState } from 'react'
import {StoresPlaceholder} from '../components/ProductPlaceHolder'

export default function Stores() {
  const [stores, setStores] = useState([])
  const [loading, setLoading] = useState(true)

  const storeIds = ['01418', '03125']

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await fetch(`https://conection-scapi.onrender.com/api/stores?ids=${storeIds.join(',')}`)
        const data = await res.json()
        setStores(data.data || [])
        console.log(data)
      } catch (err) {
        console.error('Error al obtener las tiendas:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStores()
  }, [])

  if (loading) {
      return (<StoresPlaceholder/>)
    }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Tiendas</h2>
      <div className="row">
        {stores.map((store) => (
          <div className="col-md-6 mb-4" key={store.id}>
            <div className="card p-3 d-flex flex-row align-items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                alt="Ubicación"
                width="80"
                className="me-3"
              />
              <div>
                <h5 className="card-title mb-1">{store.name}</h5>
                <p className="mb-1">
                  <strong>CP:</strong> {store?.postalCode || 'N/A'}
                </p>
                <p className="mb-0">{store.address1}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}