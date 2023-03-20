import { createParser } from 'eventsource-parser';

/** ChatGPT接口地址 */
const CHAT_API = 'https://api.openai.com/v1/chat/completions';
/** 使用模型 */
const MODEL = 'gpt-3.5-turbo';
/** 思维发散度（0 ~ 2） */
const TEMPERATURE = 0.7;

// 使用 Edge Function
export const config = {
    runtime: 'edge',
    regions: ['iad1']
};

/**
 * @param {Request} req 请求对象
 * @returns {Response} 响应对象
 */
export default async (req) => {
    try {
        /** @type {{ messages: ChatMessage[], apiKey: string }} */
        const { messages, apiKey } = await req.json();
        if (!apiKey) {
            throw new Error('没有apiKey！');
        }
        if (!messages || messages.length < 1 || messages[0].content.trim() === '') {
            throw new Error('没有请求内容！');
        }

        /** @type {Response} */
        const rawResponse = await fetch(CHAT_API, generateOptions(messages, apiKey));
        if (!rawResponse.ok) {
            throw new Error('请求失败！');
        }

        // 获取并解析流
        const encoder = new TextEncoder();
        const decoder = new TextDecoder('utf-8');
        const stream = new ReadableStream({
            async start(controller) {
                const parser = createParser((event) => {
                    if (event.type === 'event') {
                        const data = event.data;
                        if (data === '[DONE]') {
                            controller.close();
                            return;
                        }
                        try {
                            const json = JSON.parse(data);
                            const text = json.choices[0].delta?.content;
                            const queue = encoder.encode(text);
                            controller.enqueue(queue);
                        } catch (e) {
                            controller.error(e);
                        }
                    }
                });
                for await (const chunk of rawResponse.body) {
                    parser.feed(decoder.decode(chunk));
                }
            }
        });

        return new Response(stream);
    } catch (err) {
        return new Response(JSON.stringify({ error: { code: err.name, message: err.message } }), { status: 500 });
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
