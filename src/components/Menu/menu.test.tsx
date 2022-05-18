import React from 'react';
import { fireEvent, render, RenderResult, cleanup, waitFor } from '@testing-library/react';

import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: ['4']
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu { ...props }>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>456</MenuItem>
      {/* <li>hello</li> */}
      <SubMenu title='dropdown'>
        <MenuItem>drop1</MenuItem>
      </SubMenu>
      <SubMenu title='opened'>
        <MenuItem>opened1</MenuItem>
      </SubMenu>
    </Menu>
  );
};

const createStyleFile = () => {
  const cssFile: string = `
    .doge-submenu {
      display: none;
    }
    .doge-submenu.menu-opened {
      display: block;
    }
  `;

  const style = document.createElement('style');
  style.innerHTML = cssFile;
  return style
}

let wrapper: RenderResult, wrapper2: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test Menu and MenuItem component', () => {
  beforeEach(() => {  // 测试用例生命周期
    wrapper = render(generateMenu(testProps));
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId('test-menu'); // wrapper.container.getElementsByClassName
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  })
  it('should render correct Menu and MenuItem based on default props', () => {  // 默认列表
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('doge-menu test');
    // expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5);
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  })
  it('click item should change active and call the right callback', () => { // 不同case 会调用 cleanup
    const thirdItem = wrapper.getByText('456');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
  })

  it('should show dropdown items when hover on subMenu', async () => {
    expect(wrapper.queryByText('drop1')).not.toBeVisible();
    const dropdownElement = wrapper.getByText('dropdown');
    fireEvent.mouseEnter(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible();
    })
  })

  it('should render vertical mode when mode is set to vertical', () => {
    cleanup();
    const wrapper = render(generateMenu(testVerProps));
    const menuElement = wrapper.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  })
})

describe('test Menu and MenuItem component in vertical mode', () => {
  beforeEach(() => {
    wrapper2 = render(generateMenu(testVerProps))
    wrapper2.container.append(createStyleFile());
  })

  it('should render vertical mode when mode is set to vertical', () => {
    const menuElement = wrapper2.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  })

  it('should show dropdown items when click on subMenu for vertical mode', () => {
    const dropDownItem = wrapper2.queryByText('drop1');
    expect(dropDownItem).not.toBeVisible();
    fireEvent.click(wrapper2.getByText('dropdown'));
    expect(dropDownItem).toBeVisible();
  })

  it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
    expect(wrapper2.queryByText('opened1')).toBeVisible();
  })
})