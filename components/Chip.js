export default function Chip({ children, className }) {
    return (
        <span className={`max-w-2xl px-3 py-1 rounded-full text-xs ${className ?? ''}`}>
            {children}
        </span>
    )
}