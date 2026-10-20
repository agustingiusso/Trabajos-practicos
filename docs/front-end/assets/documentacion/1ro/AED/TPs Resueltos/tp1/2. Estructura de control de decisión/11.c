/*
11. Sabiendo la cantidad de bancos de un aula y la cantidad de alumnos inscriptos para este curso, determinar si alcanzan los bancos existentes.
De no ser así informar además cuántos bancos es necesario agregar.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables:
    int cantidad_bancos, cantidad_alumnos, bancos_necesarios = 0;

    // Ingreso de datos:
    printf("Ingrese la cantidad de bancos existentes en el aula: ");
    scanf("%d", &cantidad_bancos);
    printf("Ingrese la cantidad de alumnos inscriptos para el curso: ");
    scanf("%d", &cantidad_alumnos);

    // Determinación de si alcanzan los bancos existentes:
    if (cantidad_bancos >= cantidad_alumnos)
    {
        printf("Los bancos existentes son suficientes para los alumnos.\n");
    }
    else
    {
        bancos_necesarios = cantidad_alumnos - cantidad_bancos;
        printf("No alcanzan los bancos existentes. Se necesitan agregar %d bancos.\n", bancos_necesarios);
    }

    return 0;
}