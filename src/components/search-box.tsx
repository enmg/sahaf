import { SearchBoxProps } from '@/types/search-box';

export function SearchBox({ search }: SearchBoxProps) {
    return (
        <form className="mt-5 mb-10 flex w-full items-center justify-center lg:mt-10 lg:mb-15">
            <div className="flex w-full max-w-md items-center gap-2 rounded-xl border border-gray-100 bg-white/90 px-3 py-1 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                <span className="flex items-center pl-1 text-blue-400">
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                        <path
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.5 6.5a7.5 7.5 0 0 0 10.6 10.6Z"
                        />
                    </svg>
                </span>
                <input
                    type="text"
                    name="q"
                    placeholder="Ürün adı ara..."
                    defaultValue={search}
                    className="flex-1 border-none bg-transparent px-1 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none dark:text-gray-100 dark:placeholder-gray-500"
                    autoComplete="off"
                />
                <button
                    type="submit"
                    className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white shadow-xs transition hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    aria-label="Ara"
                >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                        <path
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.5 6.5a7.5 7.5 0 0 0 10.6 10.6Z"
                        />
                    </svg>
                </button>
            </div>
        </form>
    );
}
