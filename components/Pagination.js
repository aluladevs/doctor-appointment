import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/outline";

export default function Pagination(props) {
    let { pages, page, onChange } = props;

    page = parseInt(page);
    pages = parseInt(pages);

    const data = Array.from({length: pages}).map((e, i) => i + 1);
    const isPrevEnable = page > 1 && page <= pages;
    const isNextEnable = page < pages && pages > 1;

    const handleNext = () => {
        onChange(page + 1);
    };

    const handlePrev = () => {
        onChange(page - 1);
    };

    return (
        <div className="mt-8 mb-5 flex items-center">
            <button
                onClick={handlePrev}
                className={`h-9 w-9 mx-1 rounded-xl text-sm ${!isPrevEnable ? "text-gray-400" : ""}`}
                disabled={!isPrevEnable}>
                <ChevronLeftIcon className="h-4 w-4 m-auto"/>
            </button>
            {data.map((e) => (
                <button
                    key={e}
                    className={`h-9 w-9 mx-1 rounded-xl text-sm ${e === parseInt(page) ? "bg-primary text-white" : "text-gray-600"}`}
                    onClick={() => onChange(e)}>
                    {e}
                </button>
            ))}
            <button
                onClick={handleNext}
                className={`h-9 w-9 mx-1 rounded-xl text-sm ${!isNextEnable ? "text-gray-400" : ""}`}
                disabled={!isNextEnable}>
                <ChevronRightIcon className="h-4 w-4 m-auto"/>
            </button>
        </div>
    )
}