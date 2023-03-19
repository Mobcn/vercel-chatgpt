export default async (req, res) => {
    res.write('测试');
    setTimeout(() => {
        res.end();
    }, 10000);
};
