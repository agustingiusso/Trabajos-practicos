/*
3. En una escuela primaria se solicita a los 30 alumnos del sexto curso que califiquen a sus 3 maestras.
Para hacerlo, deben agruparse de a 5 y cada grupo asignar una nota entre 1 y 10 a cada maestra.
Se requiere un informe en el que se detalle, para cada maestra, la nota que cada grupo le asignó y la nota promedio que obtuvo.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables: 6 notas por cada una de las 3 maestras (30 alumnos agrupados de a 5, lo que da 6 grupos en total)
    int m1_g1, m1_g2, m1_g3, m1_g4, m1_g5, m1_g6;
    int m2_g1, m2_g2, m2_g3, m2_g4, m2_g5, m2_g6;
    int m3_g1, m3_g2, m3_g3, m3_g4, m3_g5, m3_g6;

    // Variables para los promedios
    float prom_m1, prom_m2, prom_m3;

    // 1. Ingreso de datos
    printf("--- Sistema de Calificacion Docente ---\n");
    printf("Total: 30 alumnos agrupados de a 5 (6 grupos en total).\n\n");

    // Se piden las notas de los 6 grupos de forma secuencial
    printf("GRUPO 1 - Ingrese nota para Maestra 1, 2 y 3 (separadas por espacio): ");
    scanf("%d %d %d", &m1_g1, &m2_g1, &m3_g1);

    printf("GRUPO 2 - Ingrese nota para Maestra 1, 2 y 3 (separadas por espacio): ");
    scanf("%d %d %d", &m1_g2, &m2_g2, &m3_g2);

    printf("GRUPO 3 - Ingrese nota para Maestra 1, 2 y 3 (separadas por espacio): ");
    scanf("%d %d %d", &m1_g3, &m2_g3, &m3_g3);

    printf("GRUPO 4 - Ingrese nota para Maestra 1, 2 y 3 (separadas por espacio): ");
    scanf("%d %d %d", &m1_g4, &m2_g4, &m3_g4);

    printf("GRUPO 5 - Ingrese nota para Maestra 1, 2 y 3 (separadas por espacio): ");
    scanf("%d %d %d", &m1_g5, &m2_g5, &m3_g5);

    printf("GRUPO 6 - Ingrese nota para Maestra 1, 2 y 3 (separadas por espacio): ");
    scanf("%d %d %d", &m1_g6, &m2_g6, &m3_g6);

    // 2. Cálculos principales
    // Se suman las 6 notas de cada maestra y se divide por 6.0 para obtener un float con decimales
    prom_m1 = (m1_g1 + m1_g2 + m1_g3 + m1_g4 + m1_g5 + m1_g6) / 6.0;
    prom_m2 = (m2_g1 + m2_g2 + m2_g3 + m2_g4 + m2_g5 + m2_g6) / 6.0;
    prom_m3 = (m3_g1 + m3_g2 + m3_g3 + m3_g4 + m3_g5 + m3_g6) / 6.0;

    // 3. Impresión del informe
    printf("\n=======================================================\n");
    printf("                 INFORME DE CALIFICACIONES               \n");
    printf("=======================================================\n");

    printf("MAESTRA 1\n");
    printf("Notas por grupo: G1: %d | G2: %d | G3: %d | G4: %d | G5: %d | G6: %d\n", m1_g1, m1_g2, m1_g3, m1_g4, m1_g5, m1_g6);
    printf("Promedio Obtenido: %.2f\n", prom_m1);
    printf("-------------------------------------------------------\n");

    printf("MAESTRA 2\n");
    printf("Notas por grupo: G1: %d | G2: %d | G3: %d | G4: %d | G5: %d | G6: %d\n", m2_g1, m2_g2, m2_g3, m2_g4, m2_g5, m2_g6);
    printf("Promedio Obtenido: %.2f\n", prom_m2);
    printf("-------------------------------------------------------\n");

    printf("MAESTRA 3\n");
    printf("Notas por grupo: G1: %d | G2: %d | G3: %d | G4: %d | G5: %d | G6: %d\n", m3_g1, m3_g2, m3_g3, m3_g4, m3_g5, m3_g6);
    printf("Promedio Obtenido: %.2f\n", prom_m3);
    printf("=======================================================\n");

    return 0;
}