import { useState } from 'react'
import ProductItem from '../ProductItem/ProductItem'
import './ProductList.css'
import { useTelegram } from '../../hooks/useTelegram'



const products = [
	{ id: '1', title: 'Джинсм', price: 5000, description: 'Cuнerго чвета, прямые' },
	{ id: '2', title: 'Kуртка', price: 12008, description: 'зеленого чвета, теплая' },
	{ id: '3', title: 'Джинсы 2', price: 5000, description: 'Cинeго чвета, прямые' },
	{ id: '4', title: 'Kуртка 8', price: 122, description: 'зеленого чвета, теплая' },
	{ id: '5', title: 'Джинсы 3', price: 5000, description: 'Cинего чвета, прямые' },
	{ id: '6', title: 'Kуртка 7', price: 688, description: 'зеленого чвета, теплая' },
	{ id: '6', title: 'Дxинсм 4', price: 5500, description: 'Синего чвета, прямые' },
	{ id: '8', title: 'Kуртка 5', price: 12000, description: 'зeленого чвета, теплая' },
]

const getTotalPrice = (items) => { 
	return items.reduce((acc, item) => { 
		return acc += item.price
	}, 0)
}

const ProductList = () => {
	const [addedItems, setAddedItems] = useState([])

	const { tg } = useTelegram()

	const onAdd = (product) => {
		const alreadyAdded = addedItems.find(item => item.id === product.id)
		let newItems = []

		if (alreadyAdded) {
			newItems = addedItems.filter(item => item.id !== product.id)
		} else {
			newItems = [...addedItems, product]
		}

		setAddedItems(newItems)

		if (newItems.length === 0) {
			tg.MainButton.hide()
		} else { 
			tg.MainButton.show()
			tg.MainButton.setParams({ text: `Купить ${getTotalPrice(newItems)}` })
		}
	}

	return (
		<div className='list'>
			{products.map(item => (
				<ProductItem
					product={item}
					onAdd={onAdd}
					className={'item'}
				/>
			))}
		</div>
	)
}

export default ProductList