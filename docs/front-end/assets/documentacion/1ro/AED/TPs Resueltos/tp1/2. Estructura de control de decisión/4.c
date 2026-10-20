/*
4. Un empleado de banco tiene un sistema que imprime un ticket cada vez que un cliente realiza una compra de dólares.
La operación tiene una comisión administrativa según la cantidad de dólares que se venden, lo que representa un sobre costo para el cliente:
    a. 2% si es más de 501 y menos de 1501
    b. 2,5% si es mayor de 1501 y menos que 3501
    c. 4 % si es mayor a 3501
El ticket muestra discriminados: la cantidad de dólares que se compraron, el valor de cada dólar, el monto de la comisión y el monto total que
el cliente debe abonar por la compra.
Hacer un programa que simule la compra e imprima el ticket.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables:
    float dolares, valor_dolar, comision, total;

    // Ingreso de datos:
    printf("Ingrese la cantidad de dolares a comprar: ");
    scanf("%f", &dolares);

    printf("Ingrese el valor de cada dolar: ");
    scanf("%f", &valor_dolar);

    // Cálculo de la comisión:
    if (dolares > 501 && dolares < 1501)
    {
        comision = dolares * valor_dolar * 0.02;
    }
    else if (dolares > 1501 && dolares < 3501)
    {
        comision = dolares * valor_dolar * 0.025;
    }
    else if (dolares > 3501)
    {
        comision = dolares * valor_dolar * 0.04;
    }
    else
    {
        comision = 0;
    }

    // Cálculo del total a abonar:
    total = (dolares * valor_dolar) + comision;

    // Impresión del ticket(Hecho con IA):
    printf("\n==================================================\n");
    printf("             BANCO - TICKET DE COMPRA             \n");
    printf("==================================================\n");
    printf(" Detalle de la operacion:\n");
    printf("   Cantidad de dolares:          USD %8.2f\n", dolares);
    printf("   Cotizacion por dolar:           $ %8.2f\n", valor_dolar);
    printf("--------------------------------------------------\n");
    printf("   Subtotal (sin comision):        $ %8.2f\n", dolares * valor_dolar);
    printf("   Comision administrativa:        $ %8.2f\n", comision);
    printf("==================================================\n");
    printf(" TOTAL A ABONAR:                   $ %8.2f\n", total);
    printf("==================================================\n");

    return 0;
}