# UNMS · propuesta de plataforma digital

Prototipo multilingüe para evaluar la presentación, la navegación y los recorridos de la futura web de la Unión Nacional de Mujeres Saharauis.

## Probar el proyecto

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Alcance de la demostración

- Idiomas: español, árabe, inglés y francés.
- Secciones: presentación, líneas de acción, historias, galería, campañas y mensajes.
- La vista de apoyo permite explorar importes, causa y frecuencia, pero **no recibe dinero ni solicita datos de pago**.
- Las campañas, cifras, historias, fechas, fotografías y registros editoriales son **ilustrativos y requieren validación de la organización**.
- Dos vídeos breves de muestra, sin sonido ni testimonios reales, se reproducen con controles nativos. Son montajes hechos con las fotografías ilustrativas disponibles, no entrevistas.
- Un audio instrumental sintético de 12 segundos permite probar el reproductor. No representa música o testimonios reales de la organización.
- La galería fotográfica contiene seis imágenes ilustrativas y permite navegar entre ellas con flechas, miniaturas y teclado. El panel permite añadir las URL de fotos y sustituir los vídeos por archivos MP4/WebM propios.
- El panel editorial y los mensajes guardan cambios en el navegador mediante `localStorage`. No existe una base de datos compartida ni autenticación de producción.
- Las alertas se muestran localmente. El formulario de novedades muestra una vista previa y no registra correos.
- Las seis imágenes se sirven en WebP. Los originales JPG se conservan como fuente, pero no se incorporan al paquete publicado.

## Antes de convertirla en web operativa

Confirmar identidad y autorización institucional; sustituir los datos ilustrativos; implementar almacenamiento y permisos del lado del servidor; integrar boletín y notificaciones; validar derechos de las fotografías y fuentes de las cifras; conectar pagos con un proveedor fiable y emitir recibos solo tras confirmación verificable.
