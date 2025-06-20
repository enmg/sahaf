import { PaginationProps } from '@/types/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({ pagination, page, totalPages, search, category }: PaginationProps) {
    return (
        <div className="mt-16 flex flex-wrap items-center justify-center gap-2">
            <a
                href={`?q=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}&page=${Math.max(1, page - 1)}`}
                className={`flex items-center justify-center rounded-full border px-3 py-2 text-base font-semibold transition ${page === 1 ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400 dark:bg-neutral-800 dark:text-gray-600' : 'border-gray-200 bg-gray-100 text-slate-700 hover:bg-slate-900 hover:text-white dark:bg-neutral-800 dark:text-gray-200 dark:hover:bg-slate-700 dark:hover:text-white'}`}
                aria-disabled={page === 1}
            >
                <ChevronLeft size={20} />
            </a>
            {pagination.map((p, i) =>
                typeof p === 'number' ? (
                    <a
                        key={i}
                        href={`?q=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}&page=${p}`}
                        className={`flex items-center justify-center rounded-full border px-4 py-2 text-base font-semibold transition ${page === p ? 'scale-110 border-slate-900 bg-slate-900 text-white shadow-lg dark:bg-slate-200 dark:text-slate-900' : 'border-gray-200 bg-gray-100 text-slate-700 hover:bg-slate-900 hover:text-white dark:bg-neutral-800 dark:text-gray-200 dark:hover:bg-slate-700 dark:hover:text-white'}`}
                    >
                        {p}
                    </a>
                ) : (
                    <span key={i} className="px-2 text-lg text-gray-400 select-none">
                        ...
                    </span>
                )
            )}
            <a
                href={`?q=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}&page=${Math.min(totalPages, page + 1)}`}
                className={`flex items-center justify-center rounded-full border px-3 py-2 text-base font-semibold transition ${page === totalPages ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400 dark:bg-neutral-800 dark:text-gray-600' : 'border-gray-200 bg-gray-100 text-slate-700 hover:bg-slate-900 hover:text-white dark:bg-neutral-800 dark:text-gray-200 dark:hover:bg-slate-700 dark:hover:text-white'}`}
                aria-disabled={page === totalPages}
            >
                <ChevronRight size={20} />
            </a>
        </div>
    );
}
