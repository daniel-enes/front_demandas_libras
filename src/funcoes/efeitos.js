
function toogleLoading(load) {
    const loading = document.getElementById("loading").classList
    if(load) {
        loading.add("container_loading")
        loading.remove("display_none")
    } else {
        loading.add("display_none")
        loading.remove("container_loading")
    }
}

function show(e) {
    const element = document.querySelector(e).classList
    return new Promise((resolve) => {
        //element.classList.remove("display_none")
        /*if(!element.contains('display_none')) {
            element.add("display_none")
        }*/
        element.remove("display_none")
        resolve(e)
    })
}

function close(e) {
    const element = document.querySelector(e).classList
    element.add("display_none")
}

function toFocus(e) {
    let element = document.querySelector(e)
    element.focus()
}

export {toogleLoading, toFocus, show, close}