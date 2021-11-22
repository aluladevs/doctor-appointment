export default function Alert({ color, message, className }) {
    return (
        <div className={`w-full bg-${color}-light p-4 rounded-2xl ${className ?? ''}`}>
            <p className={`text-${color} text-sm`}>{message}</p>
        </div>
    )
}