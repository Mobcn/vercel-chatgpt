import { onMount } from 'solid-js';

/**
 * 头部
 *
 * @param {{ setRemember: (isRemember: boolean) => void; setKey: (key: string) => void }} props 参数
 */
function Header(props) {
    /** key 输入框 DOM 元素 */
    let keyInputDOM;

    onMount(() => {
        const apiKey = localStorage.getItem('CHATGPT_API_KEY');
        if (apiKey) {
            keyInputDOM.value = apiKey;
            props.setKey(apiKey);
        }
    });

    /**
     * API_KEY 改变事件
     */
    const handleKeyChange = (e) => {
        const apiKey = e.target.value;
        localStorage.setItem('CHATGPT_API_KEY', apiKey);
        props.setKey(apiKey);
    };

    return (
        <div className="navbar bg-base-100">
            {/* <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-5 h-5 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>
            </div> */}
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl" href="/">
                    ChatGPT
                </a>
            </div>
            <div className="flex-none mr-2 px-2 border border-blue-400 rounded-md h-8">
                <span className="pr-2">连续对话</span>
                <input
                    className="toggle toggle-sm toggle-info"
                    type="checkbox"
                    onChange={(e) => props.setRemember(e.target.checked)}
                />
            </div>
            <div className="flex-none">
                <input
                    className="input input-sm input-bordered input-primary focus:outline-none focus:border-2 w-60"
                    ref={keyInputDOM}
                    type="password"
                    placeholder="请输入 API_KEY"
                    onChange={handleKeyChange}
                />
            </div>
        </div>
    );
}

export default Header;
