/*
10. Cierto atleta pierde en sus carreras 100 gramos de peso por cada 50m recorridos.
Su entrenador desea un programa que a partir de datos como:
∙ Peso del corredor
∙ Longitud del circuito (nunca menor a 50m)
∙ Tiempo empleado (en seg.)
Cumpla con los siguientes puntos:
a. Determinar cuántos gramos pierde el corredor y cuál es su peso final.
b. Si ha perdido más de 300 g de peso, indicar que necesitará vitamina A y si pierde más de 450g necesitará también vitamina C.
c. Sabiendo que para el circuito olímpico el tiempo récord es de 25 seg., y que para el circuito panamericano el tiempo récord es
de 15 seg., determinar si el corredor ha mejorado alguno de estos récords.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables:
    float peso_corredor, longitud_circuito, tiempo_empleado;
    float peso_final, gramos_perdidos;

    // Ingreso de datos:
    printf("Ingrese el peso del corredor (en kg): ");
    scanf("%f", &peso_corredor);
    printf("Ingrese la longitud del circuito (en m, nunca menor a 50m): ");
    scanf("%f", &longitud_circuito);

    // Validación de la longitud del circuito:
    if (longitud_circuito < 50)
    {
        printf("La longitud del circuito no puede ser menor a 50m.\n");
        return 1; // Salida del programa con error
    }
    printf("Ingrese el tiempo empleado (en seg.): ");
    scanf("%f", &tiempo_empleado);

    // a. Determinar cuántos gramos pierde el corredor y cuál es su peso final.
    gramos_perdidos = (longitud_circuito / 50) * 100;      // 100 gramos por cada 50m
    peso_final = peso_corredor - (gramos_perdidos / 1000); // Convertir gramos a kg

    printf("El corredor ha perdido %.2f gramos y su peso final es %.2f kg.\n", gramos_perdidos, peso_final);

    // b. Si ha perdido más de 300 g de peso, indicar que necesitará vitamina A y si pierde más de 450g necesitará también vitamina C.
    if (gramos_perdidos > 300)
    {
        printf("Necesitará vitamina A.\n");
        if (gramos_perdidos > 450)
        {
            printf("También necesitará vitamina C.\n");
        }
    }

    // c. Sabiendo que para el circuito olímpico el tiempo récord es de 25 seg., y que para el circuito panamericano el tiempo récord es
    // de 15 seg., determinar si el corredor ha mejorado alguno de estos récords
    if (tiempo_empleado < 15)
    {
        printf("El corredor ha mejorado el récord panamericano y olímpico.\n");
    }
    else if (tiempo_empleado < 25)
    {
        printf("El corredor ha mejorado el récord olímpico.\n");
    }
    else
    {
        printf("El corredor no ha mejorado ninguno de los récords.\n");
    }

    return 0;
}