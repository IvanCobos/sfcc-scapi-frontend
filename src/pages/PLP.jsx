import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import Spinner from '../components/Spinner'
import { PLPPlaceholder } from '../components/ProductPlaceHolder'

export default function PLP() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://conection-scapi.onrender.com/api/products?ids=6304,77941015')
        const data = await res.json()
        console.log("Desde servicio web desplegado", data)
        setProducts(data.data || [])
      } catch (error) {
        console.error('Error al obtener productos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) return <PLPPlaceholder />

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista de Productos</h2>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={product.image?.link || 'https://placehold.co/300x300?text=Imagen+no+disponible'}
                className="card-img-top"
                alt={product.name || product.id}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name || 'Sin nombre'}</h5>
                <p className="card-text">
                  Precio: {product.price || 'No disponible'}
                </p>
                <Link to={`/product/${product.id}`} className="btn btn-primary mt-auto">
                  Ver más
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { PLPPlaceholder } from '../components/ProductPlaceHolder'

// export default function PLP() {
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         // 1. Obtener el token desde tu backend
//         const tokenRes = await fetch('http://localhost:4000/api/generateToken')
//         const { access_token } = await tokenRes.json()

//         // 2. Construir la URL al SCAPI real usando tus variables de entorno
//         const ids = '6304,77941015'
//         const scapiUrl = `https://${import.meta.env.VITE_SCAPI_SHORT_CODE}.api.commercecloud.salesforce.com/product/shopper-products/v1/organizations/${import.meta.env.VITE_SCAPI_ORG_ID}/products?ids=${ids}&siteId=${import.meta.env.VITE_SCAPI_SITE_ID}`

//         // 3. Llamar a SCAPI directamente desde el front con el token
//         console.log(access_token)
//         const res = await fetch(scapiUrl, {
//           headers: {
//             Authorization: `Bearer ${access_token}`,
//             'x-api-key': import.meta.env.VITE_SCAPI_CLIENT_ID,
//             'Content-Type': 'application/json'
//           }
//         })

//         const data = await res.json()
//         setProducts(data.data || [])
//       } catch (error) {
//         console.error('Error al obtener productos:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProducts()
//   }, [])

//   if (loading) return <PLPPlaceholder />

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Lista de Productos</h2>
//       <div className="row">
//         {products.map(product => (
//           <div key={product.id} className="col-md-4 mb-4">
//             <div className="card h-100">
//               <img
//                 src={product.image?.link || 'https://placehold.co/300x300?text=Imagen+no+disponible'}
//                 className="card-img-top"
//                 alt={product.name || product.id}
//               />
//               <div className="card-body d-flex flex-column">
//                 <h5 className="card-title">{product.name || 'Sin nombre'}</h5>
//                 <p className="card-text">
//                   Precio: {product.price || 'No disponible'}
//                 </p>
//                 <Link to={`/product/${product.id}`} className="btn btn-primary mt-auto">
//                   Ver más
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }