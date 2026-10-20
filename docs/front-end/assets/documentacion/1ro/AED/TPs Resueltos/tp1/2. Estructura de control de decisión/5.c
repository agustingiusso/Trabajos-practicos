/*
5. Diseñar un algoritmo que calcule el mayor de dos números dados. ¿Cuántas condiciones requiere evaluar su algoritmo?
¿Podría codificar otro que utilice menos? ¿Y otro que utilice menos sentencias SI?
*/

#include <stdio.h>
int main()
{
    // Declaración de variables:
    float a, b, mayor;

    // Ingreso de datos:
    printf("Ingrese el primer número: ");
    scanf("%f", &a);

    printf("Ingrese el segundo número: ");
    scanf("%f", &b);

    // Cálculo del mayor de los dos números:
    if (a > b)
    {
        mayor = a;
    }
    else
    {
        mayor = b;
    }

    // Impresión del resultado:
    printf("El mayor de los dos números es: %.2f\n", mayor);

    return 0;
}