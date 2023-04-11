import cn from 'classnames';
import s from './styles.module.css';
import './styles.css'
import { useContext } from 'react';
import { UserContext } from '../../contexts/current-user-context';
import { ThemeContext } from '../../contexts/theme-context';
import { CardsContext } from '../../contexts/card-context';
import { Link } from 'react-router-dom';
import { ReactComponent as FavoriteIcon } from './img/favorites.svg'

export function Header({ children }) {
  const handleClickButtonEdit = () => {
    onUpdateUser({ name: 'Anton', about: 'student' })
  }
  const { currentUser, onUpdateUser } = useContext(UserContext);
  const { toggleTheme } = useContext(ThemeContext);
  const { favorites } = useContext(CardsContext);

  return (
    <header className={s.header}>
      <div className={cn('container', s.wrapper)}>
        {children}
        <div className={s.iconsMenu}>
          <Link className={s.favoritesLink} to={{ pathname: '/favorites' }}>
            <FavoriteIcon />
            {favorites.length !== 0 && <span className={s.iconBubble}>{favorites.length}</span>}
          </Link>
        </div>
        <span>{currentUser?.name}:{currentUser?.about}</span>
        <label className="wraper" htmlFor="something">
          <div className="switch-wrap">
            <input type="checkbox" id="something" onChange={toggleTheme} />
            <div className="switch"></div>
          </div>
        </label>
      </div>
    </header>
  );
}


