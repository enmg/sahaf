import { env } from '@/lib';

export default function Header() {
    return <header className="flex items-center justify-center">{env.APP_NAME}</header>;
}
