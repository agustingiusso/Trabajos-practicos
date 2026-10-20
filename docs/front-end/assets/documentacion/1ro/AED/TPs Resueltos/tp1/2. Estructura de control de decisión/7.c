/*
7. Realizar un programa que simule una calculadora simple. Lee dos números y un carácter.
Si el carácter es un “+”, se imprime la suma;
si es un “-”, se imprime la diferencia;
si es un “*”, se imprime el producto;
si es un “/”, se imprime el cociente (si no puede calcularse debe emitirse un aviso).
Utilizar el CASO.
*/

#include <stdio.h>

int main()
{
    // Declaración de variables:
    float num1, num2, resultado = 0;
    char operador;

    // Ingreso de datos:
    printf("Ingrese el primer número: ");
    scanf("%f", &num1);
    printf("Ingrese el segundo número: ");
    scanf("%f", &num2);
    printf("Ingrese el operador (+, -, *, /): ");
    scanf(" %c", &operador);

    // Estructura de control de decisión (CASO):
    switch (operador)
    {
    case '+':
        resultado = num1 + num2;
        printf("Resultado: %.2f\n", resultado);
        break;
    case '-':
        resultado = num1 - num2;
        printf("Resultado: %.2f\n", resultado);
        break;
    case '*':
        resultado = num1 * num2;
        printf("Resultado: %.2f\n", resultado);
        break;
    case '/':
        if (num2 != 0)
        {
            resultado = num1 / num2;
            printf("Resultado: %.2f\n", resultado);
        }
        else
        {
            printf("Error: División por cero no permitida.\n");
        }
        break;
    default:
        printf("Error: Operador no válido.\n");
    }

    return 0;
}