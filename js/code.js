// ============================================================
// CURRENCY EXPLORER · STARTER PROJECT
// Archivo principal de trabajo para las misiones de JavaScript
// ============================================================

// 1. REFERENCIAS AL DOM
const cantidad = document.querySelector("#cantidad");
const origen = document.querySelector("#origen");
const destino = document.querySelector("#destino");
const btnConvertir = document.querySelector("#convertir");
const btnIntercambiar = document.querySelector("#intercambiar");
const resultado = document.querySelector("#resultado");
const resultadoTexto = document.querySelector("#resultadoTexto");
const detalleTasa = document.querySelector("#detalleTasa");
const fechaInicio = document.querySelector("#fechaInicio");
const fechaFin = document.querySelector("#fechaFin");
const btnHistorico = document.querySelector("#consultarHistorico");
const historicoMensaje = document.querySelector("#historicoMensaje");
const grafica = document.querySelector("#grafica");

// 2. EVENTOS
btnConvertir.addEventListener("click", convertirMoneda);
btnIntercambiar.addEventListener("click", intercambiarMonedas);
cantidad.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    convertirMoneda();
  }
});
origen.addEventListener("change", () => {
  if (cantidad.value && Number(cantidad.value) > 0) {
    convertirMoneda();
  }
});
destino.addEventListener("change", () => {
  if (cantidad.value && Number(cantidad.value) > 0) {
    convertirMoneda();
  }
});

btnHistorico.addEventListener("click", consultarHistorico);

const hoy = new Date();
const semanaPasada = new Date(hoy);
semanaPasada.setDate(hoy.getDate() - 7);
fechaFin.value = formatearFecha(hoy);
fechaInicio.value = formatearFecha(semanaPasada);

// 3. FUNCIÓN PRINCIPAL
async function convertirMoneda() {
  // Misiones guiadas 1-3: ya existe un flujo mínimo funcional EUR -> USD.
  // A partir de la Misión 4 debes convertirlo en una solución dinámica.

  const valor = Number(cantidad.value);

  // TODO · MISIÓN 07: sustituir esta validación mínima por una validación completa.
  if (isNaN(valor) || !Number.isFinite(valor) || valor <= 0) {
    mostrarError("Escribe una cantidad valida");
    return;
  }

  // TODO · MISIÓN 04: reemplazar EUR y USD por los valores elegidos en los <select>.
  const monedaOrigen = origen.value;
  const monedaDestino = destino.value;

  if (monedaOrigen === monedaDestino) {
    mostrarError("Elige monedas diferentes para convertir.");
    return;
  }

  const url = `https://api.frankfurter.dev/v2/rate/${monedaOrigen}/${monedaDestino}`;

  try {
    // TODO · MISIÓN 08: activar un estado visual de carga antes de consultar.
    activarEstadoCarga(true);

    const respuesta = await fetch(url);

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    // TODO · MISIÓN 09: comprobar response.ok y lanzar un error si corresponde.
    const datos = await respuesta.json();

    if (!Number.isFinite(datos.rate)) {
      throw new Error("La API no devolvió una tasa válida.");
    }

    const conversion = valor * datos.rate;

    resultado.classList.remove("error");
    resultadoTexto.textContent = `${valor.toFixed(2)} ${monedaOrigen} = ${conversion.toFixed(2)} ${monedaDestino}`;
    detalleTasa.textContent = `1 ${monedaOrigen} = ${datos.rate} ${monedaDestino} · ${datos.date}`;
  } catch (error) {
    // TODO · MISIÓN 09: mejora el mensaje y analiza qué errores pueden llegar aquí.
    if (!navigator.onLine) {
      mostrarError("No hay conexión a Internet.");
    } else if (error.name === "TypeError") {
      mostrarError("No fue posible conectar con el servicio.");
    } else if (error.message.startsWith("Error HTTP")) {
      mostrarError("No se pudo obtener la tasa para esas monedas.");
    } else {
      mostrarError(error.message || "No fue posible completar la consulta.");
    }
    console.error(error);
  } finally {
    activarEstadoCarga(false);
  }
}

function intercambiarMonedas() {
  // TODO · MISIÓN 06:
  // 1) guardar temporalmente el valor de origen
  // 2) intercambiar origen.value y destino.value
  // 3) volver a calcular
  const temp = origen.value;
  origen.value = destino.value;
  destino.value = temp;
  convertirMoneda();
}

// 4. UTILIDADES DE INTERFAZ
function activarEstadoCarga(cargando) {
  btnConvertir.disabled = cargando;
  btnIntercambiar.disabled = cargando;
  btnConvertir.textContent = cargando ? "Consultando..." : "Convertir";
}

function mostrarError(mensaje) {
  resultado.classList.add("error");
  resultadoTexto.textContent = mensaje;
  detalleTasa.textContent = "Revisa los datos e inténtalo nuevamente.";
}

async function consultarHistorico() {
  const de = origen.value;
  const a = destino.value;

  if (de === a || !fechaInicio.value || !fechaFin.value || fechaInicio.value > fechaFin.value) {
    mostrarMensajeHistorico("Revisa las monedas y las fechas.");
    return;
  }

  const url = `https://api.frankfurter.dev/v1/${fechaInicio.value}..${fechaFin.value}?base=${de}&symbols=${a}`;
  btnHistorico.disabled = true;
  btnHistorico.textContent = "Consultando...";

  try {
    const datos = await (await fetch(url)).json();
    const fechas = Object.keys(datos.rates).sort();
    const tasas = fechas.map((fecha) => datos.rates[fecha][a]);

    if (!fechas.length) throw new Error("Sin datos");

    dibujarGrafica(fechas, tasas, de, a);
    mostrarMensajeHistorico(`${fechas.length} tasas encontradas.`);
  } catch (error) {
    console.error(error);
    mostrarMensajeHistorico("No fue posible obtener la evolución de la tasa.");
  } finally {
    btnHistorico.disabled = false;
    btnHistorico.textContent = "Ver evolución";
  }
}

let miGrafica;

function dibujarGrafica(fechas, tasas, monedaOrigen, monedaDestino) {
  miGrafica?.destroy();

  miGrafica = new Chart(grafica, {
    type: "line",
    data: {
      labels: fechas,
      datasets: [{
        label: `1 ${monedaOrigen} = ${monedaDestino}`,
        data: tasas,
        borderColor: "#16758b",
        backgroundColor: "rgba(22, 117, 139, 0.12)",
        borderWidth: 3,
        tension: 0.3,
        fill: true,
      }],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        x: { title: { display: true, text: "Fecha" } },
        y: { title: { display: true, text: "Tasa de cambio" } },
      },
    },
  });
}

function mostrarMensajeHistorico(mensaje) {
  historicoMensaje.textContent = mensaje;
}

function formatearFecha(fecha) {
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${año}-${mes}-${dia}`;
}

// PISTA PARA EL RETO:
// origen.value        -> moneda seleccionada como origen
// destino.value       -> moneda seleccionada como destino
// cantidad.value      -> texto escrito en el input
// Number(...)         -> convierte texto a número
// response.ok         -> indica si la respuesta HTTP fue satisfactoria
// resultado.textContent -> permite modificar texto del DOM
