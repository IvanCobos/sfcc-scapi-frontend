import React, { useEffect, useState } from 'react'

export default function CategoryMenu({ parentId, setParentId, history, setHistory, onCategoryChange }) {
  const [categories, setCategories] = useState([])
  const [parentName, setParentName] = useState('Categorías')

  useEffect(() => {
    const fetchCategories = async () => {
      console.log('render category menu', parentId)
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL
        const res = await fetch(`${baseUrl}/api/categories?ids=${parentId}`)
        const data = await res.json()

        const current = data.data?.[0]
        if (current) {
          setCategories(current.categories || [])
          setParentName(current.name || 'Categorías')
        } else {
          setCategories([])
        }
      } catch (error) {
        console.error('Error al obtener categorías:', error)
      }
    }

    fetchCategories()
  }, [parentId])

  const handleCategoryClick = (newId, name) => {
    setHistory((prev) => [...prev, { id: parentId, name: parentName }])
    setParentId(newId)

    if (onCategoryChange) onCategoryChange(newId)
  }

  const handleBack = () => {
    const last = history[history.length - 1]
    setHistory((prev) => prev.slice(0, -1))
    setParentId(last.id)
    setParentName(last.name)

    if (onCategoryChange) onCategoryChange(last.id)
  }

  return (
    <div className="col-md-3">
      <p>
        {history.length > 0 ? (
          <span
            style={{ cursor: 'pointer', color: '#007bff' }}
            onClick={handleBack}
          >
            ← {history[history.length - 1].name}
          </span>
        ) : (
          <strong>{parentName}</strong>
        )}
      </p>

      <ul className="list-group">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <li
              key={cat.id}
              className="list-group-item list-group-item-action"
              style={{ cursor: 'pointer' }}
              onClick={() => handleCategoryClick(cat.id, cat.name)}
            >
              {cat.name}
            </li>
          ))
        ) : (
          <li className="list-group-item text-muted">No hay subcategorías</li>
        )}
      </ul>
    </div>
  )
}
