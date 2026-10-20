/*
12. Retomando el ejercicio 1 del TP1, implementar un programa que imprima los recibos de los 50 empleados de la empresa.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables:
    int i, ausentes;
    char nombre[50], apellido[50];
    float sueldo_basico, premio, comida, viaticos, descuento_ausentes;
    float total_ausentes, monto_remunerativo;
    float obra_social, ley_19032, jubilacion, total_retenciones;
    float sueldo_bruto, sueldo_neto;

    // Bucle para procesar los 50 empleados
    for (i = 1; i <= 50; i++)
    {
        printf("\n========================================================\n");
        printf("   CARGA DE DATOS - EMPLEADO %d DE 50\n", i);
        printf("========================================================\n");

        // Ingreso de datos:
        printf("Ingrese el nombre del empleado: ");
        scanf("%s", nombre);

        printf("Ingrese el apellido del empleado: ");
        scanf("%s", apellido);

        printf("Ingrese el sueldo basico: ");
        scanf("%f", &sueldo_basico);

        printf("Ingrese el premio: ");
        scanf("%f", &premio);

        printf("Ingrese el monto de comida: ");
        scanf("%f", &comida);

        printf("Ingrese el monto de viaticos: ");
        scanf("%f", &viaticos);

        printf("Ingrese la cantidad de dias ausentes: ");
        scanf("%d", &ausentes);

        printf("Ingrese el monto fijo por dia de ausencia: ");
        scanf("%f", &descuento_ausentes);

        // Cálculo de descuentos y sueldo neto
        total_ausentes = ausentes * descuento_ausentes;
        monto_remunerativo = sueldo_basico - total_ausentes;
        obra_social = monto_remunerativo * 0.03;
        ley_19032 = monto_remunerativo * 0.03;
        jubilacion = monto_remunerativo * 0.11;
        total_retenciones = obra_social + ley_19032 + jubilacion;
        sueldo_bruto = monto_remunerativo + premio + comida + viaticos;
        sueldo_neto = sueldo_bruto - total_retenciones;

        // Impresión del recibo (Hecho con IA):

        printf("\n========================================================\n");
        printf("                  RECIBO DE SUELDO                      \n");
        printf("========================================================\n");
        printf(" Empleado: %s %s (Legajo #%d)\n", nombre, apellido, i);
        printf("--------------------------------------------------------\n");
        printf(" CONCEPTOS REMUNERATIVOS:\n");
        printf("   Sueldo Basico:                       $ %8.2f\n", sueldo_basico);
        if (ausentes > 0)
        {
            printf("   Descuento por Ausentes (%d dias):     -$ %8.2f\n", ausentes, total_ausentes);
        }
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
    }

    return 0;
}