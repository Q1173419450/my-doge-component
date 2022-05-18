import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Button, {ButtonProps, ButtonSize, ButtonType} from './button';

const defaultProps = {
  onClick: jest.fn()  // mock 事件
}

const testProps: ButtonProps =  {
  btnType: ButtonType.Primary,
  size: ButtonSize.large,
  className: 'Klass'
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn() 
}

describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button { ...defaultProps }>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element.disabled).toBeFalsy()
    expect(element).toHaveClass('btn btn-default');

    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  })

  it('should render the correct component base on different props', () => {
    const wrapper = render(<Button { ...testProps }>Nice</Button>)
    const element = wrapper.getByText('Nice');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn-primary btn-lg Klass')
  })

  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(<Button { ...disabledProps }>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  })
  
  it('should render a link when btnType equals link and href is provided', () => {
    const wrapper = render(<Button btnType={ButtonType.Link} href='https://www.baidu.com'>Link</Button>);
    const element = wrapper.getByText('Link');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
    expect(element).toHaveClass('btn btn-link');
  })
})