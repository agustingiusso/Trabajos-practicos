/*
2. Una Librería cobra $10 el minuto de uso de una computadora con conexión a Internet, y $15 la hoja impresa.
Existe un cargo adicional consistente en $5 * X, siendo X el 1% del tiempo utilizado, en concepto de seguro.
Se quiere imprimir el recibo de uso de un cliente, en el que se detallen todos los conceptos.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables:
    int minutos, precio_minuto;
    int hojas, precio_hoja;
    float cargo_adicional;
    float tiempo_utilizado_1;
    float seguro;

    // Ingreso de datos:
    printf("Ingrese la cantidad de minutos de uso de la computadora: ");
    scanf("%d", &minutos);
    precio_minuto = minutos * 10;

    printf("Ingrese la cantidad de hojas impresas: ");
    scanf("%d", &hojas);
    precio_hoja = hojas * 15;

    // Cálculo del cargo adicional y seguro
    tiempo_utilizado_1 = minutos * 0.01; // 1% del tiempo utilizado
    cargo_adicional = 5 * tiempo_utilizado_1;
    seguro = precio_minuto + precio_hoja + cargo_adicional;

    // Impresión del recibo (Hecho con IA)
    printf("\n========================================\n");
    printf("           RECIBO DE LIBRERIA           \n");
    printf("========================================\n");
    printf(" DETALLE DE CONSUMO:\n");
    printf("   Uso de PC (%d min):        $ %8d\n", minutos, precio_minuto);
    printf("   Impresiones (%d hojas):    $ %8d\n", hojas, precio_hoja);
    printf("   Cargo adicional (Seguro):  $ %8.2f\n", cargo_adicional);
    printf("----------------------------------------\n");
    printf(" TOTAL A PAGAR:               $ %8.2f\n", seguro);
    printf("========================================\n");

    return 0;
}