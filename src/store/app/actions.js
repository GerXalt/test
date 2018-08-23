export function createImage(data){
    return (dispatch, getState)=>{
        let img = new Image();
        img.onload = function(){
            dispatch({
                type: 'CREATE_ELEMENT',
                data: {
                    type: 'image',
                    keepAspectRatio: true,
                    y: 0,
                    x: 0,
                    width: img.width,
                    height: img.height,
                    data
                }
            });
        };
        img.src = data.image;
    }
}

export function createVideo(data){
    return (dispatch, getState) => {
        let img = new Image();
        img.onload = function(){
            dispatch({
                type: 'CREATE_ELEMENT',
                data: {
                    type: 'video',
                    keepAspectRatio: false,
                    y: 0,
                    x: 0,
                    width: img.width,
                    height: img.height,
                    data
                }
            });
        };
        img.src = data.image;
    };
}

export function moveElement(data){
    return {
        type: 'MOVE_ELEMENT',
        data
    }
}

export function resizeElement(data){
    return {
        type: 'MOVE_ELEMENT',
        data
    }
}