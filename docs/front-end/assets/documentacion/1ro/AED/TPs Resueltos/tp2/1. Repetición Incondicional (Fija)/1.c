/*
1. Se desea calcular el promedio de notas de una comisión de 40 alumnos. Imprimir el resultado
como un número entero (si hay parte decimal, eliminarla).
*/

#include <stdio.h>

int main()
{
    // Declaración de variables:
    int i, cantidad_alumnos = 40;
    float nota, suma_notas = 0, promedio = 0;

    // Ingreso de notas y cálculo de la suma:
    for (i = 1; i <= cantidad_alumnos; i++)
    {
        printf("Ingrese la nota del alumno %d: ", i);
        scanf("%f", &nota);
        suma_notas += nota;
    }

    // Cálculo del promedio:
    promedio = suma_notas / cantidad_alumnos;

    // Mostrar el resultado como número entero:
    printf("El promedio de notas de la comisión es: %d\n", (int)promedio);
    // Se convierte a entero eliminando la parte decimal poniendo (int) al principio de la variable promedio.

    return 0;
}