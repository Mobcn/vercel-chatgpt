import { createSignal } from 'solid-js';
import { sendMessages } from './api/chatgpt-service';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import './assets/tailwindcss.css';

/**
 * @typedef {import("./components/UI/ChatBubble").ChatMessage} ChatMessage
 */

/**
 * 应用
 */
function App() {
    /** @type {[() => ChatMessage[], (newMessageList: ChatMessage[]) => void]} */
    const [getMessageList, setMessageList] = createSignal([]);

    // 是否连续对话
    const [getRemember, setRemember] = createSignal(false);

    // apiKey
    const [getKey, setKey] = createSignal('');

    /**
     * @type {{ toDown: () => void }}
     */
    const bodyExpose = {};

    /**
     * 发送消息
     *
     * @param {string} content 发送内容
     * @param {() => void} callback 回调
     */
    const handleSendMessages = (content, callback) => {
        content = content.trim();
        if (content === '') {
            alert('请输入问题');
            callback();
            return;
        }
        const apiKey = getKey().trim();
        if (apiKey === '') {
            alert('请输入apiKey');
            callback();
            return;
        }
        const message = { role: 'user', content };
        const newMessageList = [...getMessageList(), message];
        setMessageList(newMessageList);
        bodyExpose.toDown();
        const result = { role: 'assistant', content: '' };
        const sendMessageList = getRemember() ? newMessageList : [message];
        sendMessages(sendMessageList, apiKey, (part, isFinish) => {
            if (part !== '') {
                result.content += part === ' ' ? '\u00A0' : part;
                setMessageList([...newMessageList, Object.assign({}, result)]);
                bodyExpose.toDown();
            }
            isFinish && callback();
        }).catch((err) => {
            console.error(err);
            callback();
        });
    };

    return (
        <div className="h-screen box-border bg-blue-50">
            <div className="flex flex-col items-start w-full max-w-3xl h-full mx-auto pb-1 bg-white">
                <Header setRemember={setRemember} setKey={setKey} />
                <Body messages={getMessageList()} expose={bodyExpose} />
                <Footer onSendMessages={handleSendMessages} />
            </div>
        </div>
    );
}

export default App;
