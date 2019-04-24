hot / cold observable - domyślnie jest cold (każdy observator dostaje prywatnego producenta) - dla np. ajax - zamienić na hot, zeby nie dublować zapytań.
żeby zrobić hot - użyj metody pipe(share()) - operator share();

operatory
gdy uzytkownik anuluje przeglądanie, a zapytanie trwa interfejs OnDestroy, takeUntil - łączysz z Subject(), który ma za zadanie odsubskrybować

merge - łączenie operatorów