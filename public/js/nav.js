document.addEventListener("DOMContentLoaded", function () {
    // Activate sidebar nav
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    // load page content
    let page = window.location.hash.substr(1);
    if (page == "") page = "klasemen";
    loadPage(page);
});

function loadNav() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status !== 200) return;

            // Muat daftar tautan menu
            document.querySelectorAll(".topnav, .sidenav").forEach(elm => elm.innerHTML = xhttp.responseText
            );

            // daftarkan event listener untuk setiap tautan
            document.querySelectorAll(".sidenav a, .topnav a").forEach(function (elm) {
                elm.addEventListener("click", function (event) {
                    //   tutup sidenav
                    let sidenav = document.querySelector(".sidenav");
                    M.Sidenav.getInstance(sidenav).close();

                    // muat konten halaman yang dipanggil
                    page = event.target.getAttribute("href").substr(1);
                    loadPage(page);
                });
            });
        }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
}

function loadPage(page) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            let content = document.querySelector("#body-content");
            switch (page) {
                case 'klasemen':
                    getKlasemen();
                    getKlasemenSerieA();
                    getKlasemenInggris();
                    break;
                case 'infoAllTim':
                    getTIM();
                    getTIM_A();
                    getTIM_B();
                    break;
                case 'saved':
                    getSimpanTim();
                    break;
                default:
                    getKlasemen();
            }

            if (this.status === 200) {
                content.innerHTML = xhttp.responseText;
            } else if (this.status === 404) {
                content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
            } else {
                content.innerHTML = "<p>Ups... Halaman tidak dapat diakses.</p>";
            }
        }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
}