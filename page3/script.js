function createToaster(config) {
    return function (message) {
        const parent = document.querySelector(".parent");
        if (!parent) {
            console.error("Parent element not found!");
            return;
        }

        const toaster = document.createElement('div');
        toaster.className = `bg-${config.theme === 'dark' ? 'gray-800 text-white' : 'gray-100 text-black'} px-6 py-4
        rounded shadow-lg transition-opacity duration-300 pointer-events-none`;
        toaster.textContent = message;

        parent.appendChild(toaster);

        // Ensure parent has correct position classes (just once)
        parent.className += `${config.positionY === 'top' ? 'top-5' : 'bottom-5'} ${config.positionX === 'right' ? 'right-5' : 'left-5'}`;


        // Remove after duration
        setTimeout(() => {
            toaster.remove();
        }, config.duration * 1000);
    }
}

let toaster = createToaster({
    positionX: 'right',
    positionY: 'bottom',
    theme: 'dark',
    duration: 4,
});

toaster("This is a toaster notification!");
setTimeout(() => {
    toaster("This is another notification!");
}, 2000);
setTimeout(() => {
    toaster("Download Compleated!");
}, 1500)
