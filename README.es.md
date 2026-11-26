# WiseTrack · versión para teléfono y pantalla de visualización

[English](README.md) · [Türkçe](README.tr.md) · **Español** · [العربية](README.ar.md) · [Русский](README.ru.md) · [中文](README.zh.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

**▶ Abrir la aplicación: [koclabs.github.io/wisetrack](https://koclabs.github.io/wisetrack/)** — funciona en el navegador de teléfonos, tabletas y ordenadores; no hay que instalar nada. En el teléfono, añádala a la pantalla de inicio (sección 2). La sección 1 solo es necesaria si desea alojar su propia copia.

WiseTrack es un software de seguimiento del comportamiento de roedores que funciona en el navegador. Esta carpeta es la versión web que funciona como una aplicación en el teléfono (PWA). Los mismos archivos funcionan en iPhone, Android, tabletas y ordenadores.

| Archivo | Función |
|---|---|
| `index.html` | La aplicación que realiza el seguimiento (se abre en el teléfono) |
| `izle.html` | Pantalla de visualización: se abre en un PC, el navegador de un televisor o una tableta y muestra en directo la imagen y los resultados del teléfono |
| `sw.js`, `*.webmanifest`, `icons/` | Instalación como aplicación y uso sin conexión |
| `vendor/` | Bibliotecas de proyección (PeerJS, MIT) y de código QR (qrcode-generator, MIT) |
| `i18n/` | Traducciones de la interfaz (inglés, español, árabe, ruso, chino, japonés, coreano) |

**Idiomas de la interfaz:** Türkçe, English, Español, العربية, Русский, 中文, 日本語, 한국어. El idioma se elige en el menú de la barra superior; véase [Idioma de la interfaz](#idioma-de-la-interfaz).

## Versiones y cita

La versión analizada en el artículo (v10) está archivada en Zenodo (DOI [10.5281/zenodo.24535051](https://doi.org/10.5281/zenodo.24535051), commit [`0704db8`](https://github.com/koclabs/wisetrack/tree/0704db8)). Las versiones posteriores añaden calibración automática y correcciones de cámara (v11), análisis de vídeos por lotes (v12) e idiomas adicionales de la interfaz (v13). Para reproducir los análisis del artículo, use la versión archivada.

WiseTrack se publica con la licencia MIT (véase `LICENSE`). Los datos para citarlo están en `CITATION.cff`.

## 1. Publicación (una vez, unos 5 minutos)

Los navegadores de los teléfonos solo abren la cámara en direcciones **https://**. Copiar los archivos directamente al teléfono no funciona; hay que ponerlos en una dirección https gratuita.

**GitHub Pages (recomendado, permanente y gratuito)**
1. Cree una cuenta gratuita en github.com y, con **New repository**, cree un repositorio *público*, por ejemplo `wisetrack`.
2. Con **Add file → Upload files**, arrastre el *contenido* de esta carpeta (con index.html en el nivel superior) y pulse **Commit**.
3. **Settings → Pages → Branch: main / (root) → Save**. Al cabo de uno o dos minutos su dirección será `https://USUARIO.github.io/wisetrack/`.

Alternativa: arrastrar la carpeta a Netlify Drop (app.netlify.com/drop) también da una dirección https; para que sea permanente hay que reclamarla con una cuenta gratuita.

Cuando actualice, vuelva a subir los archivos y aumente el valor `VERSION` de `sw.js` (p. ej. de `wisetrack-v13` a `wisetrack-v14`); los teléfonos recibirán la nueva versión la próxima vez que se abra la aplicación.

## 2. Instalación en el teléfono

- **iPhone / iPad:** Abra la dirección en **Safari** → icono Compartir → **Añadir a pantalla de inicio**. En el primer inicio, pulse «Permitir» para la cámara.
- **Android:** Abra la dirección en **Chrome** → menú (⋮) → **Instalar aplicación** (o «Añadir a pantalla de inicio»).

Una vez instalada, el seguimiento funciona sin internet. La proyección necesita internet.

## 3. Colocación del teléfono para el seguimiento

- Fije el teléfono **justo encima** de la arena con un trípode o soporte; no debe moverse ni girar durante el experimento.
- Use la **cámara trasera principal (1×)**. Una lente ultra gran angular (0,5×) o una webcam gran angular curvan los bordes; esta distorsión puede corregirse con **Medir la distorsión de la lente a partir de la arena** (véase más abajo), pero la cámara principal sigue dando la imagen más limpia.
- Después de ajustar la luz, toque **Bloquear exposición y enfoque** (funciona en Android; el navegador del iPhone no lo permite, así que use una luz estable y homogénea).
- En sesiones largas, mantenga el teléfono cargando. La pantalla no se apaga mientras la aplicación está abierta; si sale de la aplicación, la sesión se pausa por seguridad.

### Calibración automática y correcciones de cámara

En Configuración > Dispositivo de prueba y calibración:

- **Detectar arena automáticamente**: tóquelo con la arena vacía. La aplicación separa el suelo empezando por el centro de la imagen, ajusta la forma conocida de la arena (cuadrado, círculo o cruz) a sus bordes con precisión de subpíxel y coloca los puntos. En las arenas circulares (laberinto acuático, Barnes), si la cámara está inclinada, el centro del círculo no aparece en el centro de la elipse; la aplicación lo calcula a partir de la geometría de la cámara. En el laberinto en cruz, los brazos cerrados se reconocen por sus paredes; si no hay certeza, corríjalo con **Intercambiar brazos**. Si las paredes son del mismo color que el suelo, los puntos pueden ajustarse al borde superior de las paredes; la aplicación avisa cuando lo detecta.
- **Comprobar calibración**: muestra cuántos cm se desvía de media el borde de la arena en la imagen respecto al modelo (≤0,5 cm bien; >1,5 cm revise los puntos). Este valor también se mide automáticamente al comienzo de cada ensayo y se escribe en el resumen de Excel/CSV.
- **Corrección de la altura del animal** (en la sección Cámara, lente y altura del animal): la cámara ve el lomo del animal, no su posición en el suelo. La altura y la posición de la cámara se estiman a partir de los puntos de la arena (introduzca la altura si la ha medido) y el punto de seguimiento se proyecta sobre el suelo. Sin corrección, las posiciones cerca de los bordes se desplazan hacia fuera aunque la cámara esté justo encima, y la distancia total se sobrestima aproximadamente en altura del animal / (altura de la cámara − altura del animal) (rata, cámara a 75 cm: ≈ 5,6 %).
- **Medir la distorsión de la lente a partir de la arena**: no hace falta un tablero de ajedrez; la aplicación busca el coeficiente de distorsión que hace rectos los bordes rectos de la arena (y elíptico el borde en las arenas circulares).
- **Vigilar el desplazamiento de la cámara** (activado por defecto): si la cámara o el teléfono reciben un golpe durante un ensayo, el borde de la arena se compara cada segundo con el primer fotograma; si se detecta un desplazamiento, los puntos y la referencia de arena vacía se mueven juntos y el suceso se registra en el resumen.
- En los resultados aparece un aviso si el tamaño aparente del animal cambia claramente de un lado a otro de la arena (cámara inclinada o puntos desplazados).

Validación con vídeos sintéticos (posición de la cámara, distorsión de la lente y tamaño de rata conocidos; altura de seguimiento de 4 cm): con una cámara inclinada 18° y una distorsión marcada, incluso con los puntos colocados exactamente a mano, el error de posición sin corrección fue de 1,3 cm de mediana y 3,1 cm en el percentil 95, y la distancia se sobrestimó un 9,8 %; con calibración automática + lente + corrección de altura, el error fue de 0,16 cm de mediana y 0,8 cm en el percentil 95, y la diferencia de distancia del 0,2 %. Con una cámara gran angular de 80°: 1,9 → 0,2 cm; en el laberinto acuático (cámara a 220 cm): 0,34 → 0,26 cm; en el laberinto de Barnes: 1,6 → 0,2 cm. Con un desplazamiento de cámara de 2 cm a mitad del ensayo, la mediana del error fue de 1,7 cm sin corrección y de 0,15 cm con la vigilancia del desplazamiento.

### Idioma de la interfaz

El menú de idioma de la barra superior ofrece Türkçe (turco), English (inglés), Español, العربية (árabe), Русский (ruso), 中文 (chino), 日本語 (japonés) y 한국어 (coreano). En el primer inicio se usa el idioma del navegador (inglés si no está disponible); la elección se recuerda en el dispositivo. Al cambiar el idioma, la página se recarga. Añada `?lang=xx` a un enlace (`en`, `tr`, `es`, `ar`, `ru`, `zh`, `ja`, `ko`) para abrir la aplicación en un idioma concreto. Los encabezados de Excel/CSV, los nombres de las zonas y las letras de orientación dibujadas en la imagen también siguen el idioma elegido; la interfaz en árabe se dispone de derecha a izquierda. Las traducciones están en la carpeta `i18n/` (las claves son los textos originales en turco).

## 4. Proyección en otra pantalla

**Proyección propia de la aplicación (funciona en cualquier dispositivo):** En el teléfono, vaya a **Proyectar → Iniciar proyección**. Escanee el código QR con la cámara de la tableta, o abra `…/izle.html` en el navegador de un ordenador o televisor e introduzca el código de 6 caracteres. Allí aparecen la imagen en directo etiquetada, el tiempo, la tabla de zonas y la distancia. Si «Permitir iniciar/detener desde la pantalla de visualización» está activado, puede dirigir el ensayo desde allí sin acercarse a la arena. El código se guarda en el teléfono; si añade la página de visualización a favoritos en el televisor, se conectará con el mismo código en los siguientes experimentos. Pueden conectarse varias pantallas a la vez.

Cómo funciona: los dos dispositivos solo se encuentran a través del servidor gratuito de PeerJS; la imagen y los datos circulan directamente entre ellos (WebRTC, cifrado). Si la red de la institución bloquea las conexiones entre dispositivos, active el punto de acceso personal del teléfono y conecte a él el dispositivo de visualización.

**Duplicación del sistema operativo (opción adicional):**

| Teléfono → | Mac | PC con Windows | TV | Tableta |
|---|---|---|---|---|
| iPhone | AirPlay (macOS 12+) | izle.html | Apple TV / TV con AirPlay 2 | izle.html |
| Android | scrcpy (USB, gratuito) | scrcpy (USB, gratuito) | Enviar / Smart View / Chromecast | izle.html |

## 5. Exportar los resultados

En la pestaña Resultados, **Excel (.xlsx)** da cuatro hojas en un solo archivo: *Resumen* (métricas y ajustes utilizados), *Zonas*, *Registro de posición* (X/Y fotograma a fotograma, velocidad, zona) y *Una fila* (un resultado de una fila por animal que puede pegarse directamente en la tabla de su grupo). También hay opciones CSV y PNG. En el teléfono, la exportación abre el menú de compartir, donde puede elegirse Drive, Archivos o el correo electrónico.

## 6. Reconocimiento de objeto nuevo (NOR)

En Configuración > Dispositivo de prueba, elija **Reconocimiento de objetos** y fije la fase (Habituación / Familiarización / Prueba). Con los objetos en la arena y sin el animal, toque **Detectar objetos automáticamente**: los objetos se detectan y ese mismo fotograma se guarda como referencia de arena vacía (así los objetos no se confunden con el animal). Puede arrastrar los objetos encontrados en la imagen para moverlos, cambiar su tamaño con el tirador cuadrado blanco, cambiar su forma (círculo/rectángulo), eliminarlos o añadir objetos a mano. En la fase de prueba, la grabación no empieza hasta que se elige qué objeto es el nuevo.

Por defecto, la exploración se cuenta cuando el **punto de la nariz** del animal está a menos de 2 cm del objeto; si el centro del cuerpo está encima del objeto (trepar), no se cuenta como exploración. El punto de la nariz se estima a partir de la forma del cuerpo (el extremo de la cabeza es más estrecho) y de la dirección del movimiento; aparece en pantalla como un punto cian. Los resultados dan, para cada objeto, el tiempo de exploración, el número de exploraciones y la latencia de la primera exploración; en la fase de prueba, el índice de discriminación DI = (Nuevo − Familiar) / (Nuevo + Familiar) y el índice de reconocimiento RI. La estimación de la nariz debe validarse con algunos vídeos puntuados a mano; si es necesario, el criterio puede cambiarse a «Punto central».

**Objetos del mismo color que el animal.** La aplicación toma tres medidas para que un objeto no se confunda con el animal: (1) con la cámara en directo, cuando «Iniciar cuando se detecte al animal en la arena» está activado y se pulsa Iniciar, la arena vacía (con los objetos en su posición final) se vuelve a guardar automáticamente; mientras tanto, la pantalla muestra «Guardando la arena vacía, no coloque aún al animal». (2) A continuación se comprueba cada objeto; un objeto que sigue pareciendo el animal pese a la referencia de arena vacía (por ejemplo, porque se movió después de guardar la referencia o porque un vídeo no tiene referencia) se excluye de la detección del animal durante ese ensayo, aparece un aviso y esto se anota en el resumen de Excel. (3) Una mancha que está completamente sobre un objeto nunca se elige como animal, salvo que el animal acabara de estar allí (trepar). En un objeto excluido no se puede detectar si el animal trepa, y la punta de la nariz a menos de 0,5 cm del objeto no es visible; por ello, el tiempo de exploración puede salir algo bajo. La opción de Configuración «Excluir siempre las áreas de los objetos de la detección del animal» aplica la misma exclusión en todos los ensayos.

## 7. Laberinto acuático de Morris (MWM)

En Configuración > Dispositivo de prueba, elija **Laberinto acuático**, introduzca los diámetros de la piscina y de la plataforma y elija la fase (Aprendizaje / Prueba de retención / Visible) y el punto de inicio. Arrastre los puntos N, E, S, O de la imagen a las marcas norte, este, sur y oeste del borde de la piscina; arrastre la plataforma en la imagen hasta su posición real. Los cuadrantes objetivo y opuesto se fijan automáticamente a partir de la posición de la plataforma. Sin el animal, guarde la piscina vacía con Detección > **Guardar arena vacía**; así los reflejos de luz fijos en la superficie del agua no se confunden con el animal. Al elegir el laberinto acuático, la duración del ensayo se fija en 60 segundos.

- **Aprendizaje y plataforma visible:** el ensayo termina automáticamente cuando el punto central del animal entra en el área de la plataforma y permanece allí el tiempo fijado (2 s por defecto). Se dan la latencia de escape (primera llegada a la plataforma), si encontró la plataforma, la longitud del recorrido, la eficiencia del recorrido (distancia en línea recta del inicio a la plataforma / distancia nadada), el tiempo en el cuadrante objetivo, la distancia media a la plataforma, el tiempo junto a la pared (tigmotaxis) y la velocidad de natación. Si la plataforma no se encuentra antes de que se acabe el tiempo, la latencia de escape se registra como la duración del ensayo.
- **Prueba de retención:** se dan el porcentaje de tiempo en los cuadrantes objetivo y opuesto, el número de cruces por la ubicación de la plataforma, el momento de la primera llegada a esa ubicación y la distancia media a la plataforma. A los cruces por la ubicación de la plataforma no se les aplica el tiempo de transición de zona.

En la hoja *Una fila* del archivo Excel, las columnas «Cuadrante objetivo» y «Cuadrante opuesto» tienen el mismo nombre para todos los animales, de modo que los resultados pueden pegarse uno debajo de otro aunque la posición de la plataforma difiera entre grupos.

## 8. Laberinto de Barnes

En Configuración > Dispositivo de prueba, elija **Laberinto de Barnes**; introduzca el diámetro de la plataforma, el número de agujeros, el diámetro de los agujeros y la distancia del centro del agujero al borde de la plataforma (plataforma de ratón por defecto: 92 cm, 20 agujeros, 5 cm). Arrastre los puntos N, E, S, O al borde de la plataforma; **el punto N debe quedar alineado con el agujero 1**, y los agujeros se numeran en sentido horario. Si el anillo de agujeros dibujado no coincide con los agujeros de la imagen, toque **Alinear agujeros automáticamente** o gírelo con el deslizador. Elija el agujero objetivo (de escape) en la lista o tocándolo en la imagen. Sin el animal, guarde la plataforma vacía con Detección > **Guardar arena vacía**; de lo contrario, los agujeros oscuros (sobre todo con un animal negro) pueden confundirse con el animal. Al elegir Barnes, la duración del ensayo se fija en 180 segundos.

- **Visita a un agujero:** se cuenta una visita cuando el punto de la nariz del animal se acerca a menos de 1 cm (ajustable) del borde de un agujero. Cada visita a un agujero que no es el objetivo es un error; las visitas repetidas al mismo agujero también cuentan.
- **Aprendizaje:** se dan la latencia primaria, los errores primarios y el recorrido primario (hasta la primera visita al agujero objetivo), y la latencia total, los errores totales y el recorrido total (hasta que el animal entra en la caja de escape). Cuando el animal desaparece de la imagen junto al agujero objetivo durante 1 segundo (ajustable), se considera que ha entrado en la caja de escape y el ensayo termina; el momento de la desaparición es la latencia total.
- **Prueba de retención:** se dan el número de visitas al agujero objetivo y a los demás agujeros, la proporción de visitas al agujero objetivo, el tiempo en el cuadrante objetivo y las medidas primarias.
- **La estrategia de búsqueda** se sugiere automáticamente: *Directa* (como máximo 3 errores, todos a 2 agujeros del objetivo), *Serial* (al menos 3 agujeros vecinos consecutivos en un mismo sentido), las demás *Aleatoria*. La secuencia de visitas a los agujeros se escribe en el resumen de Excel; la sugerencia debe comprobarse con esa secuencia.

En la hoja *Una fila* del archivo Excel, las columnas de agujeros se llaman «Agujero 1 … Agujero N» y las de cuadrantes «Cuadrante objetivo», «Cuadrante opuesto» y los dos cuadrantes adyacentes, de modo que los resultados pueden pegarse uno debajo de otro aunque el agujero objetivo cambie de un animal a otro.

## 9. MPG, AVI y otros formatos de vídeo

Los navegadores abren directamente vídeos MP4 (H.264), MOV y WebM. Cuando se eligen formatos como MPG/MPEG (MPEG-1/2), VOB, AVI, WMV, FLV o TS/MTS, la aplicación muestra el botón **Convertir a MP4 y abrir**. La conversión se hace por completo en el dispositivo con ffmpeg.wasm; el vídeo no se envía a ningún sitio. El conversor (unos 32 MB) se descarga de jsDelivr en el primer uso y queda en la caché del navegador, por lo que la primera conversión necesita internet. Las grabaciones entrelazadas de DVR/DVD se desentrelazan automáticamente y la imagen se reduce a 960 píxeles de ancho como máximo. En un ordenador, un vídeo de 1 minuto en definición estándar se convierte en aproximadamente medio minuto; en el teléfono es más lento. Si el archivo convertido se guarda con **Guardar vídeo convertido**, no hace falta volver a convertir el mismo vídeo cuando se analice de nuevo.

ffmpeg.wasm (@ffmpeg/core 0.12.10) tiene licencia GPL-2.0-or-later; la aplicación solo lo carga desde la CDN durante la ejecución. Código fuente: https://github.com/ffmpegwasm/ffmpeg.wasm

### Velocidad de análisis

Al analizar un vídeo, la opción de velocidad es un límite superior. Como el navegador puede entregar como mucho tantos fotogramas por segundo como la frecuencia de refresco de la pantalla (normalmente 60), y un dispositivo ocupado también puede perder fotogramas, la aplicación ajusta la velocidad por sí misma para procesar todos los fotogramas: acelera mientras no se pierde ninguno y frena en cuanto se pierde uno. Al terminar el análisis se muestran la velocidad media y la proporción de fotogramas omitidos, que también se escriben en el resumen de Excel/CSV; si la proporción supera el 1 %, el análisis debe repetirse con un límite de velocidad menor. El suavizado se aplica por tiempo y no por número de fotogramas, de modo que el mismo vídeo da el mismo resultado sea cual sea la velocidad a la que se analice.

### Análisis de vídeos por lotes

La tarjeta **5 · Análisis de vídeos por lotes**, al final de la pestaña Configuración, analiza uno tras otro los vídeos grabados con el mismo dispositivo:

1. Elija varios vídeos con **Añadir vídeos** (en un ordenador también puede arrastrarlos y soltarlos sobre la tarjeta). La lista se ordena por nombre de archivo; el código del animal se toma del nombre del archivo y puede cambiarse en la tabla. En reconocimiento de objetos puede elegir el objeto nuevo, y en el laberinto acuático el punto de inicio, por separado en cada fila.
2. Configure una sola vez la arena (y los objetos en reconocimiento de objetos), el umbral y la duración con **Abrir el primer vídeo para configurar**.
3. Opciones: la **Posición de la arena** puede ser igual en todos los vídeos o detectarse automáticamente en cada vídeo (si la cámara se movió entre vídeos). La **Referencia de arena vacía** se extrae por defecto de cada vídeo: en 21 fotogramas repartidos a lo largo del vídeo, el animal está en cada punto solo en unos pocos fotogramas, así que el percentil 30 de cada píxel (animal albino) o el percentil 70 (animal oscuro) da el suelo sin el animal.
4. **Iniciar análisis por lotes**. Los formatos como MPG/AVI se convierten automáticamente cuando les llega el turno. Los vídeos que no pueden abrirse o en los que no se encuentra el animal se marcan y se omiten; el análisis no se detiene. Una lista interrumpida con **Detener** puede continuarse con **Analizar los restantes**.
5. Al terminar, el archivo **Excel del lote** se descarga automáticamente en un ordenador (en el teléfono, toque el botón). Hojas: *Resultados del lote* (una fila por vídeo, con todas las medidas del Excel de un solo vídeo), *Zonas* (formato largo), *Calidad* (fotogramas detectados/omitidos, desviación de la calibración, desplazamiento de la cámara, avisos), *Ajustes* y, opcionalmente, *Registro de posición*.

Durante el análisis, la pestaña debe permanecer abierta y en primer plano, porque el navegador no entrega fotogramas de vídeo a una pestaña en segundo plano. Si la pestaña pasa a segundo plano, el análisis se pausa y continúa donde se quedó al volver. La pantalla no se apaga sola.

## 10. Versión de un solo archivo sin conexión (para ordenadores)

`wisetrack.html` también se ofrece por separado: descárguelo en un ordenador y ábralo con doble clic en Chrome o Edge; no requiere instalación, internet ni cuenta. Todo funciona, incluidos la cámara, el análisis de vídeo, la exportación a Excel y todos los idiomas de la interfaz; solo la proyección dentro de la aplicación está desactivada en esta versión, y convertir formatos como MPG necesita internet. Como los archivos HTML descargados no se abren de forma fiable en los teléfonos, en el teléfono use la dirección web y la opción de añadir a la pantalla de inicio.

## 11. Su propio servidor de señalización (opcional)

Si no se puede acceder al servidor público de PeerJS, o prefiere quedarse dentro de la institución, ejecute `npx peer --port 9000` en un ordenador de la red y abra ambas páginas con `?ps=IP_DEL_SERVIDOR:9000` (si no hay https, añada también `&pss=0`).

## Siguiente paso: aplicación nativa

Este código se empaquetará con Capacitor como aplicación de Android (APK) y de iOS (proyecto de Xcode). La versión nativa añadirá el bloqueo de exposición y enfoque en iPhone, la grabación ininterrumpida en segundo plano y frecuencias de fotogramas más altas.
