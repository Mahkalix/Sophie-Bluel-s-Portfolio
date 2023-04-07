let elementArray

async function fetchDataWorks() {
    try {
        const response = await fetch('http://localhost:5678/api/works')
        const data = await response.json()
        // console.log(data);
        AddGallery(data)
        AddGalleryModale(data)
        elementArray = data

    }
    catch (error) {
        console.log(error);
    }
}
async function fetchCategoriesWorks() {
    try {
        const response = await fetch('http://localhost:5678/api/categories')
        const dataCategories = await response.json()
        // console.log(categories);
        AddBtn(dataCategories)
    }
    catch (error) {
        console.log(error);
    }
}

fetchDataWorks()
fetchCategoriesWorks()

// Création Gallery
const gallery = document.querySelector(".gallery")
// console.log(gallery);

function AddGallery(data) {
    data.forEach(element => {
        // console.log(element.imageUrl, element.title);
        const figure = `<figure>
				<img src=${element.imageUrl} alt=${element.title}>
				<figcaption>${element.title}</figcaption>
			</figure>`
        gallery.innerHTML += figure
        // gallery.innerHTML = figure + gallery.innerHTML
    });
}

// Création Btn Js 

const allBtn = document.querySelector(".allBtn")
// console.log(allBtn);
function AddBtn(categories) {
    // Création Btn + Class
    categories.forEach(element => {
        // console.log(element.name, element.id);
        const button = `<button class="btn" id=${element.id}>${element.name}</button>`
        allBtn.innerHTML += button
        // allBtn.innerHTML = button + allBtn.innerHTML 
    });
    Filters()
};

// Trie Filters 

function Filters() {
    const btns = document.getElementsByClassName("btn")
    // console.log(btns)

    for (let i = 0; i < btns.length; i++) {


        btns[i].addEventListener("click", () => {
            const filterbtn = elementArray.filter(element => {
                return element.categoryId === i
            });
            btns[0].classList.remove("active")
            btns[1].classList.remove("active")
            btns[2].classList.remove("active")
            btns[3].classList.remove("active")
            btns[i].classList.add("active")
            console.log(filterbtn);

            // Reset
            document.querySelector(".gallery").innerHTML = "";
            // J'ajoute à la gallerie les images ayant toute les categorieID 
            AddGallery(filterbtn)
        });

        // btn Tous
        btns[0].addEventListener("click", () => {
            const filterTous = elementArray.filter(element => {
                return element.categoryId
            });
            btns[0].classList.add("active")
            btns[i].classList.remove("active")
            console.log(filterTous);

            // Reset
            document.querySelector(".gallery").innerHTML = "";
            // J'ajoute à la gallerie les images ayant toute les categorieID 
            AddGallery(filterTous)
        });
    };
}


// Mode edition si login 

const log = document.querySelector(".log");
const banner = document.querySelector(".banner");
const modifierContainer = document.querySelector(".modifier-container");
const modifierprojetsContainer = document.querySelector(".modifier-projets-container");
const projetsContainer = document.querySelector(".projets-container")

function editMode() {
    if (localStorage.login) {
        banner.style = "display: flex"
        log.innerText = "logout",
            modifierContainer.style = "display: flex"
        modifierprojetsContainer.style = "display: flex;"
        projetsContainer.style = "margin-bottom: 92px;"
        allBtn.style = "display:none"

        console.log("Vous êtes connecté !");
    }
    else {
        console.log("Vous n'êtes pas connecté !");
    }
}

editMode()

// "logout", supprime true et token et remplace lo
log.addEventListener("click", () => {
    localStorage.removeItem("login");
    localStorage.removeItem("token");
    log.innerText = "login";
});

// Modal1 Toggle ouvert et fermer 

const modal2 = document.querySelector(".modal-container2")
const modal1 = document.querySelector(".modal-container");
const modalOpen = document.querySelectorAll(".modal-open");
const modalClose = document.querySelectorAll(".modal-close");
const AddPicture = document.querySelector(".addpicture");

modalOpen.forEach(trigger => trigger.addEventListener("click", OpenModal,))

function OpenModal() {
    modal1.classList.add("active")
}

modalClose.forEach(trigger => trigger.addEventListener("click", CloseModal,))

function CloseModal() {
    modal1.classList.remove("active")
    modal2.classList.remove("active")
}

const arrowBack = document.querySelector(".arrowback");

arrowBack.addEventListener("click", () => {
    modal1.classList.add("active")
    modal2.classList.remove("active")
});


// btn ajouter des photos 
AddPicture.addEventListener("click", () => {
    modal2.classList.add("active")
    modal1.classList.remove("active")

});


// Injecter les images dans la modal 1, et les supp 
const imgContainer = document.querySelector(".img-container");
const token = localStorage.token;

function AddGalleryModale(data) {

    data.forEach(element => {
        // console.log(element.imageUrl, element.title);
        const figure = `<figure class="element-modal">
                <img class="logobin" id="${element.id}" src="./assets/icons/bin.svg" alt="">
				<img class="img-modal" src=${element.imageUrl} alt=${element.title}>
				<figcaption>éditer</figcaption>
			</figure>`
        imgContainer.innerHTML += figure

    });

    // Suppression des images 

    const deleteTrash = document.querySelectorAll(".logobin");
    // console.log(deleteTrash)
    deleteTrash.forEach(element => {
        element.addEventListener("click", () => {
            FetchDeleteWorks(element.id)

        });
    });

    async function FetchDeleteWorks(id) {
        console.log(id);
        const response = await fetch("http://" + window.location.hostname + `:5678/api/works/${id}`, {
            method: "DELETE",
            headers: {
                accept: "*/*",
                Authorization: `Bearer ${token}`
            }
        });
    }
};

// Ajout images
const AddPic = document.querySelector(".addpic")
console.log(AddPic)
const previewImg = document.querySelector(".preview-image")
let imageForm = "";
let categoryForm = "";
let titleForm;


function AddImage() {
    AddPic.addEventListener("input", (e) => {
        console.log(AddPic.files[0]);
    imageForm = e.target.files[0];
    const img = URL.createObjectURL(imageForm);
    previewImg.src = img;
    previewImg.style.setProperty("display", "block");
    imgContainer.style.setProperty("display", "none");
  });
}