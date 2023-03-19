const CHAT_API = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-3.5-turbo';
const TEMPERATURE = 0.7;

/**
 * @param {VercelRequest} req Vercel请求对象
 * @param {VercelResponse} res Vercel响应对象
 */
export default async (req, res) => {
    const { messages, apiKey } = req.body;
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
            model: MODEL,
            messages,
            temperature: TEMPERATURE
        })
    };
    try {
        /** @type {Response} */
        const rawResponse = await fetch(CHAT_API, initOptions);
        if (!rawResponse.ok) {
            throw new Error('请求失败！');
        }
        res.json(await rawResponse.json());
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
