import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Categories, SortPopup, PizzaBlock, PizzaLoadingBlock } from '../components';
import { setCategory, setSortBy } from '../redux/actions/filters';
import { setLoaded, setPizzas } from '../redux/actions/pizzas';
import axios from 'axios';
import { addPizzaToCart } from '../redux/actions/cart';

const categoryNames = ["М'ясні", 'Вегетаріанські', 'Гриль', 'Гострі', 'Закриті'];
const sortItems = [
  { name: 'популярність', type: 'popular' },
  { name: 'ціна', type: 'price' },
];


function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ pizzas }) => pizzas.items);
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  React.useEffect(() => {
    dispatch(setLoaded(false));
  
    fetch('src/pizzas.json')
      .then((response) => response.json())
      .then((data) => {
        // Фільтрація за категоріями
        const filteredData = category !== null 
          ? data.filter(pizza => pizza.category === category)
          : data; // Якщо category === null, повертаються всі піци
  
          const sortedData = [...filteredData].sort((a, b) => {
            if (sortBy === 'popular') {
              return b.popularity - a.popularity;
            } else if (sortBy === 'price') {
              return a.price - b.price;
            } else if (sortBy === 'alphabet') {
              // Якщо поле name відсутнє, використовуємо пустий рядок для сортування
              return (a.name || '').localeCompare(b.name || '');
            }
            return 0;
          });
          
          
  
        dispatch(setPizzas(sortedData));
      })
      .catch((error) => {
        console.error('Error fetching pizzas:', error);
      });
  }, [category, sortBy]);
  
  

  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  }, []);

  const onSelectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, [dispatch]);
  

  const handleAddPizzaToCart = (obj) => {
    dispatch({
      type: 'ADD_PIZZA_CART',
      payload: obj,
    })
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories 
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryNames}
        />
 <SortPopup activeSortType={sortBy} items={sortItems} onClickSortType={onSelectSortType} />

      </div>
      <h2 className="content__title">Всі піци</h2>
      <div className="content__items">
        {isLoaded 
          ? items.map((obj) => (
            <PizzaBlock
              onClickAddPizza={handleAddPizzaToCart}
              key={obj.id}
              addedCount ={cartItems[obj.id] && cartItems[obj.id].items.length}
              {...obj}
            />
          ))
          : Array(12)
              .fill(0)
              .map((_, index) => <PizzaLoadingBlock key={index} />)}
      </div>
    </div>
  )
}

export default Home;


