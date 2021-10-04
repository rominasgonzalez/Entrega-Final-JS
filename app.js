const carrito = document.getElementById('carrito');
const burger = document.getElementById('lista-burger');
const listaBurger = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners () {
    burger.addEventListener('click', comprarBurger);
    carrito.addEventListener('click', eliminarBurger);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    document.addEventListener('DOMContentLoaded', leerLocalStorage)
}

function comprarBurger(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const burger = e.target.parentElement.parentElement;
        leerDatosCafe(burger);
    }
}

function leerDatosBurger(burger) {
    const infoBurger = {
        imagen: burger.querySelector('img').src,
        titulo: burger.querySelector('h6').textContent,
        precio: burger.querySelector('.card  text').textContent,
        id: burger.querySelector('a').getAttribute('date-id')
    }
    insertarCarrito(infoBurger);
}

function insertarCarrito(burger) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${burger.imagen}" width=100>
        </td>
        <td>${burger.titulo}</td>
        <td>${burger.precio}</td>
        <td>
            <a href="#" class="borrar-burger" data-id="${burger.id}">X</a>
        </td>
    `;
    listaBurger.appendChild(row);
    guardarBurgerLocalStorage(burger);
}


function eliminarBurger(e) {
    e.preventDefault();

    let burger,
    burgerId;
    if(e.target.classList.contains('borrar-burger')){
        e.target.parentElement.parentElement.remove();
        burger = e.target.parentElement.parentElement;
        burgerId = burger.querySelector('a').getAttribute('data-id');
    }
    eliminarBurgerLocalStorage(burgerId);
}

function vaciarCarrito() {
    while(listaBurger.firstChild){
        listaBurger.removeChild(listaBurger.firstChild);

    }

    vaciarLocalStorage();
    return false;
}

//nuevo
function guardarBurgerLocalStorage(burger) {
  let burger;
  burger = obtenerBurgerLocalStorage();
  burger.push(burger);
  localStorage.setItem('burger', JSON.stringify(burger))
}

function obtenerBurgerLocalStorage() {
  let burgerLS;

  if(localStorage.getItem('burger') === null){
      burgerLS = [];
  } else {
      burgerLS = JSON.parse(localStorage.getItem('burger'));
  }
  return burgerLS;
}

function leerLocalStorage() {
  let burgerLS;

  burgerLS = obtenerBurgerLocalStorage();

  burgerLS.forEach(function(burger){
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>
              <img src="${burger.imagen}" width=100> 
          </td>
          <td>${burger.titulo}</td>
          <td>${burger.precio}</td>
          <td>
              <a href="#" class="borrar-burger" data-id="${burger.id}">X</a>
          </td>
      `;
      listaBurger.appendChild(row);
  });

}

function eliminarBurgerLocalStorage(burger) {
  let burgerLS;

  burgerLS = obtenerBurgerLocalStorage();

  burgerLS.forEach(function(burgerLS, index){
      if(burgerLS.id === burger) {
          burgerLS.splice(index, 1)
      }
  });

  localStorage.setItem('burger', JSON.stringify(burgerLS));
}

function vaciarLocalStorage() {
  localStorage.clear();
}
// ----------------------------------------------------- //
 // ----------------------------------------------------- //
 for (const categoria of listaCategorias) {
  $(".categorias-container").append(`
  <button href="#" class="btn shadow-none btn-drop-shadow p-0 col-lg-2 col-md-3 col-sm-4 col-xs-6 gy-4 gy-lg-0"
  id=${categoria.id}>
    <div class="btn-categoria-container">
    <div class="btn-categoria">
    <img src=${categoria.image} alt="">
    <p class="d-none d-sm-block">${categoria.name}</p>
    </div>
    </div>
    <p class="d-sm-none d-block mb-4 mt-1 fw-bold">${categoria.name}</p>
  </button>
  `);
// ----------------------------------------------------- //


// BURGER FILTER
//$(document).ready(function () {

 //   $(".filter-button").click(function () {
//      var value = $(this).attr('data-filter');
  
 //     if (value == "all") {
  
 //       $('.filter').show('1000');
 //     } else {
  
//        $(".filter").not('.' + value).hide('3000');
 //       $('.filter').filter('.' + value).show('3000');
  
//      }
  
  
 //     if ($(".filter-button").removeClass("active")) {
  //      $(this).removeClass("active");
  //    }
 //     $(this).addClass("active");
  
 //   });
  
 // }); }
