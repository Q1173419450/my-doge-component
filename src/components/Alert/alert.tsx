import React, { useState } from "react";
import classnames from "classnames";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";

export type AlertType = "success" | "info" | "warning" | "error";
type CloseCallback = (e: React.MouseEvent) => void;

interface BaseAlertProps {
  className?: string;
  /** 弹窗类型 */
  alertType?: AlertType;
  /** 自定义错误标题，如果未指定会展示原生报错信息 */
  message?: string;
  /** 自定义错误内容，如果未指定会展示报错堆栈 */
  description?: string;
  /** 是否显示辅助图标 */
  showIcon?: Boolean;
  /** 默认不显示关闭按钮 */
  closable?: Boolean;
  /** 关闭时触发的回调函数 */
  onClose?: CloseCallback;
}

const Alert: React.FC<BaseAlertProps> = (props) => {
  const {
    className,
    alertType,
    message,
    description,
    showIcon,
    closable,
    onClose,
  } = props;

  const [close, setClose] = useState(true);

  const classes = classnames("alert", className, {
    [`alert-${alertType}`]: alertType,
  });

  const handleClose = (e: React.MouseEvent) => {
    setClose(false);
    if (onClose) {
      onClose(e);
    }
  };

  if (close) {
    return (
      <div className={classes}>
        {showIcon ? (
          <Icon className="alert-icon" icon="check-circle" theme="success" />
        ) : null}
        <div className="alert-content">
          <div className="alert-message">{message}</div>
          <div className="alert-description">{description}</div>
        </div>
        {closable ? (
          <button className="alert-close-icon" onClick={handleClose}>
            <Icon icon="times" theme="dark" />
          </button>
        ) : null}
      </div>
    );
  } else {
    return null;
  }
};

Alert.defaultProps = {
  alertType: "success",
};

export default Alert;
