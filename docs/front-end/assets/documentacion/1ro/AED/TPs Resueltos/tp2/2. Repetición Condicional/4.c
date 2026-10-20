/*
4. Dada una sucesión de números reales, se quiere obtener e imprimir la suma de sus elementos, el valor absoluto de dicha suma,
y la suma de los valores absolutos de cada elemento de la sucesión.
La sucesión termina al aparecer su quinto elemento negativo.
*/

#include <stdio.h>
#include <math.h>

int main()
{
    // Declaración de variables
    float numero, suma = 0, suma_abs = 0;
    int contador_negativos = 0;

    // Bucle para ingresar los números
    while (contador_negativos < 5)
    {
        printf("Ingrese un número real: ");
        scanf("%f", &numero);

        // Acumulación de la suma y la suma de valores absolutos
        suma += numero;
        suma_abs += fabs(numero);

        // Contar los elementos negativos
        if (numero < 0)
        {
            contador_negativos++;
        }
    }
    return 0;
}