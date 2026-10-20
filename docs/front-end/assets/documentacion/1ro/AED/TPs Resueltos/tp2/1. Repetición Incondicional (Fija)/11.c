/*
11. Implementar un programa que calcule e imprima las raíces reales de una ecuación de segundo grado o un cartel indicando que no existen tales raíces.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables
    float a, b, c, discriminante, raiz1, raiz2;

    // Solicitar al usuario los coeficientes de la ecuación
    printf("Ingrese los coeficientes a, b y c de la ecuación ax^2 + bx + c = 0:\n");
    scanf("%f %f %f", &a, &b, &c);

    // Calcular el discriminante
    discriminante = b * b - 4 * a * c;

    // Evaluar el discriminante para determinar la naturaleza de las raíces
    if (discriminante > 0)
    {
        raiz1 = (-b + sqrt(discriminante)) / (2 * a);
        raiz2 = (-b - sqrt(discriminante)) / (2 * a);
        printf("Las raíces reales son: %.2f y %.2f\n", raiz1, raiz2);
    }
    // Si el discriminante es igual a cero, hay una raíz real
    else if (discriminante == 0)
    {
        raiz1 = -b / (2 * a);
        printf("La raíz real es: %.2f\n", raiz1);
    }
    // Si el discriminante es negativo, no hay raíces reales
    else
    {
        printf("No existen raíces reales.\n");
    }

    return 0;
}