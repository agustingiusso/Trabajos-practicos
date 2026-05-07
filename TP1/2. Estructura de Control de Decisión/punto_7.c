/*
7. Diseñar un algoritmo que ingrese I, J, K, L. Si I/J=K/L imprimir "Son iguales", en caso contrario no dar mensaje.
Recuerde verificar que los divisores sean distintos de cero y en este caso indicar la imposibilidad de realizar las operaciones.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables
    float i, j, k, l;

    // 1. Ingreso de datos
    printf("--- Verificador de Proporciones ---\n");
    printf("Ingrese el valor de I: ");
    scanf("%f", &i);

    printf("Ingrese el valor de J: ");
    scanf("%f", &j);

    printf("Ingrese el valor de K: ");
    scanf("%f", &k);

    printf("Ingrese el valor de L: ");
    scanf("%f", &l);

    printf("\n========================================\n");

    // 2. Verificación de divisores distintos de cero
    if (j == 0 || l == 0)
    {
        printf("AVISO: Imposibilidad de realizar las operaciones. Los divisores (J o L) no pueden ser cero.\n");
    }
    else
    {
        // 3. Comparación de los cocientes
        if ((i / j) == (k / l))
        {
            printf("Son iguales\n");
        }
        // El enunciado especifica explícitamente: "en caso contrario no dar mensaje".
        // Por lo tanto, no se agrega un bloque "else" para esta condición.
    }

    printf("========================================\n");

    return 0;
}