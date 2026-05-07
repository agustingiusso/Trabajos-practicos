/*
4. Se realiza una encuesta para determinar cuáles son los jabones en polvo preferidos en una determinada población.
Entre todas las personas encuestadas, se mencionaron 7 marcas diferentes.
Se quiere obtener un informe en el que se detalle, para cada marca, la cantidad de personas y el porcentaje que ese número representa.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables para la cantidad de votos por marca
    int m1, m2, m3, m4, m5, m6, m7;
    int total_personas;

    // Declaración de variables para almacenar los porcentajes
    float p1, p2, p3, p4, p5, p6, p7;

    // 1. Ingreso de datos
    printf("--- Encuesta de Jabones en Polvo ---\n");
    printf("Ingrese la cantidad de personas que prefieren la Marca 1: ");
    scanf("%d", &m1);

    printf("Ingrese la cantidad de personas que prefieren la Marca 2: ");
    scanf("%d", &m2);

    printf("Ingrese la cantidad de personas que prefieren la Marca 3: ");
    scanf("%d", &m3);

    printf("Ingrese la cantidad de personas que prefieren la Marca 4: ");
    scanf("%d", &m4);

    printf("Ingrese la cantidad de personas que prefieren la Marca 5: ");
    scanf("%d", &m5);

    printf("Ingrese la cantidad de personas que prefieren la Marca 6: ");
    scanf("%d", &m6);

    printf("Ingrese la cantidad de personas que prefieren la Marca 7: ");
    scanf("%d", &m7);

    // 2. Cálculos
    // Se suman todas las cantidades para obtener el universo total de la encuesta
    total_personas = m1 + m2 + m3 + m4 + m5 + m6 + m7;

    // Cálculo de porcentajes
    // Se multiplica por 100.0 (float) antes de dividir para no perder los decimales
    p1 = (m1 * 100.0) / total_personas;
    p2 = (m2 * 100.0) / total_personas;
    p3 = (m3 * 100.0) / total_personas;
    p4 = (m4 * 100.0) / total_personas;
    p5 = (m5 * 100.0) / total_personas;
    p6 = (m6 * 100.0) / total_personas;
    p7 = (m7 * 100.0) / total_personas;

    // 3. Impresión del informe
    printf("\n========================================\n");
    printf("       RESULTADOS DE LA ENCUESTA        \n");
    printf("========================================\n");
    printf("Total de personas encuestadas: %d\n", total_personas);
    printf("----------------------------------------\n");
    // Para imprimir el símbolo de porcentaje en C se usa %%
    printf("Marca 1: %d personas (%% %.2f)\n", m1, p1);
    printf("Marca 2: %d personas (%% %.2f)\n", m2, p2);
    printf("Marca 3: %d personas (%% %.2f)\n", m3, p3);
    printf("Marca 4: %d personas (%% %.2f)\n", m4, p4);
    printf("Marca 5: %d personas (%% %.2f)\n", m5, p5);
    printf("Marca 6: %d personas (%% %.2f)\n", m6, p6);
    printf("Marca 7: %d personas (%% %.2f)\n", m7, p7);
    printf("========================================\n");

    return 0;
}