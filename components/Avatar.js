export default function Avatar({ className, text, onClick }) {
    return (
        <button onClick={onClick}>
            <div className={`h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center ${className ?? ''}`}>
                <p className="text-xl text-white">{text[0] ?? "A"}</p>
            </div>
        </button>
    )
}