
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

export {toogleLoading}