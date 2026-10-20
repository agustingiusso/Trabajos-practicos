/*
2. En una empresa se clasifican las cartas recibidas según la sección a la que va destinada, y se les asigna un número correlativo
para cada sección comenzando siempre desde el 0.
Implemente un programa que simule esta operatoria e imprima un informe que detalle para cada sección, y en total,
la cantidad de cartas recibidas ese día.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables
    int seccion, cartas, total_cartas = 0;

    // Bucle condicional para cada sección
    for (seccion = 0; seccion < 5; seccion++)
    {
        printf("Ingrese la cantidad de cartas recibidas en la sección %d: ", seccion);
        scanf("%d", &cartas);

        // Acumulación del total de cartas
        total_cartas += cartas;

        // Impresión del informe por sección
        printf("Sección %d: %d cartas recibidas.\n", seccion, cartas);
    }

    return 0;
}