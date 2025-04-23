/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    safelist: [
        'hover:bg-brand-500/10',
        'hover:text-brand-700',
        'hover:border-brand-700',
        'dark:hover:border-brand-700',
        'focus:border-brand-300',
        'focus:ring-brand-500/10',
        'dark:focus:border-brand-800',
        'bg-brand-500',
        'text-white',
    ],
    theme: {
        extend: {},
    },
    plugins: [], // kosong atau isi plugin Tailwind lain jika perlu
};
