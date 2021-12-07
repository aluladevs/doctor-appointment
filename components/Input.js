export default function Input(props) {
    const { label, error, helper, value, onChange, prefix, ...rest } = props;

    return (
        <div className="w-full">
            <p className="text-xs">{label}</p>
            <div className="w-full h-11 flex items-center rounded-xl bg-gray-100 text-sm focus:outline-none focus-within:ring-2 focus-within:ring-primary">
                <input
                    className="w-full h-full px-4 bg-transparent rounded-xl focus:outline-none"
                    value={value ?? ''}
                    onChange={onChange}
                    {...rest}/>
                {prefix && (
                    <div className="px-4">
                        {prefix}
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-0.5 text-xs text-red-700">{error}</p>
            )}
            {helper && (
                <p className="mt-0.5 text-xs text-gray-600">{helper}</p>
            )}
        </div>
    )
}