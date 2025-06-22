import React, { useEffect, useState } from 'react'

export default function Cart() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const basket = JSON.parse(localStorage.getItem('basket')) || {}
    const productIds = Object.keys(basket)

    const fetchDetails = async () => {
      const responses = await Promise.all(
        productIds.map(id =>
          fetch(
            `https://${import.meta.env.VITE_SCAPI_SHORT_CODE}.api.commercecloud.salesforce.com/commerce-sdk/v1/products/${id}?siteId=${import.meta.env.VITE_SCAPI_SITE_ID}`,
            {
              headers: {
                'x-api-key': import.meta.env.VITE_SCAPI_CLIENT_ID
              }
            }
          ).then(res => res.json())
        )
      )

      const enriched = responses.map((product, i) => ({
        ...product,
        quantity: basket[productIds[i]]
      }))

      setItems(enriched)
    }

    if (productIds.length > 0) fetchDetails()
  }, [])

  if (items.length === 0) return <div>El carrito está vacío.</div>

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <img src={item.image?.link} alt={item.name} width="80" /><br />
            {item.name} - Cantidad: {item.quantity} - Precio: {item.price?.formatted || 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  )
}