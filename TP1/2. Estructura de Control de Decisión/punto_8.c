/*
8. Cierto atleta pierde en sus carreras 100 gramos de peso por cada 50m recorridos.
Su entrenador desea un programa que a partir de datos como
• Peso del corredor
• Longitud del circuito (nunca menor a 50m)
• Tiempo empleado (en seg.)
Cumpla con los siguientes puntos:
a. Determinar cuántos gramos pierde el corredor y cuál es su peso final
b. Si ha perdido más de 300 g de peso, indicar que necesitará vitamina A y si pierde más de 450g necesitará también vitamina C
c. Sabiendo que para el circuito olímpico el tiempo récord es de 25 seg., y que para el circuito panamericano el tiempo récord es de 15 seg., determinar si el corredor ha mejorado alguno de estos récords.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables
    float peso_inicial, longitud, tiempo;
    float gramos_perdidos, peso_final;

    // 1. Ingreso de datos
    printf("--- Simulador de Rendimiento Atletico ---\n");
    printf("Ingrese el peso inicial del corredor (en kg): ");
    scanf("%f", &peso_inicial);

    printf("Ingrese la longitud del circuito (en metros, minimo 50): ");
    scanf("%f", &longitud);

    // Validación simple requerida por el enunciado para evitar medidas ilógicas
    if (longitud < 50)
    {
        printf("ERROR: La longitud del circuito nunca debe ser menor a 50m.\n");
        return 1; // Terminamos la ejecución tempranamente indicando un error
    }

    printf("Ingrese el tiempo empleado (en segundos): ");
    scanf("%f", &tiempo);

    // 2. Calculos principales
    // a. Determinar gramos perdidos y peso final
    // Pierde 100 gramos por cada 50 metros recorridos. Se usa 50.0 para asegurar division decimal.
    gramos_perdidos = (longitud / 50.0) * 100.0;

    // Convertimos gramos a kg dividiendo por 1000 para poder restarlo del peso inicial
    peso_final = peso_inicial - (gramos_perdidos / 1000.0);

    // 3. Impresión de resultados e informe
    printf("\n=================================================\n");
    printf("             INFORME DE RENDIMIENTO              \n");
    printf("=================================================\n");

    // Punto a:
    printf("Gramos perdidos en carrera: %.2f g\n", gramos_perdidos);
    printf("Peso final del corredor: %.3f kg\n", peso_final);
    printf("-------------------------------------------------\n");

    // Punto b: Necesidad de vitaminas
    // Se evalúa de mayor a menor para que la lógica de las condiciones no se solape
    if (gramos_perdidos > 450)
    {
        printf("Suplementacion: Necesita Vitamina A y Vitamina C.\n");
    }
    else if (gramos_perdidos > 300)
    {
        printf("Suplementacion: Necesita Vitamina A.\n");
    }
    else
    {
        printf("Suplementacion: No requiere suplementos adicionales.\n");
    }
    printf("-------------------------------------------------\n");

    // Punto c: Evaluación de records (Panamericano = 15s, Olimpico = 25s)
    // También se evalúa de menor a mayor tiempo
    if (tiempo < 15)
    {
        printf("Records: !Excelente! Ha mejorado el record Panamericano y Olimpico.\n");
    }
    else if (tiempo < 25)
    {
        printf("Records: !Felicidades! Ha mejorado el record Olimpico.\n");
    }
    else
    {
        printf("Records: No ha superado ningun record en esta carrera.\n");
    }

    printf("=================================================\n");

    return 0;
}