const checkNaturalSizeAndAddClass = imageInstance => {
    const width = imageInstance.naturalWidth;
    const height = imageInstance.naturalHeight;

    if(height > width){
        console.log(1);
        return 'portrait';
    }

    if(width < 2000){
        console.log(2);
        return 'landscape';
    }
    console.log(3);

    return 'large';
}

const createImages = (substringName, imageCount, naturalSizeCheckerAndClassAdder ,gridContainerIdOrClass) => {
    const gridContainer = document.querySelector(gridContainerIdOrClass);

    for(let i = 0; i < imageCount; i++){
        let gridItem = document.createElement('div');
        let src = `../images/images_for_grid/${substringName}_${i}.jpg`;
        let image = new Image();
        image.src = src;
        gridItem.classList.add(naturalSizeCheckerAndClassAdder(image));
        image.alt = "galery image";
        gridItem.appendChild(image);
        gridContainer.appendChild(gridItem);
    }
};

createImages('slika', 100, checkNaturalSizeAndAddClass, '.grid_galery');