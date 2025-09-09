import { useEffect, useRef, useState } from 'react';
import './Msg.css';

type TMessage = {
  type: 'succeed' | 'fail' | null;
  msgContent: string | null;
};

interface IMsgProps {
  message: TMessage;
  setMessage: (message: TMessage) => void;
}

export default function Msg(props: IMsgProps) {
  const [visible, setVisible] = useState(false);

  // 当 text 变化时，如果有内容则展示并启动计时器
  useEffect(() => {
    if (props?.message?.msgContent) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 8000);

      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [props?.message?.msgContent]);

  if (!props?.message?.type || !visible) {
    return null;
  }

  return (
    <div
      className={`msgWrap ${
        props?.message?.type === 'succeed' ? 'succeededMsg' : 'errorMsg'
      }`}
    >
      <span>{props?.message?.msgContent}</span>
    </div>
  );
}
