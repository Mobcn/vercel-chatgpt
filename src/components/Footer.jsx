import { createSignal } from 'solid-js';
import SendInput from './UI/SendInput';

/**
 * 底部
 *
 * @param {{ onSendMessages: (content: string) => void  }} props 参数
 */
function Footer(props) {
    // 加载
    const [getLoading, setLoading] = createSignal('');

    /**
     * 发送
     */
    const handleSend = (value) => {
        setLoading('AI思考中...');
        props.onSendMessages(value, () => {
            setLoading('');
        });
    };

    return (
        <div className="w-full">
            <SendInput loading={getLoading()} onSend={handleSend} />
        </div>
    );
}

export default Footer;
