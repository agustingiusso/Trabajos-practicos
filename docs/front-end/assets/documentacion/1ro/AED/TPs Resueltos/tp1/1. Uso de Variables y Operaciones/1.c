/*
1. Una empresa desea calcular el sueldo de un empleado e imprimir su recibo detallando:
Nombre y Apellido, Sueldo Básico, Premio, Comida, Viáticos, Ausentes, Obra social (3%), Ley 19032 (3%), y Jubilación (11%).
Por los ausentes, se descuenta un monto fijo por día de ausencia. Los porcentajes se calculan sobre los montos remunerativos.
Viáticos, premios y comida no se consideran remunerativos.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables:
    char nombre[50];
    char apellido[50];
    float sueldo_basico;
    float premio;
    float comida;
    float viaticos;
    int ausentes;
    float descuento_ausentes, total_ausentes;
    float obra_social, ley_19032, jubilacion, total_descuentos;
    float sueldo_bruto;
    float sueldo_neto;

    // Ingreso de datos:
    printf("Ingrese el nombre del empleado: ");
    scanf("%s", nombre);

    printf("Ingrese el apellido del empleado: ");
    scanf("%s", apellido);

    printf("Ingrese el sueldo básico: ");
    scanf("%f", &sueldo_basico);

    printf("Ingrese el premio: ");
    scanf("%f", &premio);

    printf("Ingrese el monto de comida: ");
    scanf("%f", &comida);

    printf("Ingrese el monto de viáticos: ");
    scanf("%f", &viaticos);

    printf("Ingrese la cantidad de días ausentes: ");
    scanf("%d", &ausentes);

    printf("Ingrese el monto fijo por día de ausencia: ");
    scanf("%f", &descuento_ausentes);

    // Cálculo de descuentos y sueldo neto:
    total_ausentes = ausentes * descuento_ausentes;
    obra_social = sueldo_basico * 0.03;
    ley_19032 = sueldo_basico * 0.03;
    jubilacion = sueldo_basico * 0.11;
    total_descuentos = obra_social + ley_19032 + jubilacion + total_ausentes;
    sueldo_bruto = sueldo_basico + premio + comida + viaticos;
    sueldo_neto = sueldo_bruto - total_descuentos;

    // Impresión del recibo (Hecho con IA)

    printf("\n========================================================\n");
    printf("                  RECIBO DE SUELDO                      \n");
    printf("========================================================\n");
    printf(" Empleado: %s %s\n", nombre, apellido);
    printf("--------------------------------------------------------\n");
    printf(" CONCEPTOS REMUNERATIVOS:\n");
    printf("   Sueldo Basico:                       $ %8.2f\n", sueldo_basico);
    printf("   Descuento por Ausentes (%d dias):     -$ %8.2f\n", ausentes, total_ausentes);
    printf("--------------------------------------------------------\n");
    printf(" RETENCIONES / DESCUENTOS:\n");
    printf("   Obra Social (3%%):                    -$ %8.2f\n", obra_social);
    printf("   Ley 19032 (3%%):                      -$ %8.2f\n", ley_19032);
    printf("   Jubilacion (11%%):                    -$ %8.2f\n", jubilacion);
    printf("--------------------------------------------------------\n");
    printf(" CONCEPTOS NO REMUNERATIVOS:\n");
    printf("   Premio:                              $ %8.2f\n", premio);
    printf("   Comida:                              $ %8.2f\n", comida);
    printf("   Viaticos:                            $ %8.2f\n", viaticos);
    printf("========================================================\n");
    printf(" SUELDO BRUTO:                          $ %8.2f\n", sueldo_bruto);
    printf(" NETO A COBRAR:                         $ %8.2f\n", sueldo_neto);
    printf("========================================================\n");

    return 0;
}