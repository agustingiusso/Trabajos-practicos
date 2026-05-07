/*
1. Se desea calcular el promedio de notas de una comisión de 40 alumnos.
Imprimir el resultado como un número entero (si hay parte decimal, eliminarla).
*/

#include <stdio.h>

int main()
{
    // Declaración de variables
    int i;
    float nota, suma_notas, promedio;
    int promedio_entero;

    // 1. Inicialización del acumulador
    // Es vital inicializar en 0 antes de entrar al bucle para que no arrastre "basura" de la memoria
    suma_notas = 0.0;

    printf("--- Calculadora de Promedio de Notas (40 Alumnos) ---\n");

    // 2. Ciclo de repetición incondicional (fija)
    for (i = 1; i <= 40; i++)
    {
        printf("Ingrese la nota del alumno %d: ", i);
        scanf("%f", &nota);

        // Acumulamos la nota ingresada sumándola al total anterior
        suma_notas = suma_notas + nota;
    }

    // 3. Cálculos principales
    promedio = suma_notas / 40.0;

    // Convertimos el float a int, lo que directamente trunca (elimina) la parte decimal
    promedio_entero = (int)promedio;

    // 4. Impresión del resultado
    printf("\n========================================\n");
    printf("              RESULTADOS\n");
    printf("========================================\n");
    printf("Suma total de notas:   %.2f\n", suma_notas);
    printf("Promedio con decimales: %.2f\n", promedio);
    printf("----------------------------------------\n");
    printf("Promedio final (entero): %d\n", promedio_entero);
    printf("========================================\n");

    return 0;
}