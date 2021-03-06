//Url de la api para hacer las peticiones
const api_url = "https://bsale-test-store.herokuapp.com";

//Con el evento DOMContentLoaded, una vez que el HTML está completamente cargado y el árbol DOM está construido se ejecuta la función getProducts para traer la data y posteriormente renderizarla
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const products = await getProducts();
    await fillProductsInCards(products);
  } catch (error) {
    console.log(error);
  }
});
//Función que permite traer todos los productos de la api con axios y el metodo get
const getProducts = async () => {
  try {
    const { data } = await axios.get(`${api_url}/api/products`);
    return data;
  } catch (error) {
    console.log("Error", error);
  }
};
//Función que permite traer todos los productos que se usa en la seccion del navbar
const getAllProducts = async () => {
  try {
    const data = await getProducts();
    await fillProductsInCards(data);
  } catch (error) {
    console.log("Error", error);
  }
};
//Funcion que permite crear y llenar en el DOM cada card de los productos obtenidos de la api
const fillProductsInCards = async (products) => {
  //Método Jquery el cual se utiliza para remover elementos seleccionados en el DOM
  //Cada vez que se llama a esta funcion,  se eliminan las cards para renderizarlas nuevamente
  $(".product-card").remove();

  const contenedor = document.querySelector("#product-container");
  //Método para recorrer el arreglo de productos junto con sus propiedades para llenarlos en las cards
  products.forEach(({ name, url_image, price, discount }) => {
    //Crear elemento div y asignarle clases de bootstrap
    const cardDiv = document.createElement("div");
    cardDiv.classList.add(
      "col-lg-3",
      "col-md-4",
      "col-sm-6",
      "mb-4",
      "product-card"
    );
    //Construcción de la Card con la información del método ForEach
    cardDiv.innerHTML += `
   
                        <div class="card h-100">
                            <!-- Sale badge-->
                            ${
                              //Operador ternario para cuando algun producto tenga descuento, muestre en la card un badge que está en oferta
                              discount > 0
                                ? `<h5><span class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem"> ${discount}%</span></h5>
                                <h5> <span class="badge bg-danger text-white position-absolute" style="top: 0.5rem; left: 0.5rem"> oferta</span></h5>
                            <!-- Product image-->`
                                : ""
                            }
                            
                            <img class="card-img-top" src="${
                              //operador ternario para cuando un producto no tenga imagen, muestra una imagen dummy
                              url_image == "" || url_image == null
                                ? `https://www.cuestalibros.com/content/images/thumbs/default-image_550.png`
                                : url_image
                            }" alt="..." />
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">${name}</h5>
                                    
                                    <!-- Product price-->
                                    
                                    ${
                                      //operador ternario para hacer descuento en le precio de producto si asi lo aplica
                                      discount > 0
                                        ? ` <span class="text-muted text-decoration-line-through">$${
                                            ((100 - discount) * price) / 100
                                          }</span>
                                          <span class="ex-price">$${price}</span>`
                                        : `<span class="text-muted text-decoration-line-through">$${price}</span>`
                                    }
                                    
                                </div>
                            </div>
     `;
    //Adjuntar elemento div que contienen las cards de los productos a su div padre
    contenedor.appendChild(cardDiv);
  });
};
// Función para buscar productos en la api. Opera con el evento onkeyup, significa que a medida que el usuario teclea (al soltar la tecla específicamente) la busqueda se va realizando al instante
const searchProducts = async () => {
  let searchInput = document.querySelector("#search-input").value;

  try {
    const { data } = await axios.get(`${api_url}/api/products/${searchInput}`);
    console.log(data);
    await fillProductsInCards(data);
  } catch (error) {
    console.log("Error", error);
  }
};
// Función encargada de de traer los datos de la categpria seleccionada en el searchbar para luego llenar los datos en pantalla.
const getProductsByCategory = async (category) => {
  try {
    const {
      data: [{ Products }],
    } = await axios.get(`${api_url}/api/categories/${category}`);

    await fillProductsInCards(Products);
  } catch (error) {
    console.log("Error", error);
  }
};
