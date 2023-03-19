import { createParser } from 'eventsource-parser';

/** ChatGPT接口地址 */
const CHAT_API = 'https://api.openai.com/v1/chat/completions';
/** 使用模型 */
const MODEL = 'gpt-3.5-turbo';
/** 思维发散度（0 ~ 2） */
const TEMPERATURE = 0.7;

/**
 * @param {VercelRequest} req Vercel请求对象
 * @param {VercelResponse} res Vercel响应对象
 */
export default async (req, res) => {
    try {
        /** @type {{ messages: ChatMessage[], apiKey: string }} */
        const { messages, apiKey } = req.body;
        if (!apiKey) {
            throw new Error('没有apiKey！');
        }
        if (!messages || messages.length < 1 || messages[0].content.trim() === '') {
            throw new Error('没有请求内容！');
        }

        /** @type {Result} */
        const result = { code: 1, message: '未完成', data: { message: { role: 'assistant', content: '' } } };

        // 设置计时器超时中止
        let isFinish = false;
        const timer = setTimeout(() => {
            if (!isFinish) {
                isFinish = true;
                res.json(result);
            }
        }, 9000);

        /** @type {Response} */
        const rawResponse = await fetch(CHAT_API, generateOptions(messages, apiKey));
        if (!rawResponse.ok) {
            throw new Error('请求失败！');
        }

        // 解析流
        const decoder = new TextDecoder('utf-8');
        const parser = createParser((event) => {
            if (event.type === 'event') {
                const data = event.data;
                if (data === '[DONE]') {
                    if (!isFinish) {
                        isFinish = true;
                        clearTimeout(timer);
                        result.code = 0;
                        result.message = '成功';
                        res.json(result);
                    }
                } else {
                    const json = JSON.parse(data);
                    const text = json.choices[0].delta?.content || '';
                    result.data.message.content += text;
                }
            }
        });

        // 获取流
        for await (const chunk of rawResponse.body) {
            parser.feed(decoder.decode(chunk));
        }
    } catch (err) {
        res.json({ code: -1, message: '错误', data: { errorMessage: { code: err.name, message: err.message } } });
    }
};

/**
 * 生成请求参数
 *
 * @param {{role: 'user' | 'assistant', content: string}[]} messages 消息列表
 * @param {string} apiKey API令牌
 */
function generateOptions(messages, apiKey) {
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
        },
        method: 'POST',
        body: JSON.stringify({
            model: MODEL,
            messages,
            temperature: TEMPERATURE,
            stream: true
        })
    };
}

/**
 * @typedef {Object} VercelRequest Vercel请求对象
 * @property {{ [key: string]: string | string[] }} query 请求参数
 * @property {{ [key: string]: string }} cookies 请求Cookie
 * @property {any} body 请求体
 */

/**
 * @typedef {Object} VercelResponse Vercel响应对象
 * @property {(body: any) => VercelResponse} send 响应发送
 * @property {(jsonBody: any) => VercelResponse} json JSON格式响应发送
 * @property {(statusCode: number) => VercelResponse} status 响应状态码
 * @property {(statusOrUrl: string | number, url?: string) => VercelResponse} redirect 重定向
 */

/**
 * @typedef {Object} Result 返回体
 * @property {number} code 响应码
 * @property {string} message 响应消息
 * @property {any} data 响应数据
 */

/**
 * @typedef {Object} ChatMessage Chat消息
 * @property {'user' | 'assistant'} role 角色
 * @property {string} content 内容
 */
