/*
9. Sabiendo la cantidad de bancos de un aula y la cantidad de alumnos inscriptos para este curso,
determinar si alcanzan los bancos existentes.
De no ser asi informar además cuántos bancos es necesario agregar.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables
    int bancos_existentes, alumnos_inscriptos, bancos_faltantes;

    // 1. Ingreso de datos
    printf("--- Gestor de Capacidad de Aula ---\n");
    printf("Ingrese la cantidad de bancos existentes en el aula: ");
    scanf("%d", &bancos_existentes);

    printf("Ingrese la cantidad de alumnos inscriptos: ");
    scanf("%d", &alumnos_inscriptos);

    // 2. Evaluacion y Calculos
    printf("\n========================================\n");

    if (bancos_existentes >= alumnos_inscriptos)
    {
        printf("Estado: Alcanzan los bancos existentes para todos los alumnos.\n");
    }
    else
    {
        // Calculamos la diferencia solo si sabemos que faltan lugares
        bancos_faltantes = alumnos_inscriptos - bancos_existentes;
        printf("Estado: NO alcanzan los bancos existentes.\n");
        printf("Accion requerida: Es necesario agregar %d banco(s).\n", bancos_faltantes);
    }

    printf("========================================\n");

    return 0;
}