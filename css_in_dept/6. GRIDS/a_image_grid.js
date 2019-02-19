const checkNaturalSizeAndAddClass = imageInstance => {
    const width = imageInstance.naturalWidth;
    const height = imageInstance.naturalHeight;

    console.log(width, height);

    if(height > width){
        // console.log(1);
        return 'portrait';
    }

    if(width < 4000){
        // console.log(2);
        return 'landscape';
    }
    // console.log(3);

    return 'large';
}

const createImages = (substringName, imageCount, naturalSizeCheckerAndClassAdder ,gridContainerIdOrClass) => {
    const gridContainer = document.querySelector(gridContainerIdOrClass);
    const fragment = document.createDocumentFragment();


    for(let i = 0; i < imageCount; i++){
        let gridItem = document.createElement('div');
        let src = `../images/images_for_grid/${substringName}_${i}.jpg`;
        let image = new Image();
        image.src = src;
        // gridItem.classList.add(naturalSizeCheckerAndClassAdder(image));

        image.addEventListener('load', () => {gridItem.classList.add(naturalSizeCheckerAndClassAdder(image));})

        image.alt = "galery image";
        gridItem.appendChild(image);
        fragment.appendChild(gridItem);
        if(i === imageCount - 1){
            gridContainer.appendChild(fragment);
        }
    }
};

createImages('slika', 100, checkNaturalSizeAndAddClass, '.grid_galery');