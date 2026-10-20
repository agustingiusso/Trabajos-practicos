/*
9. Diseñar un algoritmo que ingrese I, J, K, L. Si I/J=K/L imprimir “Son iguales”, en caso contrario no dar mensaje.
Recuerde verificar que los divisores sean distintos de cero y en este caso indicar la imposibilidad de realizar las operaciones.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables:
    float I, J, K, L;

    // Ingreso de valores:
    printf("Ingrese el valor de I: ");
    scanf("%f", &I);
    printf("Ingrese el valor de J: ");
    scanf("%f", &J);
    printf("Ingrese el valor de K: ");
    scanf("%f", &K);
    printf("Ingrese el valor de L: ");
    scanf("%f", &L);

    // Verificación de divisores distintos de cero:
    if (J == 0 || L == 0)
    {
        printf("Imposible realizar la operación: uno de los divisores es cero.\n");
    }
    else
    {
        // Comparación de las divisiones:
        if ((I / J) == (K / L))
        {
            printf("Son iguales\n");
        }
    }

    return 0;
}