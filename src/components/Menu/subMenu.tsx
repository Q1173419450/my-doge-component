import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';

// import { CSSTransition } from 'react-transition-group'

export interface SubMenuProps {
  index?: string,
  title: string,
  className?: string,
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, title, children, className } = props;
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
  const [ menuOpen, setOpen ] = useState(isOpened); // subMenu 展开或关闭

  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical'
  })

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  }

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300)
  }

  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {};

  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
  } : {}

  const renderChildren = () => {
    const submenuClasses = classNames('doge-submenu', {
      'menu-opened': menuOpen,
    })
    const childrenComponent = React.Children.map(children, (child, idx) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${idx}`
        })
      } else {
        console.error('Warning: SubMenu has a child which is not a MenuItem Component');
      }
    })

    return (
      <Transition
        in={menuOpen}
        timeout={300}
        classNames='zoom-in-top'
        unmountOnExit
        appear
      >
        <ul className={submenuClasses}>
          {childrenComponent}
        </ul>
      </Transition>
    )
  }

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon='angle-down' className='arrow-icon'></Icon>
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu';

export default SubMenu