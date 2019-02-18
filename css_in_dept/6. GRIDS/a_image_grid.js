const onLoadFunk = ev => {
    const image = ev.target;
    const width = image.naturalWidth;
    const height = image.naturalHeight;

    // console.log(ev.target);

    if(height > width){
        image.parentElement.classList.add('portrait');
        console.log(1);
        return;
    }

    if(width < 300){
        image.parentElement.classList.add('landscape');
        console.log(2);
        return;
    }

    image.parentElement.classList.add('large');
    console.log(3);

    return;
}

const createImages = (substringName, imageCount, onLoadHandler, gridContainerIdOrClass) => {
    const gridContainer = document.querySelector(gridContainerIdOrClass);

    for(let i = 0; i < imageCount; i++){
        let gridItem = document.createElement('div');
        let src = `../images/images_for_grid/${substringName}_${i}.jpg`;
        let image = new Image();
        image.src = src;
        image.alt = "galery image";
        image.addEventListener('load', onLoadHandler);
        gridItem.appendChild(image)
        gridContainer.appendChild(gridItem);
    }
};

createImages('slika', 100, onLoadFunk, '.grid_galery');