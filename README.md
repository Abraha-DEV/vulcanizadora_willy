# Vulcanizadora Willy

Landing page estática y responsiva para Vulcanizadora Willy, ubicada en Miramápoli, Ciudad Madero. Está construida con HTML, CSS y JavaScript vanilla; no requiere instalación, backend ni proceso de compilación.

## Estructura

```text
index.html
css/styles.css
js/main.js
img/README.md
img/muestra-taller.svg
img/muestra-llanta.svg
img/muestra-camion.svg
```

## Ver localmente en Ubuntu

Abre `index.html` en el navegador, o sirve la carpeta con Python:

```bash
python3 -m http.server 8000
```

Después visita <http://localhost:8000>. Detén el servidor con `Ctrl+C`.

## Antes de publicar

- Verifica los horarios de atención publicados en la sección `#horarios` de `index.html`.
- Las fotografías del negocio están en `img/`. Consulta `img/README.md` para identificar cada archivo.
- El mapa busca el nombre y la dirección del taller en Google Maps; comprueba que el marcador mostrado sea correcto.
- Si el dominio ya está definido al publicar, actualiza la URL canónica/compartible y `og:image` con una URL absoluta; actualmente no se presupone un dominio.

## Subir a GitHub

1. Crea un repositorio vacío en GitHub (sin README ni archivos iniciales).
2. En una terminal, desde esta carpeta, ejecuta:

   ```bash
   git add index.html css js img README.md
   git commit -m "Crear landing page de Vulcanizadora Willy"
   git branch -M main
   git remote add origin https://github.com/USUARIO/REPOSITORIO.git
   git push -u origin main
   ```

3. Cambia `USUARIO/REPOSITORIO` por el nombre real del repositorio. Si ya existe un remoto, omite `git remote add origin`.

## Publicar gratis en Netlify

1. Inicia sesión en Netlify y elige **Add new site** → **Import an existing project**.
2. Conecta GitHub y selecciona el repositorio.
3. Deja el comando de build vacío y establece el directorio de publicación como `.` (raíz del repositorio, donde vive `index.html`).
4. Pulsa **Deploy site**. Netlify publicará una URL de prueba; los siguientes `git push` a `main` activarán nuevos despliegues.

No se ha configurado un dominio ni publicado el sitio.
