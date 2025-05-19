interface Props {
    wrapperClassName: string;
    message: string;
};

const Loading = ({ wrapperClassName, message }: Props) => {
    return (
        <div className={`${wrapperClassName} flex flex-col items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200 animate-pulse dark:bg-none dark:from-transparent dark:via-transparent dark:to-transparent dark:animate-none`}>
            <div className='w-32 h-32 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin mb-4'>
            </div>

            <p className='text-xl text-red-700 font-bold'>
                {message}
            </p>
        </div>
    )
};

export default Loading;