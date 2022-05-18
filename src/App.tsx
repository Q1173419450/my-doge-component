import React, { useState } from "react";
import "./styles/index.scss";
import "./App.scss";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";
import Alert from "./components/Alert/alert";
import Input from "./components/Input/input";

import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/Icon/icon";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleInfo,
  faCheckCircle,
  fas,
} from "@fortawesome/free-solid-svg-icons";

import Transition from "./components/Transition/transition";
import message from "./components/Message/message";

library.add(faCircleInfo, faCheckCircle, fas);

function App() {
  const [inProp, setInProp] = useState(false);
  return (
    <div className="App">
      <div>
        <h1>Button</h1>
        <Button autoFocus>Hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.small}>
          Hello
        </Button>
        <Button
          onClick={(e) => console.log("----")}
          btnType={ButtonType.Default}
          size={ButtonSize.large}
        >
          Hello
        </Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com">
          Baidu
        </Button>
      </div>

      <div className="code-box-demo">
        <h1>alert</h1>
        <Alert
          message="测试上看见的是开绿灯就撒开了觉得拉克斯基的测试上看见的是开绿灯就撒开了觉得拉克斯基的测试上看见的是开绿灯就撒开了觉得拉克斯基的测试上看见的是开绿灯就撒开了觉得拉克斯基的"
          alertType="success"
          showIcon={true}
        ></Alert>
        <Alert
          message="测试"
          description="helpppppppeppppppppppppppp"
          alertType="info"
        ></Alert>
        <Alert message="测试" alertType="warning"></Alert>
        <Alert
          message="测试"
          onClose={(e) => console.log(e)}
          closable
          alertType="error"
        ></Alert>
      </div>

      <div>
        <h1>Menu</h1>
        <Menu defaultIndex="0" onSelect={(idx) => console.log(idx)}>
          <MenuItem>123</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
            <MenuItem>dropdown 3</MenuItem>
            <MenuItem>dropdown 4</MenuItem>
          </SubMenu>
          <MenuItem>456</MenuItem>
        </Menu>
      </div>
      <div>
        <h1>Icon</h1>
        <Icon icon="coffee" theme="primary" />
        <Icon icon="arrow-down" theme="primary" />
      </div>
      <div>
        <h1>transition</h1>
        <Transition in={inProp} timeout={200} unmountOnExit>
          <div>"I'll receive my-node-* classes"</div>
        </Transition>
        <Button btnType={ButtonType.Primary} onClick={() => setInProp(!inProp)}>
          Click to Enter
        </Button>
      </div>
      <div className="code-box-demo">
        <h1>Input</h1>
        <Input placeholder="Basic usage" inputSize="lg"></Input>
        <Input placeholder="Basic usage" inputSize="default"></Input>
        <Input placeholder="Basic usage" inputSize="sm"></Input>
      </div>

      <div>
        <h1>Message</h1>
        <Button
          style={{ margin: 10 }}
          onClick={() => message.success({ content: "这是一条成功消息提示" })}
        >
          message 成功 弹出
        </Button>
        <Button
          style={{ margin: 10 }}
          onClick={() => message.error({ content: "这是一条错误消息提示" })}
        >
          message 失败 弹出
        </Button>
        <Button
          style={{ margin: 10 }}
          onClick={() => message.info({ content: "这是一条正常消息提示" })}
        >
          message info 弹出
        </Button>
        <Button
          style={{ margin: 10 }}
          onClick={() => message.warning({ content: "这是一条警告消息提示" })}
        >
          message warning 弹出
        </Button>
        <Button
          style={{ margin: 10 }}
          onClick={() =>
            message.warning({ content: "这是一条警告消息提示", duration: 10 })
          }
        >
          message warning 弹出，自定义时间 10s
        </Button>
      </div>
    </div>
  );
}

export default App;
