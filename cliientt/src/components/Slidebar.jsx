import React,{ useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Slidebar.css';
import { logo, sun } from '../assents';
import { navlinks } from '../constant';

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
    <div
      className={`sidebar-icon ${isActive && isActive === name ? 'sidebar-icon-active' : ''} ${!disabled ? 'sidebar-icon-enabled' : 'sidebar-icon-disabled'} ${styles}`}
      onClick={handleClick}
    >
      {!isActive ? (
        <img src={imgUrl} alt="fund_logo" />
      ) : (
        <img src={imgUrl} alt="fund_logo" className={isActive !== name ? 'grayscale' : ''} />
      )}
    </div>
  );
const Slidebar = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState('dashboard');
  return (
    <div className="sidebar-container">
    <Link to="/">
      <Icon styles="sidebar-logo" imgUrl={logo} />
    </Link>

    <div className="sidebar-menu">
      <div className="flex flex-col justify-center items-center gap-3">
        {navlinks.map((link) => (
          <Icon
            key={link.name}
            {...link}
            isActive={isActive}
            handleClick={() => {
              if (!link.disabled) {
                setIsActive(link.name);
                navigate(link.link);
              }
            }}
          />
        ))}
      </div>

      <Icon styles="sun-icon" imgUrl={sun} />
    </div>
  </div>
  )
}

export default Slidebar
