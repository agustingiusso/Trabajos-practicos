/*
5. Implementar un programa que lea un número N y calcule el máximo de los siguientes N números leídos.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables:
    int N, i, num, max;

    printf("Ingrese la cantidad de números a leer (N): ");
    scanf("%d", &N);

    // Validación de la entrada para asegurarse de que N sea mayor que cero
    if (N <= 0)
    {
        printf("El número de elementos debe ser mayor que cero.\n");
        return 1;
    }

    printf("Ingrese el número 1: ");
    scanf("%d", &num);
    max = num; // Inicializa max con el primer número leído

    for (i = 2; i <= N; i++)
    {
        printf("Ingrese el número %d: ", i);
        scanf("%d", &num);
        if (num > max)
        {
            max = num; // Actualiza max si encuentra un número mayor
        }
    }

    printf("El máximo de los %d números ingresados es: %d\n", N, max);

    return 0;
}