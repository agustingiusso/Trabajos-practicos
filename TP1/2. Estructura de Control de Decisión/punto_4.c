/*
4. Un empleado de banco tiene un sistema que imprime un ticket cada vez que un cliente
realiza una compra de dólares. La operación tiene una comisión administrativa según la
cantidad de dólares que se venden, lo que representa un sobre costo para el cliente:
a. 2% si es más de 501 y menos de 1501
b. 2,5% si es mayor de 1501 y menos que 3501
c. 4% si es mayor a 3501
El ticket muestra discriminados: la cantidad de dólares que se compraron, el valor de
cada dólar, el monto de la comisión y el monto total que el cliente debe abonar por la
compra. Hacer un programa que simule la compra e imprima el ticket.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables
    float cantidad_dolares, valor_dolar;
    float porcentaje_comision, monto_comision, costo_base, total_pagar;

    // 1. Ingreso de datos
    printf("--- Sistema Bancario - Compra de Dolares ---\n");
    printf("Ingrese la cantidad de dolares a comprar: ");
    scanf("%f", &cantidad_dolares);

    printf("Ingrese el valor actual del dolar: $");
    scanf("%f", &valor_dolar);

    // 2. Evaluacion de la comision
    // Inicializamos la comision en 0 para cubrir montos de 501 o menos, o los montos limite del enunciado
    porcentaje_comision = 0.0;

    // Se utilizan los operadores logicos AND (&&) para evaluar los rangos
    if (cantidad_dolares > 501 && cantidad_dolares < 1501)
    {
        porcentaje_comision = 0.02; // 2%
    }
    else if (cantidad_dolares > 1501 && cantidad_dolares < 3501)
    {
        porcentaje_comision = 0.025; // 2.5%
    }
    else if (cantidad_dolares > 3501)
    {
        porcentaje_comision = 0.04; // 4%
    }

    // 3. Calculos principales
    // Primero calculamos cuanto cuestan los dolares sin el recargo
    costo_base = cantidad_dolares * valor_dolar;

    // Luego calculamos el recargo administrativo sobre ese costo base
    monto_comision = costo_base * porcentaje_comision;

    // Finalmente sumamos ambos para obtener el total a pagar
    total_pagar = costo_base + monto_comision;

    // 4. Impresion del ticket discriminado
    printf("\n========================================\n");
    printf("             TICKET DE COMPRA\n");
    printf("========================================\n");
    printf("Dolares comprados:         USD %.2f\n", cantidad_dolares);
    printf("Valor del dolar:           $ %.2f\n", valor_dolar);
    printf("Subtotal:                  $ %.2f\n", costo_base);
    printf("Comision administrativa:   $ %.2f (%.1f%%)\n", monto_comision, porcentaje_comision * 100);
    printf("========================================\n");
    printf("TOTAL A ABONAR:            $ %.2f\n", total_pagar);
    printf("========================================\n");

    return 0;
}