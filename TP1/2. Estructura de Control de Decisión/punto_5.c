/*
5. Diseñar un algoritmo que calcule el mayor de dos números dados.
¿Cuántas condiciones requiere evaluar su algoritmo?
¿Podría codificar otro que utilice menos?
¿Y otro que utilice menos sentencias SI?
*/

#include <stdio.h>

int main()
{
    // Declaración de variables
    float num1, num2;

    // 1. Ingreso de datos
    printf("--- Buscador del numero mayor (2 variables) ---\n");
    printf("Ingrese el primer numero: ");
    scanf("%f", &num1);

    printf("Ingrese el segundo numero: ");
    scanf("%f", &num2);

    // 2. Evaluacion y respuestas teoricas
    printf("\n========================================\n");

    /* RESPUESTAS A LAS PREGUNTAS DEL ENUNCIADO:
    1. ¿Cuántas condiciones requiere evaluar su algoritmo?
       En el peor de los casos evalúa 2 condiciones (si el primero es mayor, y si el segundo es mayor).
    2. ¿Podría codificar otro que utilice menos? / ¿Y otro que utilice menos sentencias SI?
       Una forma ineficiente sería usar dos "IF" separados (if a>b... if b>a...), evaluando siempre dos veces.
       Al usar la estructura "if / else if / else", anidamos las sentencias. Si la primera es verdadera,
       ya no evalúa la segunda, utilizando el mínimo de sentencias SI y condiciones requeridas para este problema.
    */

    if (num1 > num2)
    {
        printf("El numero mayor es el primero: %.2f\n", num1);
    }
    else if (num2 > num1)
    {
        printf("El numero mayor es el segundo: %.2f\n", num2);
    }
    else
    {
        // Si no es mayor el primero ni el segundo, obligatoriamente son iguales
        printf("Ambos numeros son iguales (%.2f).\n", num1);
    }

    printf("========================================\n");

    return 0;
}