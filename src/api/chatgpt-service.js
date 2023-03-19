/** 请求接口地址 */
const url = 'https://chat.mobingc.cn/api/send';

/**
 * 发送消息
 *
 * @param {{role: 'user' | 'assistant', content: string}[]} messages 消息列表
 * @param {string} apiKey API令牌
 * @returns {Promise<{role: 'assistant', content: string}>} 响应消息
 */
export const sendMessages = async (messages, apiKey) => {
    const result = { role: 'assistant', content: '' };
    const msgs = [...messages];
    // while (true) {
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: msgs, apiKey })
    });
    if (!response.ok) {
        throw new Error('请求失败！');
    }
    let res = await response.json();
    if (res.code !== 0 && res.code !== 1) {
        console.log(res.data.errorMessage);
        throw new Error('服务器错误！');
    }
    result.content += res.data.message.content;
    msgs.push(result);
    return new Promise((rev) => {
        setTimeout(async () => {
            response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ messages: msgs, apiKey })
            });
            if (!response.ok) {
                throw new Error('请求失败！');
            }
            res = await response.json();
            if (res.code !== 0 && res.code !== 1) {
                console.log(res.data.errorMessage);
                throw new Error('服务器错误！');
            }
            result.content += res.data.message.content;
            rev(result);
        }, 1000);
    });
    // if (res.code === 0) {
    //     break;
    // }
    // if (msgs.length === messages.length) {
    //     msgs.push(result);
    // }
    // }
    // return result;
};
