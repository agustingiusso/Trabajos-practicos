/*
3. Se realiza una encuesta en tres ciudades de un mismo distrito para determinar cuál de ellas tiene el mayor porcentaje de chicos menores de 5 años.
Imprimir un mensaje indicándolo.
Se sabe que la ciudad 1 tienen 1000 chicos menores de 10 años, la ciudad 2 tiene 1500 chicos menores de 10 años y la ciudad 3
tiene 1530 chicos menores de 10 años.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables:
    int chicosCiudad1, chicosCiudad2, chicosCiudad3, i, ciudadConMayorPorcentaje;
    int totalCiudad1 = 1000, totalCiudad2 = 1500, totalCiudad3 = 1530;
    float porcentajeCiudad1, porcentajeCiudad2, porcentajeCiudad3, porcentaje_mayor = 0;

    // Ingreso de datos:
    for (i = 1; i <= 3; i++)
    {
        if (i == 1)
        {
            printf("Ingrese la cantidad de chicos menores de 5 años en la ciudad 1: ");
            scanf("%d", &chicosCiudad1);
        }
        else if (i == 2)
        {
            printf("Ingrese la cantidad de chicos menores de 5 años en la ciudad 2: ");
            scanf("%d", &chicosCiudad2);
        }
        else
        {
            printf("Ingrese la cantidad de chicos menores de 5 años en la ciudad 3: ");
            scanf("%d", &chicosCiudad3);
        }
    }

    // Cálculo de porcentajes:
    porcentajeCiudad1 = (chicosCiudad1 / (float)totalCiudad1) * 100;
    porcentajeCiudad2 = (chicosCiudad2 / (float)totalCiudad2) * 100;
    porcentajeCiudad3 = (chicosCiudad3 / (float)totalCiudad3) * 100;

    // Imprimir resultado:
    porcentaje_mayor = porcentajeCiudad1; // Inicializar con el porcentaje de la ciudad 1
    ciudadConMayorPorcentaje = 1;         // Inicializar con la ciudad 1
    if (porcentajeCiudad2 > porcentaje_mayor)
    {
        porcentaje_mayor = porcentajeCiudad2;
        ciudadConMayorPorcentaje = 2;
    }
    if (porcentajeCiudad3 > porcentaje_mayor)
    {
        porcentaje_mayor = porcentajeCiudad3;
        ciudadConMayorPorcentaje = 3;
    }

    printf("La ciudad con el mayor porcentaje es la ciudad %d\n", ciudadConMayorPorcentaje);
    printf("El mayor porcentaje de chicos menores de 5 años es: %.2f%%\n", porcentaje_mayor);

    return 0;
}