// Declaración de variables, constantes y arrays
const productos = ["Ficus Rubi", "Yuca Triple", "Potus Baby", "Sansevieria", "Peperomia Tricolor"];
const precios = [35000, 18000, 12000, 5000, 8000];
let cantidades = [];
const IVA = 0.21; // 21% de IVA

// Función para mostrar productos y solicitar la selección del usuario
function mostrarProductos() {
    let mensaje = "Seleccione el producto que desea comprar:\n";
    for (let i = 0; i < productos.length; i++) {
        mensaje += (i + 1) + ". " + productos[i] + " - $" + precios[i] + "\n";
    }
    let seleccion = parseInt(prompt(mensaje)) - 1;
    
    while (isNaN(seleccion) || seleccion < 0 || seleccion >= productos.length) {
        alert("Por favor, ingrese una opción válida.");
        seleccion = parseInt(prompt(mensaje)) - 1;
    }
    
    console.log("Producto seleccionado:", productos[seleccion]);
    
    return seleccion;
}

// Función para solicitar la cantidad de productos
function solicitarCantidad() {
    let cantidad = parseInt(prompt("¿Cuántas unidades desea comprar?"));
    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor, ingrese un número válido.");
        return solicitarCantidad();
    }

    console.log("Cantidad seleccionada:", cantidad);

    return cantidad;
}

// Función para calcular el total con descuento e IVA
function calcularTotalConIVA() {
    let totalSinIVA = 0;
    for (let i = 0; i < cantidades.length; i++) {
        if (cantidades[i]) {
            let subtotal = cantidades[i] * precios[i];
            if (cantidades[i] >= 5) {
                subtotal *= 0.9; // 10% de descuento por más de 5 unidades
            }
            totalSinIVA += subtotal;
        }
    }

    let totalConIVA = totalSinIVA * (1 + IVA);

    console.log("Total calculado sin IVA:", totalSinIVA);
    console.log("Total calculado con IVA:", totalConIVA);

    return { totalSinIVA, totalConIVA };
}

// Función Principal
function iniciarSimulador() {
    let continuar = true;
    while (continuar) {
        let seleccion = mostrarProductos();
        let cantidad = solicitarCantidad();
        cantidades[seleccion] = (cantidades[seleccion] || 0) + cantidad;

        console.log("Estado de las cantidades:", cantidades);

        continuar = confirm("¿Desea comprar otro producto?");
    }

    let mensaje = "Resumen de su compra:\n";
    for (let i = 0; i < productos.length; i++) {
        if (cantidades[i]) {
            let subtotal = cantidades[i] * precios[i];
            let descuento = "";
            if (cantidades[i] >= 5) {
                subtotal *= 0.9;
                descuento = " (10% de descuento aplicado)";
            }
            mensaje += productos[i] + ": " + cantidades[i] + " unidades - $" + subtotal + descuento + "\n";
        }
    }

    const totales = calcularTotalConIVA();
    mensaje += "Subtotal sin IVA: $" + totales.totalSinIVA.toFixed(2) + "\n";
    mensaje += "Total con IVA: $" + totales.totalConIVA.toFixed(2);
    alert(mensaje);

    console.log("Resumen de la compra:", mensaje);
}

iniciarSimulador();
