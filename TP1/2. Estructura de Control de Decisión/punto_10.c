/*
10. Diseñar un algoritmo que calcule el mayor de 3 números dados. ¿Cuántas condiciones requiere evaluar su algoritmo?
¿Podría codificar otro que utilice menos? ¿Y otro que utilice menos sentencias SI?
*/

#include <stdio.h>

int main()
{
    // Declaración de variables
    float num1, num2, num3, mayor;

    // 1. Ingreso de datos
    printf("--- Buscador del numero mayor (3 variables) ---\n");
    printf("Ingrese el primer numero: ");
    scanf("%f", &num1);

    printf("Ingrese el segundo numero: ");
    scanf("%f", &num2);

    printf("Ingrese el tercer numero: ");
    scanf("%f", &num3);

    // 2. Evaluacion y Calculos
    // Asignamos el primer numero como el "mayor" por defecto
    mayor = num1;

    if (num2 > mayor)
    {
        mayor = num2;
    }

    if (num3 > mayor)
    {
        mayor = num3;
    }

    // 3. Impresión del resultado
    printf("\n========================================\n");
    printf("El numero mayor es: %.2f\n", mayor);
    printf("========================================\n");

    return 0;
}

/*
RESPUESTAS A LAS PREGUNTAS DEL ENUNCIADO:

¿Cuántas condiciones requiere evaluar su algoritmo?
Este algoritmo requiere evaluar exactamente 2 condiciones.

¿Podría codificar otro que utilice menos? / ¿Y otro que utilice menos sentencias SI?
No. Al asumir que el primero es el mayor y luego solo comparar los dos restantes
contra esa variable temporal, logramos el método matemáticamente más óptimo para este caso:
solo 2 sentencias SI (sin necesidad de "else") y solo 2 condiciones lógicas en total.
Si usáramos una estructura if/else con operadores lógicos (A > B && A > C),
el procesador tendría que evaluar hasta 4 condiciones.
*/