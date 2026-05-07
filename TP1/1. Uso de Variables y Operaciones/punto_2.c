/*
2. Una Librería cobra $10 el minuto de uso de una computadora con conexión a Internet, y $15 la hoja impresa.
Existe un cargo adicional consistente en $5 * X, siendo X el 1% del tiempo utilizado, en concepto de seguro.
Se quiere imprimir el recibo de uso de un cliente, en el que se detallen todos los conceptos.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables
    int minutos_uso, hojas_impresas;
    float costo_internet, costo_impresiones, x, cargo_seguro, total_pagar;

    // 1. Ingreso de datos
    printf("--- Sistema de Facturacion - Libreria ---\n");
    printf("Ingrese la cantidad de minutos de uso de Internet: ");
    scanf("%d", &minutos_uso);

    printf("Ingrese la cantidad de hojas impresas: ");
    scanf("%d", &hojas_impresas);

    // 2. Cálculos principales
    // Se calcula usando los valores fijos requeridos por la cátedra directamente en la operación
    costo_internet = minutos_uso * 10.0;
    costo_impresiones = hojas_impresas * 15.0;

    // Cálculo del seguro: X es el 1% del tiempo utilizado
    x = minutos_uso * 0.01;
    // El cargo consiste en multiplicar 5 por X
    cargo_seguro = 5.0 * x;

    // Cálculo del total
    total_pagar = costo_internet + costo_impresiones + cargo_seguro;

    // 3. Impresión del recibo en el que se detallen todos los conceptos
    printf("\n========================================\n");
    printf("          RECIBO DE CLIENTE\n");
    printf("========================================\n");
    printf("Concepto                    Monto\n");
    printf("----------------------------------------\n");
    printf("Uso de Internet (%d min):   $ %.2f\n", minutos_uso, costo_internet);
    printf("Impresiones (%d hojas):     $ %.2f\n", hojas_impresas, costo_impresiones);
    printf("Seguro adicional:           $ %.2f\n", cargo_seguro);
    printf("========================================\n");
    printf("TOTAL A PAGAR:              $ %.2f\n", total_pagar);
    printf("========================================\n");

    return 0;
}
