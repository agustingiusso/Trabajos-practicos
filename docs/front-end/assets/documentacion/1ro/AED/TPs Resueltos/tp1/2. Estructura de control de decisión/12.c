/*
12. Diseñar un algoritmo que calcule el mayor de 3 números dados. ¿Cuántas condiciones requiere evaluar su algoritmo?
¿Podría codificar otro que utilice menos? ¿Y otro que utilice menos sentencias SI?
*/

#include <stdio.h>

int main()
{
    // Declaración de variables:
    int num1, num2, num3, mayor;

    // Ingreso de datos:
    printf("Ingrese el primer número: ");
    scanf("%d", &num1);
    printf("Ingrese el segundo número: ");
    scanf("%d", &num2);
    printf("Ingrese el tercer número: ");
    scanf("%d", &num3);

    // Determinación del mayor de los 3 números:
    mayor = num1; // Suponemos que el primer número es el mayor

    if (num2 > mayor)
    {
        mayor = num2; // Si el segundo número es mayor, lo asignamos como mayor
    }
    if (num3 > mayor)
    {
        mayor = num3; // Si el tercer número es mayor, lo asignamos como mayor
    }

    // Verificación extra por si los tres números son iguales
    if (num1 == num2 && num2 == num3)
    {
        printf("Los tres números son iguales.\n");
        return 0; // Salida del programa si los tres números son iguales
    }

    // Mostrar el resultado:
    printf("El mayor de los tres números es el: %d\n", mayor);

    return 0;
}