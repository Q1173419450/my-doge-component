import React, { createContext, useState } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;  // 样式类型
  onSelect?: SelectCallback;
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  index: string;  // 选中类型
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

/* 
  问题：active
  onselect 如何传给子组件 createContent
*/
export const MenuContext = createContext<IMenuContext>({ index: '0' });
const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props;
  const [currentActive, setCurrentActive] = useState(defaultIndex);
  const classes = classNames('doge-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  })
  
  const handleClick = (index: string) => {
    setCurrentActive(index);
    if (onSelect) {
      onSelect(index);
    }
  }

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;  // 为啥又定义了一个 FC？？？？？
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, { index: index.toString() })  // 为什么需要克隆？？？？？？
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem Component');
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid='test-menu'>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
}

export default Menu