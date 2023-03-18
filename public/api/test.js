import { createParser } from 'eventsource-parser';

/**
 * @param {VercelRequest} req Vercel请求对象
 * @param {VercelResponse} res Vercel响应对象
 */
export default async (req, res) => {
    const apiKey = req.query['key'];
    if (!apiKey) {
        res.send('没有apiKey！');
        return;
    }
    const initOptions = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
        },
        method: 'POST',
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: '你好' }],
            temperature: 0.6,
            stream: true
        })
    };
    try {
        /** @type {Response} */
        const rawResponse = await fetch('https://api.openai.com/v1/chat/completions', initOptions);
        if (!rawResponse.ok) {
            res.send('请求失败！');
        }
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        res.setHeader('Content-type', 'application/octet-stream');
        const parser = createParser((event) => {
            if (event.type === 'event') {
                const data = event.data;
                if (data === '[DONE]') {
                    res.end();
                } else {
                    const json = JSON.parse(data);
                    const text = json.choices[0].delta?.content || '';
                    res.write(encoder.encode(text));
                }
            }
        });
        for await (const chunk of rawResponse.body) {
            parser.feed(decoder.decode(chunk));
        }
    } catch (err) {
        res.send(`code: ${err.name}, message: ${err.message}`);
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
