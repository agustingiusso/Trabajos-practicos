/*
3. Se tiene una máquina expendedora de gaseosas cuyo valor es de $1,25.
Admite monedas de: $0,10 $0,25 $0,50 y $1 y realiza las siguientes operaciones:
a. Venta sin Vuelto
b. Venta con Vuelto
c. No Venta y devuelve las monedas
El programa debe aceptar las monedas e imprimir un mensaje indicando la operatoria.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables:
    float valor_gaseosa = 1.25;
    int moneda_10 = 0, moneda_25 = 0, moneda_50 = 0, moneda_100 = 0;
    float total_ingresado = 0;
    float vuelto = 0;

    // Ingreso de monedas:
    printf("Ingrese monedas de 0,10$: \n");
    scanf("%d", &moneda_10);
    printf("Ingrese monedas de 0,25$: \n");
    scanf("%d", &moneda_25);
    printf("Ingrese monedas de 0,50$: \n");
    scanf("%d", &moneda_50);
    printf("Ingrese monedas de 1$: \n");
    scanf("%d", &moneda_100);

    // Calcular el total ingresado:
    total_ingresado = (moneda_10 * 0.10) + (moneda_25 * 0.25) + (moneda_50 * 0.50) + (moneda_100 * 1.00);

    // Imprimir según la cantidad ingresada:
    if (total_ingresado == valor_gaseosa)
    {
        printf("Venta sin Vuelto. Gracias por su compra.\n");
    }
    else if (total_ingresado > valor_gaseosa)
    {
        vuelto = total_ingresado - valor_gaseosa;
        printf("Venta con Vuelto. Su vuelto es: $%.2f\n", vuelto);
    }
    else
    {
        printf("No Venta. Devolviendo monedas.\n");
    }

    return 0;
}