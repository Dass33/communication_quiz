/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsz,tsx}"
    ],
    safelist: [
        'figma-black',
        'bg-csas-blue',
        'bg-csas-red-violet',
        'bg-csas-dark-teal',
        'bg-csas-green',
        'text-csas-blue',
        'text-csas-red-violet',
        'text-csas-dark-teal',
        'text-csas-green',
    ],
    theme: {
        extend: {
            colors: {
                'figma-black': '#0B1F42',
                'figma-stone': '#245375',
                'figma-light-gray': '#A7BAC8',
                'figma-honey': '#FFD32A',
                'figma-carrots': '#FF6130',
                'figma-berries': '#E1015B',
                'figma-rose': '#EB4C79',
                'figma-lavender': '#AA4BB3',
                'figma-pool': '#199CF9',
                'figma-teal': '#02A3A4',
                'figma-lime': '#0CB43F',
                'figma-forest': '#028661',
                'figma-winter': '#9FD7FF',
                'figma-indigo-40': '#ACABD3',
                'figma-indigo': '#2F2D91',
                'figma-pale': '#FF9CC4',
                'figma-white': '#EEF1F4',
                'figma-stone-40': '#A7BAC8',
                'figma-pool-40': '#A3D7FD',
                'figma-lime-40': '#9EE1B2',
                'figma-lavender-40': '#DDB7E1',
                'csas-blue': '#0179F8',
                'csas-red-violet': '#711C76',
                'csas-dark-teal': '#036A6D',
                'csas-green': '#018562',

            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
            screens: {
                'xs': '380px',
            },
            keyframes: {
                growAndShrink: {
                    "0%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.3)" },
                    "100%": { transform: "scale(1)" },
                },
            },
            animation: {
                "grow-shrink": "growAndShrink 0.3s ease-in-out",
            },
            height: {
                'screen-dvh': '100dvh',
            }
        },
    },
    plugins: [],
}

