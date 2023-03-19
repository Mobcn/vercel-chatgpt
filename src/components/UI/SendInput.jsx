/**
 * 消息发送输入框
 *
 * @param {{ placeholder: string, loading: string, onSend: (value: string) => void }} props 参数
 */
function SendInput(props) {
    /** 输入框DOM元素 */
    let inputDOM;

    /**
     * 发送
     */
    const handleSend = () => {
        props.onSend(inputDOM.value || '');
        inputDOM.value = '';
    };

    return (
        <div className="flex w-full">
            <input
                className="input input-bordered input-primary flex-1 focus:outline-none focus:border-2 rounded-r-none"
                ref={inputDOM}
                type="text"
                placeholder={props.loading || props.placeholder || '请输入...'}
                onKeyUp={(e) => e.key === 'Enter' && handleSend()}
                disabled={props.loading}
            />
            <button
                className={
                    'btn btn-outline border-l-0 rounded-l-none ' + (props.loading ? 'btn-disabled' : 'btn-primary')
                }
                onClick={handleSend}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                </svg>
            </button>
        </div>
    );
}

export default SendInput;
