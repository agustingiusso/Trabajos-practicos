/*
2. Se ingresan 4 números reales y se quiere determinar si la suma de ellos es positiva, negativa o cero.
Imprimir un mensaje indicándolo.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables
    float num1, num2, num3, num4, suma;

    // 1. Ingreso de datos
    printf("--- Analizador de suma de 4 numeros reales ---\n");

    printf("Ingrese el primer numero real: ");
    scanf("%f", &num1);

    printf("Ingrese el segundo numero real: ");
    scanf("%f", &num2);

    printf("Ingrese el tercer numero real: ");
    scanf("%f", &num3);

    printf("Ingrese el cuarto numero real: ");
    scanf("%f", &num4);

    // 2. Calculo de la suma
    suma = num1 + num2 + num3 + num4;

    // 3. Estructura de decision para evaluar el resultado
    printf("\n========================================\n");
    printf("              RESULTADO\n");
    printf("========================================\n");

    if (suma > 0)
    {
        printf("La suma total es %.2f y es POSITIVA.\n", suma);
    }
    else if (suma < 0)
    {
        printf("La suma total es %.2f y es NEGATIVA.\n", suma);
    }
    else
    {
        printf("La suma total es %.2f y es CERO.\n", suma);
    }

    printf("========================================\n");

    return 0;
}