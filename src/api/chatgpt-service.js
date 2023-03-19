/** 请求接口地址 */
const url = '/api/send';

/**
 * 发送消息
 *
 * @param {{role: 'user' | 'assistant', content: string}[]} messages 消息列表
 * @param {string} apiKey API令牌
 * @returns {Promise<{role: 'assistant', content: string}>} 响应消息
 */
export const sendMessages = async (messages, apiKey) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages, apiKey })
    });
    if (!response.ok) {
        throw new Error('请求失败！');
    }
    const res = await response.json();
    if (res.code !== 0) {
        console.log(res.data.errorMessage);
        throw new Error('服务器错误！');
    }
    return res.data.message;
};
