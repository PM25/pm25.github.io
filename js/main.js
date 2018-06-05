document.getElementById("show-sidenav-btn").addEventListener("click", open_sidenav);
document.getElementById("hide-sidenav-btn").addEventListener("click", close_sidenav);

function open_sidenav()
{
    document.getElementById("side-nav").className = "show-sidenav"
}

function close_sidenav()
{
    document.getElementById("side-nav").className = "";
}