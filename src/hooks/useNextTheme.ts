import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function useNextTheme() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return [theme || 'system', mounted, setTheme] as const;
}
