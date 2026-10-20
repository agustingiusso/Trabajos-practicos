/*
2. Se desea calcular e imprimir el porcentaje de alumnos aprobados en una comisión de 40
alumnos y la nota promedio de aprobación. El porcentaje debe calcularse con 2 dígitos
decimales y la nota promedio debe ser entera y redondearse para abajo.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables
    int i, nota, aprobados = 0, sumaNotas = 0;
    float porcentaje, promedio;

    // Ciclo para ingresar las notas de los 40 alumnos
    for (i = 1; i <= 40; i++)
    {
        printf("Ingrese la nota del alumno %d: ", i);
        scanf("%d", &nota);

        // Contar aprobados y sumar notas
        if (nota >= 6)
        {
            aprobados++;
            sumaNotas += nota;
        }
    }

    // Calcular porcentaje de aprobados y promedio de aprobación
    porcentaje = (aprobados / 40.0) * 100;
    if (aprobados > 0)
    {
        promedio = sumaNotas / aprobados;
    }
    else
    {
        promedio = 0;
    }

    // Imprimir resultados
    printf("Porcentaje de alumnos aprobados: %.2f%%\n", porcentaje);
    printf("Nota promedio de aprobación: %d\n", (int)promedio);

    return 0;
}