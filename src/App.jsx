import { createSignal, For } from 'solid-js';
import { sendMessages } from './api/chatgpt-service';
import './assets/tailwindcss.css';

/**
 * @typedef {Object} ChatMessage Chat消息
 * @property {'user' | 'assistant'} role 角色
 * @property {string} content 内容
 */

/**
 * 应用
 */
function App() {
    /** @type {[() => ChatMessage[], (newMessageList: ChatMessage[]) => void]} */
    const [getMessageList, setMessageList] = createSignal([
        { role: 'user', content: '你好' },
        { role: 'assistant', content: '你好啊' }
    ]);

    /** Key元素 */
    let keyDom;
    /** 输入框DOM元素 */
    let inputDom;

    /**
     * 发送消息
     */
    const handleSendMessages = (event) => {
        if (event.keyCode !== 13) {
            return;
        }
        const content = inputDom.value.trim();
        if (content === '') {
            alert('请输入问题');
            return;
        }
        const newMessageList = [...getMessageList(), { role: 'user', content }];
        setMessageList([...newMessageList, { role: 'assistant', content: '' }]);
        sendMessages(newMessageList, keyDom.value.trim(), (part) => {
            const messageList = [...getMessageList()];
            messageList[messageList.length - 1].content += part;
            setMessageList(messageList);
        });
    };

    return (
        <div className="h-screen box-border bg-blue-50">
            <div className="flex flex-col items-start w-full max-w-3xl h-full mx-auto pb-1 bg-white">
                <div className="w-full h-9 text-center bg-green-50">
                    <span className="text-3xl select-none">ChatGPT</span>
                </div>
                <div className="flex-1 w-full p-2 overflow-auto">
                    <For each={getMessageList()}>
                        {(item) =>
                            item.content && (
                                <div
                                    className={
                                        'w-full h-7' +
                                        (item.role === 'user' ? ' text-right bg-yellow-50' : ' text-left bg-red-50')
                                    }
                                >
                                    {item.content}
                                </div>
                            )
                        }
                    </For>
                </div>
                <div className="w-full">
                    <input className="w-full p-1 border" ref={keyDom} type="text" placeholder="apiKey" />
                    <input
                        className="w-full p-1 border"
                        ref={inputDom}
                        type="text"
                        placeholder="输入问题..."
                        onKeyUp={handleSendMessages}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
