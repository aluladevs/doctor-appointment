export default function Input(props) {
    const { label } = props;

    return (
        <div className="w-full">
            <p className="text-sm">{label}</p>
            <input
                className="w-full h-11 px-4 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                {...props}/>
        </div>
    )
}