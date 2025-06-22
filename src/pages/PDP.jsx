// pages/PDP.jsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PDPPlaceholder } from '../components/ProductPlaceHolder'

export default function PDP() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://conection-scapi.onrender.com/api/product/${id}`)
        const data = await res.json()
        setProduct(data)
      } catch (err) {
        console.error('Error al obtener el producto:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const addToCart = () => {
    const basket = JSON.parse(localStorage.getItem('basket')) || {}
    basket[id] = (basket[id] || 0) + 1
    localStorage.setItem('basket', JSON.stringify(basket))
    alert('Producto agregado al carrito')
    navigate('/cart')
  }

  if (loading) {
      return (
      <PDPPlaceholder/>
      )
    }
  if (!product) return <div className="text-center mt-4">No se encontró el producto.</div>

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 text-center">
          <img
            src={product.image?.link || 'https://placehold.co/300x300?text=Imagen+no+disponible'}
            alt={product.name}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h2>{product.name || 'Producto sin nombre'}</h2>
          <p className="text-muted">Precio: {product.price?.formatted || 'N/A'}</p>
          <p>{product.shortDescription || 'Sin descripción disponible.'}</p>
          <button className="btn btn-primary" onClick={addToCart}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  )
}