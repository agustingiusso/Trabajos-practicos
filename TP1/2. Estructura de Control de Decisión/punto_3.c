/*
3. Se tiene una máquina expendedora de gaseosas cuyo valor es de $1,25.
Admite monedas de: $0,10 $0,25 $0,50 y $1 y realiza las siguientes operaciones:
a. Venta sin Vuelto
b. Venta con Vuelto
C. No Venta y devuelve las monedas
El programa debe aceptar las monedas e imprimir un mensaje indicando la operatoria.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables
    int monedas_10, monedas_25, monedas_50, monedas_1;
    float total_ingresado, vuelto, faltante;

    // 1. Ingreso de datos
    printf("--- Maquina Expendedora de Gaseosas ---\n");
    printf("Valor del producto: $1.25\n");
    printf("Por favor, ingrese la cantidad de monedas de cada denominacion.\n\n");

    printf("Cantidad de monedas de $0.10: ");
    scanf("%d", &monedas_10);

    printf("Cantidad de monedas de $0.25: ");
    scanf("%d", &monedas_25);

    printf("Cantidad de monedas de $0.50: ");
    scanf("%d", &monedas_50);

    printf("Cantidad de monedas de $1.00: ");
    scanf("%d", &monedas_1);

    // 2. Calculo del total ingresado sumando el valor de cada grupo de monedas
    total_ingresado = (monedas_10 * 0.10) + (monedas_25 * 0.25) + (monedas_50 * 0.50) + (monedas_1 * 1.00);

    // 3. Estructura de decision para determinar la operacion
    printf("\n========================================\n");
    printf("Monto total ingresado: $ %.2f\n", total_ingresado);
    printf("----------------------------------------\n");

    // Se evalua el total contra el precio fijo de la gaseosa (1.25)
    if (total_ingresado == 1.25)
    {
        printf("Operacion: a. Venta sin Vuelto.\n");
        printf("Disfrute su gaseosa!\n");
    }
    else if (total_ingresado > 1.25)
    {
        vuelto = total_ingresado - 1.25;
        printf("Operacion: b. Venta con Vuelto.\n");
        printf("Disfrute su gaseosa! Su vuelto es de $ %.2f\n", vuelto);
    }
    else
    {
        faltante = 1.25 - total_ingresado;
        printf("Operacion: c. No Venta y devuelve las monedas.\n");
        printf("Saldo insuficiente. Le faltan $ %.2f para completar la compra.\n", faltante);
    }

    printf("========================================\n");

    return 0;
}