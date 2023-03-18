/** 请求接口地址 */
const url = '/api/send';

/**
 * 发送消息
 *
 * @param {{role: 'user' | 'assistant', content: string}[]} messages 消息列表
 * @param {string} apiKey API令牌
 * @param {(part: string) => void} callback 消息回调
 */
export const sendMessages = async (messages, apiKey, callback) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages, apiKey })
    });
    if (!response.ok) {
        const error = await response.json();
        console.error(error.error);
        throw new Error('请求失败！');
    }
    const data = response.body;
    if (!data) {
        throw new Error('没有数据！');
    }
    const reader = data.getReader();
    const decoder = new TextDecoder('utf-8');
    let result = '';
    while (true) {
        const { value, done } = await reader.read();
        if (done) {
            break;
        }
        if (value) {
            const char = decoder.decode(value);
            if (char === '\n' && result.endsWith('\n')) {
                continue;
            }
            if (char) {
                result += char;
                callback(char);
            }
        }
    }
};
