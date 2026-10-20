/*
7. Implementar un programa que lea dos números M y N e imprima la suma de las primeras N potencias de M, contando desde la potencia 0.
Hacer dos versiones: una que use la función primitiva POTENCIA y otra que no la use.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables:
    int M, N, i, suma = 0, potencia = 1;

    printf("Ingrese el numero base (M): ");
    scanf("%d", &M);
    printf("Ingrese la cantidad de potencias a calcular (N): ");
    scanf("%d", &N);

    // Validación de la entrada para asegurarse de que N sea mayor o igual a cero
    if (N < 0)
    {
        printf("La cantidad de potencias debe ser mayor o igual a cero.\n");
        return 1;
    }

    // Calcular la suma de las primeras N potencias:
    for (i = 0; i < N; i++)
    {
        suma += potencia; // 1. Acumula el valor actual en la suma total
        potencia *= M;    // 2. Prepara la potencia multiplicando por M para la siguiente vuelta
    }

    // Impresión del resultado:
    printf("La suma de las primeras %d potencias de %d es: %d\n", N, M, suma);

    return 0;
}