import { createParser } from 'eventsource-parser';

const CHAT_API = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-3.5-turbo';
const TEMPERATURE = 0.7;

/**
 * @param {VercelRequest} req Vercel请求对象
 * @param {VercelResponse} res Vercel响应对象
 */
export default async (req, res) => {
    try {
        const { messages, apiKey } = req.body;
        if (!apiKey) {
            throw new Error('没有apiKey！');
        }
        const initOptions = {
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
        const result = {
            code: 1,
            message: '未完成',
            data: {
                message: { role: 'assistant', content: '' },
                test: []
            }
        };
        const timer = setTimeout(() => res.json(result), 9000);
        /** @type {Response} */
        const rawResponse = await fetch(CHAT_API, initOptions);
        if (!rawResponse.ok) {
            throw new Error('请求失败！');
        }
        const decoder = new TextDecoder('utf-8');
        const parser = createParser((event) => {
            if (event.type === 'event') {
                const data = event.data;
                if (data === '[DONE]') {
                    clearTimeout(timer);
                    result.code = 0;
                    result.message = '成功';
                    res.json(result);
                } else {
                    const json = JSON.parse(data);
                    const text = json.choices[0].delta?.content || '';
                    result.data.message.content += text;
                }
            }
        });
        for await (const chunk of rawResponse.body) {
            const sr = decoder.decode(chunk);
            result.data.test.push(sr);
            parser.feed(sr);
        }
    } catch (err) {
        res.json({
            code: -1,
            message: '错误',
            data: {
                errorMessage: {
                    code: err.name,
                    message: err.message
                }
            }
        });
    }
};

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
