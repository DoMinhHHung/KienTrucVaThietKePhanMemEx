package iuh.fit;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {

//        Singleton obj1 = Singleton.getInstance();
//        Singleton obj2 = Singleton.getInstance();
//        System.out.println("SingletonEager: "+(obj1 == obj2));

        SingletonLazy object1 = SingletonLazy.getInstance();
        SingletonLazy object2 = SingletonLazy.getInstance();
        System.out.println("SingletonLazy: " + (object1 != object2));
        System.out.println("SingletonLazy: " + (object1 == object2));





    }
}