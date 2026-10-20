/*
4. Se realiza una encuesta para determinar cuáles son los jabones en polvo preferidos en una determinada población.
Entre todas las personas encuestadas, se mencionaron 7 marcas diferentes.
Se quiere obtener un informe en el que se detalle, para cada marca, la cantidad de personas y el porcentaje que ese número representa.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables:
    int marca1, marca2, marca3, marca4, marca5, marca6, marca7;
    int total_personas;
    float porcentaje1, porcentaje2, porcentaje3, porcentaje4, porcentaje5, porcentaje6, porcentaje7;

    // Ingreso de datos:
    printf("Ingrese la cantidad de personas que prefieren la marca 1: ");
    scanf("%d", &marca1);

    printf("Ingrese la cantidad de personas que prefieren la marca 2: ");
    scanf("%d", &marca2);

    printf("Ingrese la cantidad de personas que prefieren la marca 3: ");
    scanf("%d", &marca3);

    printf("Ingrese la cantidad de personas que prefieren la marca 4: ");
    scanf("%d", &marca4);

    printf("Ingrese la cantidad de personas que prefieren la marca 5: ");
    scanf("%d", &marca5);

    printf("Ingrese la cantidad de personas que prefieren la marca 6: ");
    scanf("%d", &marca6);

    printf("Ingrese la cantidad de personas que prefieren la marca 7: ");
    scanf("%d", &marca7);

    // Cálculo del total de personas y los porcentajes:
    total_personas = marca1 + marca2 + marca3 + marca4 + marca5 + marca6 + marca7;

    porcentaje1 = (float)marca1 / total_personas * 100;
    porcentaje2 = (float)marca2 / total_personas * 100;
    porcentaje3 = (float)marca3 / total_personas * 100;
    porcentaje4 = (float)marca4 / total_personas * 100;
    porcentaje5 = (float)marca5 / total_personas * 100;
    porcentaje6 = (float)marca6 / total_personas * 100;
    porcentaje7 = (float)marca7 / total_personas * 100;

    // Impresion del Informe Final (Hecho con IA):
    printf("\n==================================================\n");
    printf("          INFORME DE PREFERENCIAS                 \n");
    printf("==================================================\n");
    printf(" Total de personas encuestadas: %d\n", total_personas);
    printf("--------------------------------------------------\n");
    printf(" DETALLE POR MARCA:\n");
    printf("   Marca 1: %8d personas  |  %5.2f%%\n", marca1, porcentaje1);
    printf("   Marca 2: %8d personas  |  %5.2f%%\n", marca2, porcentaje2);
    printf("   Marca 3: %8d personas  |  %5.2f%%\n", marca3, porcentaje3);
    printf("   Marca 4: %8d personas  |  %5.2f%%\n", marca4, porcentaje4);
    printf("   Marca 5: %8d personas  |  %5.2f%%\n", marca5, porcentaje5);
    printf("   Marca 6: %8d personas  |  %5.2f%%\n", marca6, porcentaje6);
    printf("   Marca 7: %8d personas  |  %5.2f%%\n", marca7, porcentaje7);
    printf("==================================================\n");

    return 0;
}