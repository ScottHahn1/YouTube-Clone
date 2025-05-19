interface Props {
    divClassName: string;
    message: string;
};

const Error = ({ divClassName, message }: Props) => {
    return (
        <div className={`${divClassName} text-xl mt-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg`}>
            {message}
        </div>
    )
};

export default Error;