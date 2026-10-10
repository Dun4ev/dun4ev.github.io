import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ThemeSwitcherProps {
    size?: 'compact' | 'touch';
}

interface Appearance {
    palette: 'warm' | 'blue';
    mode: 'light' | 'dark';
}

const readAppearance = (): Appearance => ({
    palette: document.documentElement.dataset.palette === 'blue' ? 'blue' : 'warm',
    mode: document.documentElement.dataset.mode === 'light' ? 'light' : 'dark',
});

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ size = 'compact' }) => {
    const { t } = useTranslation();
    const [appearance, setAppearance] = React.useState<Appearance>({ palette: 'warm', mode: 'dark' });

    React.useEffect(() => {
        const syncAppearance = () => setAppearance(readAppearance());
        syncAppearance();
        window.addEventListener('portfolio-theme-change', syncAppearance);
        return () => window.removeEventListener('portfolio-theme-change', syncAppearance);
    }, []);

    const toggleAppearance = (setting: keyof Appearance) => {
        const current = readAppearance();
        const next: Appearance = setting === 'palette'
            ? { ...current, palette: current.palette === 'warm' ? 'blue' : 'warm' }
            : { ...current, mode: current.mode === 'light' ? 'dark' : 'light' };

        document.documentElement.dataset.palette = next.palette;
        document.documentElement.dataset.mode = next.mode;
        try {
            window.localStorage.setItem('portfolio-appearance', JSON.stringify(next));
        } catch {
            // The current page can still change appearance when storage is unavailable.
        }
        window.dispatchEvent(new Event('portfolio-theme-change'));
    };

    const isWarm = appearance.palette === 'warm';
    const isLight = appearance.mode === 'light';

    return (
        <div className={`theme-controls theme-controls--${size}`}>
            <button
                type="button"
                role="switch"
                aria-checked={isWarm}
                aria-label={t('theme.warm_palette')}
                title={t('theme.warm_palette')}
                className="theme-switch theme-switch--palette"
                onClick={() => toggleAppearance('palette')}
            >
                <span className="theme-switch-track" aria-hidden="true">
                    <span className="theme-switch-thumb" style={{ backgroundColor: isWarm ? '#ed6d40' : '#4385dc' }} />
                </span>
            </button>
            <button
                type="button"
                role="switch"
                aria-checked={isLight}
                aria-label={t('theme.light_mode')}
                title={t('theme.light_mode')}
                className="theme-switch theme-switch--light"
                onClick={() => toggleAppearance('mode')}
            >
                <span className="theme-switch-track" aria-hidden="true">
                    <span className="theme-switch-thumb">
                        {isLight ? <Sun size={12} /> : <Moon size={12} />}
                    </span>
                </span>
            </button>
        </div>
    );
};
