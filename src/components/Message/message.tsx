import React, { useEffect } from "react";
import classnames from "classnames";
import { render, unmountComponentAtNode } from "react-dom";
import Icon from "../Icon/icon";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type onClick = (e: React.MouseEvent) => void;
// type onClose = (e: React.MouseEvent) => void | (() => void);

interface BaseMessageProps {
  className?: string;
  type?: any;
  icon?: any;
  content: string;
  duration?: number;
  onClick?: onClick;
  onClose?: any;
}

const messageIcon = (t: string) =>
  new Map([
    ["error", "fa-triangle-exclamation"],
    ["success", "check-circle"],
    ["warning", "fa-circle-exclamation"],
    ["info", "fa-circle-exclamation"],
  ]).get(t);

const Message: React.FC<BaseMessageProps> = (props) => {
  const { className, content, duration = 3, type, icon, onClose } = props;
  const messageClass = classnames("doge-message", className, {
    [`doge-message-${type}`]: type,
  });

  useEffect(() => {
    const t = setTimeout(onClose, duration * 1000);
    return () => {
      t && clearTimeout(t);
    };
  }, []);

  return (
    <div className={messageClass} onClick={onClose}>
      <div className="doge-message-notice">
        <div className="doge-message-notice-content">
          {icon || (
            <Icon icon={messageIcon(type) as IconProp} theme={type}></Icon>
          )}
          <span style={{ marginLeft: 10 }}>{content}</span>
        </div>
      </div>
    </div>
  );
};

/* 挂载到对应组件 */
const getContainer = () => {
  const container = document.querySelector("#customMessageWrapper");
  if (!container) {
    const _container = document.createElement("div");
    _container.id = "customMessageWrapper";
    _container.className = `fixed`;
    document.body.appendChild(_container);
    return _container;
  }
  return container;
};

const _message = (type: string) => (props: BaseMessageProps) => {
  const container = getContainer();
  const _dom = document.createElement("div");

  container.appendChild(_dom);

  const handleClose = () => {
    unmountComponentAtNode(_dom);
    container.removeChild(_dom);
  };

  render(<Message {...props} type={type} onClose={handleClose} />, _dom);
};
const error = _message("error");
const warning = _message("warning");
const success = _message("success");
const info = _message("info");

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  error,
  warning,
  success,
  info,
};
