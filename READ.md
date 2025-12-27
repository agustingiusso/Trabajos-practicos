# 📂 Portafolio Interactivo de Ingeniería en Sistemas

![HTML5]
![CSS3]
![JavaScript]
![Three.js]
![C]

Este repositorio aloja una **Plataforma Web Modular** desarrollada desde cero para centralizar, visualizar y entregar los trabajos prácticos correspondientes a la carrera de **Ingeniería en Sistemas**.

El proyecto va más allá de un simple repositorio de archivos: es una aplicación web interactiva que implementa simulación 3D, renderizado matemático en tiempo real y una arquitectura de software escalable.

---

## 🚀 Características Técnicas Destacadas

### 1. Arquitectura Frontend Modular

El desarrollo evita el uso de plantillas genéricas, optando por una estructura profesional y mantenible:

- **CSS por Capas:** Estilos desacoplados (`base`, `components`, `layout`) que permiten la reutilización de código y fácil escalabilidad.
- **JavaScript Modular:** Lógica de negocio separada por dominios (simulaciones, UI, utilidades), evitando el "Spaghetti code".
- **Sistema de Temas Nativo:** Implementación de _Dark/Light Mode_ persistente (LocalStorage) con paletas de colores optimizadas (Soft UI).

### 2. Módulos Académicos Interactivos

#### 📐 Álgebra y Geometría Analítica

Implementación de librerías gráficas para la comprensión visual de conceptos abstractos:

- **Simulación 3D (Three.js):** Visualización interactiva de vectores y volúmenes (_Producto Mixto_) con controles de cámara orbital.
- **Gráficos Dinámicos:** Integración de **Chart.js** y **Plotly** para el análisis de rectas y planos en tiempo real.
- **Tipografía Matemática:** Uso de **MathJax** para el renderizado de fórmulas LaTeX de alta fidelidad directamente en el navegador.

#### 🔭 Física I

- **Vectores SVG:** Uso de gráficos vectoriales escalables para diagramas de fuerzas y esquemas, garantizando nitidez absoluta en cualquier nivel de zoom.
- **Interfaz Limpia:** Diseño orientado a la lectura y análisis de laboratorios.

#### 💻 Algoritmos y Estructura de Datos

- **Visor de Código C:** Bloques de código con resaltado de sintaxis.
- **Funcionalidad UX:** Botones de copiado rápido (`copy-to-clipboard`) y feedback visual para agilizar la prueba de ejercicios en IDEs externos.

---

## 🛠️ Stack Tecnológico

| Dominio            | Tecnologías Implementadas                                |
| :----------------- | :------------------------------------------------------- |
| **Core**           | HTML5 Semántico, CSS3 Moderno (Variables, Flexbox, Grid) |
| **Lógica**         | JavaScript (ES6+), Vanilla JS (Sin frameworks pesados)   |
| **Gráficos 3D**    | **Three.js** (WebGL), **Plotly.js**                      |
| **Matemáticas**    | **MathJax** (Renderizado LaTeX)                          |
| **Backend/Lógica** | **Lenguaje C** (Resolución de ejercicios algorítmicos)   |
| **Herramientas**   | Git, GitHub Pages (Despliegue)                           |

---

## 📂 Estructura del Proyecto

A continuación se detalla la organización de carpetas del repositorio, separando la lógica frontend de los archivos fuente en C:

```
Directory structure:
└── agustingiusso-trabajos-practicos/
    ├── READ.md
    ├── docs/
    │   ├── index.html
    │   ├── .nojekyll
    │   └── front-end/
    │       ├── assets/
    │       │   ├── css/
    │       │   │   ├── main.css
    │       │   │   ├── base/
    │       │   │   │   ├── _landing.css
    │       │   │   │   ├── _reset.css
    │       │   │   │   ├── _typography.css
    │       │   │   │   └── _variables.css
    │       │   │   ├── components/
    │       │   │   │   ├── _buttons.css
    │       │   │   │   ├── _cards.css
    │       │   │   │   ├── _code.css
    │       │   │   │   ├── _header.css
    │       │   │   │   └── _tables.css
    │       │   │   ├── layout/
    │       │   │   │   ├── _grid.css
    │       │   │   │   └── _navigation.css
    │       │   │   ├── pages/
    │       │   │   │   ├── _algebra.css
    │       │   │   │   ├── _algoritmos.css
    │       │   │   │   ├── _fisica1.css
    │       │   │   │   ├── _index.css
    │       │   │   │   ├── _laboratorio_algebra.css
    │       │   │   │   ├── _labs_fisica1.css
    │       │   │   │   ├── _producto_mixto.css
    │       │   │   │   └── _recta_plano.css
    │       │   │   ├── themes/
    │       │   │   │   └── _dark-light.css
    │       │   │   └── utilities/
    │       │   │   │   ├── _animations.css
    │       │   │   │   └── _responsive.css
    │       │   └── js/
    │       │       ├── color_theme.js
    │       │       ├── copy.js
    │       │       ├── formulas_mat.js
    │       │       ├── index.js
    │       │       ├── producto_mixto.js
    │       │       ├── recta_plano.js
    │       │       ├── selector_puntos.js
    │       │       └── theme.js
    │       ├── años/
    │       │   └── primer_año.html
    │       └── materias/
    │           ├── algebra.html
    │           ├── algoritmos.html
    │           ├── fisica1.html
    │           ├── algebra/
    │           │   ├── laboratorio_algebra.html
    │           │   ├── tp_grupal_algebra.html
    │           │   └── tp_grupal_algebra2.html
    │           ├── algoritmos/
    │           │   ├── tp1_algoritmos.html
    │           │   ├── tp2_algoritmos.html
    │           │   └── tp3_algoritmos.html
    │           └── fisica1/
    │               ├── laboratorio_fisica.html
    │               └── laboratorios_fisica1/
    │                   ├── TP1_fisica.html
    │                   ├── TP2_fisica.html
    │                   ├── TP3_fisica.html
    │                   ├── TP4_fisica.html
    │                   └── TP5_fisica.html
    ├── TP1/
    │   ├── tp1_punto1.c
    │   ├── tp1_punto10.c
    │   ├── tp1_punto11.c
    │   ├── tp1_punto11_v.2.c
    │   ├── tp1_punto12.c
    │   ├── tp1_punto13.c
    │   ├── tp1_punto14.c
    │   ├── tp1_punto15.c
    │   ├── tp1_punto16.c
    │   ├── tp1_punto17.c
    │   ├── tp1_punto18.c
    │   ├── tp1_punto2.c
    │   ├── tp1_punto3.c
    │   ├── tp1_punto4.c
    │   ├── tp1_punto5.c
    │   ├── tp1_punto6.c
    │   ├── tp1_punto7.c
    │   ├── tp1_punto8.c
    │   └── tp1_punto9.c
    └── TP2/
        ├── punto1.c
        ├── punto2.c
        ├── punto3.c
        ├── punto4.c
        ├── punto5.c
        └── punto6.c
```
