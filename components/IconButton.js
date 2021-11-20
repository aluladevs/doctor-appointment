export default function IconButton({ children, color, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`p-2 rounded-lg shadow bg-${color ?? "white"}`}>
            {children}
        </button>
    )
}