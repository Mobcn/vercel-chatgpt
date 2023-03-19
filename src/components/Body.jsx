import { For, onMount } from 'solid-js';
import ChatBubble from './UI/ChatBubble';

/**
 * @typedef {import("./UI/ChatBubble").ChatMessage} ChatMessage
 */

/**
 * 中部
 *
 * @param {{ messages: ChatMessage[], expose: { toDown: () => void } }} props 参数
 */
function Body(props) {
    /** 聊天窗口 DOM 元素 */
    let chatWindowDOM;

    onMount(() => {
        // 暴露滚动到底部方法
        props.expose.toDown = () => (chatWindowDOM.scrollTop = chatWindowDOM.scrollHeight);
    });

    return (
        <div ref={chatWindowDOM} className="flex-1 w-full overflow-auto bg-teal-50">
            <For each={props.messages}>
                {(item) => item.content && <ChatBubble role={item.role} content={item.content} />}
            </For>
        </div>
    );
}

export default Body;
