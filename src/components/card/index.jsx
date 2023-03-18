import './styles.css';
import likeIcon from '../../images/save.svg';

export function Card({
  name,
  price,
  discount,
  wight,
  description,
  picture,
  ...props
}) {

  const discount_price = Math.round(price - (price * discount) / 100);

  return (
    <article className="card">

      {/* иконка - скидка */}
      <div className="card__sticky card__sticky_type_top-left">
        {discount !== 0 && (
          <span className="card__discount">{`-${discount}%`}</span>
        )}
      </div>

      {/* иконка - лайк */}
      <div className="card__sticky card__sticky_type_top-right">
        <button className="card__favorite">
          <img src={likeIcon} alt="" className="card__favorite-icon" />
        </button>
      </div>


      {/* карточка */}
      {/* eslint-disable-next-line */}
      <a href="#" className="card__link">

        {/* карточка - картинка */}
        <img src={picture} alt={name} className="card__image" />

        {/* карточка - описание */}
        <div className="card__desc">

          {/* старая цена. подмена класса */}
          <span className={discount !== 0 ? "card__old-price" : "card__price"}>
            {price}&nbsp;₽
          </span>

          {/* дисконт. поведение элемента */}
          {discount !== 0 && (
            <span className="card__price card__price_type_discount">
              {discount_price}&nbsp;₽
            </span>
          )}

          {/* вес */}
          <span className="card__wight">{wight}</span>

          {/* карточка - имя */}
          <h3 className="card__name">{name}</h3>
        </div>

      </a>

      {/* кнопка - корзина */}
      {/* eslint-disable-next-line */}
      <a href="#" className="card__cart btn btn_type_primary">
        В корзину
      </a>

    </article>
  );
}
