/*
1. En una institución educativa de nivel terciario, los docentes de la asignatura Matemática del 3er. año de todas las carreras quieren determinar
la nota promedio para cada una de las 5 comisiones y el promedio General.
Para lograrlo, se le pide el examen a cada alumno para registrar la nota.
Todos los promedios se calculan sobre la cantidad de alumnos presentes que tenían el examen consigo al momento de hacer el cálculo.
Imprimir los resultados redondeados al entero más próximo.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables
    int alumnos, alumnos_total, com, i;
    float prom_com = 0, prom_general = 0;

    // Bucle condicional para cada comisión
    for (com = 1; com <= 5; com++)
    {
        printf("Ingrese la cantidad de alumnos presentes en la comisión %d: ", com);
        scanf("%d", &alumnos);

        // Bucle para ingresar las notas de los alumnos
        for (i = 1; i <= alumnos; i++)
        {
            float nota;
            printf("Ingrese la nota del alumno %d: ", i);
            scanf("%f", &nota);
            prom_com += nota;
            alumnos_total++;
        }

        // Cálculo del promedio de la comisión
        if (alumnos_total > 0)
        {
            prom_com /= alumnos_total;
            printf("El promedio de la comisión %d es: %.0f\n", com, prom_com);
        }
        else
        {
            printf("No hay alumnos presentes en la comisión %d.\n", com);
        }

        // Acumulación para el promedio general
        prom_general += prom_com * alumnos_total;
    }

    // Cálculo del promedio general
    if (alumnos_total > 0)
    {
        prom_general /= alumnos_total;
        printf("El promedio general es: %.0f\n", prom_general);
    }
    else
    {
        printf("No hay alumnos presentes en ninguna comisión.\n");
    }

    return 0;
}