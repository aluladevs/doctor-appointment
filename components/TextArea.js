export default function TextArea(props) {
    const { label, className, rest } = props;

    return (
        <div className={`w-full ${className ?? ''}`}>
            <p className="text-sm">{label}</p>
            <textarea
                className="w-full h-32 p-4 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                {...rest}/>
        </div>
    )
}