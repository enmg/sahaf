import Link from 'next/link';
import { Logo } from './logo';

export default function Header() {
    return (
        <header className="flex items-center justify-center">
            <Link href="/" aria-label="go home" className="mx-auto block size-fit">
                <Logo />
            </Link>
        </header>
    );
}
