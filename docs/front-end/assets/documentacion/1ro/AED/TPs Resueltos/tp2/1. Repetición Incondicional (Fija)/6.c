/*
6. Implementar un programa que lea dos números M y N e imprima las primeras N potencias de M, contando desde la potencia 0.
Hacer dos versiones: una que use la función primitiva POTENCIA y otra que no la use.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables:
    int M, N, i, potencia = 1;

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

    printf("Potencias de %d:\n", M);

    // Calcular e imprimir las primeras N potencias:
    for (i = 0; i < N; i++)
    {
        // 1. Primero se imprime. En la vuelta i=0, 'potencia' vale 1 (M^0).
        printf("%d^%d = %d\n", M, i, potencia);

        // 2. Ahora se mutiplica por la base para preparar el valor de la siguiente vuelta.
        potencia *= M;
    }

    return 0;
}