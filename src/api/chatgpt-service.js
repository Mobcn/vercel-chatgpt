/** 请求接口地址 */
const SEND_URL = '/api/send';

/**
 * 发送消息
 *
 * @param {{role: 'user' | 'assistant', content: string}[]} messages 消息列表
 * @param {string} apiKey API令牌
 * @param {(part: string, isFinish: boolean) => void} callback 响应回调
 */
export const sendMessages = async (messages, apiKey, callback) => {
    const response = await fetch(SEND_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages, apiKey })
    });
    if (!response.ok) {
        callback('请求失败！', true);
    }
    const data = response.body;
    if (!data) {
        callback('没有返回数据！', true);
    }
    const reader = data.getReader();
    const decoder = new TextDecoder('utf-8');
    while (true) {
        const { value, done } = await reader.read();
        callback(decoder.decode(value || ''), done);
        if (done) {
            break;
        }
    }
};
