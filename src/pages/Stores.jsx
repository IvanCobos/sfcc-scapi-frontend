import React, { useEffect, useState } from 'react'
import {StoresPlaceholder} from '../components/ProductPlaceHolder'

export default function Stores() {
  const [stores, setStores] = useState([])
  const [loading, setLoading] = useState(true)
  const [assortment, setAssortment] = useState([])

  const storeIds = ['00001']

  useEffect(() => {
    const fetchStores = async () => {
      const baseUrl = import.meta.env.VITE_API_BASE_URL
      try {
        const res = await fetch(`https://sfcc-scapi-frontend.onrender.com/api/stores?ids=${storeIds.join(',')}`)
        const data = await res.json()
  
        if (data && data.data) {
          const storesWithParsedAssortment = data.data.map((store) => {
            let parsedAssortment = []
            try {
              parsedAssortment = JSON.parse(store['c_custom-assortment'])
            } catch (e) {
              console.error(`Error parsing assortment for store ${store.name || ''}:`, e)
            }
            return {
              ...store,
              parsedAssortment // nuevo campo
            }
          })
  
          setStores(storesWithParsedAssortment)
        }
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
                <br></br>
                <p className="mb-0">
  <strong>Assortment:</strong>
  <ul>
    {store.parsedAssortment?.map((item, idx) => (
      <li key={idx}>
        <strong>{item.clusterization}</strong>: {item.cluster}
      </li>
    ))}
  </ul>
</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}