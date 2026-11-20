// Stable IDs preserve saved project results.
const catalog = [
  {
    "id": "session",
    "title": [
      "Cookies y gestión de sesión",
      "Cookies and session management"
    ],
    "items": [
      [
        "secure",
        [
          "Cookie de sesión sin Secure",
          "Ocurre cuando la cookie que mantiene la sesión del usuario no tiene el atributo Secure, permitiendo que el navegador la envíe también por conexiones HTTP sin cifrar (texto plano).\nSe puede dar en inicios de sesión, cookies de autenticación y cualquier sitio que combine HTTP y HTTPS o permita tráfico sin cifrar.",
          [
            "Abrir las DevTools del navegador (F12 -> Aplicación/Almacenamiento -> Cookies) y revisar si la columna \"Secure\" está sin marcar o en false tras iniciar sesión.",
            "Interceptar una petición HTTP con Burp Suite y verificar si la cabecera `Cookie` viaja en claro."
          ]
        ],
        [
          "Session cookie missing Secure",
          "This occurs when the cookie that maintains the user's session lacks the Secure attribute, allowing the browser to send it over unencrypted HTTP connections (in plain text).\nIt can occur during login, in authentication cookies and on any site that mixes HTTP and HTTPS or allows unencrypted traffic.",
          [
            "Open the browser DevTools (F12 -> Application/Storage -> Cookies) and check whether the \"Secure\" column is unchecked or false after logging in.",
            "Intercept an HTTP request with Burp Suite and check whether the `Cookie` header travels in plain text."
          ]
        ]
      ],
      [
        "httpOnly",
        [
          "Cookie de sesión sin HttpOnly",
          "Ocurre cuando la cookie de sesión no tiene la bandera (flag) HttpOnly, lo que permite que sea leída o modificada mediante código JavaScript en el navegador (facilitando el robo de sesión ante un XSS).\nSe puede dar en cookies de sesión, tokens de autenticación guardados en cookies y paneles de usuario.",
          [
            "Revisar en las DevTools (F12 -> Aplicación -> Cookies) si la casilla \"HttpOnly\" aparece vacía o en false en la cookie de sesión.",
            "Ejecutar `document.cookie` en la consola del navegador y comprobar si devuelve el identificador de sesión."
          ]
        ],
        [
          "Session cookie missing HttpOnly",
          "This occurs when a session cookie lacks the HttpOnly flag, allowing JavaScript in the browser to read or modify it (making session theft easier in the event of XSS).\nIt can occur in session cookies, authentication tokens stored in cookies and user dashboards.",
          [
            "In DevTools (F12 -> Application -> Cookies), check whether the \"HttpOnly\" box for the session cookie is empty or false.",
            "Run `document.cookie` in the browser console and check whether it returns the session identifier."
          ]
        ]
      ],
      [
        "logout",
        [
          "Sesión activa tras cerrar sesión",
          "Ocurre cuando la aplicación elimina la cookie en el navegador al pulsar \"Cerrar sesión\", pero no invalida el token o identificador de sesión en el servidor.\nSe puede dar en botones de logout, cierres de sesión por inactividad y cambios de contraseña.",
          [
            "Capturar una petición autenticada con Burp Suite, cerrar sesión en el navegador y reenviar la petición capturada desde el Repeater para ver si sigue respondiendo con datos privados.",
            "Copiar el valor de la cookie de sesión antes de hacer logout, cerrar sesión, volver a inyectar esa cookie manualmente y recargar la página."
          ]
        ],
        [
          "Session survives logout",
          "This occurs when the application deletes the browser cookie when the user selects “Log out” but leaves the token or session identifier valid on the server.\nIt can occur with logout buttons, inactivity timeouts and password changes.",
          [
            "Capture an authenticated request with Burp Suite, log out in the browser, and resend the captured request from Repeater to see if it still responds with private data.",  
            "Copy the session cookie value before logging out, log out, manually re-inject that cookie, and reload the page."
          ]
        ]
      ]
    ]
  },
  {
    "id": "jwt",
    "title": [
      "JWT · Autenticación",
      "JWT · Authentication"
    ],
    "items": [
      [
        "jwt-signature",
        [
          "JWT · Firma y algoritmo",
          "Ocurre cuando el servidor no verifica correctamente la firma criptográfica del token JWT o acepta algoritmos inseguros (como `none` o cambiar `RS256` a `HS256`), permitiendo falsificar el contenido del token.\nSe puede dar en APIs REST, autenticaciones con cabecera `Authorization: Bearer` y aplicaciones SPA (Single Page Applications).",
          [
            'Decodificar el JWT (por ejemplo en jwt.io o Burp), cambiar el campo `"alg"` de la cabecera a `"none"`, quitar la firma (dejando el punto final) y reenviar la petición.',
            'Modificar algún dato del payload (como `"role": "admin"` o el `"user_id"`) sin recalcular la firma y comprobar si el servidor acepta el token.'
          ]
        ],
        [
          "JWT · Signature and algorithm",
          "It occurs when the server does not properly verify the cryptographic signature of the JWT token or accepts insecure algorithms (such as `none` or changing `RS256` to `HS256`), allowing the token's content to be forged.\nIt can occur in REST APIs, authentications with the `Authorization: Bearer` header, and SPA (Single Page Applications).",
          [
            'Decode the JWT (for example on jwt.io or in Burp), change the `"alg"` field in the header to `"none"`, remove the signature (leaving the trailing dot), and resend the request.',
            'Modify some data in the payload (such as `"role": "admin"` or the `"user_id"`) without recalculating the signature and check if the server accepts the token.'
          ]
        ]
      ],
      [
        "jwt-claims",
        [
          "JWT · Vigencia, emisor y audiencia",
          "Ocurre cuando el servidor acepta tokens JWT caducados o emitidos para otros servicios porque no valida los claims estándar de tiempo y origen (`exp`, `nbf`, `iss`, `aud`).\nSe puede dar en arquitecturas de microservicios, sistemas SSO (Single Sign-On) y APIs que comparten proveedor de identidad.",
          [
            "Guardar un JWT válido, esperar a que supere el timestamp del campo `exp` (expiración) y volver a enviarlo para comprobar si sigue dando acceso.",
            "Alterar los valores de `iss` (emisor) o `aud` (audiencia) en el payload (o usar el token de otra aplicación del mismo entorno) y ver si la API lo acepta."
          ]
        ],
        [
          "JWT · Validity period, issuer and audience",
          "This occurs when the server accepts expired JWTs or tokens issued for other services because it fails to validate standard time and origin claims (`exp`, `nbf`, `iss`, `aud`).\nIt can occur in microservice architectures, SSO (Single Sign-On) systems and APIs that share an identity provider.",
          [
            "Save a valid JWT, wait until it exceeds the timestamp of the `exp` (expiration) field, and resend it to check if it still grants access.",
            "Alter the values of `iss` (issuer) or `aud` (audience) in the payload (or use the token from another application in the same environment) and see if the API accepts it."
          ]
        ]
      ]
    ]
  },
  {
    "id": "disclosure",
    "title": [
      "Exposición de información",
      "Information disclosure"
    ],
    "items": [
      [
        "errors",
        [
          "Datos sensibles en mensajes de error",
          "Ocurre cuando la aplicación muestra errores detallados (stack traces, consultas SQL, rutas internas del servidor o versiones de software) en lugar de un mensaje genérico.\nSe puede dar en formularios con datos malformados, parámetros URL alterados, páginas 404/500 y respuestas de API.",
          [
            "Introducir caracteres inesperados (`'`, `\"`, `[]`, `\\` o letras en campos numéricos) en parámetros GET/POST para forzar una excepción no controlada.",
            "Enviar peticiones con métodos HTTP no soportados (como `PUT` o `DELETE` en endpoints `GET`) o JSON malformado para analizar la traza devuelta."
          ]
        ],
        [
          "Sensitive information in errors",
          "This occurs when the application displays detailed errors (stack traces, SQL queries, internal server paths or software versions) instead of a generic message.\nIt can occur in forms with malformed data, altered URL parameters, 404/500 pages and API responses.",
          [
            "Enter unexpected characters (`'`, `\"`, `[]`, `\\` or letters in numeric fields) in GET/POST parameters to force for an unhandled exception.",
            "Send requests with unsupported HTTP methods (such as `PUT` or `DELETE` on `GET` endpoints) or malformed JSON to analyze the returned trace."
          ]
        ]
      ],
      [
        "sensitive-files",
        [
          "Archivos sensibles o directorios expuestos",
          "Ocurre cuando el servidor deja accesibles públicamente ficheros de configuración, copias de seguridad, repositorios (`.git`) o listados de directorios sin control de acceso. Además, el archivo `robots.txt` puede revelar rutas ocultas, paneles de administración o ficheros sensibles al listarlos como `Disallow`.\nSe puede dar en la raíz del dominio, rutas de backup, carpetas de desarrollo, archivos `.env` y el propio fichero `/robots.txt`.",
          [
            "Visitar manualmente `/robots.txt`, `/sitemap.xml`, `/.git/HEAD`, `/.env` y probar extensiones de respaldo sobre archivos existentes (ej. `index.php.bak`, `config.old`, `backup.zip`)",
            "Lanzar herramientas de fuzzing de directorios como `ffuf` o `gobuster` con un diccionario común para descubrir rutas ocultas o con Directory Listing activo."
          ]
        ],
        [
          "Exposed sensitive files or directories",
          "This occurs when the server makes configuration files, backups, repositories (`.git`) or directory listings publicly accessible without access control. The `robots.txt` file can also reveal hidden paths, admin panels or sensitive files by listing them under `Disallow`.\nIt can occur at the domain root, in backup paths, development folders, `.env` files and the `/robots.txt` file itself.",
          [
            "Manually visit `/robots.txt`, `/sitemap.xml`, `/.git/HEAD`, `/.env`, and test backup extensions on existing files (e.g., `index.php.bak`, `config.old`, `backup.zip`).",
            "Run directory fuzzing tools such as `ffuf` or `gobuster` with a common wordlist to discover hidden paths or those with Directory Listing enabled."
          ]
        ]
      ],
      [
        "secrets",
        [
          "Credenciales incrustadas en el código del cliente",
          "Ocurre cuando los desarrolladores dejan contraseñas, claves de API, tokens secretos o endpoints internos escritos directamente en el código fuente que se descarga al navegador.\nSe puede dar en archivos JavaScript (`.js`), comentarios del código HTML, mapas de origen (`.js.map`) y aplicaciones móviles descompiladas.",
          [
            "Inspeccionar el código fuente (Ctrl+U) y buscar en los archivos JS cargados (desde DevTools -> Fuentes/Sources) palabras clave como `api_key`, `secret`, `password`, `token` o `Authorization`.",
            "Revisar los archivos `.map` asociados a los bundles de JavaScript o usar extensiones/scripts que busquen patrones de claves en el código del cliente."
          ]
        ],
        [
          "Hardcoded credentials in client-side code",
          "This occurs when developers leave passwords, API keys, secret tokens or internal endpoints directly in source code downloaded to the browser.\nIt can occur in JavaScript files (`.js`), HTML comments, source maps (`.js.map`) and decompiled mobile apps.",
          [
            "Inspect the page source (Ctrl+U) and search the loaded JS files (in DevTools -> Sources) for keywords such as `api_key`, `secret`, `password`, `token` or `Authorization`.",
            "Review the `.map` files associated with JavaScript bundles or use extensions/scripts that look for key patterns in client code."
          ]
        ]
      ]
    ]
  },
  {
    "id": "api",
    "title": [
      "Exposición de datos en API",
      "API data exposure"
    ],
    "items": [
      [
        "api-data",
        [
          "Datos sensibles en respuestas de API",
          "Ocurre cuando un endpoint de la API devuelve el objeto completo de la base de datos con más campos de los que la interfaz muestra (Excessive Data Exposure), delegando el filtrado al frontend.\nSe puede dar en peticiones de perfil de usuario, listados de comentarios/productos y endpoints REST en formato JSON o XML.",
          [
            "Interceptar el tráfico con Burp Suite mientras se navega normalmente por la web y revisar el cuerpo (body) de las respuestas JSON en busca de campos ocultos (hashes, DNI, teléfonos, roles).",
            "Consultar endpoints de listado general (ej. `/api/users` o `/api/posts`) y comparar los campos devueltos frente a los que realmente pinta la página."
          ]
        ],
        [
          "Sensitive data in API responses",
          "This occurs when an API endpoint returns the complete database object with more fields than the interface displays (Excessive Data Exposure), leaving filtering to the frontend.\nIt can occur in user profile requests, comment or product listings, and REST endpoints returning JSON or XML.",
          [
            "Intercept traffic with Burp Suite during normal browsing and review JSON response bodies for hidden fields (hashes, national ID numbers, phone numbers, roles).",
            "Check general listing endpoints (e.g., `/api/users` or `/api/posts`) and compare the returned fields with those the page actually displays."
          ]
        ]
      ],
      [
        "graphql-data",
        [
          "Exposición de datos en GraphQL",
          "Ocurre cuando un servidor GraphQL tiene activa la introspección en producción o carece de controles de autorización a nivel de objeto/campo, permitiendo consultar todo el esquema y extraer datos no previstos.\nSe puede dar en endpoints como `/graphql`, `/api/graphql` o `/v1/graphql`.",
          [
            "Enviar una consulta de introspección `{__schema{types{name,fields{name}}}}` al endpoint GraphQL para comprobar si devuelve toda la estructura de consultas y mutaciones disponibles.",
            "Solicitar campos adicionales no usados por el frontend dentro de una query legítima (por ejemplo, añadir `email` o `passwordHash` dentro de una consulta `user`)."
          ]
        ],
        [
          "GraphQL data exposure",
          "This occurs when a GraphQL server has introspection enabled in production or lacks object- or field-level authorization controls, allowing the entire schema to be queried and unintended data to be extracted.\nIt can occur at endpoints such as `/graphql`, `/api/graphql` or `/v1/graphql`.",
          [
            "Send an introspection query `{__schema{types{name,fields{name}}}}` to the GraphQL endpoint to check whether it returns the full structure of available queries and mutations.",
            "Request additional fields not used by the frontend within a legitimate query (for example, adding `email` or `passwordHash` inside a `user` query)."
          ]
        ]
      ],
      [
        "cors-read",
        [
          "CORS permisivo",
          "Ocurre cuando la política de intercambio de recursos de origen cruzado (CORS) confía en cualquier dominio (`Access-Control-Allow-Origin: *` o reflejando cualquier cabecera `Origin`) junto con credenciales activas, permitiendo que una web maliciosa lea datos privados del usuario.\nSe puede dar en APIs autenticadas por cookies o cabeceras y endpoints que devuelven información privada del usuario.",
          [
            "Añadir la cabecera `Origin: https://atacante.com` a una petición autenticada en Burp Repeater y revisar si la respuesta incluye `Access-Control-Allow-Origin: https://atacante.com` y `Access-Control-Allow-Credentials: true`.",
            "Probar variaciones del dominio legítimo (como `Origin: https://atacante.com` o `Origin: null`) para verificar si la validación mediante expresiones regulares es débil."
          ]
        ],
        [
          "Overly permissive CORS",
          "This occurs when a cross-origin resource sharing (CORS) policy trusts any domain (`Access-Control-Allow-Origin: *` or reflecting any `Origin` header) together with active credentials, allowing a malicious website to read the user's private data.\nIt can occur in APIs authenticated with cookies or headers and endpoints returning private user information.",
          [
            "Add the `Origin: https://attacker.com` header to an authenticated request in Burp Repeater and check if the response includes `Access-Control-Allow-Origin: https://attacker.com` and `Access-Control-Allow-Credentials: true`.",
            "Test variations of the legitimate domain (such as `Origin: https://attacker.com` or `Origin: null`) to verify if the regular expression validation is weak."
          ]
        ]
      ]
    ]
  },
  {
    "id": "redirect",
    "title": [
      "Open Redirect",
      "Open redirect"
    ],
    "items": [
      [
        "redirect",
        [
          "Redirección abierta",
          "Ocurre cuando la aplicación redirige al usuario a una URL externa controlada mediante un parámetro sin validar que pertenezca al dominio legítimo, facilitando campañas de phishing creíbles.\nSe puede dar en parámetros de retorno tras el login (`?redirect=`, `?next=`, `?url=`, `?returnUrl=`), cierres de sesión y selectores de idioma.",
          [
            "Localizar parámetros en la URL que contengan rutas o enlaces y sustituir su valor por un dominio externo como `https://example.com` o `//example.com` o `https://origen.com@example.com`.",
            "Comprobar si el servidor responde con un código `301`/`302` apuntando al dominio externo en la cabecera `Location` o si redirige mediante JavaScript."
          ]
        ],
        [
          "Open redirect",
          "This occurs when the application redirects the user to an external URL controlled by a parameter without validating that it belongs to the legitimate domain, making convincing phishing campaigns easier.\nIt can occur in post-login return parameters (`?redirect=`, `?next=`, `?url=`, `?returnUrl=`), logout flows and language selectors.",
          [
            "Locate parameters in the URL that contain paths or links and replace their value with an external domain such as `https://example.com` or `//example.com` or `https://origin.com@example.com`.",
            "Check whether the server returns a `301`/`302` status pointing to the external domain in the `Location` header or redirects using JavaScript."
          ]
        ]
      ]
    ]
  },
  {
    "id": "xss",
    "title": [
      "XSS · Cross-site scripting",
      "XSS · Cross-site scripting"
    ],
    "items": [
      [
        "reflected",
        [
          "XSS reflejado",
          "Ocurre cuando la entrada enviada por el usuario en una petición HTTP se devuelve inmediatamente en la respuesta del servidor sin sanitizar, ejecutando código JavaScript en el navegador de quien abre el enlace manipulado.\nSe puede dar en barras de búsqueda, mensajes de error en pantalla, parámetros de URL y filtros de tablas.",
          [
            "Introducir una cadena de prueba con caracteres especiales como `test\"'<>` o `\"><u>test</u>` en parámetros GET o formularios y revisar en el código fuente dónde y cómo se refleja.",
            'Probar un payload básico como `<script>alert(1)</script>` o `" onmouseover="alert(1)` o `<img src=x onerror="alert(1)">` según el contexto HTML (etiqueta, atributo o script) donde aparezca reflejado.',
            {
              "text": "XSS Cheat Sheet:",
              "label": "https://portswigger.net/web-security/cross-site-scripting/cheat-sheet",
              "url": "https://portswigger.net/web-security/cross-site-scripting/cheat-sheet"
            }
          ]
        ],
        [
          "Reflected XSS",
          "This occurs when user input in an HTTP request is immediately returned unsanitized in the server response, executing JavaScript in the browser of whoever opens the manipulated link.\nIt can occur in search bars, on-screen error messages, URL parameters and table filters.",
          [
            "Enter a test string containing special characters such as `test\"'<>` or `\"><u>test</u>` in GET parameters or forms and inspect the source to see where and how it is reflected.",
            'Test a basic payload such as `<script>alert(1)</script>` or `" onmouseover="alert(1)` or `<img src=x onerror="alert(1)">` depending on the HTML context (tag, attribute, or script) where it appears reflected.',
            {
              "text": "XSS Cheat Sheet:",
              "label": "https://portswigger.net/web-security/cross-site-scripting/cheat-sheet",
              "url": "https://portswigger.net/web-security/cross-site-scripting/cheat-sheet"
            }
          ]
        ]
      ],
      [
        "stored",
        [
          "XSS almacenado",
          "Ocurre cuando la aplicación guarda datos maliciosos enviados por un usuario en la base de datos y los muestra posteriormente a otros usuarios sin escapar, ejecutando JavaScript de forma persistente.\nSe puede dar en comentarios de blogs, biografías de perfil, nombres de usuario, mensajes de soporte y títulos de publicaciones.",
          [
            "Guardar una cadena identificativa con caracteres HTML (`\"'><test` o `\"><u>test</u>`) en cualquier campo que quede registrado y visible para otros usuarios, y revisar cómo se renderiza al recargar.",
            'Inyectar payloads que no dependan de la etiqueta `<script>` (por si está filtrada), como `<img src=x onerror=alert(1)>` o `<svg onload=alert(1)>`.',
            {
              "text": "XSS Cheat Sheet:",
              "label": "https://portswigger.net/web-security/cross-site-scripting/cheat-sheet",
              "url": "https://portswigger.net/web-security/cross-site-scripting/cheat-sheet"
            }
          ]
        ],
        [
          "Stored XSS",
          "This occurs when the application stores malicious user-submitted data in its database and later displays it to other users without escaping it, resulting in persistent JavaScript execution.\nIt can occur in blog comments, profile bios, usernames, support messages and post titles.",
          [
            "Save an identifying string containing HTML characters (`\"'><test` or `\"><u>test</u>`) in a field that is stored and visible to other users, and review how it renders on reload.",
            'Inject payloads that do not rely on the `<script>` tag (in case it is filtered), such as `<img src=x onerror=alert(1)>` or `<svg onload=alert(1)>`.',
            {
              "text": "XSS Cheat Sheet:",
              "label": "https://portswigger.net/web-security/cross-site-scripting/cheat-sheet",
              "url": "https://portswigger.net/web-security/cross-site-scripting/cheat-sheet"
            }
          ]
        ]
      ],
      [
        "dom",
        [
          "XSS basado en DOM",
          "Ocurre cuando el código JavaScript del propio cliente lee datos de una fuente controlable por el usuario (como la URL) y los escribe de forma insegura en el DOM de la página sin pasar por el servidor.\nSe puede dar en aplicaciones SPA, fragmentos de URL (`#`), parámetros manejados por JS, `localStorage` y mensajes `postMessage`.",
          [
            'Añadir un fragmento o parámetro en la URL como `#"><img src=x onerror=alert(1)>` (que no se envía al servidor) y observar si se ejecuta al procesarlo el JavaScript de la página.',
            "Buscar en los archivos JS del cliente fuentes peligrosas (`location.hash`, `location.search`, `document.referrer`) que terminen en sumideros inseguros (`innerHTML`, `document.write`, `eval()`)."
          ]
        ],
        [
          "DOM-based XSS",
          "This occurs when client-side JavaScript reads data from a user-controllable source (such as the URL) and writes it unsafely into the page DOM without going through the server.\nIt can occur in SPAs, URL fragments (`#`), parameters handled by JS, `localStorage` and `postMessage` messages.",
          [
            'Add a fragment or parameter to the URL such as `#"><img src=x onerror=alert(1)>` (which is not sent to the server) and observe if it executes when processed by the page\'s JavaScript.',
            "Search client-side JS files for dangerous sources (`location.hash`, `location.search`, `document.referrer`) that reach unsafe sinks (`innerHTML`, `document.write`, `eval()`)."
          ]
        ]
      ],
      [
        "xss-dom-clobbering",
        [
          "XSS DOM Clobbering",
          "Ocurre cuando se combina una inyección de HTML benigno (atributos `id` o `name`) para sobrescribir variables globales del DOM (DOM Clobbering) junto con un fragmento de JavaScript existente en la página que lee esa variable y la pasa a un sumidero peligroso (como `innerHTML` o `eval`), logrando ejecutar JavaScript.\nSe puede dar en aplicaciones que sanean HTML permitiendo etiquetas seguras (`<a>`, `<form>`, `<input>`) y usan variables globales para cargar scripts dinámicos o construir HTML.",
          [
            "Analizar el código JavaScript de la página buscando variables globales no definidas (ej. `window.defaultAvatar` o `window.scriptUrl`) cuyo valor acabe concatenándose en `innerHTML` o en el atributo `src` de un `<script>`.",
            'Inyectar etiquetas HTML con el mismo `id` y atributos manipulados (por ejemplo `<a id="defaultAvatar" href="cid:&quot;onerror=alert(1)//">`) para que el código JS legitimo lea esa cadena y dispare el XSS.'
          ]
        ],
        [
          "XSS DOM Clobbering",
          "This occurs when benign HTML injection (`id` or `name` attributes) overwrites global DOM variables (DOM Clobbering) and existing page JavaScript reads the variable and passes it to a dangerous sink (such as `innerHTML` or `eval`), resulting in JavaScript execution.\nIt can occur in applications that sanitize HTML while allowing safe tags (`<a>`, `<form>`, `<input>`) and use global variables to load scripts dynamically or construct HTML.",
          [
            "Analyze the page JavaScript for undefined globals (e.g., `window.defaultAvatar` or `window.scriptUrl`) whose value is eventually concatenated into `innerHTML` or the `src` attribute of a `<script>`.",
            'Inject HTML tags with the same `id` and manipulated attributes (for example `<a id="defaultAvatar" href="cid:&quot;onerror=alert(1)//">`) so that the legitimate JS code reads that string and triggers the XSS.'
          ]
        ]
      ],
      [
        "xss-other",
        [
          "XSS · otro subtipo o sin clasificar",
          "Ocurre cuando se logra ejecutar JavaScript arbitrario mediante vectores menos habituales, como XSS ciego (Blind XSS en paneles internos), XSS por mutación (mXSS al parsear HTML) o mediante subida de archivos SVG/HTML.\nSe puede dar en formularios de contacto que leen administradores, cabeceras HTTP registradas en logs (`User-Agent`, `Referer`) y subida de imágenes o documentos.",
          [
            'Enviar payloads con llamada externa (tipo `<script src="https://tu-servidor.com"></script>`) en campos que solo revisará un administrador en el backoffice (Blind XSS).',
            "Subir un archivo `.svg` que contenga código `<script>alert(1)</script>` en su interior y abrir su URL directa en el navegador para ver si lo ejecuta en el origen de la web."
          ]
        ],
        [
          "XSS · other or unclassified",
          "This occurs when arbitrary JavaScript can run through less common vectors, such as blind XSS in internal panels, mutation XSS (mXSS during HTML parsing) or SVG/HTML uploads.\nIt can occur in contact forms read by administrators, HTTP headers recorded in logs (`User-Agent`, `Referer`) and image or document uploads.",
          [
            'Send payloads with an external call (such as `<script src="https://your-server.com"></script>`) in fields that will only be reviewed by an administrator in the backoffice (Blind XSS).',
            "Upload an `.svg` file containing `<script>alert(1)</script>` code inside it and open its direct URL in the browser to see if it executes on the website's origin."
          ]
        ]
      ]
    ]
  },
  {
    "id": "csp",
    "title": [
      "CSP · Content Security Policy",
      "CSP · Content Security Policy"
    ],
    "items": [
      [
        "csp-policy",
        [
          "CSP permisiva",
          "Ocurre cuando la cabecera `Content-Security-Policy` está mal configurada con directivas débiles (como `unsafe-inline`, `unsafe-eval`, comodines `*` o dominios públicos de CDN), permitiendo saltarse la protección contra XSS.\nSe puede dar en cualquier página web que defina la cabecera HTTP `Content-Security-Policy` o la etiqueta `<meta http-equiv=\"Content-Security-Policy\">`.",
          [
            "Revisar las cabeceras de respuesta HTTP en DevTools o Burp Suite y comprobar si `script-src` o `default-src` contienen `'unsafe-inline'`, `'unsafe-eval'`, `data:` o `*`.",
            "Pegar la política CSP encontrada en herramientas de análisis como CSP Evaluator de Google para detectar bypasses conocidos (como JSONP en dominios permitidos).",
            {
              "text": "CSP Evaluator:",
              "label": "https://csp-evaluator.withgoogle.com/",
              "url": "https://csp-evaluator.withgoogle.com/"
            }
          ]
        ],
        [
          "Permissive CSP",
          "This occurs when the `Content-Security-Policy` header is misconfigured with weak directives (such as `unsafe-inline`, `unsafe-eval`, `*` wildcards or public CDN domains), allowing XSS protection to be bypassed.\nIt can occur on any page that sets the `Content-Security-Policy` HTTP header or a `<meta http-equiv=\"Content-Security-Policy\">` tag.",
          [
            "Review HTTP response headers in DevTools or Burp Suite and check whether `script-src` or `default-src` contain `'unsafe-inline'`, `'unsafe-eval'`, `data:` or `*`.",
            "Paste the CSP into an analysis tool such as Google's CSP Evaluator to identify known bypasses (such as JSONP on allowed domains).",
            {
              "text": "CSP Evaluator:",
              "label": "https://csp-evaluator.withgoogle.com/",
              "url": "https://csp-evaluator.withgoogle.com/"
            }
          ]
        ]
      ]
    ]
  },
  {
    "id": "markup",
    "title": [
      "Manipulación de HTML y DOM",
      "HTML and DOM manipulation"
    ],
    "items": [
      [
        "head",
        [
          "Inyección en la cabecera HTML",
          "Ocurre cuando la aplicación refleja datos del usuario dentro de la sección `<head>` del documento HTML (como etiquetas `<meta>`, `<title>`, `<link>` o `<base>`) sin escapar correctamente, permitiendo alterar metadatos, redirigir o inyectar scripts.\nSe puede dar en títulos dinámicos de artículos/búsquedas, etiquetas OpenGraph (`og:title`, `og:url`), etiquetas `<meta http-equiv=\"refresh\">` y rutas dinámicas en `<link href=\"...\">`.",
          [
            "Introducir caracteres de cierre de etiqueta o atributo (`\"`, `'`, `>`) en parámetros que se reflejen en el título de la pestaña o en los metadatos de la página y revisar el código fuente del `<head>`.",
            'Probar a inyectar una redirección con `"><meta http-equiv="refresh" content="0;url=https://example.com">` o cerrar el contexto actual para abrir una etiqueta `<script>`.'
          ]
        ],
        [
          "HTML head injection",
          "This occurs when the application reflects user data inside the document's `<head>` (such as `<meta>`, `<title>`, `<link>` or `<base>` tags) without proper escaping, allowing metadata changes, redirects or script injection.\nIt can occur in dynamic article or search titles, Open Graph tags (`og:title`, `og:url`), `<meta http-equiv=\"refresh\">` tags and dynamic paths in `<link href=\"...\">`.",
          [
            "Enter tag or attribute closing characters (`\"`, `'`, `>`) in parameters reflected in the tab title or page metadata and review the source of the `<head>`.",
            'Try injecting a redirect with `"><meta http-equiv="refresh" content="0;url=https://example.com">` or closing the current context to open a `<script>` tag.'
          ]
        ]
      ],
      [
        "dom-mutation",
        [
          "Manipulación del DOM",
          "Ocurre cuando un atacante logra alterar la estructura, el contenido o el comportamiento del árbol DOM en el navegador mediante entradas no validadas, sin necesidad de llegar a ejecutar código JavaScript arbitrario (por ejemplo, cambiando enlaces, textos o formularios).\nSe puede dar en enlaces dinámicos (`href`), acciones de formularios (`action`), manejo de mensajes `postMessage` y parámetros de URL leídos por JavaScript.",
          [
            "Buscar en el código JS del cliente si datos procedentes de `location.search`, `location.hash` o `postMessage` se asignan directamente a propiedades como `element.href`, `form.action` o `innerText`.",
            "Manipular un parámetro en la URL (por ejemplo `?destino=https://atacante.com`) y comprobar en el inspector de elementos (F12) si algún botón o formulario de la página adopta esa URL como destino.",
            "En formularios como un login, podemos eliminar mediante las herramientas de desarrollador el parámetro `required` de, por ejemplo, la password."
          ]
        ],
        [
          "DOM manipulation",
          "This occurs when an attacker uses unvalidated input to change the structure, content or behavior of the browser's DOM tree without having to execute arbitrary JavaScript (for example, changing links, text or forms).\nIt can occur in dynamic links (`href`), form actions (`action`), `postMessage` handling and URL parameters read by JavaScript.",
          [
            "Search client JS for data from `location.search`, `location.hash` or `postMessage` assigned directly to properties such as `element.href`, `form.action` or `innerText`.",
            "Manipulate a parameter in the URL (for example `?destination=https://attacker.com`) and check in the element inspector (F12) if any button or form on the page adopts that URL as its destination.",
            "In forms such as a login form, we can use developer tools to remove the `required` attribute from the password field, for example."
          ]
        ]
      ],
      [
        "clobber",
        [
          "DOM clobbering",
          "Ocurre cuando se inyecta código HTML benigno (sin JavaScript, usando atributos `id` o `name`) para sobrescribir variables globales o propiedades del objeto `document`/`window` de las que depende el código JavaScript de la aplicación.\nSe puede dar en editores de texto enriquecido (HTML permitido), perfiles de usuario o comentarios donde se filtran etiquetas `<script>` y eventos `on*`, pero se permiten etiquetas como `<a>`, `<form>` o `<input>`.",
          [
            "Revisar el JavaScript de la aplicación en busca de variables globales no inicializadas o patrones como `window.config || defaultConfig` o `document.getElementById(...)`.",
            'Inyectar etiquetas HTML como `<a id="config" href="https://atacante.com">` (o combinaciones `<form id="x"><input id="y">`) y verificar en la consola del navegador si `window.config` ahora apunta al elemento HTML inyectado.',
          ]
        ],
        [
          "DOM clobbering",
          "This occurs when benign HTML (without JavaScript, using `id` or `name` attributes) is injected to overwrite global variables or properties of `document`/`window` that the application's JavaScript relies on.\nIt can occur in rich text editors (HTML allowed), user profiles or comments where `<script>` tags and `on*` events are filtered but tags such as `<a>`, `<form>` or `<input>` are allowed.",
          [
            "Review the application's JavaScript for uninitialized globals or patterns such as `window.config || defaultConfig` or `document.getElementById(...)`.",
            'Inject HTML tags such as `<a id="config" href="https://attacker.com">` (or combinations `<form id="x"><input id="y">`) and verify in the browser console if `window.config` now points to the injected HTML element.'
          ]
        ]
      ]
    ]
  },
  {
    "id": "authz",
    "title": [
      "Broken Access Control · Control de acceso",
      "Broken Access Control"
    ],
    "items": [
      [
        "object",
        [
          "Acceso indebido a objetos (IDOR)",
          "Ocurre cuando la aplicación utiliza identificadores predecibles o directos (IDs numéricos, UUIDs, nombres de archivo) para acceder a un recurso sin comprobar en el servidor si el usuario autenticado es realmente su propietario.\nSe puede dar en URLs o cuerpos de petición con parámetros como `?id=105`, `/api/users/42/invoices`, descarga de recibos PDF y edición de perfiles.",
          [
            "Crear dos cuentas de usuario distintas (Usuario A y Usuario B), capturar una petición del Usuario A que incluya un identificador de recurso y reenviarla cambiando la cookie/token por la del Usuario B.",
            "Sustituir el ID de un recurso propio por uno correlativo (`id+1` o `id-1`) en Burp Repeater para comprobar si devuelve información privada de otro usuario."
          ]
        ],
        [
          "Insecure direct object reference (IDOR)",
          "This occurs when an application uses predictable or direct identifiers (numeric IDs, UUIDs, filenames) to access a resource without checking on the server that the authenticated user is actually its owner.\nIt can occur in URLs or request bodies with parameters such as `?id=105`, `/api/users/42/invoices`, PDF receipt downloads and profile editing.",
          [
            "Create two different user accounts (User A and User B), capture a request from User A that includes a resource identifier, and resend it replacing the cookie/token with User B's.",
            "Replace the ID of your own resource with a sequential one (`id+1` or `id-1`) in Burp Repeater to check if it returns private information from another user."
          ]
        ]
      ],
      [
        "role",
        [
          "Autorización por rol insuficiente",
          "Ocurre cuando un usuario con privilegios bajos (por ejemplo, un usuario estándar o invitado) puede acceder a funcionalidades o endpoints reservados únicamente para roles superiores (como un administrador) porque el control solo se oculta en la interfaz.\nSe puede dar en paneles de administración (`/admin`), acciones de borrado/creación de usuarios, gestión de roles y endpoints de configuración global.",
          [
            "Iniciar sesión como administrador, mapear las rutas y peticiones de acciones privilegiadas, y luego repetir exactamente esas mismas peticiones usando la sesión de un usuario normal.",
            'Probar a acceder directamente por URL a rutas administrativas comunes (`/admin`, `/dashboard/users`) desde una cuenta sin privilegios o modificar parámetros como `"role":"admin"` al actualizar el perfil.'            
          ]
        ],
        [
          "Insufficient role authorization",
          "This occurs when a low-privileged user (for example, a standard user or guest) can access features or endpoints reserved for higher roles (such as an administrator) because the control is merely hidden in the interface.\nIt can occur in admin panels (`/admin`), user deletion or creation, role management and global configuration endpoints.",
          [
            "Log in as an administrator, map the routes and requests for privileged actions, and then repeat those exact same requests using a regular user's session.",
            'Try to access common administrative routes (`/admin`, `/dashboard/users`) directly via URL from an unprivileged account, or modify parameters such as `"role":"admin"` when updating the profile.'
          ]
        ]
      ],
      [
        "access",
        [
          "Broken Access Control · otros fallos de autorización",
          "Ocurre cuando existen fallos de control de acceso que no encajan en IDOR o escalada de roles simple, como saltarse pasos de un flujo secuencial (ej. pago o verificación 2FA), cambiar el método HTTP o manipular cabeceras de enrutamiento interno.\nSe puede dar en procesos de compra (checkout), asistentes de varios pasos, APIs que aceptan distintos verbos HTTP y aplicaciones tras un proxy inverso.",
          [
            "Saltarse un paso intermedio en un flujo obligado (por ejemplo, pasar directamente del paso 1 del carrito a la URL de confirmación `/order/complete` sin pasar por la pasarela de pago).",
            "Reenviar una petición denegada (401/403) cambiando el método HTTP (de `GET` a `POST` o `HEAD`) o añadiendo cabeceras como `X-Original-URL: /admin` o `X-Forwarded-For: 127.0.0.1`."
          ]
        ],
        [
          "Broken Access Control · other authorization flaws",
          "This occurs when access control flaws fall outside IDOR or simple role escalation, such as skipping steps in a sequential workflow (e.g., payment or 2FA verification), changing the HTTP method or manipulating internal routing headers.\nIt can occur in checkout flows, multi-step wizards, APIs accepting different HTTP verbs and applications behind a reverse proxy.",
          [
            "Skip an intermediate step in a mandatory flow (for example, going directly from step 1 of the cart to the confirmation URL `/order/complete` without going through the payment gateway).",
            "Resend a denied request (401/403) by changing the HTTP method (from `GET` to `POST` or `HEAD`) or adding headers such as `X-Original-URL: /admin` or `X-Forwarded-For: 127.0.0.1`."
          ]
        ]
      ]
    ]
  },
  {
    "id": "csrf",
    "title": [
      "CSRF",
      "CSRF"
    ],
    "items": [
      [
        "csrf",
        [
          "Falsificación de peticiones entre sitios (CSRF)",
          "Ocurre cuando una aplicación confía únicamente en las cookies de sesión enviadas automáticamente por el navegador para validar una acción, permitiendo que una web externa fuerce al navegador de una víctima autenticada a ejecutar acciones no deseadas.\nSe puede dar en formularios de cambio de contraseña, cambio de correo electrónico, transferencias, modificación de permisos y acciones de borrado.",
          [
            "Interceptar una petición que modifique estado (como cambiar el email) y comprobar si carece de un token anti-CSRF impredecible en el cuerpo/cabecera y si la cookie de sesión tiene `SameSite=None` o no tiene atributo `SameSite`.",
            "Generar una prueba de concepto HTML en Burp Suite (Engagement tools -> Generate CSRF PoC), abrirla localmente en el navegador con la sesión iniciada y comprobar si el cambio se ejecuta sin pedir confirmación."
          ]
        ],
        [
          "Cross-site request forgery (CSRF)",
          "This occurs when an application relies entirely on session cookies sent automatically by the browser to validate an action, allowing an external website to force an authenticated victim's browser to perform unwanted actions.\nIt can occur in password change forms, email changes, transfers, permission changes and deletion actions.",
          [
            "Intercept a state-changing request (such as an email change) and check whether the body/header lacks an unpredictable anti-CSRF token and whether the session cookie has `SameSite=None` or no `SameSite` attribute.",
            "Generate an HTML proof of concept in Burp Suite (Engagement tools -> Generate CSRF PoC), open it locally in the browser while logged in, and check if the change is executed without asking for confirmation."
          ]
        ]
      ]
    ]
  },
  {
    "id": "mass",
    "title": [
      "Mass Assignment",
      "Mass assignment"
    ],
    "items": [
      [
        "mass",
        [
          "Asignación masiva (Mass assignment)",
          "Ocurre cuando el backend vincula automáticamente los parámetros enviados en la petición del cliente (JSON o formulario) a las propiedades internas de un objeto o modelo de base de datos sin filtrar qué campos pueden modificarse.\nSe puede dar en endpoints de registro de usuarios (`POST /register`), actualización de perfil (`PUT /api/user`) y creación de pedidos.",
          [
            "Revisar la respuesta de un `GET /api/user` para ver todos los nombres de atributos internos del modelo (como `isAdmin`, `role`, `balance` o `verified`).",
            'Interceptar la petición de actualización o registro e inyectar esos parámetros adicionales en el cuerpo (por ejemplo, `"role": "admin"` o `"isAdmin": true`) para comprobar si se guardan.'
          ]
        ],
        [
          "Mass assignment",
          "This occurs when the backend automatically binds parameters in the client request (JSON or form data) to internal properties of an object or database model without filtering which fields can be changed.\nIt can occur in user registration endpoints (`POST /register`), profile updates (`PUT /api/user`) and order creation.",
          [
            "Review the response to a `GET /api/user` to see all the model's internal attribute names (such as `isAdmin`, `role`, `balance` or `verified`).",
            'Intercept the update or registration request and inject those additional parameters into the body (for example, `"role": "admin"` or `"isAdmin": true`) to check if they are saved.'
          ]
        ]
      ]
    ]
  },
  {
    "id": "files",
    "title": [
      "Path traversal e inclusión local",
      "Path traversal and local file inclusion"
    ],
    "items": [
      [
        "path",
        [
          "Recorrido de rutas (Path traversal)",
          "Ocurre cuando la aplicación usa una entrada del usuario para construir la ruta de un archivo en el sistema sin sanitizar secuencias de salto de directorio (`../`), permitiendo leer o escribir archivos fuera de la carpeta prevista.\nSe puede dar en parámetros de descarga o visualización de archivos (`?file=factura.pdf`, `?image=foto.jpg`, `?doc=...`) y exportaciones.",
          [
            "Sustituir el nombre del archivo en el parámetro por secuencias de retroceso como `../../../../etc/passwd` (Linux) o `..\\..\\..\\..\\windows\\win.ini` (Windows).",
            "Si los caracteres `../` son eliminados o bloqueados, probar variantes codificadas o anidadas como `....//....//etc/passwd` o URL-encoding (`%2e%2e%2f`)."
          ]
        ],
        [
          "Path traversal",
          "This occurs when the application uses user input to construct a filesystem path without sanitizing directory traversal sequences (`../`), allowing files outside the intended folder to be read or written.\nIt can occur in file download or display parameters (`?file=factura.pdf`, `?image=foto.jpg`, `?doc=...`) and exports.",
          [
            "Replace the filename in the parameter with traversal sequences such as `../../../../etc/passwd` (Linux) or `..\\..\\..\\..\\windows\\win.ini` (Windows).",
            "If the `../` characters are removed or blocked, test encoded or nested variants such as `....//....//etc/passwd` or URL-encoding (`%2e%2e%2f`)."
          ]
        ]
      ],
      [
        "lfi",
        [
          "Inclusión local de archivos (LFI)",
          "Ocurre cuando una aplicación incluye dinámicamente un archivo local del servidor en su código de ejecución (por ejemplo mediante `include()` o `require()` en PHP) a partir de un parámetro controlable, permitiendo leer ficheros internos o llegar a ejecutar código (RCE).\nSe puede dar en selectores de idioma (`?lang=es.php`), cargadores de plantillas (`?page=contacto`) y módulos dinámicos.",
          [
            "Probar a cargar archivos conocidos del sistema mediante salto de directorios (ej. `?page=../../../../etc/passwd`) para confirmar si se muestra su contenido en la respuesta.",
            "En entornos PHP, usar wrappers como `php://filter/convert.base64-encode/resource=index` para leer el código fuente en Base64 sin que se ejecute, o intentar log poisoning.",
            "Para wrappers más avanzados podemos usar la herramienta: `php_filter_chain_generator`"
          ]
        ],
        [
          "Local file inclusion (LFI)",
          "This occurs when an application dynamically includes a local server file in its executing code (for example, through PHP's `include()` or `require()`) based on a controllable parameter, allowing internal files to be read or even code to be executed (RCE).\nIt can occur in language selectors (`?lang=es.php`), template loaders (`?page=contacto`) and dynamic modules.",
          [
            "Try loading known system files via directory traversal (e.g., `?page=../../../../etc/passwd`) to confirm if their content is displayed in the response.",
            "In PHP environments, use wrappers such as `php://filter/convert.base64-encode/resource=index` to read the source code in Base64 without it being executed, or attempt log poisoning.",
            "For more advanced wrappers, we can use the tool: `php_filter_chain_generator`"
          ]
        ]
      ]
    ]
  },
  {
    "id": "upload",
    "title": [
      "Subida de archivos",
      "File upload"
    ],
    "items": [
      [
        "upload",
        [
          "Archivos subidos y entrega de imágenes (incluido SVG)",
          "Ocurre cuando la aplicación permite subir archivos (especialmente imágenes como avatar o adjuntos) sin validar correctamente su extensión, tipo MIME o contenido real, o los sirve desde el mismo dominio permitiendo subir webshells o archivos SVG maliciosos con JavaScript.\nSe puede dar en formularios de foto de perfil, subida de documentos, galerías multimedia y adjuntos en tickets.",
          [
            'Subir un archivo `.svg` con código `<svg xmlns="http://w3.org" onload="alert(1)"/>` y abrir su URL directa para ver si el navegador ejecuta el JavaScript en el dominio de la aplicación (Stored XSS).',
            "Interceptar la subida `multipart/form-data` en Burp Suite e intentar subir una webshell (ej. `shell.php`) cambiando el `Content-Type` a `image/jpeg`, usando doble extensión (`shell.php.jpg`) o añadiendo magic bytes (`GIF89a;`)."
          ]
        ],
        [
          "File uploads and image delivery (including SVG)",
          "This occurs when an application allows file uploads (especially images such as avatars or attachments) without properly validating the extension, MIME type or actual content, or serves them from the same domain, allowing web shells or malicious SVGs containing JavaScript to be uploaded.\nIt can occur in profile photo forms, document uploads, media galleries and ticket attachments.",
          [
            'Upload an `.svg` file with `<svg xmlns="http://w3.org" onload="alert(1)"/>` code and open its direct URL to see if the browser executes the JavaScript on the application\'s domain (Stored XSS).',
            "Intercept the `multipart/form-data` upload in Burp Suite and attempt to upload a webshell (e.g., `shell.php`) by changing the `Content-Type` to `image/jpeg`, using a double extension (`shell.php.jpg`), or adding magic bytes (`GIF89a;`)."
          ]
        ]
      ]
    ]
  },
  {
    "id": "sql",
    "title": [
      "SQLi · Inyección SQL",
      "SQLi · SQL injection"
    ],
    "items": [
      [
        "sqli",
        [
          "Inyección SQL (SQLi)",
          "Ocurre cuando una aplicación inserta datos del usuario sin parametrizar directamente en una consulta SQL, permitiendo alterar su lógica para leer, modificar o borrar datos de la base de datos.\nSe puede dar en paneles de login, barras de búsqueda, filtros de productos, cabeceras HTTP (`User-Agent`, `Cookie`) y cualquier parámetro GET/POST.",
          [
            'Introducir una comilla simple `\'`, doble `"` o barra invertida `\\` en el parámetro para comprobar si rompe la sintaxis y devuelve un error de base de datos o un cambio anómalo en la respuesta.',
            "Probar condiciones booleanas como `' OR '1'='1' -- -` frente a `' AND '1'='2' -- -` para observar si la aplicación devuelve todos los registros o cambia el comportamiento.",
            "Podemos utilizar la herramienta SQLMap para automatizarlo."
          ]
        ],
        [
          "SQL injection (SQLi)",
          "This occurs when an application inserts unparameterized user input directly into a SQL query, allowing its logic to be altered to read, modify or delete database data.\nIt can occur in login panels, search bars, product filters, HTTP headers (`User-Agent`, `Cookie`) and any GET/POST parameter.",
          [
            'Enter a single quote `\'`, double quote `"`, or backslash `\\` into the parameter to check if it breaks the syntax and returns a database error or an anomalous change in the response.',
            "Test boolean conditions such as `' OR '1'='1' -- -` versus `' AND '1'='2' -- -` to observe if the application returns all records or changes its behavior.",
            "We can use the tool SQLMap to automate it."
          ]
        ]
      ],
      [
        "blind",
        [
          "SQLi ciega basada en tiempo",
          "Ocurre cuando la aplicación es vulnerable a inyección SQL pero no devuelve errores ni diferencias visibles en la página, obligando a inferir la información midiendo el retraso provocado con funciones de espera de la base de datos.\nSe puede dar en formularios de contacto, analíticas, cabeceras HTTP procesadas en segundo plano y endpoints que siempre responden con un mensaje genérico.",
          [
            "Inyectar payloads de retardo específicos del motor de base de datos, como `' AND SLEEP(5)-- -` (MySQL), `'; SELECT pg_sleep(5)--` (PostgreSQL) o `'; WAITFOR DELAY '0:0:5'--` (MSSQL).",
            "Medir con precisión el tiempo de respuesta en Burp Repeater; si tarda exactamente los segundos indicados (ej. 5 segundos) frente a la petición normal, confirma la vulnerabilidad."
          ]
        ],
        [
          "Time-based blind SQL injection",
          "This occurs when an application is vulnerable to SQL injection but produces no errors or visible page differences, so information must be inferred by measuring delays caused by database wait functions.\nIt can occur in contact forms, analytics, HTTP headers processed in the background and endpoints that always return a generic message.",
          [
            "Inject database engine-specific delay payloads, such as `' AND SLEEP(5)-- -` (MySQL), `'; SELECT pg_sleep(5)--` (PostgreSQL), or `'; WAITFOR DELAY '0:0:5'--` (MSSQL).",
            "Accurately measure the response time in Burp Repeater; if it takes the exact number of seconds indicated (e.g., 5 seconds) compared to the normal request, it confirms the vulnerability."
          ]
        ]
      ]
    ]
  },
  {
    "id": "nosql",
    "title": [
      "Inyección NoSQL",
      "NoSQL injection"
    ],
    "items": [
      [
        "nosql",
        [
          "Inyección NoSQL",
          "Ocurre cuando una base de datos no relacional (como MongoDB) procesa consultas construidas con entradas del usuario sin validar tipos de datos, permitiendo inyectar operadores especiales (como `$ne` o `$gt`) en formato JSON o parámetros de URL.\nSe puede dar en inicios de sesión con envío de JSON, búsquedas en APIs modernas y filtros sobre bases de datos MongoDB o CouchDB.",
          [
            'En peticiones JSON (ej. login), sustituir los valores de cadena por objetos con operadores como `{"username": {"$ne": null}, "password": {"$ne": null}}` para intentar autenticarse sin conocer las credenciales.',
            "En parámetros URL o formularios `x-www-form-urlencoded`, probar la sintaxis de array `username[$ne]=admin&password[$ne]=1234` o inyectar comillas para provocar errores de sintaxis JavaScript/BSON."
          ]
        ],
        [
          "NoSQL injection",
          "This occurs when a non-relational database (such as MongoDB) processes queries built from user input without validating data types, allowing special operators (such as `$ne` or `$gt`) to be injected in JSON or URL parameters.\nIt can occur in JSON-based login flows, searches in modern APIs and filters on MongoDB or CouchDB databases.",
          [
            'In JSON requests (e.g., login), replace string values with objects containing operators such as `{"username": {"$ne": null}, "password": {"$ne": null}}` to attempt to authenticate without knowing the credentials.',
            "In URL parameters or `x-www-form-urlencoded` forms, test the array syntax `username[$ne]=admin&password[$ne]=1234` or inject quotes to trigger JavaScript/BSON syntax errors."
          ]
        ]
      ]
    ]
  },
  {
    "id": "ldap",
    "title": [
      "Inyección LDAP",
      "LDAP injection"
    ],
    "items": [
      [
        "ldap",
        [
          "Inyección LDAP",
          "Ocurre cuando la aplicación construye filtros de consulta LDAP concatenando directamente entradas del usuario sin escapar caracteres especiales (como `*`, `(`, `)`, `\\`), permitiendo modificar la lógica de búsqueda o saltarse la autenticación.\nSe puede dar en inicios de sesión corporativos conectados a Active Directory/LDAP, directorios de empleados y buscadores internos.",
          [
            "Introducir un asterisco `*` o paréntesis `)(` en el campo de usuario o búsqueda para comprobar si devuelve todos los registros o provoca un error de sintaxis LDAP.",
            "Probar un bypass de autenticación clásico introduciendo `*` en el campo de usuario y `*` en la contraseña (o payloads como `*)(uid=*))(|(uid=*`).",
            "Otros ejemplos más elaborados: `*)(objectClass=*` o `*)(|(description=*`"
          ]
        ],
        [
          "LDAP injection",
          "This occurs when the application builds LDAP query filters by directly concatenating user input without escaping special characters (such as `*`, `(`, `)`, `\\`), allowing search logic to be changed or authentication bypassed.\nIt can occur in corporate logins connected to Active Directory/LDAP, employee directories and internal search tools.",
          [
            "Enter an asterisk `*` or parentheses `)(` in the user or search field to check if it returns all records or triggers an LDAP syntax error.",
            "Test a classic authentication bypass by entering `*` in the user field and `*` in the password (or payloads such as `*)(uid=*))(|(uid=*`).",
            "Other more elaborate examples: `*)(objectClass=*` or `*)(|(description=*`"
          ]
        ]
      ]
    ]
  },
  {
    "id": "ssti",
    "title": [
      "SSTI",
      "SSTI"
    ],
    "items": [
      [
        "ssti",
        [
          "Inyección en plantillas del servidor (SSTI)",
          "Ocurre cuando la entrada del usuario se incrusta directamente dentro de una plantilla del lado del servidor (como Jinja2, Twig, Freemarker o Velocity) en lugar de pasarse como dato, permitiendo evaluar expresiones y ejecutar código remoto (RCE).\nSe puede dar en generadores de correos o PDFs personalizados, perfiles de usuario, páginas de error personalizadas y sistemas CMS/blogs.",
          [
            'Introducir la secuencia políglota `${{<%[%\'"}}%\\.` o expresiones matemáticas universales como `{{7*7}}` y `${7*7}` o también `<%=7*7%>` para ver si el servidor las evalúa y devuelve `49`.',
            "Identificar el motor de plantillas exacto probando diferencias sintácticas (por ejemplo, `{{7*'7'}}` devuelve `49` en Twig y `7777777` en Jinja2) para escalar a ejecución de comandos."
          ]
        ],
        [
          "Server-side template injection (SSTI)",
          "This occurs when user input is embedded directly in a server-side template (such as Jinja2, Twig, Freemarker or Velocity) instead of being passed as data, allowing expression evaluation and remote code execution (RCE).\nIt can occur in personalized email or PDF generators, user profiles, custom error pages and CMS or blog systems.",
          [
            'Enter the polyglot sequence `${{<%[%\'"}}%\\.` or universal mathematical expressions such as `{{7*7}}` and `${7*7}`, or also `<%=7*7%>`, to see if the server evaluates them and returns `49`.',
            "Identify the exact template engine by testing syntax differences (for example, `{{7*'7'}}` returns `49` in Twig and `7777777` in Jinja2) to escalate to command execution."
          ]
        ]
      ]
    ]
  },
  {
    "id": "cmd",
    "title": [
      "Command Injection",
      "Command injection"
    ],
    "items": [
      [
        "command",
        [
          "Inyección de comandos",
          "Ocurre cuando la aplicación pasa datos suministrados por el usuario directamente a una shell del sistema operativo (mediante funciones como `system()`, `exec()` o `os.popen()`), permitiendo ejecutar comandos arbitrarios en el servidor.\nSe puede dar en herramientas de diagnóstico de red (ping, traceroute, nslookup), conversión de archivos multimedia/PDF y ejecución de scripts internos.",
          [
            'Añadir separadores de comandos como `;`, `|`, `||`, `&`, `&&` o subshells **`comando`** / `$(comando)` seguidos de un comando sencillo como `id` o `whoami` (ej. `127.0.0.1; id`).',
            'Si no hay salida visible en la respuesta (Blind Command Injection), probar un retardo con `& sleep 5 #` o forzar una petición DNS/HTTP externa con `& nslookup ://example.com #`.'
          ]
        ],
        [
          "OS command injection",
          "This occurs when an application passes user-supplied data directly to an operating system shell (through functions such as `system()`, `exec()` or `os.popen()`), allowing arbitrary commands to run on the server.\nIt can occur in network diagnostics (ping, traceroute, nslookup), media or PDF conversion and internal script execution.",
          [
            'Add command separators such as `;`, `|`, `||`, `&`, `&&`, or subshells **`command`** / `$(command)` followed by a simple command like `id` or `whoami` (e.g., `127.0.0.1; id`).',
            'If there is no visible output in the response (Blind Command Injection), test a delay with `& sleep 5 #` or force an external DNS/HTTP request with `& nslookup ://example.com #`.'
          ]
        ]
      ]
    ]
  },
  {
    "id": "ssrf",
    "title": [
      "SSRF",
      "SSRF"
    ],
    "items": [
      [
        "ssrf",
        [
          "Peticiones del servidor a destinos no permitidos (SSRF)",
          "Ocurre cuando una aplicación realiza una petición HTTP desde el servidor hacia una URL proporcionada o manipulable por el usuario sin validar el destino, permitiendo acceder a servicios internos, localhost o metadatos de la nube.\nSe puede dar en funciones de \"importar desde URL\", webhooks, generadores de PDF desde HTML, vistas previas de enlaces y parámetros `?url=` o `?webhook=`.",
          [
            "Sustituir la URL de destino por direcciones locales como `http://127.0.0.1:80`, `http://localhost:8080` o `http://[::1]` y observar si devuelve el contenido de un servicio interno o cambia el mensaje/tiempo de respuesta.",
            "Probar a consultar endpoints de metadatos de proveedores cloud (como `http://169.254.169.254` en AWS) o usar un servidor Collaborator/Interactsh para confirmar peticiones salientes (Blind SSRF).",
            'Otras maneras de apuntar a `localhost`:\n' + 
'`127.1`, `127.0.1`, `0.0.0.0`, `0`, `2130706433`, `0x7f000001`, `0177.0.0.1`, `017700000001`.\n' + 
'- DNS Wildcard: `127.0.0.1.nip.io`, `localtest.me`.\n' + 
'- IPv6: `[::1]`, `[::]`\n' + 
'- IPv4 mapeada en IPv6, para acceder a servicios de IPv4 usando sintaxis IPv6: \n' + 
'`[0:0:0:0:0:ffff:127.0.0.1]`, `[::ffff:127.0.0.1]`\n' + 
'- Metadatos en la Nube (Cloud Metadata):\n' + 
'`169.254.169.254` - Link-Local / IMDS: Dirección estándar en AWS, GCP y Azure para extraer credenciales temporales y claves API de la instancia.\n' + 
'`169.254.170.2` - Endpoint específico para credenciales de tareas en AWS ECS.\n' + 
'`100.100.100.200` - Servicio de metadatos en Alibaba Cloud.\n' + 
'`metadata.google.internal` - Nombre de dominio interno para metadatos en Google Cloud Platform (GCP).\n' + 
'- Protocolos y Esquemas Alternativos\n' + 
'`file:///` - Permite leer archivos locales del servidor (ej. `file:///etc/passwd`).\n' + 
'`dict://` - Permite interactuar con servicios internos en puertos específicos y enviar comandos (ej. Redis).\n' + 
'`gopher://` - Permite enviar paquetes TCP arbitrarios en texto plano (muy usado para explotar servicios internos sin autenticación, es muy peligroso, hay casos de RCE).'
          ]
        ],
        [
          "Server-side request forgery (SSRF)",
          "This occurs when an application makes a server-side HTTP request to a URL supplied or influenced by the user without validating its destination, allowing access to internal services, localhost or cloud metadata.\nIt can occur in “import from URL” features, webhooks, HTML-to-PDF generators, link previews and parameters such as `?url=` or `?webhook=`.",
          [
            "Replace the destination URL with local addresses such as `http://127.0.0.1:80`, `http://localhost:8080`, or `http://[::1]` and observe if it returns the content of an internal service or changes the response message/time.",
            "Try querying cloud provider metadata endpoints (such as `http://169.254.169.254` in AWS) or use a Collaborator/Interactsh server to confirm outbound requests (Blind SSRF).",
            'Other ways to point to `localhost`:\n' +
'`127.1`, `127.0.1`, `0.0.0.0`, `0`, `2130706433`, `0x7f000001`, `0177.0.0.1`, `017700000001`.\n' +
'- Wildcard DNS: `127.0.0.1.nip.io`, `localtest.me`.\n' +
'- IPv6: `[::1]`, `[::]`\n' +
'- IPv4-mapped IPv6, to access IPv4 services using IPv6 syntax:\n' +
'`[0:0:0:0:0:ffff:127.0.0.1]`, `[::ffff:127.0.0.1]`\n' +
'- Cloud Metadata:\n' +
'`169.254.169.254` - Link-Local / IMDS: Standard address in AWS, GCP, and Azure to extract temporary credentials and API keys from the instance.\n' +
'`169.254.170.2` - Specific endpoint for task credentials in AWS ECS.\n' +
'`100.100.100.200` - Metadata service in Alibaba Cloud.\n' +
'`metadata.google.internal` - Internal domain name for metadata in Google Cloud Platform (GCP).\n' +
'- Alternative Protocols and Schemes\n' +
'`file:///` - Allows reading local files from the server (e.g., `file:///etc/passwd`).\n' +
'`dict://` - Allows interacting with internal services on specific ports and sending commands (e.g., Redis).\n' +
'`gopher://` - Allows sending arbitrary plaintext TCP packets (widely used to exploit unauthenticated internal services, it is very dangerous, there are cases of RCE).'
          ]
        ]
      ]
    ]
  },
  {
    "id": "xxe",
    "title": [
      "XXE",
      "XXE"
    ],
    "items": [
      [
        "xxe",
        [
          "Entidades externas XML (XXE)",
          "Ocurre cuando un analizador (parser) XML del servidor procesa declaraciones `DOCTYPE` y entidades externas sin tenerlas deshabilitadas, permitiendo leer archivos locales del servidor, realizar SSRF o provocar denegación de servicio.\nSe puede dar en endpoints que aceptan cuerpo `application/xml` o `text/xml`, servicios SOAP, subida de archivos `.svg`, `.docx`/`.xlsx` (que son ZIP con XML) y lectores RSS. Algunas veces también en los parámetros de búsqueda y filtros de productos como `productId=`.",
          [
            'Interceptar una petición XML y añadir una declaración `DOCTYPE` con una entidad que apunte a un archivo local (ej. `<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "file:///etc/passwd"> ]>`) e invocar `&xxe;` en un campo que se refleje en la respuesta.',
            'Si los errores y respuestas están ocultos (Blind XXE), definir una entidad externa que apunte a una URL controlada (`SYSTEM "http://tu-servidor.com"`) para detectar si el servidor intenta resolverla.',
            'Si tenemos una request en BurpSuite con una cadena como "productId=1&storeId=1" podemos intentar lo siguiente:\n' +
            '`productId=<exploit xmlns:xi="http://www.w3.org/2001/XInclude"><xi:include parse="text" href="file:///etc/passwd"/></exploit>&storeId=1`',
             {
              "text": "Otros payloads:",
              "label": "https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/XXE%20Injection",
              "url": "https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/XXE%20Injection"
            },
            {
              "text": "Más payloads:",
              "label": "https://github.com/aw-junaid/bug-bounty/blob/main/resources/cheatsheets/XXE.md",
              "url": "https://github.com/aw-junaid/bug-bounty/blob/main/resources/cheatsheets/XXE.md"
            }
          ]
        ],
        [
          "XML external entities (XXE)",
          "This occurs when the server's XML parser processes `DOCTYPE` declarations and external entities without disabling them, allowing local server files to be read, SSRF or denial of service.\nIt can occur in endpoints accepting `application/xml` or `text/xml` bodies, SOAP services, `.svg` or `.docx`/`.xlsx` uploads (ZIP files containing XML), and RSS readers. It can also sometimes occur in product searches and filters such as `productId=`.",
          [
            'Intercept an XML request and add a `DOCTYPE` declaration with an entity pointing to a local file (e.g., `<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "file:///etc/passwd"> ]>`) and invoke `&xxe;` in a field that is reflected in the response.',
            'If errors and responses are hidden (Blind XXE), define an external entity pointing to a controlled URL (`SYSTEM "http://your-server.com"`) to detect if the server attempts to resolve it.',
            'If we have a request in BurpSuite with a string like "productId=1&storeId=1", we can try the following:\n' +
            '`productId=<exploit xmlns:xi="http://www.w3.org/2001/XInclude"><xi:include parse="text" href="file:///etc/passwd"/></exploit>&storeId=1`',
            {
              "text": "Other payloads:",
              "label": "https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/XXE%20Injection",
              "url": "https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/XXE%20Injection"
            },
            {
              "text": "More payloads:",
              "label": "https://github.com/aw-junaid/bug-bounty/blob/main/resources/cheatsheets/XXE.md",
              "url": "https://github.com/aw-junaid/bug-bounty/blob/main/resources/cheatsheets/XXE.md"
            }
          ]
        ]
      ]
    ]
  },
  {
    "id": "proto",
    "title": [
      "Prototype pollution",
      "Prototype pollution"
    ],
    "items": [
      [
        "proto-client",
        [
          "Prototype pollution en el cliente",
          "Ocurre cuando el código JavaScript del navegador fusiona o clona objetos de forma insegura (sin filtrar claves como `__proto__` o `constructor.prototype`), permitiendo inyectar propiedades en `Object.prototype` que luego heredan todos los objetos y pueden derivar en DOM XSS.\nSe puede dar en librerías de parseo de parámetros URL (`?__proto__[prop]=valor`), fusión recursiva de configuraciones JSON y mensajes `postMessage`.",
          [
            'Añadir en la URL parámetros como `?__proto__[testprop]=polluted` o `?constructor[prototype][testprop]=polluted`, abrir la consola del navegador (F12) y comprobar si `Object.prototype.testprop` o `({}).testprop` devuelve `"polluted"`.',
            "Usar extensiones como DOM Invader (integrada en el navegador de Burp Suite) para detectar automáticamente fuentes de Prototype Pollution y localizar gadgets que ejecuten JavaScript."
          ]
        ],
        [
          "Client-side prototype pollution",
          "This occurs when browser JavaScript merges or clones objects unsafely (without filtering keys such as `__proto__` or `constructor.prototype`), allowing properties to be injected into `Object.prototype` that all objects then inherit, potentially leading to DOM XSS.\nIt can occur in URL parameter parsing libraries (`?__proto__[prop]=value`), recursive merging of JSON configurations, and `postMessage` messages.",
          [
            'Add parameters to the URL such as `?__proto__[testprop]=polluted` or `?constructor[prototype][testprop]=polluted`, open the browser console (F12), and check if `Object.prototype.testprop` or `({}).testprop` returns `"polluted"`.',
            "Use extensions like DOM Invader (built into Burp Suite's browser) to automatically detect Prototype Pollution sources and locate gadgets that execute JavaScript."
          ]
        ]
      ],
      [
        "proto-server",
        [
          "Prototype pollution en el servidor",
          "Ocurre cuando una aplicación backend en Node.js fusiona datos JSON enviados por el usuario en objetos internos sin sanitizar `__proto__`, contaminando el prototipo global del servidor y permitiendo escalar privilegios, saltar filtros o lograr ejecución remota de código (RCE).\nSe puede dar en APIs Node.js/Express que reciben cuerpos JSON (`PUT`/`POST`) y usan funciones inseguras de clonación o combinación profunda (`merge`, `extend`, `clone`).",
          [
            'Enviar en el cuerpo JSON de una petición `{"__proto__": {"status": 510}}` o `{"__proto__": {"json spaces": 10}}` y observar si cambia el código de estado de un error provocado o la indentación de la respuesta JSON (detección no destructiva).',
            'Probar a contaminar propiedades de autorización como `{"__proto__": {"isAdmin": true}}` y repetir una petición a un endpoint privilegiado para ver si se concede acceso.'
          ]
        ],
        [
          "Server-side prototype pollution",
          "This occurs when a Node.js backend merges user-submitted JSON into internal objects without sanitizing `__proto__`, polluting the server's global prototype and enabling privilege escalation, filter bypass or remote code execution (RCE).\nIt can occur in Node.js/Express APIs that receive JSON bodies (`PUT`/`POST`) and use unsafe cloning or deep merge functions (`merge`, `extend`, `clone`).",
          [
            'Send `{"__proto__": {"status": 510}}` or `{"__proto__": {"json spaces": 10}}` in the JSON body of a request and observe if the status code of a triggered error or the indentation of the JSON response changes (non-destructive detection).',
            'Try polluting authorization properties such as `{"__proto__": {"isAdmin": true}}` and repeat a request to a privileged endpoint to see if access is granted.'
          ]
        ]
      ]
    ]
  },
  {
    "id": "versions",
    "title": [
      "Vulnerabilidades conocidas (CVE)",
      "Known vulnerabilities (CVEs)"
    ],
    "items": [
      [
        "component-cve",
        [
          "CVE aplicable a un componente desplegado",
          "Ocurre cuando la aplicación utiliza software, librerías, frameworks, CMS o servidores web desactualizados que contienen una vulnerabilidad pública conocida y documentada con un identificador CVE.\nSe puede dar en servidores web (Apache, Nginx, IIS), CMS (WordPress, Drupal, Joomla) y sus plugins, librerías JS/backend (Log4j, Spring, jQuery) y paneles de administración.",
          [
            "Identificar tecnologías y versiones exactas mediante cabeceras HTTP (`Server`, `X-Powered-By`), código fuente, archivos `package.json`/`README`, Whatweb o extensiones como Wappalyzer.",
            "Buscar la versión detectada en bases de datos como NVD, INCIBE, CVE Details, Exploit-DB o GitHub para localizar exploits públicos o pruebas de concepto aplicables.",
            "Podemos utilizar `Searchsploit` para buscar desde terminal en Exploit-DB."
          ]
        ],
        [
          "Applicable CVE in a deployed component",
          "This occurs when an application uses outdated software, libraries, frameworks, CMSs or web servers with a publicly known, documented vulnerability assigned a CVE identifier.\nIt can occur in web servers (Apache, Nginx, IIS), CMSs (WordPress, Drupal, Joomla) and their plugins, JS/backend libraries (Log4j, Spring, jQuery) and admin panels.",
          [
            "Identify technologies and exact versions from HTTP headers (`Server`, `X-Powered-By`), source code, `package.json`/`README` files, Whatweb or extensions such as Wappalyzer.",
            "Search for the detected version in databases such as NVD, INCIBE, CVE Details, Exploit-DB, or GitHub to locate public exploits or applicable proofs of concept.",
            "We can use `searchsploit` to search Exploit-DB from the terminal."
          ]
        ]
      ],
      [
        "shellshock",
        [
          "Shellshock en CGI con Bash",
          "Ocurre cuando un servidor web ejecuta scripts CGI invocando una versión vulnerable de Bash (CVE-2014-6271) que evalúa código arbitrario colocado justo después de la definición de una función vacía `() { :; };` dentro de variables de entorno (como las cabeceras HTTP).\nSe puede dar en servidores antiguos (Apache/Nginx) con rutas `/cgi-bin/` activas (archivos `.cgi`, `.sh`, `.pl`).",
          [
            "Localizar scripts bajo `/cgi-bin/` (por ejemplo `/cgi-bin/status` o `/cgi-bin/test.cgi`) mediante enumeración de directorios.",
            "Enviar una petición modificando la cabecera `User-Agent` (o `Referer`/`Cookie`) con el payload `() { :; }; echo; echo; /bin/id` y comprobar si la respuesta devuelve el resultado del comando `id`."
          ]
        ],
        [
          "Shellshock in Bash-backed CGI",
          "This occurs when a web server runs CGI scripts by invoking a vulnerable version of Bash (CVE-2014-6271) that evaluates arbitrary code placed immediately after an empty function definition `() { :; };` inside environment variables (such as HTTP headers).\nIt can occur on older servers (Apache/Nginx) with active `/cgi-bin/` paths (`.cgi`, `.sh`, `.pl` files).",
          [
            "Locate scripts under `/cgi-bin/` (for example `/cgi-bin/status` or `/cgi-bin/test.cgi`) through directory enumeration.",
            "Send a request modifying the `User-Agent` header (or `Referer`/`Cookie`) with the payload `() { :; }; echo; echo; /bin/id` and check if the response returns the output of the `id` command."
          ]
        ]
      ]
    ]
  },
  {
    "id": "logic",
    "title": [
      "Lógica de negocio y condiciones de carrera",
      "Business logic and race conditions"
    ],
    "items": [
      [
        "business",
        [
          "Fallo de lógica de negocio",
          "Ocurre cuando la aplicación funciona técnicamente según lo programado, pero un fallo en el diseño de sus reglas o flujos permite a un atacante abusar de ella (como aplicar cupones múltiples veces, introducir cantidades negativas o saltarse límites).\nSe puede dar en carritos de compra, sistemas de descuentos/referidos, transferencias bancarias, suscripciones y flujos de validación en varios pasos.",
          [
            "Manipular valores numéricos en peticiones de compra o transferencia introduciendo números negativos (ej. `cantidad=-5`), decimales extremos (`0.001`) o valores enormes para provocar desbordamientos o saldos a favor.",
            "Comprobar si hay límites en la cantidad de productos a añadir con números enormes.",
            "Reutilizar el mismo código de descuento varias veces, cambiar la divisa a mitad del pago o alterar el precio del producto directamente en el cuerpo de la petición antes de confirmar."
          ]
        ],
        [
          "Business logic flaw",
          "This occurs when an application technically works as programmed but a flaw in the design of its rules or workflows allows an attacker to abuse them (such as applying coupons multiple times, entering negative quantities or bypassing limits).\nIt can occur in shopping carts, discount or referral systems, bank transfers, subscriptions and multi-step validation flows.",
          [
            "Manipulate numeric values in purchase or transfer requests by entering negative numbers (e.g., `quantity=-5`), extreme decimals (`0.001`), or huge values to cause overflows or positive account balances.",
            "Check if there are limits on the quantity of products that can be added using huge numbers.",
            "Reuse the same discount code multiple times, change the currency mid-checkout, or alter the product price directly in the request body before confirming."
          ]
        ]
      ],
      [
        "race",
        [
          "Condición de carrera",
          "Ocurre cuando la aplicación procesa múltiples peticiones concurrentes sobre un mismo recurso compartido sin bloqueos adecuados, permitiendo aprovechar la ventana de tiempo entre la comprobación y la actualización del estado (TOCTOU).\nSe puede dar en canjeo de tarjetas regalo o cupones de un solo uso, retiradas o transferencias de saldo, votaciones y límites de intentos.",
          [
            'Capturar la petición de una acción limitada (como aplicar un cupón o transferir saldo) y enviarla 15-20 veces al mismo tiempo usando la función "Send group in parallel (single-packet attack)" de Burp Repeater.',
            "Comprobar si la acción se ejecutó varias veces seguidas (por ejemplo, aplicando el descuento múltiples veces o retirando más saldo del disponible) antes de que el servidor actualizara el estado."
          ]
        ],
        [
          "Race condition",
          "This occurs when the application processes multiple concurrent requests for the same shared resource without appropriate locks, allowing the time window between checking and updating the state to be exploited (TOCTOU).\nIt can occur when redeeming gift cards or single-use coupons, withdrawing or transferring funds, voting and enforcing attempt limits.",
          [
            'Capture the request of a rate-limited or single-use action (such as applying a coupon or transferring balance) and send it 15-20 times simultaneously using Burp Repeater\'s "Send group in parallel (single-packet attack)" feature.',
            "Check whether the action ran several times in succession (for example, applying the discount multiple times or withdrawing more than the available balance) before the server updated the state."
          ]
        ]
      ]
    ]
  }
];
