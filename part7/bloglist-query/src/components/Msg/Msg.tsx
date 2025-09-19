import './Msg.css';
import { useMsg } from '../../context/MsgContext';

export default function Msg() {
  const { msg } = useMsg();

  if (!msg?.msgContent) {
    return null;
  }

  return (
    <div className={`msgWrap ${msg?.isError ? ' errorMsg' : 'succeededMsg'}`}>
      <span>{msg?.msgContent}</span>
    </div>
  );
}
