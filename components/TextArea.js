export default function TextArea(props) {
    const { label } = props;

    return (
        <div className="w-full">
            <p className="text-sm">{label}</p>
            <textarea
                className="w-full p-4 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                {...props}/>
        </div>
    )
}