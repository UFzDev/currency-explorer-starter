## CASO PRÁCTICO DE EVALUACIÓN | JAVASCRIPT + API + PAIR PROGRAMMING

Currency Explorer • Frontend colaborativo con datos reales

## Página 1

## CURRENCY EXPLORER

Caso práctico colaborativo · Pair Programming · Consumo de una API pública

## HTML • CSS • JAVASCRIPT • FETCH • JSON • DOM • GIT

target

## META

## PROPÓSITO DEL CASO

Construir, en parejas, una aplicación web que convierta
importes entre divisas utilizando información real. El
objetivo no es memorizar una receta de fetch(), sino
comprender el recorrido completo de los datos: solicitud
HTTP → respuesta JSON → objeto JavaScript → cálculo
→ actualización del DOM.

- Contexto del reto
  Una organización con usuarios internacionales necesita una herramienta web sencilla para consultar equivalencias entre
  monedas. La solución deberá ser clara, responsive y capaz de obtener el tipo de cambio desde un servicio externo. El
  equipo desarrollará Currency Explorer: un conversor de divisas que evolucionará, misión a misión, desde una primera
  consulta hasta una interfaz funcional y robusta.

## ?

## REFLEXIONA

## PREGUNTA GUÍA

¿Cómo puede una página HTML obtener información
que no existe dentro de sus propios archivos y
transformarla en una experiencia interactiva para el
usuario?
Antes de responder con código, identifica qué información debe viajar
por la red y qué parte debe resolver JavaScript.

- Antes de programar: Pair Programming
  Pair Programming es una práctica de desarrollo colaborativo en la que dos estudiantes trabajan sobre el mismo
  problema y el mismo código. No significa “dividir el trabajo en dos”; significa pensar, construir, probar y explicar juntos,
  alternando responsabilidades.

## ROL RESPONSABILIDAD ACTIVA

DRIVER · conduce el código Escribe, ejecuta y verbaliza lo que está haciendo. Convierte las decisiones de la pareja en
código y prueba cada cambio.
NAVIGATOR · observa el conjunto Revisa la lógica, anticipa errores, consulta documentación, cuestiona supuestos y propone el
siguiente paso. No es un observador pasivo.

## CASO PRÁCTICO DE EVALUACIÓN | JAVASCRIPT + API + PAIR PROGRAMMING

Currency Explorer • Frontend colaborativo con datos reales

## Página 2

## ↔

## PAIR WORK

## REGLA ESENCIAL

Al finalizar cada misión se intercambian los roles. Una
misión sólo está terminada cuando ambos integrantes
pueden explicar qué hace el código, qué datos utiliza y
por qué funciona.
Evidencia sugerida: un commit por misión indicando Driver y

## Navigator.

## ?

## REFLEXIONA

## PIENSA ANTES DE CONTINUAR

Si el Driver escribe todo el código y el Navigator sólo
observa, ¿se está realizando realmente Pair
Programming? ¿Qué acciones concretas debería realizar
el Navigator?

- La fuente de datos: Frankfurter API
  Frankfurter es una API pública de tipos de cambio. La API pública se consume mediante HTTPS, no requiere cuenta ni
  API key y devuelve JSON. Sus tipos se actualizan diariamente y combina información de bancos centrales y fuentes
  oficiales. Para esta práctica interesa especialmente el endpoint que devuelve un solo par de divisas.

## CARACTERÍSTICA REFERENCIA

API pública Frankfurter
Acceso HTTPS · sin API key · sin registro
Formato JSON
Datos Tipos actuales, históricos y series temporales
Tipo individual /v2/rate/{origen}/{destino}
Listado de divisas /v2/currencies
Documentación frankfurter.dev

Ejemplo de consulta:
GET https://api.frankfurter.dev/v2/rate/eur/usd
Respuesta simplificada:

## {

"date": "AAAA-MM-DD",
"base": "EUR",
"quote": "USD",

## "rate": 1.12...

## }

## CASO PRÁCTICO DE EVALUACIÓN | JAVASCRIPT + API + PAIR PROGRAMMING

Currency Explorer • Frontend colaborativo con datos reales

## Página 3

## ?

## REFLEXIONA

## LEE EL JSON COMO UN OBJETO

¿Es un arreglo o un objeto? ¿Qué propiedad necesitas
para realizar la conversión? ¿Cómo accederías a esa
propiedad desde JavaScript?
Pista: identifica primero el nombre de la propiedad; después piensa
en la notación punto.

- Modelo mental: ¿qué significa consumir una API?

## 1 2 3 4 5 6

USUARIO EVENTO fetch() API JSON DOM

La aplicación no “conoce” el tipo de cambio. Debe solicitarlo, esperar la respuesta, interpretar el JSON y decidir qué
hacer con el valor recibido. Ese recorrido es el centro conceptual de la práctica.

## ?

## REFLEXIONA

## RAZONA SOBRE EL TIEMPO

¿Qué parte del flujo ocurre en la red y qué parte ocurre
dentro del navegador? ¿Qué debería ver el usuario si la
red tarda varios segundos?

- Caja de herramientas JavaScript
  No necesitas memorizar todas las instrucciones. Utiliza esta referencia como mapa de posibilidades. La evaluación se
  centra en que puedas elegir y explicar la herramienta adecuada.

## HERRAMIENTA ¿PARA QUÉ SIRVE? EJEMPLO MÍNIMO

document.querySelector() Localiza un elemento del DOM. const boton = document.querySelector("#consultar");
addEventListener() Ejecuta una función cuando ocurre un evento. boton.addEventListener("click", convertir);
async / await Permite esperar operaciones asíncronas sin bloquear la
interfaz.
const r = await fetch(url);
fetch() Realiza una solicitud HTTP. const r = await fetch(url);
response.ok Indica si la respuesta HTTP fue satisfactoria. if (!r.ok) throw new Error("Error");
response.json() Interpreta el cuerpo JSON de la respuesta. const datos = await r.json();
Number() Convierte texto a número. const n = Number(input.value);
Number.isFinite() Comprueba que el valor sea un número finito. Number.isFinite(n)
toFixed(2) Formatea un número con dos decimales. total.toFixed(2)
textContent Actualiza texto visible de un elemento. salida.textContent = "Listo";
template literal Construye texto incorporando variables. `${base}/${quote}`
try / catch Maneja errores sin romper la aplicación. try { ... } catch (e) { ... }

## CASO PRÁCTICO DE EVALUACIÓN | JAVASCRIPT + API + PAIR PROGRAMMING

Currency Explorer • Frontend colaborativo con datos reales

## Página 4

## HERRAMIENTA ¿PARA QUÉ SIRVE? EJEMPLO MÍNIMO

Array.map() Transforma cada elemento de un arreglo. datos.map(item => item.rate)
Array.find() Localiza un elemento que cumple una condición. lista.find(x => x.iso_code === "MXN")

## {}

## JS TOOLKIT

## NO ES UNA RECETA

La tabla anterior es una referencia. Antes de copiar una
función, explica qué problema concreto resuelve en tu
aplicación.
4.1 Starter Project · conoce la estructura antes de programar
Para acelerar el desarrollo, la práctica inicia con un proyecto base. La interfaz y la organización de archivos ya están
preparadas; la lógica esencial se construirá progresivamente en JavaScript. Antes de modificar el código, identifica qué
responsabilidad tiene cada archivo y cómo se conectan entre sí.

## STARTER

## PROJECT

currency-explorer/
├── index.html
├── css/
│ └── styles.css
├── js/
│ └── code.js
└── README.md

## MAPA DE RESPONSABILIDADES

Archivo Responsabilidad Uso durante la práctica
index.html ¿Qué existe? Estructura semántica de
la interfaz.
Reconocer ids, inputs, selectores,
botones y zonas de salida.
css/styles.css ¿Cómo se ve? Presentación, estados y
responsive.
La base visual está preparada; se
completan estados y ajustes finales.
js/code.js ¿Qué hace? Eventos, API, cálculos y

## DOM.

Archivo principal de trabajo. Incluye
funciones y TODO por misión.
README.md ¿Cómo se documenta? Evidencia y
decisiones.
Registrar integrantes, roles, commits,
decisiones y reflexión final.

## ANTES DE ESCRIBIR CÓDIGO

## ?

Explora el Starter Project y responde en pareja:

- ¿Dónde se enlaza styles.css y dónde se enlaza
  code.js?
- ¿Qué id tiene el botón principal? ¿Qué elemento
  recibirá el resultado?
- Si JavaScript necesita leer la moneda origen, ¿qué
  elemento del HTML deberá localizar?
- ¿Por qué conviene separar estructura, presentación y
  comportamiento?

RUTA DE TRABAJO EN code.js
El archivo code.js está organizado en cuatro zonas: ① referencias al DOM, ② eventos, ③ funciones de la aplicación y
④ utilidades de interfaz. Las misiones se identifican mediante comentarios TODO. No borres esos comentarios hasta
comprobar que la misión funciona y ambos integrantes puedan explicarla.

## CASO PRÁCTICO DE EVALUACIÓN | JAVASCRIPT + API + PAIR PROGRAMMING

Currency Explorer • Frontend colaborativo con datos reales

## Página 5

## JS TOOLKIT · REFERENCIA RÁPIDA

Si necesitas... Herramienta Idea clave
Localizar / leer interfaz
querySelector() · .value
El DOM conecta HTML y JavaScript.
Responder a una acción
addEventListener()
El evento dispara una función.
Convertir / validar
Number() · Number.isFinite()
Los inputs entregan texto.
Construir el endpoint

## `${variable}`

La URL puede depender del usuario.
Consultar / esperar
fetch() · async/await
La red es asíncrona.
Interpretar / validar HTTP
response.json() · response.ok
HTTP y JSON son pasos distintos.
Mostrar / formatear
textContent · toFixed()
Transforma el dato para el usuario.
Controlar fallos
try/catch
La interfaz debe recuperarse con claridad.
Importante: esta caja de herramientas orienta; no indica qué línea exacta debes escribir. La decisión de cómo combinar estas herramientas forma
parte del reto.

- Desarrollo guiado · Misión 1: primera conexión
  Objetivo: realizar una primera consulta EUR → USD y comprobar que los datos llegan al navegador. Trabaja sobre el
  Starter Project entregado: no reconstruyas la interfaz desde cero. En esta etapa no se busca modificar el diseño; se
  busca comprender la comunicación y completar el flujo guiado en js/code.js.
  Paso 1 · HTML mínimo

<h1>Currency Explorer</h1>
<button id="consultar">Consultar EUR / USD</button>
<p id="resultado">Esperando consulta...</p>
<script src="app.js"></script>

## ?

## REFLEXIONA

## ANTES DE PROGRAMAR

¿Por qué asignamos un id al botón y al párrafo? ¿Cómo
podría JavaScript localizar esos elementos?
Paso 2 · Escuchar al usuario
const boton = document.querySelector("#consultar");
boton.addEventListener("click", obtenerTipoCambio);

## ?

## REFLEXIONA

## FUNCIÓN VS. LLAMADA

¿Qué diferencia hay entre pasar obtenerTipoCambio
como respuesta al evento y escribir
obtenerTipoCambio()?

## CASO PRÁCTICO DE EVALUACIÓN | JAVASCRIPT + API + PAIR PROGRAMMING

Currency Explorer • Frontend colaborativo con datos reales

## Página 6

Paso 3 · Consultar la API
async function obtenerTipoCambio() {
const url = "https://api.frankfurter.dev/v2/rate/eur/usd";
const respuesta = await fetch(url);
const datos = await respuesta.json();
console.log(datos);

## }

## ✓

## CHECKPOINT

## CHECKPOINT 1

Abre DevTools → Console. Al hacer clic debe aparecer
el objeto recibido. Después abre Network y localiza la
solicitud: URL, método, código de estado y respuesta.
No continúes hasta poder explicar qué observaste en Console y

## Network.

## ?

## REFLEXIONA

## ASINCRONÍA

¿Por qué usamos await? ¿Qué riesgo existe si
intentamos usar los datos antes de que la respuesta
llegue?

- Desarrollo guiado · Misión 2: del JSON al DOM
  Ahora el dato dejará de vivir únicamente en la consola. La aplicación deberá mostrarlo al usuario.
  async function obtenerTipoCambio() {
  const url = "https://api.frankfurter.dev/v2/rate/eur/usd";
  const respuesta = await fetch(url);
  const datos = await respuesta.json();

const resultado = document.querySelector("#resultado");
resultado.textContent = `1 EUR = ${datos.rate} USD`;

## }

## ?

## REFLEXIONA

## INTERPRETA, NO COPIES

¿Qué papel cumple datos.rate? ¿Por qué no escribimos
el valor del tipo de cambio directamente en el HTML?

## ✓

## CHECKPOINT

## CHECKPOINT 2

Explica a tu compañero, sin leer el código, el recorrido
completo desde el clic hasta que el valor aparece en
pantalla. Después intercambien roles.

- Desarrollo guiado · Misión 3: convertir una cantidad
  El siguiente paso es transformar la consulta en una herramienta. El usuario introduce una cantidad y JavaScript realiza el
  cálculo con el tipo de cambio recibido.

## CASO PRÁCTICO DE EVALUACIÓN | JAVASCRIPT + API + PAIR PROGRAMMING

Currency Explorer • Frontend colaborativo con datos reales

## Página 7

<input type="number" id="cantidad" value="100">

const cantidad = Number(document.querySelector("#cantidad").value);
const conversion = cantidad \* datos.rate;

resultado.textContent =
`${cantidad} EUR = ${conversion.toFixed(2)} USD`;

## ?

## REFLEXIONA

## TIPOS DE DATOS

El valor de un input llega normalmente como texto.
¿Por qué conviene usar Number()? ¿Qué debería
ocurrir si el campo está vacío, es negativo o no
representa un número válido?

- A partir de aquí comienza el reto de la pareja
  El ejemplo guiado demuestra el mecanismo esencial. La evaluación consiste en transferir esa comprensión a una
  aplicación más completa. No se proporciona el código final de las siguientes misiones.

## MISIÓN RETO QUÉ DEBEN RESOLVER EVIDENCIA

04 Monedas dinámicas Agregar dos selectores y construir el endpoint con template literals. El usuario elige origen y destino.
05 Conversión completa Integrar cantidad, tasa y resultado formateado. Conversión correcta y legible.
06 Intercambiar ⇄ Crear un botón que invierta las monedas seleccionadas. Los selectores cambian y se
recalcula.
07 Validar Evitar cantidades vacías, cero/negativas o no válidas. Mensaje claro sin romper la interfaz.
08 Estado de carga Mostrar “Consultando...” y deshabilitar acciones mientras se espera. El usuario percibe el estado del
proceso.
09 Errores Usar try/catch y comprobar response.ok. La app responde con elegancia ante
fallos.
10 Diseño responsive Convertir el prototipo en una interfaz atractiva y usable. Funciona en móvil y escritorio.
11 Histórico · extensión Consultar una serie temporal y representar la evolución. Gráfica o visualización
comprensible.

## ↔

## PAIR WORK

## DECISIÓN DE DISEÑO

Antes de programar cada misión, escriban en una frase:
“Necesitamos **\_ porque _**”. Esto obliga a identificar
primero el problema y después la función de JavaScript
que lo resuelve.

- Preguntas de reflexión durante el desarrollo
  No son un cuestionario separado. Úsenlas como pausas de razonamiento durante el Pair Programming; el docente
  puede retomarlas en la defensa individual.

## CASO PRÁCTICO DE EVALUACIÓN | JAVASCRIPT + API + PAIR PROGRAMMING

Currency Explorer • Frontend colaborativo con datos reales

## Página 8

## FOCO PREGUNTA

Datos ¿Qué información viene de la API y qué información genera nuestra aplicación?
Asincronía ¿Por qué una petición HTTP no debería tratarse como una operación instantánea?
JSON ¿Qué diferencia existe entre la respuesta HTTP y el objeto obtenido después de response.json()?
DOM ¿Qué ventaja tiene actualizar la interfaz con JavaScript en lugar de recargar la página?
Diseño ¿Qué debería ver el usuario mientras la API está respondiendo?
Errores ¿Cómo debería comportarse la aplicación si se escribe una moneda inválida o falla la red?
Responsabilidad ¿Qué funciones distintas puedes identificar? ¿Conviene que una sola función haga todo?
Colaboración ¿Qué decisión del código surgió de una observación del Navigator?
Transferencia Si mañana cambiáramos Frankfurter por otra API, ¿qué partes podrían conservarse?

- Reglas de colaboración y Git
- Cada pareja trabaja sobre un único repositorio.
- Los roles Driver/Navigator se alternan al finalizar cada misión.
- Cada misión debe producir al menos un commit significativo.
- Ambos integrantes deben aparecer como autores de commits durante la práctica.
- Antes de hacer commit, ambos deben probar y explicar el cambio.
- No se considera colaboración dividir “uno hace CSS y otro JavaScript”. Ambos deben intervenir en la lógica.
- Las decisiones relevantes se registrarán brevemente en README.md.

## ↔

## PAIR WORK

## EJEMPLO DE COMMIT

Misión 06: intercambio de monedas y recálculo —

## Driver: Ana / Navigator: Luis

## 12. Entregables

## # ENTREGABLE CRITERIO DE ACEPTACIÓN

01 Repositorio Git Código completo e historial de trabajo de ambos integrantes.
02 Currency Explorer Aplicación funcional en HTML, CSS y JavaScript Vanilla.
03 README.md Integrantes, objetivo, API utilizada, instrucciones de ejecución, decisiones y
funcionalidades.
04 Evidencia de red Captura de DevTools → Network mostrando petición correcta, status y respuesta.
05 Reflexión de pareja 150–200 palabras: aprendizaje técnico, dificultad y decisión colaborativa relevante.
06 Defensa individual Explicación breve de una parte seleccionada por el docente y posible microcambio.

## CASO PRÁCTICO DE EVALUACIÓN | JAVASCRIPT + API + PAIR PROGRAMMING

Currency Explorer • Frontend colaborativo con datos reales

## Página 9

- Criterios de evaluación

## CRITERIO VALOR

Funcionamiento y cumplimiento del reto 30 %
JavaScript: claridad, funciones, DOM y eventos 20 %
Consumo de API, asincronía y errores 15 %
Interfaz, usabilidad y responsive 10 %
Git y evidencia de Pair Programming 10 %
Defensa / microreto individual 15 %

- Reto de extensión: de conversor a explorador
  Las parejas que completen el núcleo podrán consultar series temporales y representar la evolución de un par de divisas.
  La API permite solicitar rangos de fechas y agrupar resultados por semana o mes. Esta extensión introduce arreglos,
  map(), transformación de datos y visualización.
  GET https://api.frankfurter.dev/v2/rates?base=mxn&quotes=usd&from=2026-01-01&group=month

## ?

## REFLEXIONA

## DE DATOS A GRÁFICA

Una serie temporal devuelve varios registros. ¿Qué
estructura de JavaScript usarías para recorrerlos? ¿Qué
dos arreglos necesitarías para construir una gráfica de
fecha vs. tipo de cambio?

- Cierre del caso
  target

## META

## COMPETENCIA QUE SE BUSCA DEMOSTRAR

Al terminar, el estudiante debe ser capaz de explicar y
construir el flujo completo de una aplicación frontend
que consume datos externos: capturar una interacción,
construir una petición, esperar una respuesta,
interpretar JSON, transformar datos, actualizar el DOM,
manejar errores y colaborar técnicamente con otra
persona.
Referencia técnica verificada: Frankfurter API v2 · frankfurter.dev. La API pública no requiere clave y ofrece tipos actuales, históricos, series
temporales, listado de divisas y fuentes de datos. Consulta realizada: octubre de 2026.
