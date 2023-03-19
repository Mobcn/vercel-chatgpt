/** 请求接口地址 */
const url = '/api/send';

/**
 * 发送消息
 *
 * @param {{role: 'user' | 'assistant', content: string}[]} messages 消息列表
 * @param {string} apiKey API令牌
 * @param {(part: string, isFinish: boolean) => void} callback 响应回调
 */
export const sendMessages = async (messages, apiKey, callback) => {
    const result = { role: 'assistant', content: '' };
    const msgs = [...messages];
    let isFinish = false;
    do {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ messages: msgs, apiKey })
        });
        if (!response.ok) {
            callback('请求失败！', true);
        }
        const res = await response.json();
        if (res.code !== 0 && res.code !== 1) {
            console.log(res.data.errorMessage);
            callback('服务器错误！', true);
        }
        callback(res.data.message.content, (isFinish = res.code === 0));
        result.content += res.data.message.content;
        if (msgs.length === messages.length) {
            msgs.push(result);
        }
    } while (!isFinish);
};
