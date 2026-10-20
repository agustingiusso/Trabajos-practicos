/*
10. Implementar un programa que calcule todos los divisores de un número dado que son menores que él.
Recordar que todos los divisores de un número, excepto por él mismo, son menores que la mitad.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables
    int numero, i;

    // Solicitar al usuario un número entero positivo
    printf("Ingrese un número entero positivo: ");
    scanf("%d", &numero);

    // Validar que el número sea positivo
    if (numero <= 0)
    {
        printf("El número debe ser positivo.\n");
        return 1; // Salir del programa con un código de error
    }

    // Calcular e imprimir los divisores menores que el número
    printf("Los divisores de %d menores que él son:\n", numero);
    for (i = 1; i <= numero / 2; i++)
    {
        if (numero % i == 0)
        {
            printf("%d\n", i);
        }
    }

    return 0;
}