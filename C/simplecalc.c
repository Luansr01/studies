#include <stdio.h>

#define clear() printf("\033[2J\n")

int choice;
double x;
double y;
double answr;

double selectNumbers(char* operation){
    printf("You chose %s\nType the first number: ", operation);
    fflush(stdout);
    scanf("%lf", &x);

    printf("\nType the second number: ");
    fflush(stdout);
    scanf("%lf", &y);
}

double add(){
    selectNumbers("ADDITION");
    return (x + y);
}

double sub(){
    selectNumbers("SUBTRACTION");
    return (x - y);
}

double mul(){
    selectNumbers("MULTIPLICATION");
    return (x * y);
}

double div(){
    selectNumbers("DIVISION");
    return (x / y);
}

double comp(){
    int howManyNumbers;

    printf("WARNING: YOU HAVE TO TYPE THE NUMBERS AND OPERATIONS IN THE ORDER YOU WANT THEM CALCULATED\n");
    printf("How many numbers do you want in your equation?\n");
    fflush(stdout);
    scanf("%d", &howManyNumbers);


    double numbers[howManyNumbers];
    char operations[howManyNumbers];
    
    clear();

    for(int i = 0; i < howManyNumbers; i++){
        printf("Number %d:", i+1);
        fflush(stdout);
        scanf("%lf", &numbers[i]);
    }  

    clear();

    for(int k = 0; k < howManyNumbers - 1; k++){
        printf("Operation %d:", k+1);
        fflush(stdout);
        scanf(" %c", &operations[k]);
    }

    for(int j = 0; j < howManyNumbers - 1; j++){
        x = numbers[j];
        y = numbers[j+1];
        switch(((int) operations[j])){
            case '+':
                numbers[j+1] = x + y;
                break;
            case '-':
                numbers[j+1] = x - y;
                break;
            case '*':
                numbers[j+1] = x * y;
                break;
            case '/':
                numbers[j+1] = x / y;
                break;
            default:
                numbers[j+1] = x + y;
        }
    }
    return numbers[howManyNumbers-1];  
}

void start(){
    printf("\nPlease select one of the following options:\n\n1) Addition\n2) Subtraction\n3) Multiplication\n4) Division\n5) Equation Solver\n6) Exit\n");
    fflush(stdout);
    scanf("%d", &choice);

    switch(choice){
        case 1:
            clear();
            answr = add();
            break;
        case 2:
            clear();
            answr = sub();
            break;
        case 3:
            clear();
            answr = mul();
            break;
        case 4:
            clear();
            answr = div();
            break;
        case 5:
            clear();
            answr = comp();
            break;
        case 6:

            break;
        default:
            
            break;
    }
    clear();
    printf("The Answer Is: %lf\n\n", answr);
}

int main(){
    printf("\nWelcome to the calculator!");
    start();
}