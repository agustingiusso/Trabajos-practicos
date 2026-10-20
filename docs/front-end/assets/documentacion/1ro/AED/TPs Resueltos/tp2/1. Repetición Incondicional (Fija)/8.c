/*
8. Implementar un programa que lea tres números P, Q, R e imprima las potencias de P
empezando desde la que está en la posición Q hasta la R
*/

#include <stdio.h>

int main()
{
    // Declaración de variables:
    int P, Q, R, i, potencia = 1;

    printf("Ingrese el número base (P): ");
    scanf("%d", &P);
    printf("Ingrese la posición inicial (Q): ");
    scanf("%d", &Q);
    printf("Ingrese la posición final (R): ");
    scanf("%d", &R);

    // Validación de la entrada para asegurarse de que Q y R sean mayores o iguales a cero
    if (Q < 0 || R < 0)
    {
        printf("Las posiciones deben ser mayores o iguales a cero.\n");
        return 1;
    }

    // Validación de la entrada para asegurarse de que Q sea menor o igual a R
    if (Q > R)
    {
        printf("La posición inicial (Q) debe ser menor o igual a la posición final (R).\n");
        return 1;
    }

    // Calcular e imprimir las potencias desde Q hasta R:
    for (i = 0; i <= R; i++)
    {
        if (i >= Q)
        {
            printf("%d^%d = %d\n", P, i, potencia);
        }
        potencia *= P; // Prepara la potencia multiplicando por P para la siguiente vuelta
    }

    return 0;
}