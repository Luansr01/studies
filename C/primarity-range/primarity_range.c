#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define clearscr() printf("\033[2J"); printf("\033[H")

int checkPrimarity(int x){
    for(int i = 1; i < x; i++){
        if((i != 1) && (i != x) && (x%i == 0)){
            return 0;
        }
    }
    return 1;
}

int main(){
    clearscr();
    printf("Please Insert a range.\n\n0 to ");
    char inp[100];
    fgets(inp, 100, stdin);
    

    for(int i = 0; i < atoi(inp) + 1; i++){
        
        
        if(checkPrimarity(i) == 1){
            printf("\n\033[32m|V| %i", i);
            printf(" is a prime number.\033[0m");
        }else{
            printf("\n\033[31m|X| %i", i);
            printf(" is not a prime number.\033[0m");
        }
    }

    printf("\n");


}
