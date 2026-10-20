/*
3. Se ingresa por teclado un conjunto de números uno a uno.
Contar cuántas veces se presentan los valores 10, 20, 30 y 40 y cuántos números distintos a esos se presentan.
El proceso finaliza la tercera vez que -1 es ingresado.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables
    int numero, contador_10 = 0, contador_20 = 0, contador_30 = 0, contador_40 = 0, contador_distintos = 0, contador_negativo = 0;

    // Bucle para ingresar los números
    while (contador_negativo < 3)
    {
        printf("Ingrese un número (ingrese -1 para finalizar): ");
        scanf("%d", &numero);

        // Contar los valores específicos y los distintos
        if (numero == 10)
        {
            contador_10++;
        }
        else if (numero == 20)
        {
            contador_20++;
        }
        else if (numero == 30)
        {
            contador_30++;
        }
        else if (numero == 40)
        {
            contador_40++;
        }
        else if (numero != -1)
        {
            contador_distintos++;
        }

        // Contar las veces que se ingresa -1
        if (numero == -1)
        {
            contador_negativo++;
        }
    }
    return 0;
}