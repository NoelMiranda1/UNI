# Guía de Despliegue con Docker

## Requisitos Previos

- Docker instalado (versión 20.10+)
- Docker Compose instalado (versión 2.0+)

## Configuración

### 1. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
NEXT_PUBLIC_API_URL=https://uniapi.onmisales.software
NEXT_PUBLIC_BASE_URL=https://tu-dominio.com
DATABASE_URL=tu_database_url
API_SECRET_KEY=tu_api_secret_key
CUSTOM_KEY=tu_custom_key
```

## Despliegue

### Opción 1: Docker Compose (Recomendado)

```bash
# Construir y ejecutar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

### Opción 2: Docker Manual

```bash
# Construir la imagen
docker build -t universidad-ingenieria:latest .

# Ejecutar el contenedor
docker run -d \
  -p 3000:3000 \
  --name uni-app \
  --env-file .env \
  universidad-ingenieria:latest

# Ver logs
docker logs -f uni-app

# Detener
docker stop uni-app
docker rm uni-app
```

## Comandos Útiles

```bash
# Reconstruir sin caché
docker-compose build --no-cache

# Reiniciar el servicio
docker-compose restart

# Ver estado
docker-compose ps

# Ejecutar comandos dentro del contenedor
docker-compose exec web sh

# Limpiar imágenes antiguas
docker image prune -a
```

## Producción

### Cloudflare Workers/Pages

Si estás usando Cloudflare, puedes usar Docker localmente para desarrollo y testing, pero el despliegue a Cloudflare sigue usando:

```bash
yarn build
npx wrangler deploy
```

### Otros Servicios (AWS, GCP, Azure)

1. **Construir la imagen**:
   ```bash
   docker build -t universidad-ingenieria:latest .
   ```

2. **Subir a un registro** (ejemplo con Docker Hub):
   ```bash
   docker tag universidad-ingenieria:latest tu-usuario/universidad-ingenieria:latest
   docker push tu-usuario/universidad-ingenieria:latest
   ```

3. **Desplegar** según tu plataforma (ECS, Cloud Run, App Service, etc.)

## Troubleshooting

### Error: "Cannot find module 'next'"
- Asegúrate de que `output: 'standalone'` esté en `next.config.js`
- Reconstruye la imagen: `docker-compose build --no-cache`

### Puerto 3000 ya en uso
```bash
# Cambiar el puerto en docker-compose.yml
ports:
  - "8080:3000"  # Usa el puerto 8080 en tu máquina
```

### Variables de entorno no funcionan
- Verifica que el archivo `.env` existe
- Asegúrate de que las variables empiecen con `NEXT_PUBLIC_` para el cliente
- Reinicia el contenedor después de cambiar `.env`

## Optimizaciones

### Imagen más pequeña
La imagen usa Alpine Linux y multi-stage builds para minimizar el tamaño final (~150MB).

### Caché de dependencias
Docker cachea las capas de dependencias, haciendo rebuilds más rápidos cuando solo cambias código.

### Health Check
El contenedor incluye un health check que verifica que la app esté respondiendo correctamente.
