/*
13. Quince encuestadores se reparten entre 3 ciudades para relevar entre la población si considera que cierto producto es bueno, malo, regular,
o no lo conoce.
El relevamiento se lleva a cabo simultáneamente en las 3 ciudades.
Cada encuestador entrevista una cantidad fija de personas (a ser leída) y a medida que obtienen sus respuestas las envían junto con el código
de la ciudad a la oficina central por medio de un dispositivo inalámbrico.
En dicha oficina, la información es recibida por un programa que debe calcular e informar para cada ciudad el porcentaje de su población que ubica
al producto en cada categoría.
*/

#include <stdio.h>

int main()
{
    // 1. Declaración de variables
    int encuestados_por_encuestador, total_encuestas, i;
    int ciudad, respuesta;

    // Contadores totales por ciudad (Para saber cuál es el 100% de cada una)
    int total_c1 = 0, total_c2 = 0, total_c3 = 0;

    // Contadores de respuestas para la Ciudad 1
    int c1_bueno = 0, c1_malo = 0, c1_regular = 0, c1_noconocido = 0;
    // Contadores de respuestas para la Ciudad 2
    int c2_bueno = 0, c2_malo = 0, c2_regular = 0, c2_noconocido = 0;
    // Contadores de respuestas para la Ciudad 3
    int c3_bueno = 0, c3_malo = 0, c3_regular = 0, c3_noconocido = 0;

    // 2. Ingreso de la configuración inicial
    printf("Ingrese la cantidad de personas que entrevista cada encuestador: ");
    scanf("%d", &encuestados_por_encuestador);

    if (encuestados_por_encuestador <= 0)
    {
        printf("Error: La cantidad de encuestados debe ser mayor a 0.\n");
        return 1;
    }

    // Calculamos el volumen total de datos que recibiremos
    total_encuestas = 15 * encuestados_por_encuestador;

    // 3. Procesamiento del flujo de datos
    printf("\n--- INICIO DE RECEPCION DE DATOS ---\n");
    printf("Codigos de Ciudad: 1, 2, 3\n");
    printf("Codigos de Respuesta: 1 (Bueno), 2 (Malo), 3 (Regular), 4 (No lo conoce)\n\n");

    for (i = 1; i <= total_encuestas; i++)
    {
        printf("Encuesta %d/%d - Ingrese Ciudad (1-3) y Respuesta (1-4) separados por espacio: ", i, total_encuestas);
        scanf("%d %d", &ciudad, &respuesta);

        // Clasificación de la información recibida
        if (ciudad == 1)
        {
            total_c1++; // Sumamos uno al total de la ciudad 1
            if (respuesta == 1)
                c1_bueno++;
            else if (respuesta == 2)
                c1_malo++;
            else if (respuesta == 3)
                c1_regular++;
            else if (respuesta == 4)
                c1_noconocido++;
        }
        else if (ciudad == 2)
        {
            total_c2++; // Sumamos uno al total de la ciudad 2
            if (respuesta == 1)
                c2_bueno++;
            else if (respuesta == 2)
                c2_malo++;
            else if (respuesta == 3)
                c2_regular++;
            else if (respuesta == 4)
                c2_noconocido++;
        }
        else if (ciudad == 3)
        {
            total_c3++; // Sumamos uno al total de la ciudad 3
            if (respuesta == 1)
                c3_bueno++;
            else if (respuesta == 2)
                c3_malo++;
            else if (respuesta == 3)
                c3_regular++;
            else if (respuesta == 4)
                c3_noconocido++;
        }
        else
        {
            printf("Error: Codigo de ciudad invalido. Ingrese los datos nuevamente.\n");
            i--; // Truco: Restamos 1 al iterador 'i' para no perder el turno de esta encuesta
        }
    }

    // 4. Cálculo e impresión de informes porcentuales
    printf("\n========================================================\n");
    printf("        INFORME DE ACEPTACION DEL PRODUCTO\n");
    printf("========================================================\n");

    // Condicionamos la impresión para evitar una división por cero (crash del programa)
    if (total_c1 > 0)
    {
        printf(" CIUDAD 1 (Total encuestados: %d)\n", total_c1);
        printf("   Bueno:        %6.2f%%\n", (c1_bueno * 100.0) / total_c1);
        printf("   Malo:         %6.2f%%\n", (c1_malo * 100.0) / total_c1);
        printf("   Regular:      %6.2f%%\n", (c1_regular * 100.0) / total_c1);
        printf("   No lo conoce: %6.2f%%\n", (c1_noconocido * 100.0) / total_c1);
        printf("--------------------------------------------------------\n");
    }

    if (total_c2 > 0)
    {
        printf(" CIUDAD 2 (Total encuestados: %d)\n", total_c2);
        printf("   Bueno:        %6.2f%%\n", (c2_bueno * 100.0) / total_c2);
        printf("   Malo:         %6.2f%%\n", (c2_malo * 100.0) / total_c2);
        printf("   Regular:      %6.2f%%\n", (c2_regular * 100.0) / total_c2);
        printf("   No lo conoce: %6.2f%%\n", (c2_noconocido * 100.0) / total_c2);
        printf("--------------------------------------------------------\n");
    }

    if (total_c3 > 0)
    {
        printf(" CIUDAD 3 (Total encuestados: %d)\n", total_c3);
        printf("   Bueno:        %6.2f%%\n", (c3_bueno * 100.0) / total_c3);
        printf("   Malo:         %6.2f%%\n", (c3_malo * 100.0) / total_c3);
        printf("   Regular:      %6.2f%%\n", (c3_regular * 100.0) / total_c3);
        printf("   No lo conoce: %6.2f%%\n", (c3_noconocido * 100.0) / total_c3);
    }

    printf("========================================================\n");

    return 0;
}