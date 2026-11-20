# CheckThisBug - Hunter

[Leer en castellano ↓](#castellano)

A bug bounty checklist for web security reviews. Create a project for each application or domain, work through the vulnerability families and mark your findings. When you're done, you can save a PDF summary of your results.

The app includes **43 checks across 23 vulnerability families in English and Spanish**. It runs in a desktop browser and can be installed on Android as a progressive web app (PWA). It's written in HTML, CSS and JavaScript. You can publish it directly from the repository without a build step or any dependencies to install.

## Start a project

Select the **⚙** icon to create, rename or switch projects. Each project starts with every check marked **Pending** and tracks its results separately.

| Action | Result |
| --- | --- |
| Select the name of a pending check | Marks it **✗ Reviewed without finding** and strikes through the name. |
| Select the first checkbox | Marks the check **✓ Found** in green. |
| Select the second checkbox | Marks the check **✗ Reviewed without finding** in red. |
| Select the other checkbox | Switches directly to the other result. |
| Select the crossed-out name or the active checkbox | Returns the check to **Pending**. |

Each check has two expandable sections. **Vulnerable?** describes signs worth investigating. **How?** explains where to look and what evidence supports a finding. You can open either section while deciding how to mark the check. The controls in the header let you switch languages and toggle between light and dark themes.

Checks are grouped by family so you can review related variants together. For example, the XSS family covers reflected XSS, stored XSS, DOM-based XSS and XSS through DOM clobbering. Other checks cover sessions and JWTs, data exposure in APIs and GraphQL, CORS, CSP, access control, injection flaws, file uploads and business logic.

## Save a report

Select **Save PDF report** at the bottom of the checklist, then choose **Save as PDF** in the print dialog. The report includes the project name, date, summary and status of every check, including pending ones. It uses the selected language and follows the same family order as the checklist. If your browser adds the page URL or print headers, you can turn them off in the print dialog.

## Where your data is stored

Project names, check results, language and theme are saved in your browser's `localStorage`. Your computer and phone keep separate project histories. Clearing site data removes the projects saved in that browser. PDFs you've already downloaded stay in your files.

GitHub Pages serves the application files. Your review results stay on your device. After the first online load has finished caching the files, you can reopen the app, manage projects, read the catalog, mark results and prepare a PDF offline. External references in the XSS, CSP and XXE checks open in a new tab and require a connection. The app loads those sites only when you follow a link.

## Responsible use

CheckThisBug - Hunter was built for security research and education. Use it only on systems you own or have explicit permission to test. When participating in a bug bounty program, follow its rules and stay within its published scope. The project does not endorse unauthorized access, malicious activity, or illegal use.

##### Made by EldritchEcho

---

#### Castellano

# CheckThisBug - Hunter

Checklist de bug bounty para revisiones web. Crea un proyecto por aplicación o dominio, recorre las familias de vulnerabilidades y marca qué has encontrado. Al terminar, puedes guardar un informe en PDF con un resumen de los resultados.

La aplicación incluye **43 fichas repartidas en 23 familias de vulnerabilidades, en castellano e inglés**. Funciona en el navegador del ordenador y se puede instalar en Android como aplicación web progresiva (PWA). Está escrita en HTML, CSS y JavaScript y se publica directamente desde el repositorio, sin compilación ni dependencias que instalar.

## Iniciar un proyecto

Abre el engranaje **⚙** para crear, renombrar o seleccionar un proyecto. Cada proyecto empieza con todas las fichas pendientes y guarda sus propias marcas.

| Acción | Resultado |
| --- | --- |
| Pulsar el nombre de una ficha pendiente | Marca **✗ Revisada sin hallazgo** y tacha el nombre. |
| Pulsar la primera casilla | Marca **✓ Encontrada** en verde. |
| Pulsar la segunda casilla | Marca **✗ Revisada sin hallazgo** en rojo. |
| Pulsar la casilla contraria | Cambia directamente de resultado. |
| Pulsar el nombre tachado o la casilla activa | Devuelve la ficha a **Pendiente**. |

Cada ficha incluye dos desplegables. **¿Vulnerable?** describe los indicios que merece la pena revisar. **¿Cómo?** detalla dónde mirar y qué evidencia respalda el hallazgo. Puedes consultar ambos mientras decides qué marcar. En la cabecera puedes cambiar el idioma y alternar entre tema claro y oscuro.

Las fichas están agrupadas por familias para revisar juntas las variantes de un mismo problema. Por ejemplo, XSS reúne las variantes reflejada, almacenada, basada en DOM y XSS mediante DOM clobbering. También hay fichas de sesiones y JWT, exposición de datos en API y GraphQL, CORS, CSP, control de acceso, inyecciones, subidas de archivos y lógica de negocio.

## Guardar el informe

Al pie de la checklist, pulsa **Guardar informe en PDF** y elige **Guardar como PDF** en el diálogo de impresión. El informe recoge el nombre del proyecto, la fecha, el resumen y el estado de todas las fichas, incluidas las pendientes. Respeta el idioma activo y el orden de las familias. Si el navegador añade la URL o encabezados de impresión, puedes desactivarlos en ese diálogo.

## Dónde se guardan los datos

Los nombres de los proyectos, las marcas, el idioma y el tema se guardan en el `localStorage` del navegador. El ordenador y el móvil mantienen historiales independientes. Borrar los datos del sitio elimina los proyectos de ese navegador. Los PDF ya descargados siguen en tus archivos.

GitHub Pages sirve los archivos de la aplicación. Los resultados de tus revisiones se guardan en tu dispositivo. Cuando la primera visita con conexión haya terminado de guardar los archivos, puedes volver a abrir la app, gestionar proyectos, consultar el catálogo, marcar resultados y preparar un PDF sin conexión. Las referencias externas de las fichas XSS, CSP y XXE se abren en otra pestaña y requieren conexión. La app solo abre esos sitios cuando pulsas un enlace.

## Uso responsable

CheckThisBug - Hunter se creó para la investigación y la formación en seguridad. Utilízala únicamente en sistemas propios o en aquellos para los que tengas autorización expresa para realizar pruebas. Si participas en un programa de bug bounty, respeta sus normas y los límites de su alcance. El proyecto no respalda el acceso sin autorización, las actividades maliciosas ni el uso con fines delictivos.

##### Hecho por EldritchEcho
