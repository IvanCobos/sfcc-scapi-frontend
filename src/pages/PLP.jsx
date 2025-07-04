import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PLPPlaceholder } from '../components/ProductPlaceHolder'
import CategoryMenu from '../components/CategoryMenu'

export default function PLP() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('root')
  const [parentId, setParentId] = useState('root')
  const [categoryHistory, setCategoryHistory] = useState([])

  const baseUrl = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    console.log('render PLP')

    const fetchProducts = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${baseUrl}/api/product-search?categoryId=${selectedCategory}`)
        const data = await res.json()
        console.log('Productos desde categoría', selectedCategory, data)
        setProducts(data?.hits || [])
      } catch (error) {
        console.error('Error al obtener productos:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    if (selectedCategory !== 'root') {
      fetchProducts()
    } else {
      setProducts([])
      setLoading(false)
    }
  }, [selectedCategory])

  if (loading) return <PLPPlaceholder />

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista de Productos</h2>

      <div className="row">
        {/* Menú lateral */}
        <div className="col-md-5 mb-4">
          <CategoryMenu
            parentId={parentId}
            setParentId={setParentId}
            history={categoryHistory}
            setHistory={setCategoryHistory}
            onCategoryChange={(newCategoryId) => setSelectedCategory(newCategoryId)}
          />
        </div>

        {/* Lista de productos */}
        <div className="col-md-7">
          <div className="row">
            {products.length === 0 ? (
              <p className="text-muted">Selecciona una categoría con productos</p>
            ) : (
              products.map((product) => (
                <div key={product.productId} className="col-md-4 mb-4">
                  <div className="card h-100">
                    <img
                      src={product.image?.link || 'https://placehold.co/300x300?text=Imagen+no+disponible'}
                      className="card-img-top"
                      alt={product.productName || product.productId}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product.productName || 'Sin nombre'}</h5>
                      <p className="card-text">ID: {product.productId}</p>
                      <Link to={`/product/${product.productId}`} className="btn btn-primary mt-auto">
                        Ver más
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
