function createToaster(config){
    return function(message){
        const parent = document.querySelector(".parent");
        if (!parent) {
            console.error("Parent element not found!");
            return;
        }

        // Ensure parent has correct position classes (just once)
        parent.classList.add(config.positionY === 'top' ? 'top-5' : 'bottom-5');
        parent.classList.add(config.positionX === 'right' ? 'right-5' : 'left-5');

        const toaster = document.createElement('div');
        toaster.className = `bg-${config.theme === 'dark' ? 'gray-800 text-white' : 'gray-100 text-black'} px-6 py-4 rounded shadow-lg transition-opacity duration-300 pointer-events-none`;

        toaster.textContent = message;

        parent.appendChild(toaster);

        // Remove after duration
        setTimeout(() => {
            toaster.remove();
        }, config.duration * 1000);
    }
}

let toaster = createToaster({
    positionX: 'right',
    positionY: 'top',
    theme: 'dark',
    duration: 4,
});

toaster("This is a toaster notification!");
setTimeout(() => {
    toaster("This is another notification!");
}, 2000);
