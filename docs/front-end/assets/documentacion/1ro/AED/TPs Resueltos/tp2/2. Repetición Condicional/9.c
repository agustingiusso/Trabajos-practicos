/*
9. Rehacer el ejercicio 5 pero contando la parte entera en lugar de la parte no decimal.
*/

#include <stdio.h>

int main()
{

    // Declaración de variables
    float numero;
    int total_leidos = 0;
    int enteros_pares = 0;
    int parte_entera;
    float porcentaje;

    // Solicitamos al usuario que ingrese los números
    printf("Ingrese numeros reales (ingrese 0 para terminar):\n");
    scanf("%f", &numero);

    // Repetición Condicional: iteramos mientras el número ingresado no sea 0
    while (numero != 0)
    {
        // Contamos cada número que ingresa (el 0 final no se cuenta según la lógica habitual)
        total_leidos = total_leidos + 1;

        // Obtenemos la parte entera. En C, convertir un 'float' a 'int'
        // recorta los decimales. Esto equivale a la función TRUNCAR(n) o ENT(n) de la guía.
        parte_entera = (int)numero;

        // Verificamos si la parte entera es par usando el módulo (resto de la división por 2)
        if (parte_entera % 2 == 0)
        {
            enteros_pares = enteros_pares + 1;
        }

        // Leemos el siguiente número para la próxima vuelta del bucle
        scanf("%f", &numero);
    }

    // Mostramos los resultados finales fuera del bucle
    printf("\n--- Informe Final ---\n");
    printf("Cantidad total de numeros leidos: %d\n", total_leidos);

    // Evitamos una división por cero en caso de que el primer número ingresado haya sido 0
    if (total_leidos > 0)
    {
        porcentaje = (float)enteros_pares * 100 / total_leidos;

        printf("Cantidad de numeros con parte entera par: %d\n", enteros_pares);
        printf("Porcentaje que representan: %.2f%%\n", porcentaje);
    }
    else
    {
        printf("No se ingresaron numeros para calcular el porcentaje.\n");
    }

    return 0;
}