/*
2. Se desea calcular e imprimir el porcentaje de alumnos aprobados en una comisión de 40 alumnos y la nota promedio de aprobación.
El porcentaje debe calcularse con 2 dígitos decimales y la nota promedio debe ser entera y redondearse para abajo.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables
    int i, alumnos_aprobados;
    float nota, suma_notas_aprobadas, porcentaje_aprobados, promedio_aprobados;
    int promedio_redondeado;

    // 1. Inicialización de contadores y acumuladores
    alumnos_aprobados = 0;
    suma_notas_aprobadas = 0.0;

    printf("--- Estadisticas de Aprobacion (40 Alumnos) ---\n");
    printf("Nota: Se considerara aprobada una nota mayor o igual a 6.\n\n");

    // 2. Ciclo de repetición incondicional (fija)
    for (i = 1; i <= 40; i++)
    {
        printf("Ingrese la nota del alumno %d: ", i);
        scanf("%f", &nota);

        // Verificamos si el alumno está aprobado antes de contarlo y sumar su nota
        if (nota >= 6.0)
        {
            alumnos_aprobados++;                                // Incrementa en 1 la cantidad de aprobados
            suma_notas_aprobadas = suma_notas_aprobadas + nota; // Acumula la nota
        }
    }

    printf("\n========================================\n");
    printf("              RESULTADOS\n");
    printf("========================================\n");

    // 3. Cálculos y validación
    // Verificamos que haya al menos un aprobado para evitar un error de división por cero
    if (alumnos_aprobados > 0)
    {
        // Cálculo del porcentaje (sobre el total incondicional de 40 alumnos)
        porcentaje_aprobados = (alumnos_aprobados * 100.0) / 40.0;

        // Cálculo del promedio, pero SOLO de las notas aprobadas
        promedio_aprobados = suma_notas_aprobadas / alumnos_aprobados;

        // Al ser números positivos, convertir a entero trunca los decimales,
        // cumpliendo el requisito de "redondear para abajo"
        promedio_redondeado = (int)promedio_aprobados;

        // 4. Impresión con el formato solicitado
        printf("Alumnos aprobados: %d\n", alumnos_aprobados);
        // Imprimimos con 2 decimales y usamos %% para mostrar el símbolo de porcentaje
        printf("Porcentaje de aprobados: %.2f %%\n", porcentaje_aprobados);
        printf("Nota promedio de aprobacion: %d\n", promedio_redondeado);
    }
    else
    {
        printf("No hubo alumnos aprobados en la comision.\n");
        printf("Porcentaje de aprobados: 0.00 %%\n");
    }

    printf("========================================\n");

    return 0;
}