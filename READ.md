# 📂 Portafolio Interactivo de Trabajos Prácticos

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)

Este repositorio aloja una **Plataforma Web Modular** desarrollada para presentar, centralizar y entregar trabajos prácticos de diversas asignaturas académicas. El proyecto funciona como un portafolio interactivo que permite visualizar trabajos prácticos que son entregables en la carrera que estoy cursando (Ingeniería en Sistemas)

---

## 🌟 Características Técnicas y Funcionalidades

### 1. Arquitectura Frontend Escalable

El sitio no utiliza plantillas genéricas, sino una estructura de código organizada profesionalmente:

- **CSS Modular:** Estilos divididos por capas (`base`, `components`, `layout`, `themes`) para facilitar el mantenimiento.
- **JS Funcional:** Lógica separada en módulos específicos para cada materia o utilidad.
- **UX/UI:** Implementación de Modo Oscuro/Claro (`theme.js`) y diseño totalmente responsivo.

### 2. Implementaciones Específicas por Materia

- **Álgebra (Visualización 3D y Gráficos):**
  - Uso de **Three.js** para la representación interactiva del _Producto Mixto_ en un espacio tridimensional.
  - Integración de **Plotly.js / Chart.js** para graficar problemas de _Recta y Plano_.
- **Física y Laboratorios:**
  - Visualización de vectores y esquemas utilizando **SVG (Gráficos Vectoriales)** para garantizar la máxima nitidez al hacer zoom, sin pérdida de calidad.
- **Algoritmos y Programación:**
  - Presentación de código fuente en C con funcionalidad de copiado al portapapeles (`copy.js`) para facilitar la prueba de los ejercicios.

---

## 🛠️ Stack Tecnológico

| Capa             | Tecnologías                                                      |
| :--------------- | :--------------------------------------------------------------- |
| **Estructura**   | HTML5 Semántico                                                  |
| **Estilos**      | CSS3 (Variables, Flexbox, Grid, Animaciones)                     |
| **Lógica**       | JavaScript (ES6+)                                                |
| **Librerías**    | Three.js (3D), Plotly.js/Chart.js (Gráficos), MathJax (Fórmulas) |
| **Backend/Core** | Lenguaje C (Ejercicios de lógica)                                |

---

## 📂 Organización del Proyecto

El repositorio separa claramente el código fuente de los ejercicios (Backend/C) de la interfaz de visualización (Frontend/Web):

Directory structure:
└── agustingiusso-trabajos-practicos/
    ├── READ.md
    ├── docs/
    │   ├── index.html
    │   ├── .nojekyll
    │   └── front-end/
    │       ├── assets/
    │       │   ├── css/
    │       │   │   ├── main.css
    │       │   │   ├── base/
    │       │   │   │   ├── \_reset.css
    │       │   │   │   ├── \_typography.css
    │       │   │   │   └── \_variables.css
    │       │   │   ├── components/
    │       │   │   │   ├── \_buttons.css
    │       │   │   │   ├── \_cards.css
    │       │   │   │   ├── \_code.css
    │       │   │   │   ├── \_header.css
    │       │   │   │   └── \_tables.css
    │       │   │   ├── layout/
    │       │   │   │   ├── \_grid.css
    │       │   │   │   └── \_navigation.css
    │       │   │   ├── pages/
    │       │   │   │   ├── \_algebra.css
    │       │   │   │   ├── \_algoritmos.css
    │       │   │   │   ├── \_fisica1.css
    │       │   │   │   ├── \_index.css
    │       │   │   │   ├── \_laboratorio_algebra.css
    │       │   │   │   ├── \_labs_fisica1.css
    │       │   │   │   ├── \_producto_mixto.css
    │       │   │   │   └── \_recta_plano.css
    │       │   │   ├── themes/
    │       │   │   │   └── \_dark-light.css
    │       │   │   └── utilities/
    │       │   │       ├── \_animations.css
    │       │   │       └── \_responsive.css
    │       │   └── js/
    │       │       ├── color_theme.js
    │       │       ├── copy.js
    │       │       ├── formulas_mat.js
    │       │       ├── index.js
    │       │       ├── producto_mixto.js
    │       │       ├── recta_plano.js
    │       │       ├── selector_puntos.js
    │       │       └── theme.js
    │       └── materias/
    │           ├── algebra.html
    │           ├── algoritmos.html
    │           ├── fisica1.html
    │           ├── wip algoritmos.html
    │           ├── algebra/
    │           │   ├── laboratorio_algebra.html
    │           │   ├── tp_grupal_algebra.html
    │           │   └── tp_grupal_algebra2.html
    │           ├── algoritmos/
    │           │   ├── tp1_algoritmos.html
    │           │   ├── tp2_algoritmos.html
    │           │   └── tp3_algoritmos.html
    │           └── fisica1/
    │               ├── laboratorio_fisica.html
    │               └── laboratorios_fisica1/
    │                   ├── TP1_fisica.html
    │                   ├── TP2_fisica.html
    │                   ├── TP3_fisica.html
    │                   ├── TP4_fisica.html
    │                   └── TP5_fisica.html
    ├── TP1/
    │   ├── tp1_punto1.c
    │   ├── tp1_punto10.c
    │   ├── tp1_punto11.c
    │   ├── tp1_punto11_v.2.c
    │   ├── tp1_punto12.c
    │   ├── tp1_punto13.c
    │   ├── tp1_punto14.c
    │   ├── tp1_punto15.c
    │   ├── tp1_punto16.c
    │   ├── tp1_punto17.c
    │   ├── tp1_punto18.c
    │   ├── tp1_punto2.c
    │   ├── tp1_punto3.c
    │   ├── tp1_punto4.c
    │   ├── tp1_punto5.c
    │   ├── tp1_punto6.c
    │   ├── tp1_punto7.c
    │   ├── tp1_punto8.c
    │   └── tp1_punto9.c
    └── TP2/
        ├── punto1.c
        ├── punto2.c
        ├── punto3.c
        ├── punto4.c
        ├── punto5.c
        └── punto6.c
