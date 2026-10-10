# Currency Explorer · Starter Project

## Integrantes

- Estudiante A: Uriel Flores Zarate
- Estudiante B: José Manuel Ramos Iglesias

## Pair Programming

| Misión | Driver | Navigator | Commit / evidencia |
| ------ | ------ | --------- | ------------------ |
| 04     | Uriel  | Manuel    | feat: mision 04 - monedas dinamicas con selectores y template literals — Driver: Uriel / Navigator: Manuel (`97d0176`) |
| 05     | Manuel | Uriel     | feat: mision 05 - conversion completa, formateo y control de divisas identicas — Driver: Manuel / Navigator: Uriel (`3148115`) |
| 06     | Uriel  | Manuel    | feat: mision 06 - intercambio de divisas con boton swap y recalculacion automatica — Driver: Uriel / Navigator: Manuel (`901fa17`) |
| 07     | Manuel | Uriel     | feat: mision 07 - validacion estricta de cantidad numerica mayor a cero — Driver: Manuel / Navigator: Uriel (`d965d94`) |
| 08     | Uriel  | Manuel    | feat: mision 08 - metodo activarEstadoCarga para estado visual de consulta — Driver: Uriel / Navigator: Manuel (`d4ecc48`) |
| 09     | Manuel | Uriel     | feat: mision 09 - control de respuesta http response.ok y manejo de errores en try catch — Driver: Manuel / Navigator: Uriel (`681e79e`) |
| 10     | Uriel  | Manuel    | feat: mision 10 - usabilidad con tecla enter, recálculo en cambio de divisas y bloqueo interactivo — Driver: Uriel / Navigator: Manuel (`69d2b1f`) |
| 11     | Manuel | Uriel     | feat: mision 11 - consulta de serie temporal historica y renderizado de evolucion — Driver: Manuel / Navigator: Uriel (`c23f218`) |

## Objetivo

Completar una aplicación frontend que consuma Frankfurter API para convertir divisas y demostrar comprensión de eventos, DOM, `fetch()`, JSON, asincronía, validación y manejo de errores.

## API

Se hizo uso de la API gratuita Frankfurter:

- Conversión: `https://api.frankfurter.dev/v2/rate/{origen}/{destino}`
- Histórico: `https://api.frankfurter.dev/v1/{fechaInicio}..{fechaFin}?base={origen}&symbols={destino}`

Para la gráfica se usó la librería Chart.js:

`https://www.chartjs.org/`

## Instrucciones de ejecución

No requiere instalar dependencias, registrarse ni usar API key.

### Pasos

1. Clona el repositorio o descomprime el proyecto:

   ```bash
   git clone <URL-del-repositorio>
   ```

2. Abre la carpeta `currency-explorer` en VS Code.
3. Haz clic derecho sobre `index.html` y selecciona **Open with Live Server**.
4. El navegador abrirá la aplicación (normalmente en `http://localhost:5500`).

### Cómo usar la aplicación

1. Escribe la cantidad que quieres convertir.
2. Elige la moneda de origen (**De**) y la de destino (**A**).
3. Presiona **Convertir** (o Enter) para ver el resultado y la tasa utilizada.
4. Usa el botón **⇄** para intercambiar las monedas.
5. En **Evolución de la tasa**, selecciona un rango de fechas y presiona **Ver evolución** para ver la gráfica.

## Funcionalidades

- Conversión de divisas entre EUR, USD, MXN, GBP y JPY con tasas reales de la API.
- Selección de moneda de origen y destino.
- Botón ⇄ para intercambiar las monedas.
- Recalculo automático al cambiar de moneda.
- Consulta del histórico de la tasa en un rango de fechas.
- Gráfica de línea con la evolución de la tasa.

## Decisiones técnicas

1. **Usar Chart.js para la gráfica del histórico.** Primero se dibujaba con SVG calculando cada punto a mano, pero era largo y difícil de leer. Con Chart.js solo se pasan las fechas y las tasas, el código es más corto y la gráfica incluye ejes, leyenda e interacción.
2. **Leer los valores de los `<select>` dentro de cada función** (`origen.value`, `destino.value`), no al cargar el script. Así cada consulta usa lo que el usuario tiene seleccionado en ese momento y no un valor viejo.

## Revisión cruzada

- Aspecto bien resuelto: La lógica está separada en funciones con una responsabilidad clara (`convertirMoneda`, `intercambiarMonedas`, `consultarHistorico`, `dibujarGrafica`). El manejo de errores en la conversión usa `try/catch` y `response.ok`, y muestra mensajes comprensibles al usuario.
- Error o comportamiento mejorable: En el histórico no se revisaba si la API respondió bien antes de usar los datos, así que cualquier problema muestra el mismo mensaje general. También había código repetido al cambiar la moneda de origen y la de destino.
- Propuesta de mejora: Revisar que la respuesta de la API sea correcta también en el histórico, y juntar en uno solo el código repetido de los cambios de moneda.
- Cambio incorporado después de la revisión:

## Reflexión final (150–200 palabras)

Explica el principal aprendizaje técnico, una dificultad relevante y una decisión que haya surgido del trabajo Driver/Navigator.
