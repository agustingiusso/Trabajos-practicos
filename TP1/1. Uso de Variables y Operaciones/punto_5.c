/*
5. En el último censo, una de las preguntas se refirió al “grado de alfabetización” de la
población mayor de 18 años. Se utilizaron las siguientes categorías: “sin escolaridad”,
“primaria completa”, “secundaria completa”, “universitaria completa”. Se conoce la
cantidad de hombres y mujeres correspondientes a cada categoría y se desea generar
un reporte identificando los porcentajes parciales, como se muestra a continuación:
Total de mujeres encuestadas: M.
● Sin escolaridad: N1%
● Primaria completa: C1%
● Secundaria completa: S1%
● Universitaria completa: U1%
Total de Hombres encuestados: H.
● Sin escolaridad: N2%
● Primaria completa: C2%
● Secundaria completa: S2%
● Universitaria completa: U2%
Total de Encuestados: W
*/

#include <stdio.h>

int main()
{
    // Declaración de variables para cantidades absolutas
    int m_sin, m_pri, m_sec, m_uni;
    int h_sin, h_pri, h_sec, h_uni;
    int total_mujeres, total_hombres, total_encuestados;

    // Declaración de variables para porcentajes parciales
    float p_m_sin, p_m_pri, p_m_sec, p_m_uni;
    float p_h_sin, p_h_pri, p_h_sec, p_h_uni;

    // 1. Ingreso de datos
    printf("--- Censo: Grado de Alfabetizacion ---\n");
    printf("Ingrese los datos de las MUJERES encuestadas:\n");
    printf("Sin escolaridad: ");
    scanf("%d", &m_sin);
    printf("Primaria completa: ");
    scanf("%d", &m_pri);
    printf("Secundaria completa: ");
    scanf("%d", &m_sec);
    printf("Universitaria completa: ");
    scanf("%d", &m_uni);

    printf("\nIngrese los datos de los HOMBRES encuestados:\n");
    printf("Sin escolaridad: ");
    scanf("%d", &h_sin);
    printf("Primaria completa: ");
    scanf("%d", &h_pri);
    printf("Secundaria completa: ");
    scanf("%d", &h_sec);
    printf("Universitaria completa: ");
    scanf("%d", &h_uni);

    // 2. Cálculos
    // Totales por género y total general
    total_mujeres = m_sin + m_pri + m_sec + m_uni;
    total_hombres = h_sin + h_pri + h_sec + h_uni;
    total_encuestados = total_mujeres + total_hombres;

    // Porcentajes parciales Mujeres (sobre el total de mujeres M)
    p_m_sin = (m_sin * 100.0) / total_mujeres;
    p_m_pri = (m_pri * 100.0) / total_mujeres;
    p_m_sec = (m_sec * 100.0) / total_mujeres;
    p_m_uni = (m_uni * 100.0) / total_mujeres;

    // Porcentajes parciales Hombres (sobre el total de hombres H)
    p_h_sin = (h_sin * 100.0) / total_hombres;
    p_h_pri = (h_pri * 100.0) / total_hombres;
    p_h_sec = (h_sec * 100.0) / total_hombres;
    p_h_uni = (h_uni * 100.0) / total_hombres;

    // 3. Impresión del reporte respetando el formato de la cátedra
    printf("\n========================================\n");
    printf("          REPORTE CENSAL                \n");
    printf("========================================\n");
    printf("Total de mujeres encuestadas: %d\n", total_mujeres);
    printf("  Sin escolaridad:        %% %.2f\n", p_m_sin);
    printf("  Primaria completa:      %% %.2f\n", p_m_pri);
    printf("  Secundaria completa:    %% %.2f\n", p_m_sec);
    printf("  Universitaria completa: %% %.2f\n", p_m_uni);
    printf("----------------------------------------\n");
    printf("Total de Hombres encuestados: %d\n", total_hombres);
    printf("  Sin escolaridad:        %% %.2f\n", p_h_sin);
    printf("  Primaria completa:      %% %.2f\n", p_h_pri);
    printf("  Secundaria completa:    %% %.2f\n", p_h_sec);
    printf("  Universitaria completa: %% %.2f\n", p_h_uni);
    printf("========================================\n");
    printf("Total de Encuestados: %d\n", total_encuestados);
    printf("========================================\n");

    return 0;
}