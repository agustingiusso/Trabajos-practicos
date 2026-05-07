/*
1. Una empresa desea calcular el sueldo de un empleado e imprimir su recibo detallando:
Nombre y Apellido, Sueldo Básico, Premio, Comida, Viáticos, Ausentes, Obra social (3%), Ley 19032 (3%), y Jubilación (11%).
Por los ausentes, se descuenta un monto fijo por día de ausencia. Los porcentajes se calculan sobre los montos remunerativos.
Viáticos, premios y comida no se consideran remunerativos.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables
    char nombre[50];
    char apellido[50];
    float sueldo_basico, premio, comida, viaticos;
    int dias_ausentes;
    float descuento_por_dia, total_descuento_ausencias;
    float monto_remunerativo, obra_social, ley_19032, jubilacion, total_retenciones;
    float total_no_remunerativo, sueldo_neto;

    // 1. Ingreso de datos
    printf("--- Sistema de Liquidacion de Sueldos ---\n");
    printf("Ingrese el nombre del empleado: ");
    scanf("%49s", nombre);
    printf("Ingrese el apellido del empleado: ");
    scanf("%49s", apellido);

    printf("Ingrese el Sueldo Basico: $");
    scanf("%f", &sueldo_basico);

    printf("Ingrese el monto por Premio: $");
    scanf("%f", &premio);

    printf("Ingrese el monto por Comida: $");
    scanf("%f", &comida);

    printf("Ingrese el monto por Viaticos: $");
    scanf("%f", &viaticos);

    printf("Ingrese la cantidad de dias ausentes: ");
    scanf("%d", &dias_ausentes);

    printf("Ingrese el monto a descontar por cada dia de ausencia: $");
    scanf("%f", &descuento_por_dia);

    // 2. Cálculos principales
    // Se descuenta el ausentismo del básico para obtener el total remunerativo
    total_descuento_ausencias = dias_ausentes * descuento_por_dia;
    monto_remunerativo = sueldo_basico - total_descuento_ausencias;

    // Retenciones (calculadas estrictamente sobre el monto remunerativo)
    obra_social = monto_remunerativo * 0.03;
    ley_19032 = monto_remunerativo * 0.03;
    jubilacion = monto_remunerativo * 0.11;
    total_retenciones = obra_social + ley_19032 + jubilacion;

    // Conceptos no remunerativos
    total_no_remunerativo = premio + comida + viaticos;

    // Cálculo final del sueldo de bolsillo (neto)
    sueldo_neto = monto_remunerativo - total_retenciones + total_no_remunerativo;

    // 3. Impresión del recibo
    printf("\n========================================\n");
    printf("          RECIBO DE SUELDO\n");
    printf("========================================\n");
    printf("Empleado: %s %s\n", nombre, apellido);
    printf("----------------------------------------\n");
    printf("CONCEPTOS REMUNERATIVOS:\n");
    printf("Sueldo Basico:                $ %.2f\n", sueldo_basico);
    printf("Descuento por Ausencias (%d):  $ -%.2f\n", dias_ausentes, total_descuento_ausencias);
    printf("Subtotal Remunerativo:        $ %.2f\n", monto_remunerativo);
    printf("----------------------------------------\n");
    printf("RETENCIONES:\n");
    printf("Obra Social (3%%):             $ -%.2f\n", obra_social);
    printf("Ley 19032 (3%%):               $ -%.2f\n", ley_19032);
    printf("Jubilacion (11%%):             $ -%.2f\n", jubilacion);
    printf("Total Retenciones:            $ -%.2f\n", total_retenciones);
    printf("----------------------------------------\n");
    printf("CONCEPTOS NO REMUNERATIVOS:\n");
    printf("Premio:                       $ %.2f\n", premio);
    printf("Comida:                       $ %.2f\n", comida);
    printf("Viaticos:                     $ %.2f\n", viaticos);
    printf("Total No Remunerativo:        $ %.2f\n", total_no_remunerativo);
    printf("========================================\n");
    printf("SUELDO NETO A COBRAR:         $ %.2f\n", sueldo_neto);
    printf("========================================\n");

    return 0;
}