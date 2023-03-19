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
        const newMessageList = [...getMessageList(), { role: 'user', content }];
        setMessageList(newMessageList);
        bodyExpose.toDown();
        const result = { role: 'assistant', content: '' };
        const reader = {
            isFinish: false,
            /** @type {string[]} */
            buffer: [],
            /**
             * @param {string} part
             * @param {boolean} isFinish
             */
            add: function (part, isFinish) {
                const chars = [...part];
                if (result.content === '' && this.buffer.length === 0) {
                    while (chars.length > 0 && chars[0] === '\n') {
                        chars.shift();
                    }
                }
                this.buffer.push(...chars);
                this.isFinish = isFinish;
            },
            start: function () {
                const timer = setInterval(() => {
                    if (this.isFinish && this.buffer.length === 0) {
                        clearInterval(timer);
                        callback();
                    }
                    if (this.buffer.length > 0) {
                        result.content += this.buffer.shift();
                        setMessageList([...newMessageList, Object.assign({}, result)]);
                        bodyExpose.toDown();
                    }
                }, 40);
            }
        };
        sendMessages(newMessageList, apiKey, (part, isFinish) => reader.add(part, isFinish));
        reader.start();
    };

    return (
        <div className="h-screen box-border bg-blue-50">
            <div className="flex flex-col items-start w-full max-w-3xl h-full mx-auto pb-1 bg-white">
                <Header setKey={setKey} />
                <Body messages={getMessageList()} expose={bodyExpose} />
                <Footer onSendMessages={handleSendMessages} />
            </div>
        </div>
    );
}

export default App;
