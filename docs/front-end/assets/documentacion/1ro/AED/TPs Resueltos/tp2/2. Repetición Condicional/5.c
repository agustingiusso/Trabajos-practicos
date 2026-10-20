/*
5. Se leen números reales hasta que aparece un 0. Determinar e imprimir cuántos de ellos
tienen su parte no decimal par y el porcentaje que ellos representan respecto de la cantidad
de números leídos. Imprimir también esta última cantidad.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables
    float numero = 1;
    int contador_par = 0, contador_total = 0;

    // Bucle para ingresar los números

    while (numero != 0)
    {
        printf("Ingrese un número real (ingrese 0 para finalizar): ");
        scanf("%f", &numero);

        // Contar los números con parte no decimal par
        if ((int)numero % 2 == 0 && numero != 0)
        {
            contador_par++;
        }

        // Contar la cantidad total de números leídos
        if (numero != 0)
        {
            contador_total++;
        }
    }

    return 0;
}