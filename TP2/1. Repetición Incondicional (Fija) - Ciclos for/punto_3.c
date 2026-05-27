/*
3. Se realiza una encuesta en tres ciudades de un mismo distrito para determinar cuál de ellas 
tiene el mayor porcentaje de chicos menores de 5 años. Imprimir un mensaje indicándolo.
Se sabe que la ciudad 1 tienen 1000 chicos menores de 10 años, la ciudad 2 tiene 1500 chicos
menores de 10 años y la ciudad 3 tiene 1530 chicos menores de 10 años.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables
    int i, ciudad_mayor;
    float menores_5, menores_10, porcentaje, mayor_porcentaje;

    mayor_porcentaje = 0;
    porcentaje = 0;
    
    printf("\n=======================================================================================================\n");

    printf ("\n--- Encuesta demográfica infantil ---\n");

    printf("\n=======================================================================================================\n");

    // Se le asigna un valor al índice por cada ciudad (3 en este caso)

    for ( i = 1; i <=3; i++)
    {
        if (i == 1)
        {
            menores_10 = 1000;            
        }  
         else if (i == 2){
            menores_10 = 1500;
        }
        else {
            menores_10 = 1530;
        }

        // Se le imprime al usuario la ciudad en la que está y se le solicitan los chicos menores de 5 años 

        printf("\nCiudad %d, posee: %.0f chicos menores de 10 años\n", i, menores_10);

        printf("\nIngrese la cantidad de menores que tienen 5 años: ");

        scanf("%f", &menores_5);

        printf("\n=======================================================================================================\n");

        // Cálculo del porcentaje pedido

        porcentaje = (menores_5*100)/menores_10;

        if (porcentaje > mayor_porcentaje){
            mayor_porcentaje = porcentaje;
            ciudad_mayor = i;
        }
        
    }

    printf ("\n--- Resultado ---\n");
    printf ("\nLa ciudad con mayor porcentaje de menores de 5 años es la %d. La cual tuvo %.2f %% de menores de 5 años", ciudad_mayor, mayor_porcentaje);
    printf ("\n=======================================================================================================\n");
}