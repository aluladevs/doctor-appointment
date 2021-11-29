export default function Avatar({ className, text, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`h-10 w-10 bg-gray-300 rounded-full text-xl text-white ${className ?? ''}`}>
            {text[0] ?? "A"}
        </button>
    )
}