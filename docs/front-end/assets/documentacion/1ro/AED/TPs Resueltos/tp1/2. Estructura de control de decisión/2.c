/*
2. Se ingresan 4 números reales y se quiere determinar si la suma de ellos es positiva,
negativa o cero. Imprimir un mensaje indicándolo.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables:
    float a, b, c, d, suma;

    // Ingreso de datos:
    printf("Ingrese el primer número: ");
    scanf("%f", &a);
    printf("Ingrese el segundo número: ");
    scanf("%f", &b);
    printf("Ingrese el tercer número: ");
    scanf("%f", &c);
    printf("Ingrese el cuarto número: ");
    scanf("%f", &d);

    // Cálculo de la suma:
    suma = a + b + c + d;

    // Determinación del signo de la suma:

    if (suma > 0)
    {
        printf("La suma es positiva.\n");
    }
    else if (suma < 0)
    {
        printf("La suma es negativa.\n");
    }
    else
    {
        printf("La suma es cero.\n");
    }

    return 0;
}