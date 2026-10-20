/*
5. En el último censo, una de las preguntas se refirió al “grado de alfabetización” de la población mayor de 18 años.
Se utilizaron las siguientes categorías: “sin escolaridad”, “primaria completa”, “secundaria completa”, “universitaria completa”.
Se conoce la cantidad de hombres y mujeres correspondientes a cada categoría y se desea generar un reporte identificando los porcentajes parciales,
como se muestra a continuación:

Total de mujeres encuestadas: M.
        ● Sin escolaridad: N1%
        ● Primaria completa: C1%
        ● Secundaria completa: S1%
        ● Universitaria completa: U1% Total de Hombres
    encuestados: H.
        ● Sin escolaridad: N2%
    ▪ Primaria completa: C2%
    ▪ Secundaria completa: S2%
    ▪ Universitaria completa: U2%
Total de Encuestados: W
*/

#include <stdio.h>

int main()
{
    // Declaración de variables:
    int mujeres_sin_escolaridad, mujeres_primaria, mujeres_secundaria, mujeres_universitaria;
    int hombres_sin_escolaridad, hombres_primaria, hombres_secundaria, hombres_universitaria;
    float porcentaje_mujeres_sin_escolaridad, porcentaje_mujeres_primaria, porcentaje_mujeres_secundaria, porcentaje_mujeres_universitaria;
    float porcentaje_hombres_sin_escolaridad, porcentaje_hombres_primaria, porcentaje_hombres_secundaria, porcentaje_hombres_universitaria;
    int total_mujeres, total_hombres, total_encuestados;

    // Ingreso de datos:
    printf("Ingrese la cantidad de mujeres sin escolaridad: ");
    scanf("%d", &mujeres_sin_escolaridad);
    printf("Ingrese la cantidad de mujeres con primaria completa: ");
    scanf("%d", &mujeres_primaria);
    printf("Ingrese la cantidad de mujeres con secundaria completa: ");
    scanf("%d", &mujeres_secundaria);
    printf("Ingrese la cantidad de mujeres con universitaria completa: ");
    scanf("%d", &mujeres_universitaria);

    printf("Ingrese la cantidad de hombres sin escolaridad: ");
    scanf("%d", &hombres_sin_escolaridad);
    printf("Ingrese la cantidad de hombres con primaria completa: ");
    scanf("%d", &hombres_primaria);
    printf("Ingrese la cantidad de hombres con secundaria completa: ");
    scanf("%d", &hombres_secundaria);
    printf("Ingrese la cantidad de hombres con universitaria completa: ");
    scanf("%d", &hombres_universitaria);

    // Calcular totales:
    total_mujeres = mujeres_sin_escolaridad + mujeres_primaria + mujeres_secundaria + mujeres_universitaria;
    total_hombres = hombres_sin_escolaridad + hombres_primaria + hombres_secundaria + hombres_universitaria;
    total_encuestados = total_mujeres + total_hombres;

    // Calcular porcentajes:
    porcentaje_mujeres_sin_escolaridad = (float)mujeres_sin_escolaridad / total_mujeres * 100;
    porcentaje_mujeres_primaria = (float)mujeres_primaria / total_mujeres * 100;
    porcentaje_mujeres_secundaria = (float)mujeres_secundaria / total_mujeres * 100;
    porcentaje_mujeres_universitaria = (float)mujeres_universitaria / total_mujeres * 100;

    porcentaje_hombres_sin_escolaridad = (float)hombres_sin_escolaridad / total_hombres * 100;
    porcentaje_hombres_primaria = (float)hombres_primaria / total_hombres * 100;
    porcentaje_hombres_secundaria = (float)hombres_secundaria / total_hombres * 100;
    porcentaje_hombres_universitaria = (float)hombres_universitaria / total_hombres * 100;

    // Impresión del reporte final (Hecho con IA):
    printf("\n==================================================\n");
    printf("       REPORTE DE GRADO DE ALFABETIZACION         \n");
    printf("==================================================\n");

    printf("Total de mujeres encuestadas: %d.\n", total_mujeres);
    printf("  * Sin escolaridad:        %5.2f%%\n", porcentaje_mujeres_sin_escolaridad);
    printf("  * Primaria completa:      %5.2f%%\n", porcentaje_mujeres_primaria);
    printf("  * Secundaria completa:    %5.2f%%\n", porcentaje_mujeres_secundaria);
    printf("  * Universitaria completa: %5.2f%%\n\n", porcentaje_mujeres_universitaria);

    printf("Total de hombres encuestados: %d.\n", total_hombres);
    printf("  * Sin escolaridad:        %5.2f%%\n", porcentaje_hombres_sin_escolaridad);
    printf("  * Primaria completa:      %5.2f%%\n", porcentaje_hombres_primaria);
    printf("  * Secundaria completa:    %5.2f%%\n", porcentaje_hombres_secundaria);
    printf("  * Universitaria completa: %5.2f%%\n\n", porcentaje_hombres_universitaria);

    printf("--------------------------------------------------\n");
    printf("Total de Encuestados: %d\n", total_encuestados);
    printf("==================================================\n");

    return 0;
}