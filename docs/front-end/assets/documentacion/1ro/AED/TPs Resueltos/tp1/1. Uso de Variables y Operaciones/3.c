/*
3. En una escuela primaria se solicita a los 30 alumnos del sexto curso que califiquen a sus 3 maestras.
Para hacerlo, deben agruparse de a 5 y cada grupo asignar una nota entre 1 y 10 a cada maestra.
Se requiere un informe en el que se detalle, para cada maestra, la nota que cada grupo le asignó y la nota promedio que obtuvo.
*/
#include <stdio.h>

int main()
{
    // Declaración de variables:
    int m1_g1, m1_g2, m1_g3, m1_g4, m1_g5, m1_g6; // Notas de la maestra 1 por grupo
    int m2_g1, m2_g2, m2_g3, m2_g4, m2_g5, m2_g6; // Notas de la maestra 2 por grupo
    int m3_g1, m3_g2, m3_g3, m3_g4, m3_g5, m3_g6; // Notas de la maestra 3 por grupo
    float prom_m1, prom_m2, prom_m3;              // Promedios de cada maestra

    // Ingreso de notas:
    // GRUPO 1
    printf("GRUPO 1\n");
    printf("Nota a la Maestra 1: ");
    scanf("%f", &m1_g1);
    printf("Nota a la Maestra 2: ");
    scanf("%f", &m2_g1);
    printf("Nota a la Maestra 3: ");
    scanf("%f", &m3_g1);

    // GRUPO 2
    printf("\nGRUPO 2\n");
    printf("Nota a la Maestra 1: ");
    scanf("%f", &m1_g2);
    printf("Nota a la Maestra 2: ");
    scanf("%f", &m2_g2);
    printf("Nota a la Maestra 3: ");
    scanf("%f", &m3_g2);

    // GRUPO 3
    printf("\nGRUPO 3\n");
    printf("Nota a la Maestra 1: ");
    scanf("%f", &m1_g3);
    printf("Nota a la Maestra 2: ");
    scanf("%f", &m2_g3);
    printf("Nota a la Maestra 3: ");
    scanf("%f", &m3_g3);

    // GRUPO 4
    printf("\nGRUPO 4\n");
    printf("Nota a la Maestra 1: ");
    scanf("%f", &m1_g4);
    printf("Nota a la Maestra 2: ");
    scanf("%f", &m2_g4);
    printf("Nota a la Maestra 3: ");
    scanf("%f", &m3_g4);

    // GRUPO 5
    printf("\nGRUPO 5\n");
    printf("Nota a la Maestra 1: ");
    scanf("%f", &m1_g5);
    printf("Nota a la Maestra 2: ");
    scanf("%f", &m2_g5);
    printf("Nota a la Maestra 3: ");
    scanf("%f", &m3_g5);

    // GRUPO 6
    printf("\nGRUPO 6\n");
    printf("Nota a la Maestra 1: ");
    scanf("%f", &m1_g6);
    printf("Nota a la Maestra 2: ");
    scanf("%f", &m2_g6);
    printf("Nota a la Maestra 3: ");
    scanf("%f", &m3_g6);

    // Cálculo de Promedios:
    prom_m1 = (m1_g1 + m1_g2 + m1_g3 + m1_g4 + m1_g5 + m1_g6) / 6.0;
    prom_m2 = (m2_g1 + m2_g2 + m2_g3 + m2_g4 + m2_g5 + m2_g6) / 6.0;
    prom_m3 = (m3_g1 + m3_g2 + m3_g3 + m3_g4 + m3_g5 + m3_g6) / 6.0;

    // Impresión del Informe (Hecho con IA):
    printf("\n==================================================\n");
    printf("           INFORME FINAL DE DOCENTES              \n");
    printf("==================================================\n");

    printf(" MAESTRA 1\n");
    printf("   G1: %.0f | G2: %.0f | G3: %.0f | G4: %.0f | G5: %.0f | G6: %.0f\n", m1_g1, m1_g2, m1_g3, m1_g4, m1_g5, m1_g6);
    printf("   PROMEDIO: %.2f\n", prom_m1);
    printf("--------------------------------------------------\n");

    printf(" MAESTRA 2\n");
    printf("   G1: %.0f | G2: %.0f | G3: %.0f | G4: %.0f | G5: %.0f | G6: %.0f\n", m2_g1, m2_g2, m2_g3, m2_g4, m2_g5, m2_g6);
    printf("   PROMEDIO: %.2f\n", prom_m2);
    printf("--------------------------------------------------\n");

    printf(" MAESTRA 3\n");
    printf("   G1: %.0f | G2: %.0f | G3: %.0f | G4: %.0f | G5: %.0f | G6: %.0f\n", m3_g1, m3_g2, m3_g3, m3_g4, m3_g5, m3_g6);
    printf("   PROMEDIO: %.2f\n", prom_m3);
    printf("==================================================\n");

    return 0;
}