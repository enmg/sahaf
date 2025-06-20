import { ThemedImage } from './themed-image';

export default function PoweredBy() {
    return (
        <div className="flex items-center justify-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <a href="http://ekipisi.com">
                <ThemedImage
                    lightSrc={'/logo/ekipisi.svg'}
                    darkSrc={'/logo/ekipisi-dark.svg'}
                    alt="Ekipişi"
                    width={18}
                    height={18}
                    className="drop-shadow-sm transition duration-300 ease-in-out hover:scale-110 dark:drop-shadow-md"
                />
            </a>
        </div>
    );
}
