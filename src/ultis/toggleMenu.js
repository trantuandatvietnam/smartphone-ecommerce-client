const toggleMenu = (toggleBtn, dropDown, target) => {
    // check user click on language button
    if (toggleBtn.current?.contains(target)) {
        // if dropdown hide then show and if show then hide
        if (dropDown.current?.classList.contains('scale-y-0')) {
            dropDown.current?.classList.replace('scale-y-0', 'scale-y-1');
        } else {
            dropDown.current?.classList.replace('scale-y-1', 'scale-y-0');
        }
    } else {
        // user click outside the language dropdown then hide
        dropDown.current?.classList.replace('scale-y-1', 'scale-y-0');
    }
};

export default toggleMenu;
