import { createEffect } from 'solid-js';
import { marked } from 'marked';
import hljs from 'highlight.js';

/**
 * highlight渲染
 */
class HljsRenderer extends marked.Renderer {
    code(code, language, isEscaped) {
        /** @type {string} */
        let result = super.code.call(this, code, language, isEscaped);
        return (
            result.substring(0, 4) + ' class="hljs p-3 rounded overflow-x-auto"' + result.substring(4)
        );
    }

    text(text) {
        if (text.startsWith('```')) {
            text = text.substring(text.indexOf('\n') + 1);
            text = text.replace(/&amp;/g, '&');
            text = text.replace(/&lt;/g, '<');
            text = text.replace(/&gt;/g, '>');
            text = text.replace(/&nbsp;/g, ' ');
            text = text.replace(/'/g, "'");
            text = text.replace(/&quot;/g, '"');
            return this.code(text, undefined, true);
        }
        return text;
    }
}

// markdown解析设置
marked.setOptions({
    renderer: new HljsRenderer(),
    highlight: (code) => hljs.highlightAuto(code).value
});

/**
 * 聊天气泡
 *
 * @param {ChatMessage} props 参数
 */
function ChatBubble(props) {
    // 内容DOM元素
    let contentDOM;
    createEffect(() => {
        marked.parse(props.content, (err, res) => (contentDOM.innerHTML = err || res));
    });
    return (
        <div className={'chat items-end ' + (props.role === 'user' ? 'chat-end' : 'chat-start')}>
            {props.role === 'assistant' && <Avatar role="assistant" />}
            <div
                ref={contentDOM}
                className={'chat-bubble ' + (props.role === 'user' ? 'chat-bubble-info' : 'chat-bubble-accent')}
            ></div>
            {props.role === 'user' && <Avatar role="user" />}
        </div>
    );
}

/**
 * 头像
 *
 * @param {{ role: 'user' | 'assistant' }} props 参数
 */
function Avatar(props) {
    return (
        <div className="avatar">
            <div className="w-11 rounded-full">
                {props.role === 'user' ? (
                    <svg
                        className="w-11 h-11 scale-90 text-cyan-900"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path
                            fill-rule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                        />
                    </svg>
                ) : (
                    <svg
                        className="w-11 h-11 scale-90 text-fuchsia-800"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z" />
                        <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z" />
                    </svg>
                )}
            </div>
        </div>
    );
}

export default ChatBubble;

/**
 * @typedef {Object} ChatMessage Chat消息
 * @property {'user' | 'assistant'} role 角色
 * @property {string} content 内容
 */
