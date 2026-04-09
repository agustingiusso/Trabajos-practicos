#include <stdio.h>

/* 1. Codificar funciones para calcular:
a. el máximo entre 2 números enteros
b. el máximo entre 3 números enteros
c. el máximo entre 5 números enteros
d. el máximo entre 10 números enteros */

/* Definición de funciones */

/* a */

int max2(int a, int b)
{
    if (a > b)
    {
        return a;
    }
    else
    {
        return b;
    }
}

/* b */

int max3(int a, int b, int c)
{
    int max;
    max = max2(a, b);
    return max2(max, c);
}

/* c */

int max5(int a, int b, int c, int d, int e)
{
    int max;
    max = max3(a, b, c);
    return max2(max, max2(d, e));
}