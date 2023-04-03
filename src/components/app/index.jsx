import { useState, useEffect } from "react";
import { CardList } from "../card-list";
import { Footer } from "../footer";
import { Header } from "../header";
import { Sort } from "../sort";
import { Logo } from "../logo";
import { Search } from "../search";
import { dataCard } from "../../data";
import "./styles.css";
import api from "../../utils/api";
import { useDebounce } from "../../hooks/useDebounce";
import { isLiked } from "../../utils/products";
import { CatalogPage } from "../../pages/catalog-page";
import { ProductPage } from "../../pages/product-page";


export function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const debounceSearchQuery = useDebounce(searchQuery, 300);


  function handleRequest() {
    // const filterCards = dataCard.filter((item) =>
    //   item.name.includes(searchQuery)
    // );
    api.search(debounceSearchQuery)
      .then((dataSearch) => {
        setCards(dataSearch)
      })
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    handleRequest();
  }

  function handleInputChange(inputData) {
    setSearchQuery(inputData);
  }

  function handleProductLike(product) {
    const like = isLiked(product.likes, currentUser._id)
    api.changeLikeProductStatus(product._id, like)
      .then((updateCard) => {
        const newProducts = cards.map(cardState => {
          return cardState._id === updateCard._id ? updateCard : cardState
        })

        setCards(newProducts)
      })
  }

  function handleUpdateUser(dataUserUpdate) {
    api.setUserInfo(dataUserUpdate)
      .then((updateUserFromServer) => {
        setCurrentUser(updateUserFromServer)
      })
  }

  useEffect(() => {
    handleRequest();
    // eslint-disable-next-line
  }, [debounceSearchQuery]);

  useEffect(() => {
    api.getAllInfo()
      .then(([productsData, userInfoData]) => {
        setCurrentUser(userInfoData);
        setCards(productsData.products);
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <Header user={currentUser} onUpdateUser = {handleUpdateUser}>
        <Logo />
        <Search onSubmit={handleFormSubmit} onChange={handleInputChange} />
      </Header>
      <main className="content container">
        <Sort />
        <CardList goods={cards} onProductLike = {handleProductLike} currentUser={currentUser}/>
      </main>
      <Footer />
    </>
  );
}
