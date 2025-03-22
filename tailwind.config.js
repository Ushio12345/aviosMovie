const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            gridTemplateColumns: {
                // Simple 16 column grid
                16: "repeat(16, minmax(0, 1fr))",
            },
        },
    },
    plugins: [],
});
