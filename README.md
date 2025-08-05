# 🏆 Analizador de Partidas de Ajedrez

[![Deploy Status](https://github.com/tu-usuario/my-chess-frontend/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/tu-usuario/my-chess-frontend/actions)
[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://tu-usuario.github.io/my-chess-frontend/)

Una aplicación web moderna para analizar partidas de ajedrez con visualización interactiva y análisis detallado.

## ✨ Características

- 📁 **Carga de archivos PGN** - Sube archivos o pega contenido PGN
- 🎯 **Tablero interactivo** - Navegación fluida entre movimientos
- 📊 **Análisis detallado** - Comentarios, variaciones y estadísticas
- 🎨 **Diseño elegante** - UI moderna y responsive
- ⚡ **Rendimiento optimizado** - Construido con React 19 + Vite
- 🌐 **100% cliente** - No requiere servidor, funciona offline

## 🚀 Demo en Vivo

**[👉 Prueba la aplicación aquí](https://tu-usuario.github.io/my-chess-frontend/)**

## 🛠️ Tecnologías

- **React 19** - Framework frontend moderno
- **Kokopu** - Librería especializada en ajedrez
- **Vite** - Build tool ultrarrápido
- **GitHub Pages** - Hosting gratuito

## 📸 Capturas de Pantalla

### Interfaz Principal
![Interfaz Principal](https://via.placeholder.com/800x400/2c3e50/ffffff?text=Analizador+de+Ajedrez)

### Análisis de Partida
![Análisis](https://via.placeholder.com/800x400/3498db/ffffff?text=Análisis+Interactivo)

## 🎮 Uso

1. **Cargar partida**: Sube un archivo `.pgn` o pega el contenido PGN
2. **Navegar**: Haz clic en los movimientos para explorar la partida
3. **Analizar**: Revisa comentarios, variaciones y estadísticas
4. **Explorar**: Si hay múltiples partidas, navega entre ellas

### Ejemplo de PGN válido:
```pgn
[Event "Ejemplo de Partida"]
[Site "Ciudad, País"]
[Date "2024.01.01"]
[White "Jugador Blanco"]
[Black "Jugador Negro"]
[Result "1-0"]

1.e4 e5 2.Nf3 Nc6 3.Bb5 {Apertura Española} 3...a6 4.Ba4 Nf6 1-0
```

## 🏗️ Desarrollo Local

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Instalación
```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/my-chess-frontend.git
cd my-chess-frontend

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

### Scripts disponibles
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run build:github # Build optimizado para GitHub Pages
npm run preview      # Preview del build
npm run deploy       # Deploy a GitHub Pages (manual)
```

## 🚀 Deploy en GitHub Pages

### Automático (Recomendado)
1. Haz push a la rama `main`
2. GitHub Actions se encarga del deploy automáticamente
3. La app estará disponible en `https://tu-usuario.github.io/my-chess-frontend/`

### Manual
```bash
# Instalar gh-pages
npm install

# Deploy manual
npm run deploy
```

## 📁 Estructura del Proyecto

```
my-chess-frontend/
├── src/
│   ├── App.jsx          # Componente principal
│   ├── App.css          # Estilos
│   └── main.jsx         # Punto de entrada
├── public/              # Assets estáticos
├── .github/workflows/   # GitHub Actions
├── dist/               # Build de producción
├── package.json        # Dependencias y scripts
└── vite.config.js      # Configuración de Vite
```

## 🎯 Características Técnicas

### Optimizaciones
- ✅ Code splitting automático
- ✅ Tree shaking
- ✅ Compresión de assets
- ✅ Lazy loading de componentes
- ✅ Caché inteligente

### Compatibilidad
- ✅ Navegadores modernos (ES2020+)
- ✅ Mobile responsive
- ✅ Offline capable
- ✅ PWA ready

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🙏 Agradecimientos

- [Kokopu](https://github.com/yo35/kokopu) - Librería de ajedrez
- [React](https://reactjs.org/) - Framework UI
- [Vite](https://vitejs.dev/) - Build tool
- [GitHub Pages](https://pages.github.com/) - Hosting gratuito

## 📊 Estadísticas

![GitHub stars](https://img.shields.io/github/stars/tu-usuario/my-chess-frontend?style=social)
![GitHub forks](https://img.shields.io/github/forks/tu-usuario/my-chess-frontend?style=social)
![GitHub issues](https://img.shields.io/github/issues/tu-usuario/my-chess-frontend)
![GitHub license](https://img.shields.io/github/license/tu-usuario/my-chess-frontend)

---

⭐ **¡Dale una estrella si te gusta el proyecto!** ⭐